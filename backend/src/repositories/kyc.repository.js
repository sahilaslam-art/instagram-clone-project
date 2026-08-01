import { KYCVerification } from '../models/kyc-verification.model.js';

export const findByUser = async (userId) => {
    return await KYCVerification.findOne({ userId });
};

export const findById = async (id) => {
    return await KYCVerification.findById(id).populate('userId', 'fullName email role');
};

export const findAllPending = async () => {
    return await KYCVerification.find({ verificationStatus: 'Pending', userRole: { $in: ['Customer', 'Owner'] } }).populate('userId', 'fullName email role').sort('createdAt');
};

export const countPendingByRoles = async (roles) => {
    return await KYCVerification.countDocuments({ verificationStatus: 'Pending', userRole: { $in: roles } });
};


export const create = async (kycData) => {
    const kyc = new KYCVerification(kycData);
    return await kyc.save();
};

export const updateById = async (id, updateData) => {
    return await KYCVerification.findByIdAndUpdate(id, updateData, { new: true });
};
