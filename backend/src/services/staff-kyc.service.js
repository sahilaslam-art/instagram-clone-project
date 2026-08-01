import * as staffKycRepo from '../repositories/staff-kyc.repository.js';
import * as hierarchyController from '../controllers/hierarchy.controller.js'; // to reuse the flag setting logic later if needed
// Actually we can just update the flags directly in the profiles here

import { ZonalAdminProfile } from '../models/zonal-admin.model.js';
import { AdminProfile } from '../models/admin.model.js';
import { SubAdminProfile } from '../models/sub-admin.model.js';
import { WorkerProfile } from '../models/worker.model.js';
import * as kycService from './kyc.service.js';

export const getPendingStaffKyc = async (userId, userRole) => {
    switch (userRole) {
        case 'Super_Admin':
            return await staffKycRepo.findPendingZonalAdmins();
        case 'Zonal_Admin':
            return await staffKycRepo.findPendingAdmins(userId);
        case 'Admin':
            return await staffKycRepo.findPendingSubAdmins(userId);
        case 'Sub_Admin':
            return await staffKycRepo.findPendingWorkers(userId);
        default:
            return [];
    }
};

export const reviewStaffKyc = async (kycId, seniorAdminId, seniorRole, status, rejectionReason) => {
    // 1. Call the base KYC service to update the KYC model and User model
    const updatedKyc = await kycService.reviewKyc(kycId, seniorAdminId, status, rejectionReason);

    // 2. If approved, we must ALSO update the specific Profile to mark them as verified by their superior
    if (status === 'Verified') {
        const targetRole = updatedKyc.userRole;
        const targetUserId = updatedKyc.userId;

        switch (targetRole) {
            case 'Zonal_Admin':
                await ZonalAdminProfile.findOneAndUpdate(
                    { userId: targetUserId }, 
                    { isVerifiedBySuperAdmin: true, assignedSuperAdminId: seniorAdminId }
                );
                break;
            case 'Admin':
                await AdminProfile.findOneAndUpdate(
                    { userId: targetUserId }, 
                    { isVerifiedByZonalAdmin: true, assignedZonalAdminId: seniorAdminId }
                );
                break;
            case 'Sub_Admin':
                await SubAdminProfile.findOneAndUpdate(
                    { userId: targetUserId }, 
                    { isVerifiedByAdmin: true, assignedAdminId: seniorAdminId }
                );
                break;
            case 'Worker':
                await WorkerProfile.findOneAndUpdate(
                    { userId: targetUserId }, 
                    { isVerifiedBySubAdmin: true, assignedSubAdminId: seniorAdminId }
                );
                break;
        }
    }

    return updatedKyc;
};
