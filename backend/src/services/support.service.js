import * as supportRepository from '../repositories/support.repository.js';

export const createTicket = async (userId, userRole, ticketData) => {
    return await supportRepository.create({
        userId,
        userRole,
        subject: ticketData.subject,
        category: ticketData.category,
        description: ticketData.description
    });
};

export const getMyTickets = async (userId) => {
    return await supportRepository.findByUser(userId);
};

export const getAllTickets = async () => {
    // Currently we just return all tickets. Could add filters later.
    return await supportRepository.findAll();
};

export const respondToTicket = async (ticketId, adminId, responseData) => {
    const ticket = await supportRepository.findById(ticketId);
    if (!ticket) {
        throw new Error('Ticket not found');
    }

    const updateData = {
        ticketStatus: responseData.ticketStatus,
        adminResponse: responseData.adminResponse,
        assignedAdminId: adminId
    };
    
    return await supportRepository.updateById(ticketId, updateData);
};
