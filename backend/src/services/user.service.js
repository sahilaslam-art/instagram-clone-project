import * as userRepository from '../repositories/user.repository.js';
import * as profileUpdateRequestRepository from '../repositories/profile-update-request.repository.js';
import { ZonalAdminProfile } from '../models/zonal-admin.model.js';
import { AdminProfile } from '../models/admin.model.js';
import { SubAdminProfile } from '../models/sub-admin.model.js';
import { WorkerProfile } from '../models/worker.model.js';
import { KYCVerification as KycVerification } from '../models/kyc-verification.model.js';

export const getProfile = async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    // Remove password field
    user.password = undefined;
    return user;
};

export const updateProfile = async (userId, updateData) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    if (updateData.profilePhoto) {
        user.profilePhoto = updateData.profilePhoto;
    }

    user.lastProfileUpdate = new Date();
    await userRepository.updateById(user._id, { profilePhoto: user.profilePhoto, lastProfileUpdate: user.lastProfileUpdate });

    user.password = undefined;
    return user;
};

export const createProfileUpdateRequest = async (userId, updateData) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    // Extract old details from user
    const oldDetails = {
        fullName: user.fullName,
        mobileNumber: user.mobileNumber,
        companyName: user.companyName,
        industry: user.industry
    };

    const newRequest = await profileUpdateRequestRepository.create({
        ownerId: userId,
        oldDetails,
        newDetails: updateData
    });
    
    return { message: 'Profile update request submitted successfully', request: newRequest };
};

export const getAllCustomers = async (page = 1, limit = 20, queryFilters = {}) => {
    const skip = (page - 1) * limit;
    let query = { role: 'Customer' };
    
    if (queryFilters.search) {
        const q = new RegExp(queryFilters.search, 'i');
        query.$or = [{ fullName: q }, { email: q }, { mobileNumber: q }];
    }

    if (queryFilters.accountStatus) {
        if (queryFilters.accountStatus === 'Suspended Account') {
            query.accountStatus = 'Suspended';
        } else {
            query.kycStatus = queryFilters.accountStatus;
            query.accountStatus = { $ne: 'Suspended' };
        }
    }

    const data = await userRepository.findPaginated(query, skip, limit);
    return { data: data.users, total: data.total, page, limit };
};

export const getAllOwners = async (page = 1, limit = 20, queryFilters = {}) => {
    const skip = (page - 1) * limit;
    let query = { role: 'Owner' };

    if (queryFilters.search) {
        const q = new RegExp(queryFilters.search, 'i');
        query.$or = [{ fullName: q }, { email: q }, { mobileNumber: q }];
    }

    if (queryFilters.accountStatus) {
        if (queryFilters.accountStatus === 'Suspended Account') {
            query.accountStatus = 'Suspended';
        } else {
            query.kycStatus = queryFilters.accountStatus;
            query.accountStatus = { $ne: 'Suspended' };
        }
    }

    const data = await userRepository.findPaginated(query, skip, limit);
    return { data: data.users, total: data.total, page, limit };
};

export const getAllSubAdmins = async (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const data = await userRepository.findPaginated({ role: 'Sub_Admin' }, skip, limit);
    return { data: data.users, total: data.total, page, limit };
};

export const getAuthorizedStaffUserIds = async (currentUser, targetRole) => {
    // Keeping this for backward compatibility if used elsewhere (like getRestrictedAccounts)
    if (currentUser.role === 'Super_Admin') return null; 

    if (currentUser.role === 'Zonal_Admin') {
        const adminProfile = await ZonalAdminProfile.findOne({ userId: currentUser._id });
        if (!adminProfile) return [];
        if (targetRole === 'Admin') {
            const matches = await AdminProfile.find({ domain: adminProfile.domain, zone: adminProfile.zone }).select('userId');
            return matches.map(m => m.userId.toString());
        }
        if (targetRole === 'Sub_Admin') {
            const matches = await SubAdminProfile.find({ domain: adminProfile.domain, zone: adminProfile.zone }).select('userId');
            return matches.map(m => m.userId.toString());
        }
        if (targetRole === 'Worker') {
            const matches = await WorkerProfile.find({ domain: adminProfile.domain, zone: adminProfile.zone }).select('userId');
            return matches.map(m => m.userId.toString());
        }
    }

    if (currentUser.role === 'Admin') {
        const adminProfile = await AdminProfile.findOne({ userId: currentUser._id });
        if (!adminProfile) return [];
        if (targetRole === 'Sub_Admin') {
            const matches = await SubAdminProfile.find({ domain: adminProfile.domain, zone: adminProfile.zone, region: adminProfile.region }).select('userId');
            return matches.map(m => m.userId.toString());
        }
        if (targetRole === 'Worker') {
            const matches = await WorkerProfile.find({ domain: adminProfile.domain, zone: adminProfile.zone, region: adminProfile.region }).select('userId');
            return matches.map(m => m.userId.toString());
        }
    }

    if (currentUser.role === 'Sub_Admin' && targetRole === 'Worker') {
        const adminProfile = await SubAdminProfile.findOne({ userId: currentUser._id });
        if (!adminProfile) return [];
        const matches = await WorkerProfile.find({ domain: adminProfile.domain, zone: adminProfile.zone, region: adminProfile.region, category: adminProfile.category }).select('userId');
        return matches.map(m => m.userId.toString());
    }

    return []; 
};

