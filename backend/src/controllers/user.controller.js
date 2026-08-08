import * as userService from '../services/user.service.js';
import { sendResponse } from '../utils/response.util.js';

export const getProfile = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const profile = await userService.getProfile(userId);
        return sendResponse(res, 200, true, 'Profile Retrieved Successfully', profile);
    } catch (error) {
        if (error.message === 'User not found') {
            return sendResponse(res, 404, false, error.message);
        }
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const profile = await userService.updateProfile(userId, req.body);
        return sendResponse(res, 200, true, 'Profile Updated Successfully', profile);
    } catch (error) {
        if (error.message === 'User not found') {
            return sendResponse(res, 404, false, error.message);
        }
        next(error);
    }
};

export const createProfileUpdateRequest = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const result = await userService.createProfileUpdateRequest(userId, req.body);
        return sendResponse(res, 200, true, 'Profile Update Request Submitted', result);
    } catch (error) {
        next(error);
    }
};

export const getAllCustomers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        
        const queryFilters = {
            search: req.query.search,
            accountStatus: req.query.accountStatus
        };

        const result = await userService.getAllCustomers(page, limit, queryFilters);
        return sendResponse(res, 200, true, 'Customers Retrieved Successfully', result);
    } catch (error) {
        next(error);
    }
};

export const getAllOwners = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        
        const queryFilters = {
            search: req.query.search,
            accountStatus: req.query.accountStatus
        };

        const result = await userService.getAllOwners(page, limit, queryFilters);
        return sendResponse(res, 200, true, 'Owners Retrieved Successfully', result);
    } catch (error) {
        next(error);
    }
};

export const getAllSubAdmins = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const result = await userService.getAllSubAdmins(page, limit);
        return sendResponse(res, 200, true, 'Sub-Admins Retrieved Successfully', result);
    } catch (error) {
        next(error);
    }
};

export const getStaffListByRole = async (req, res, next) => {
    try {
        const role = req.params.role;
        // capitalize correctly (e.g. zonal_admin -> Zonal_Admin)
        const formattedRole = role
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('_');
            
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        
        const queryFilters = {
            domain: req.query.domain,
            zone: req.query.zone,
            region: req.query.region,
            category: req.query.category,
            speciality: req.query.speciality,
            search: req.query.search,
            accountStatus: req.query.accountStatus
        };

        const result = await userService.getStaffByRole(formattedRole, req.user, page, limit, queryFilters);
        return sendResponse(res, 200, true, `${formattedRole} Retrieved Successfully`, result);
    } catch (error) {
        next(error);
    }
};

export const getStaffDetails = async (req, res, next) => {
    try {
        const details = await userService.getStaffDetails(req.params.userId, req.user);
        return sendResponse(res, 200, true, 'Staff Details Retrieved Successfully', details);
    } catch (error) {
        next(error);
    }
};

export const getPendingProfileUpdates = async (req, res, next) => {
    try {
        const requests = await userService.getPendingProfileUpdates();
        return sendResponse(res, 200, true, 'Pending Profile Updates Retrieved', requests);
    } catch (error) {
        next(error);
    }
};

export const reviewProfileUpdate = async (req, res, next) => {
    try {
        const requestId = req.params.id;
        const { status, rejectionReason } = req.body;
        const result = await userService.reviewProfileUpdate(requestId, status, rejectionReason);
        return sendResponse(res, 200, true, result.message, result);
    } catch (error) {
        if (error.message === 'Profile update request not found' || error.message === 'Request is already processed') {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};

export const updateUserStatus = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const { accountStatus, kycStatus } = req.body;
        const result = await userService.updateUserStatus(userId, accountStatus, kycStatus, req.user);
        return sendResponse(res, 200, true, result.message, result);
    } catch (error) {
        if (error.message === 'User not found') {
            return sendResponse(res, 404, false, error.message);
        }
        next(error);
    }
};

export const getRestrictedAccounts = async (req, res, next) => {
    try {
        const restricted = await userService.getRestrictedAccounts(req.user);
        return sendResponse(res, 200, true, 'Restricted Accounts Retrieved Successfully', restricted);
    } catch (error) {
        next(error);
    }
};
