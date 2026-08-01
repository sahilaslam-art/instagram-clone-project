import * as kycService from '../services/kyc.service.js';
import { sendResponse } from '../utils/response.util.js';

export const submitKyc = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const userRole = req.user.role;
        const kycRecord = await kycService.submitKyc(userId, userRole, req.body);
        
        return sendResponse(res, 201, true, 'Verification Submitted Successfully', kycRecord);
    } catch (error) {
        if (error.message === 'KYC already submitted or verified') {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};

export const getMyKycStatus = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const kyc = await kycService.getKycStatus(userId);
        
        if (!kyc) {
            return sendResponse(res, 404, false, 'KYC Record Not Found');
        }
        
        return sendResponse(res, 200, true, 'KYC Status Retrieved Successfully', kyc);
    } catch (error) {
        next(error);
    }
};

export const getAllPendingKyc = async (req, res, next) => {
    try {
        const pendingKyc = await kycService.getAllPendingKyc();
        return sendResponse(res, 200, true, 'Pending KYC Records Retrieved', pendingKyc);
    } catch (error) {
        next(error);
    }
};

export const reviewKyc = async (req, res, next) => {
    try {
        const adminId = req.user._id;
        const kycId = req.params.kycId;
        const { status, rejectionReason } = req.body;
        
        const kycRecord = await kycService.reviewKyc(kycId, adminId, status, rejectionReason);
        
        return sendResponse(res, 200, true, 'KYC Verification Status Updated', kycRecord);
    } catch (error) {
        if (error.message === 'KYC Record not found' || error.message === 'Rejection reason is required') {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};