export const getStaffByRole = async (role, currentUser, page = 1, limit = 20, queryFilters = {}) => {
    let profileQuery = {};
    
    // Geographical filters from request
    if (queryFilters.domain) profileQuery.domain = queryFilters.domain;
    if (queryFilters.zone) profileQuery.zone = queryFilters.zone;
    if (queryFilters.region) profileQuery.region = queryFilters.region;
    if (queryFilters.category) profileQuery.category = queryFilters.category;
    if (queryFilters.speciality) profileQuery.speciality = queryFilters.speciality;

    if (currentUser.role !== 'Super_Admin') {
        if (currentUser.role === 'Zonal_Admin') {
            const adminProfile = await ZonalAdminProfile.findOne({ userId: currentUser._id });
            if (!adminProfile) return { data: [], total: 0, page, limit };
            profileQuery.domain = adminProfile.domain;
            profileQuery.zone = adminProfile.zone;
        } else if (currentUser.role === 'Admin') {
            const adminProfile = await AdminProfile.findOne({ userId: currentUser._id });
            if (!adminProfile) return { data: [], total: 0, page, limit };
            profileQuery.domain = adminProfile.domain;
            profileQuery.zone = adminProfile.zone;
            profileQuery.region = adminProfile.region;
        } else if (currentUser.role === 'Sub_Admin') {
            if (role !== 'Worker') return { data: [], total: 0, page, limit };
            const adminProfile = await SubAdminProfile.findOne({ userId: currentUser._id });
            if (!adminProfile) return { data: [], total: 0, page, limit };
            profileQuery.domain = adminProfile.domain;
            profileQuery.zone = adminProfile.zone;
            profileQuery.region = adminProfile.region;
            profileQuery.category = adminProfile.category;
        } else {
             return { data: [], total: 0, page, limit };
        }
    }

    const skip = (page - 1) * limit;
    
    let ProfileModel;
    if (role === 'Zonal_Admin') ProfileModel = ZonalAdminProfile;
    else if (role === 'Admin') ProfileModel = AdminProfile;
    else if (role === 'Sub_Admin') ProfileModel = SubAdminProfile;
    else if (role === 'Worker') ProfileModel = WorkerProfile;

    const profiles = await ProfileModel.find(profileQuery)
        .populate({ path: 'userId', select: '-password' })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
        
    const total = await ProfileModel.countDocuments(profileQuery);

    let mappedData = profiles.map(p => {
        const u = p.userId ? p.userId.toObject() : {};
        u.domain = p.domain;
        u.zone = p.zone;
        u.region = p.region;
        u.category = p.category;
        u.speciality = p.speciality;
        return u;
    }).filter(u => u._id); // Filter out any dangling profiles without user

    if (queryFilters.search) {
        const q = queryFilters.search.toLowerCase();
        mappedData = mappedData.filter(u => 
            u.fullName?.toLowerCase().includes(q) || 
            u.email?.toLowerCase().includes(q) || 
            u.mobileNumber?.toLowerCase().includes(q)
        );
    }
    
    if (queryFilters.accountStatus) {
        mappedData = mappedData.filter(u => {
            const displayStatus = u.accountStatus === 'Suspended' ? 'Suspended Account' : (u.kycStatus || 'Incomplete');
            return displayStatus === queryFilters.accountStatus;
        });
    }

    return { data: mappedData, total, page, limit };
};

