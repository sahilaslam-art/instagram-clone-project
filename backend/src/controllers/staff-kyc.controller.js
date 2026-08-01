import * as staffKycService from '../services/staff-kyc.service.js';
import { sendResponse } from '../utils/response.util.js';

export const getPendingStaffKyc = async (req, res, next) => {
    try {
        const pendingKyc = await staffKycService.getPendingStaffKyc(req.user.id, req.user.role);
        return sendResponse(res, 200, true, 'Pending Staff KYC Records Retrieved', pendingKyc);
    } catch (error) {
        next(error);
    }
};

export const reviewStaffKyc = async (req, res, next) => {
    try {
        const seniorAdminId = req.user.id;
        const seniorRole = req.user.role;
        const kycId = req.params.kycId;
        const { status, rejectionReason } = req.body;
        
        const kycRecord = await staffKycService.reviewStaffKyc(kycId, seniorAdminId, seniorRole, status, rejectionReason);
        
        return sendResponse(res, 200, true, 'Staff KYC Verification Status Updated', kycRecord);
    } catch (error) {
        if (error.message === 'KYC Record not found' || error.message === 'Rejection reason is required') {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};
