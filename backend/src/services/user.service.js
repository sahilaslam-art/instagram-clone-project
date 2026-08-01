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

export const getAllCustomers = async () => {
    return await userRepository.findAllByRole('Customer');
};

export const getAllOwners = async () => {
    return await userRepository.findAllByRole('Owner');
};

export const getAllSubAdmins = async () => {
    return await userRepository.findAllByRole('Sub_Admin');
};

export const getStaffByRole = async (role) => {
    // role is one of: Zonal_Admin, Admin, Sub_Admin, Worker
    const users = await userRepository.findAllByRole(role);
    
    // Attach profile mappings
    let profiles = [];
    if (role === 'Zonal_Admin') profiles = await ZonalAdminProfile.find();
    else if (role === 'Admin') profiles = await AdminProfile.find();
    else if (role === 'Sub_Admin') profiles = await SubAdminProfile.find();
    else if (role === 'Worker') profiles = await WorkerProfile.find();

    return users.map(user => {
        const u = user.toObject();
        const profile = profiles.find(p => p.userId.toString() === u._id.toString());
        if (profile) {
            u.domain = profile.domain;
            u.zone = profile.zone;
            u.region = profile.region;
            u.category = profile.category;
            u.speciality = profile.speciality;
        }
        return u;
    });
};

export const getStaffDetails = async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error('User not found');

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

export const updateUserStatus = async (userId, accountStatus, kycStatus) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    const updateData = {};
    if (accountStatus) updateData.accountStatus = accountStatus;
    if (kycStatus) updateData.kycStatus = kycStatus;
    
    await userRepository.updateById(userId, updateData);
    
    return { message: 'User status updated successfully' };
};
