import * as supportService from '../services/support.service.js';
import { sendResponse } from '../utils/response.util.js';

export const createTicket = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const userRole = req.user.role;
        const ticket = await supportService.createTicket(userId, userRole, req.body);
        return sendResponse(res, 201, true, 'Ticket Created Successfully', ticket);
    } catch (error) {
        next(error);
    }
};

export const getMyTickets = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const tickets = await supportService.getMyTickets(userId);
        return sendResponse(res, 200, true, 'Tickets Retrieved', tickets);
    } catch (error) {
        next(error);
    }
};

export const getAllTickets = async (req, res, next) => {
    try {
        const tickets = await supportService.getAllTickets();
        return sendResponse(res, 200, true, 'All Tickets Retrieved', tickets);
    } catch (error) {
        next(error);
    }
};

export const respondToTicket = async (req, res, next) => {
    try {
        const adminId = req.user._id;
        const ticketId = req.params.ticketId;
        const ticket = await supportService.respondToTicket(ticketId, adminId, req.body);
        return sendResponse(res, 200, true, 'Ticket Response Added', ticket);
    } catch (error) {
        if (error.message === 'Ticket not found') {
            return sendResponse(res, 404, false, error.message);
        }
        next(error);
    }
};
