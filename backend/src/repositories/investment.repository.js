import { Investment } from '../models/investment.model.js';

export const findById = async (id) => {
    return await Investment.findById(id).populate('projectId customerId');
};

export const findAllByCustomer = async (customerId, status) => {
    const query = { customerId };
    if (status) query.investmentStatus = status;
    return await Investment.find(query).populate('projectId', 'projectTitle expectedReturn').sort('-createdAt');
};

export const findAllByProject = async (projectId) => {
    return await Investment.find({ projectId }).populate('customerId', 'fullName email');
};

export const create = async (investmentData) => {
    const investment = new Investment(investmentData);
    return await investment.save();
};

export const updateById = async (id, updateData) => {
    return await Investment.findByIdAndUpdate(id, updateData, { new: true });
};

export const calculateTotalInvestedByCustomer = async (customerId) => {
    const result = await Investment.aggregate([
        { $match: { customerId: customerId, investmentStatus: 'Active' } },
        { $group: { _id: null, total: { $sum: '$investmentAmount' } } }
    ]);
    return result.length > 0 ? result[0].total : 0;
};
