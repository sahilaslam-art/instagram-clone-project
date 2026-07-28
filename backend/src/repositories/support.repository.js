import { SupportTicket } from '../models/support-ticket.model.js';

export const findByUser = async (userId) => {
    return await SupportTicket.find({ userId }).sort('-createdAt');
};

export const findById = async (id) => {
    return await SupportTicket.findById(id).populate('userId', 'fullName email role');
};

export const findAll = async (status) => {
    const query = status ? { ticketStatus: status } : {};
    return await SupportTicket.find(query).populate('userId', 'fullName email role').sort('-createdAt');
};

export const create = async (ticketData) => {
    const ticket = new SupportTicket(ticketData);
    return await ticket.save();
};

export const updateById = async (id, updateData) => {
    return await SupportTicket.findByIdAndUpdate(id, updateData, { new: true });
};
