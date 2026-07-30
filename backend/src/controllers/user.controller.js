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
        const customers = await userService.getAllCustomers();
        return sendResponse(res, 200, true, 'Customers Retrieved Successfully', customers);
    } catch (error) {
        next(error);
    }
};

export const getAllOwners = async (req, res, next) => {
    try {
        const owners = await userService.getAllOwners();
        return sendResponse(res, 200, true, 'Owners Retrieved Successfully', owners);
    } catch (error) {
        next(error);
    }
};

export const getAllSubAdmins = async (req, res, next) => {
    try {
        const subAdmins = await userService.getAllSubAdmins();
        return sendResponse(res, 200, true, 'Sub-Admins Retrieved Successfully', subAdmins);
    } catch (error) {
        next(error);
    }
};

export const promoteToSubAdmin = async (req, res, next) => {
    try {
        const result = await userService.promoteToSubAdmin(req.body.userId);
        return sendResponse(res, 200, true, result.message);
    } catch (error) {
        if (error.message === 'User not found') {
            return sendResponse(res, 404, false, error.message);
        }
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
        const result = await userService.updateUserStatus(userId, accountStatus, kycStatus);
        return sendResponse(res, 200, true, result.message, result);
    } catch (error) {
        if (error.message === 'User not found') {
            return sendResponse(res, 404, false, error.message);
        }
        next(error);
    }
};
