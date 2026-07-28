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
        kycRecord = await kycRepository.updateById(existingKyc._id, updateData);
    } else {
        // Create new KYC
        kycRecord = await kycRepository.create({
            userId,
            userRole,
            fullName,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            address,
            bankInfo,
            documents,
            verificationStatus: 'Pending'
        });
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
