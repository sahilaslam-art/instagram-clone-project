import * as userRepository from '../repositories/user.repository.js';
import * as projectRepository from '../repositories/project.repository.js';
import * as investmentRepository from '../repositories/investment.repository.js';
import * as walletRepository from '../repositories/wallet.repository.js';
import * as notificationRepository from '../repositories/notification.repository.js';
import * as kycRepository from '../repositories/kyc.repository.js';
import * as supportRepository from '../repositories/support.repository.js';
import * as profileUpdateRepository from '../repositories/profile-update-request.repository.js';

export const getCustomerDashboard = async (userId) => {
    const user = await userRepository.findById(userId);
    user.password = undefined;
    
    const wallet = await walletRepository.findWalletByUser(userId);
    
    const liveInvestments = await investmentRepository.findAllByCustomer(userId, 'Active');
    const finishedInvestments = await investmentRepository.findAllByCustomer(userId, 'Completed');
    
    // Notifications need a method for unread. Let's just filter here for simplicity or we can add a method.
    const allNotifications = await notificationRepository.findByUser(userId);
    const notifications = allNotifications.filter(n => !n.isRead).slice(0, 5);

    return {
        user,
        walletSummary: wallet,
        liveInvestmentsSummary: liveInvestments.length,
        finishedInvestmentsSummary: finishedInvestments.length,
        recentNotifications: notifications
    };
};

export const getOwnerDashboard = async (userId) => {
    const user = await userRepository.findById(userId);
    user.password = undefined;
    
    const wallet = await walletRepository.findWalletByUser(userId);
    
    const projects = await projectRepository.findAllByOwner(userId);
    const totalProjects = projects.length;
    const liveProjects = projects.filter(p => p.projectStatus === 'Live').length;
    
    const allNotifications = await notificationRepository.findByUser(userId);
    const notifications = allNotifications.filter(n => !n.isRead).slice(0, 5);

    return {
        user,
        walletSummary: wallet,
        projectSummary: {
            totalProjects,
            liveProjects
        },
        recentNotifications: notifications
    };
};

import * as userService from './user.service.js';

export const getAdminDashboard = async (currentUser) => {
    const totalCustomers = await userRepository.countByRole('Customer');
    const totalOwners = await userRepository.countByRole('Owner');
    
    let totalUsers = totalCustomers + totalOwners;
    let staffVerification = 0;

    if (currentUser.role === 'Super_Admin') {
        totalUsers = await userRepository.countAll();
        staffVerification = await kycRepository.countPendingByRoles(['Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker']);
    } else {
        // Find geographic boundaries
        let profileQuery = {};
        const ZonalAdminProfile = (await import('../models/zonal-admin.model.js')).ZonalAdminProfile;
        const AdminProfile = (await import('../models/admin.model.js')).AdminProfile;
        const SubAdminProfile = (await import('../models/sub-admin.model.js')).SubAdminProfile;
        const WorkerProfile = (await import('../models/worker.model.js')).WorkerProfile;

        if (currentUser.role === 'Zonal_Admin') {
            const profile = await ZonalAdminProfile.findOne({ userId: currentUser._id });
            if (profile) profileQuery = { domain: profile.domain, zone: profile.zone };
        } else if (currentUser.role === 'Admin') {
            const profile = await AdminProfile.findOne({ userId: currentUser._id });
            if (profile) profileQuery = { domain: profile.domain, zone: profile.zone, region: profile.region };
        } else if (currentUser.role === 'Sub_Admin') {
            const profile = await SubAdminProfile.findOne({ userId: currentUser._id });
            if (profile) profileQuery = { domain: profile.domain, zone: profile.zone, region: profile.region, category: profile.category };
        }

        // Fast counts using Profile models directly
        if (currentUser.role === 'Zonal_Admin') {
            totalUsers += await AdminProfile.countDocuments(profileQuery);
            totalUsers += await SubAdminProfile.countDocuments(profileQuery);
            totalUsers += await WorkerProfile.countDocuments(profileQuery);
        } else if (currentUser.role === 'Admin') {
            totalUsers += await SubAdminProfile.countDocuments(profileQuery);
            totalUsers += await WorkerProfile.countDocuments(profileQuery);
        } else if (currentUser.role === 'Sub_Admin') {
            totalUsers += await WorkerProfile.countDocuments(profileQuery);
        }
        totalUsers += 1; // For currentUser themselves

        // Determine the target subordinate roles for KYC counting
        let targetStaffRoles = [];
        if (currentUser.role === 'Zonal_Admin') targetStaffRoles = ['Admin', 'Sub_Admin', 'Worker'];
        if (currentUser.role === 'Admin') targetStaffRoles = ['Sub_Admin', 'Worker'];
        if (currentUser.role === 'Sub_Admin') targetStaffRoles = ['Worker'];

        let authorizedStaffIds = [];
        for (const role of targetStaffRoles) {
            const ids = await userService.getAuthorizedStaffUserIds(currentUser, role);
            if (ids) {
                authorizedStaffIds.push(...ids);
            }
        }

        if (authorizedStaffIds.length > 0) {
            // Count pending KYC only for authorized staff IDs
            const mongoose = (await import('mongoose')).default;
            const KycModel = mongoose.model('KYCVerification');
            staffVerification = await KycModel.countDocuments({
                verificationStatus: 'Pending',
                userId: { $in: authorizedStaffIds }
            });
        }
    }
    
    const customerOwnerVerification = await kycRepository.countPendingByRoles(['Customer', 'Owner']);
    const profileUpdates = await profileUpdateRepository.countPending();
    const projectsVerification = await projectRepository.countPending();
    const withdrawals = await walletRepository.countPendingWithdrawals();
    const supportTickets = await supportRepository.countAll('Open');

    return {
        userStats: { totalUsers, totalCustomers, totalOwners },
        pendingApprovals: {
            staff: staffVerification,
            customersAndOwners: customerOwnerVerification,
            profileUpdates,
            projects: projectsVerification,
            withdrawals
        },
        openSupportTickets: supportTickets
    };
};
