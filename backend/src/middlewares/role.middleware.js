import { sendResponse } from '../utils/response.util.js';

export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return sendResponse(res, 403, false, 'Forbidden Response: Role not found');
        }

        const hierarchyAdmins = ['Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker'];

        if (hierarchyAdmins.includes(req.user.role) && req.user.kycStatus !== 'Verified') {
            return sendResponse(res, 403, false, 'Forbidden Response: Profile verification pending');
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

        const hierarchyAdmins = ['Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker'];

        if (hierarchyAdmins.includes(req.user.role) && req.user.kycStatus !== 'Verified') {
            return sendResponse(res, 403, false, 'Forbidden Response: Profile verification pending');
        }

        // Super_Admin can access all features
        if (['Super_Admin'].includes(req.user.role)) {
            return next();
        }

        // Feature-based admins must have one of the matching featureRoles
        if (hierarchyAdmins.includes(req.user.role) && requiredFeatureRoles.includes(req.user.featureRole)) {
            return next();
        }

        return sendResponse(res, 403, false, 'Forbidden Response: Insufficient feature permissions');
    };
};
