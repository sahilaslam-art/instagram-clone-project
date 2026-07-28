import { sendResponse } from '../utils/response.util.js';

export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return sendResponse(res, 403, false, 'Forbidden Response: Role not found');
        }

        if (!allowedRoles.includes(req.user.role)) {
            return sendResponse(res, 403, false, 'Forbidden Response: Insufficient permissions');
        }

        next();
    };
};
