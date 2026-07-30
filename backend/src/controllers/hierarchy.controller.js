import { ZonalAdminProfile } from '../models/zonal-admin.model.js';
import { AdminProfile } from '../models/admin.model.js';
import { SubAdminProfile } from '../models/sub-admin.model.js';
import { WorkerProfile } from '../models/worker.model.js';
import { sendResponse } from '../utils/response.util.js';

export const getPendingZonalAdmins = async (req, res, next) => {
    try {
        const pending = await ZonalAdminProfile.find({ isVerifiedBySuperAdmin: false }).populate('userId', 'fullName email mobileNumber accountStatus');
        return sendResponse(res, 200, true, 'Pending Zonal Admins fetched', pending);
    } catch (error) { next(error); }
};

export const getPendingAdmins = async (req, res, next) => {
    try {
        // Find the current Zonal Admin's profile to get their domain/zone
        const currentAdmin = await ZonalAdminProfile.findOne({ userId: req.user.id });
        if (!currentAdmin) return sendResponse(res, 403, false, 'Profile not found');

        const pending = await AdminProfile.find({ 
            isVerifiedByZonalAdmin: false,
            domain: currentAdmin.domain,
            zone: currentAdmin.zone,
            featureRole: currentAdmin.featureRole
        }).populate('userId', 'fullName email mobileNumber accountStatus');
        
        return sendResponse(res, 200, true, 'Pending Admins fetched', pending);
    } catch (error) { next(error); }
};

export const getPendingSubAdmins = async (req, res, next) => {
    try {
        const currentAdmin = await AdminProfile.findOne({ userId: req.user.id });
        if (!currentAdmin) return sendResponse(res, 403, false, 'Profile not found');

        const pending = await SubAdminProfile.find({ 
            isVerifiedByAdmin: false,
            domain: currentAdmin.domain,
            zone: currentAdmin.zone,
            region: currentAdmin.region,
            featureRole: currentAdmin.featureRole
        }).populate('userId', 'fullName email mobileNumber accountStatus');
        
        return sendResponse(res, 200, true, 'Pending Sub-Admins fetched', pending);
    } catch (error) { next(error); }
};

export const getPendingWorkers = async (req, res, next) => {
    try {
        const currentAdmin = await SubAdminProfile.findOne({ userId: req.user.id });
        if (!currentAdmin) return sendResponse(res, 403, false, 'Profile not found');

        const pending = await WorkerProfile.find({ 
            isVerifiedBySubAdmin: false,
            domain: currentAdmin.domain,
            zone: currentAdmin.zone,
            region: currentAdmin.region,
            category: currentAdmin.category,
            featureRole: currentAdmin.featureRole
        }).populate('userId', 'fullName email mobileNumber accountStatus');
        
        return sendResponse(res, 200, true, 'Pending Workers fetched', pending);
    } catch (error) { next(error); }
};

export const approveZonalAdmin = async (req, res, next) => {
    try {
        await ZonalAdminProfile.findByIdAndUpdate(req.params.id, {
            isVerifiedBySuperAdmin: true,
            assignedSuperAdminId: req.user.id
        });
        return sendResponse(res, 200, true, 'Zonal Admin approved');
    } catch (error) { next(error); }
};

export const approveAdmin = async (req, res, next) => {
    try {
        const adminProfile = await AdminProfile.findById(req.params.id);
        const currentZonalAdmin = await ZonalAdminProfile.findOne({ userId: req.user.id });
        
        if (adminProfile.domain !== currentZonalAdmin.domain || adminProfile.zone !== currentZonalAdmin.zone) {
            return sendResponse(res, 403, false, 'Cannot approve admin outside your zone');
        }

        await AdminProfile.findByIdAndUpdate(req.params.id, {
            isVerifiedByZonalAdmin: true,
            assignedZonalAdminId: req.user.id
        });
        return sendResponse(res, 200, true, 'Admin approved');
    } catch (error) { next(error); }
};

export const approveSubAdmin = async (req, res, next) => {
    try {
        const subAdminProfile = await SubAdminProfile.findById(req.params.id);
        const currentAdmin = await AdminProfile.findOne({ userId: req.user.id });
        
        if (subAdminProfile.region !== currentAdmin.region) {
            return sendResponse(res, 403, false, 'Cannot approve sub-admin outside your region');
        }

        await SubAdminProfile.findByIdAndUpdate(req.params.id, {
            isVerifiedByAdmin: true,
            assignedAdminId: req.user.id
        });
        return sendResponse(res, 200, true, 'Sub-Admin approved');
    } catch (error) { next(error); }
};

export const approveWorker = async (req, res, next) => {
    try {
        const workerProfile = await WorkerProfile.findById(req.params.id);
        const currentAdmin = await SubAdminProfile.findOne({ userId: req.user.id });
        
        if (workerProfile.category !== currentAdmin.category) {
            return sendResponse(res, 403, false, 'Cannot approve worker outside your category');
        }

        await WorkerProfile.findByIdAndUpdate(req.params.id, {
            isVerifiedBySubAdmin: true,
            assignedSubAdminId: req.user.id
        });
        return sendResponse(res, 200, true, 'Worker approved');
    } catch (error) { next(error); }
};
