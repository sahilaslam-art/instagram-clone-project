import * as authService from '../services/auth.service.js';
import { sendResponse } from '../utils/response.util.js';

export const register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        return sendResponse(res, 201, true, 'Account Created Successfully', user);
    } catch (error) {
        if (error.message === 'Email Already Exists' || error.message === 'Mobile Number Already Exists') {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;
        const result = await authService.loginUser(identifier, password);
        return sendResponse(res, 200, true, 'Login Successful', result);
    } catch (error) {
        if (error.message === 'Invalid Credentials' || error.message === 'Account Inactive') {
            return sendResponse(res, 401, false, error.message);
        }
        next(error);
    }
};

export const refresh = async (req, res, next) => {
    try {
        const result = await authService.refreshToken(req.user.id);
        return sendResponse(res, 200, true, 'Token Refreshed Successfully', result);
    } catch (error) {
        if (error.message === 'Account Not Found' || error.message === 'Account Inactive') {
            return sendResponse(res, 401, false, error.message);
        }
        next(error);
    }
};

export const verifyMobile = async (req, res, next) => {
    try {
        const { identifier, otp } = req.body;
        await authService.verifyMobile(identifier, otp);
        return sendResponse(res, 200, true, 'Mobile Number Verified Successfully');
    } catch (error) {
        if (error.message === 'Invalid OTP' || error.message === 'Account Not Found') {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};

export const verifyEmail = async (req, res, next) => {
    try {
        const { identifier, otp } = req.body;
        await authService.verifyEmail(identifier, otp);
        return sendResponse(res, 200, true, 'Email Verified Successfully');
    } catch (error) {
        if (error.message === 'Invalid OTP' || error.message === 'Account Not Found') {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        // Token invalidation logic could go here if using redis
        return sendResponse(res, 200, true, 'Logout Successful');
    } catch (error) {
        next(error);
    }
};
