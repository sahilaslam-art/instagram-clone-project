import * as kycRepository from '../repositories/kyc.repository.js';
import * as userRepository from '../repositories/user.repository.js';

export const submitKyc = async (userId, userRole, kycData) => {
    // Check if KYC already exists
    const existingKyc = await kycRepository.findByUser(userId);
    
    if (existingKyc && (existingKyc.verificationStatus === 'Pending' || existingKyc.verificationStatus === 'Verified')) {
        throw new Error('KYC already submitted or verified');
    }

    const { fullName, dateOfBirth, gender, address, bankInfo, documents } = kycData;

    let kycRecord;
    if (existingKyc) {
        // Update existing rejected/incomplete KYC
        const updateData = {
            fullName,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            address,
            bankInfo,
            documents,
            verificationStatus: 'Pending',
            submittedDate: new Date(),
            rejectionReason: null
        };
        
        if (userRole === 'Feature_Admin') {
            updateData.subAdminDecision = 'Pending';
        }
        kycRecord = await kycRepository.updateById(existingKyc._id, updateData);
    } else {
        // Create new KYC
        const payload = {
            userId,
            userRole,
            fullName,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            address,
            bankInfo,
            documents,
            verificationStatus: 'Pending'
        };
        
        if (userRole === 'Feature_Admin') {
            payload.subAdminDecision = 'Pending';
        }

        kycRecord = await kycRepository.create(payload);
    }

    // Update User model kycStatus
    await userRepository.updateById(userId, { kycStatus: 'Pending' });

    return kycRecord;
};

export const getKycStatus = async (userId) => {
    const kyc = await kycRepository.findByUser(userId);
    if (!kyc) {
        return null;
    }
    return kyc;
};

export const getAllPendingKyc = async () => {
    return await kycRepository.findAllPending();
};

export const reviewKyc = async (kycId, adminId, status, rejectionReason) => {
    const kyc = await kycRepository.findById(kycId);
    if (!kyc) {
        throw new Error('KYC Record not found');
    }

    if (status === 'Rejected' && !rejectionReason) {
        throw new Error('Rejection reason is required');
    }

    const updatePayload = {
        verificationStatus: status,
        reviewedBy: adminId,
        reviewedDate: new Date()
    };

    if (status === 'Rejected') {
        updatePayload.rejectionReason = rejectionReason;
    }

    const updatedKyc = await kycRepository.updateById(kycId, updatePayload);

    // Sync with User model
    const userUpdatePayload = { kycStatus: status };
    
    // Update user's profile with KYC info if verified
    // Update user's profile with KYC info if verified
    if (status === 'Verified') {
        userUpdatePayload.dateOfBirth = updatedKyc.dateOfBirth;
        userUpdatePayload.gender = updatedKyc.gender;
        userUpdatePayload.address = updatedKyc.address;
        userUpdatePayload.bankInfo = updatedKyc.bankInfo;
        userUpdatePayload.isProfileComplete = true;
    }
    
    await userRepository.updateById(updatedKyc.userId, userUpdatePayload);

    return updatedKyc;
};

export const getPendingFeatureAdmins = async (role) => {
    if (role === 'Sub_Admin') {
        return await kycRepository.findAllFeatureAdminsPendingSubAdmin();
    } else if (role === 'Super_Admin') {
        return await kycRepository.findAllFeatureAdminsForSuperAdmin();
    }
    throw new Error('Unauthorized');
};

export const reviewFeatureAdmin = async (kycId, adminId, adminRole, status, rejectionReason) => {
    const kyc = await kycRepository.findById(kycId);
    if (!kyc) {
        throw new Error('KYC Record not found');
    }

    if (kyc.userRole !== 'Feature_Admin') {
        throw new Error('This record is not a Feature Admin request');
    }

    const updatePayload = {};
    const userUpdatePayload = {};

    if (adminRole === 'Sub_Admin') {
        updatePayload.subAdminDecision = status;
        updatePayload.subAdminReviewedBy = adminId;
        updatePayload.subAdminReviewedDate = new Date();
    } else if (adminRole === 'Super_Admin') {
        updatePayload.verificationStatus = status;
        updatePayload.reviewedBy = adminId;
        updatePayload.reviewedDate = new Date();
        
        userUpdatePayload.kycStatus = status;
        
        if (status === 'Verified') {
            userUpdatePayload.featureRole = kyc.appliedFeatureRole;
            userUpdatePayload.dateOfBirth = kyc.dateOfBirth;
            userUpdatePayload.gender = kyc.gender;
            userUpdatePayload.address = kyc.address;
            userUpdatePayload.bankInfo = kyc.bankInfo;
            userUpdatePayload.isProfileComplete = true;
        } else if (status === 'Rejected') {
            updatePayload.rejectionReason = rejectionReason;
        }
    } else {
        throw new Error('Unauthorized');
    }

    const updatedKyc = await kycRepository.updateById(kycId, updatePayload);
    
    if (Object.keys(userUpdatePayload).length > 0) {
        await userRepository.updateById(updatedKyc.userId, userUpdatePayload);
    }

    return updatedKyc;
};
