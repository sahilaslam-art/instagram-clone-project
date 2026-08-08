import * as dashboardService from '../services/dashboard.service.js';
import { sendResponse } from '../utils/response.util.js';

export const getCustomerDashboard = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const data = await dashboardService.getCustomerDashboard(userId);
        return sendResponse(res, 200, true, 'Customer Dashboard Retrieved', data);
    } catch (error) {
        next(error);
    }
};

export const getOwnerDashboard = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const data = await dashboardService.getOwnerDashboard(userId);
        return sendResponse(res, 200, true, 'Owner Dashboard Retrieved', data);
    } catch (error) {
        next(error);
    }
};

export const getAdminDashboard = async (req, res, next) => {
    try {
        const data = await dashboardService.getAdminDashboard(req.user);
        return sendResponse(res, 200, true, 'Admin Dashboard Retrieved', data);
    } catch (error) {
        import('fs').then(fs => fs.writeFileSync('error_log.txt', error.stack || error.toString()));
        next(error);
    }
};
