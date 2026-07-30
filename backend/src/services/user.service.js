import * as userRepository from '../repositories/user.repository.js';
import * as profileUpdateRequestRepository from '../repositories/profile-update-request.repository.js';

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

export const promoteToSubAdmin = async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    await userRepository.updateById(userId, { role: 'Sub_Admin' });
    return { message: 'User promoted to Sub-Admin successfully' };
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
