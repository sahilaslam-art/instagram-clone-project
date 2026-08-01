import { KYCVerification } from '../models/kyc-verification.model.js';
import { ZonalAdminProfile } from '../models/zonal-admin.model.js';
import { AdminProfile } from '../models/admin.model.js';
import { SubAdminProfile } from '../models/sub-admin.model.js';
import { WorkerProfile } from '../models/worker.model.js';

export const findPendingZonalAdmins = async () => {
    return await KYCVerification.find({ verificationStatus: 'Pending', userRole: 'Zonal_Admin' }).populate('userId', 'fullName email mobileNumber role accountStatus kycStatus');
};

export const findPendingAdmins = async (zonalAdminUserId) => {
    const currentAdmin = await ZonalAdminProfile.findOne({ userId: zonalAdminUserId });
    if (!currentAdmin) return [];

    const adminsInZone = await AdminProfile.find({
        domain: currentAdmin.domain,
        zone: currentAdmin.zone
    }).select('userId');
    const adminUserIds = adminsInZone.map(a => a.userId);

    return await KYCVerification.find({ 
        verificationStatus: 'Pending', 
        userRole: 'Admin',
        userId: { $in: adminUserIds }
    }).populate('userId', 'fullName email mobileNumber role accountStatus kycStatus');
};

export const findPendingSubAdmins = async (adminUserId) => {
    const currentAdmin = await AdminProfile.findOne({ userId: adminUserId });
    if (!currentAdmin) return [];

    const subAdminsInRegion = await SubAdminProfile.find({
        domain: currentAdmin.domain,
        zone: currentAdmin.zone,
        region: currentAdmin.region
    }).select('userId');
    const subAdminUserIds = subAdminsInRegion.map(a => a.userId);

    return await KYCVerification.find({ 
        verificationStatus: 'Pending', 
        userRole: 'Sub_Admin',
        userId: { $in: subAdminUserIds }
    }).populate('userId', 'fullName email mobileNumber role accountStatus kycStatus');
};

export const findPendingWorkers = async (subAdminUserId) => {
    const currentAdmin = await SubAdminProfile.findOne({ userId: subAdminUserId });
    if (!currentAdmin) return [];

    const workersInCategory = await WorkerProfile.find({
        domain: currentAdmin.domain,
        zone: currentAdmin.zone,
        region: currentAdmin.region,
        category: currentAdmin.category
    }).select('userId');
    const workerUserIds = workersInCategory.map(w => w.userId);

    return await KYCVerification.find({ 
        verificationStatus: 'Pending', 
        userRole: 'Worker',
        userId: { $in: workerUserIds }
    }).populate('userId', 'fullName email mobileNumber role accountStatus kycStatus');
};
