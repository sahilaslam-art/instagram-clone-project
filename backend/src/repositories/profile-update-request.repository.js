import { ProfileUpdateRequest } from '../models/profile-update-request.model.js';

export const create = async (data) => {
    const request = new ProfileUpdateRequest(data);
    return await request.save();
};

export const findAllPending = async () => {
    return await ProfileUpdateRequest.find({ status: 'Pending' }).populate('ownerId', 'fullName email mobileNumber').sort('createdAt');
};

export const findById = async (id) => {
    return await ProfileUpdateRequest.findById(id).populate('ownerId');
};

export const updateStatus = async (id, status, rejectionReason) => {
    return await ProfileUpdateRequest.findByIdAndUpdate(id, { status, rejectionReason }, { new: true });
};