export const getStaffDetails = async (userId, currentUser) => {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error('User not found');

    // Security Check: Ensure currentUser can view this staff member
    if (currentUser.role !== 'Super_Admin') {
        const authorizedUserIds = await getAuthorizedStaffUserIds(currentUser, user.role);
        if (authorizedUserIds !== null && !authorizedUserIds.includes(user._id.toString())) {
            throw new Error('Not authorized to view this staff member');
        }
    }

    const u = user.toObject();
    const role = u.role;

    // Attach profile
    let profile = null;
    if (role === 'Zonal_Admin') profile = await ZonalAdminProfile.findOne({ userId });
    else if (role === 'Admin') profile = await AdminProfile.findOne({ userId });
    else if (role === 'Sub_Admin') profile = await SubAdminProfile.findOne({ userId });
    else if (role === 'Worker') profile = await WorkerProfile.findOne({ userId });

    if (profile) {
        u.domain = profile.domain;
        u.zone = profile.zone;
        u.region = profile.region;
        u.category = profile.category;
        u.speciality = profile.speciality;
    }

    // Attach KYC Documents
    const kyc = await KycVerification.findOne({ userId });
    
    // Attach Verified Activities (users this staff has verified)
    const activities = await KycVerification.find({ verifiedBy: userId })
        .populate('userId', 'fullName email role')
        .select('userId status comments updatedAt');

    return { user: u, kyc, activities };
};

// Admin Methods
export const getPendingProfileUpdates = async () => {
    return await profileUpdateRequestRepository.findAllPending();
};

export const reviewProfileUpdate = async (requestId, status, rejectionReason) => {
    const request = await profileUpdateRequestRepository.findById(requestId);
    if (!request) {
        throw new Error('Profile update request not found');
    }
    
    if (request.status !== 'Pending') {
        throw new Error('Request is already processed');
    }

    await profileUpdateRequestRepository.updateStatus(requestId, status, rejectionReason);

    if (status === 'Approved') {
        // Apply the new details to the user
        await userRepository.updateById(request.ownerId, request.newDetails);
    }
    
    return { message: `Profile update request ${status.toLowerCase()}` };
};

export const updateUserStatus = async (userId, accountStatus, kycStatus, currentUser) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    // Security check
    if (currentUser && currentUser.role !== 'Super_Admin') {
        if (user.role !== 'Customer' && user.role !== 'Owner') {
            const authorizedUserIds = await getAuthorizedStaffUserIds(currentUser, user.role);
            if (authorizedUserIds === null || !authorizedUserIds.includes(user._id.toString())) {
                throw new Error('Not authorized to update status for this staff member');
            }
        }
    }

    const targetKycStatus = kycStatus || user.kycStatus;
    if (accountStatus && accountStatus !== user.accountStatus && targetKycStatus !== 'Verified') {
        throw new Error('Cannot update account status for unverified profiles. Please verify KYC first.');
    }

    const updateData = {};
    if (accountStatus) updateData.accountStatus = accountStatus;
    if (kycStatus) updateData.kycStatus = kycStatus;
    
    await userRepository.updateById(userId, updateData);
    
    return { message: 'User status updated successfully' };
};

export const getRestrictedAccounts = async (currentUser) => {
    const restricted = await userRepository.findByAccountStatusIn(['Suspended']);
    
    if (currentUser.role === 'Super_Admin') {
        return restricted;
    }

    // Filter restricted accounts for other admins
    // They can see all Customers and Owners, but only their authorized subordinate staff
    
    let targetStaffRole = null;
    if (currentUser.role === 'Zonal_Admin') targetStaffRole = 'Admin';
    if (currentUser.role === 'Admin') targetStaffRole = 'Sub_Admin';
    if (currentUser.role === 'Sub_Admin') targetStaffRole = 'Worker';

    let authorizedStaffIds = [];
    if (targetStaffRole) {
        authorizedStaffIds = await getAuthorizedStaffUserIds(currentUser, targetStaffRole);
    }

    return restricted.filter(user => {
        if (user.role === 'Customer' || user.role === 'Owner') return true;
        if (user.role === targetStaffRole) return authorizedStaffIds.includes(user._id.toString());
        return false;
    });
};
