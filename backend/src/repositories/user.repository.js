import { User } from '../models/user.model.js';

export const findById = async (id) => {
    return await User.findById(id);
};

export const findByEmailOrMobile = async (email, mobileNumber) => {
    return await User.findOne({
        $or: [{ email }, { mobileNumber }]
    });
};

export const findByEmail = async (email) => {
    return await User.findOne({ email });
};

export const findByMobile = async (mobileNumber) => {
    return await User.findOne({ mobileNumber });
};

export const create = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export const updateById = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteById = async (id) => {
    return await User.findByIdAndDelete(id);
};

export const findAllByRole = async (role) => {
    return await User.find({ role }).select('-password');
};

export const countAll = async () => {
    return await User.countDocuments();
};

export const countByRole = async (role) => {
    return await User.countDocuments({ role });
};

export const updateAccountStatus = async (id, status) => {
    return await User.findByIdAndUpdate(id, { accountStatus: status }, { new: true }).select('-password');
};

export const findByAccountStatusIn = async (statuses) => {
    return await User.find({ accountStatus: { $in: statuses } }).select('-password').sort('-updatedAt');
};
