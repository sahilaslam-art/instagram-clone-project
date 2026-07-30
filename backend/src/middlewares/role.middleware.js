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

export const authorizeFeature = (...requiredFeatureRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return sendResponse(res, 403, false, 'Forbidden Response: Role not found');
        }

        // Super_Admin and Sub_Admin can access all features
        if (['Super_Admin', 'Sub_Admin'].includes(req.user.role)) {
            return next();
        }

        // Feature_Admin must have one of the matching featureRoles
        if (req.user.role === 'Feature_Admin' && requiredFeatureRoles.includes(req.user.featureRole)) {
            return next();
        }

        return sendResponse(res, 403, false, 'Forbidden Response: Insufficient feature permissions');
    };
};
