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
        // Determine the target subordinate role
        let targetStaffRole = null;
        if (currentUser.role === 'Zonal_Admin') targetStaffRole = 'Admin';
        if (currentUser.role === 'Admin') targetStaffRole = 'Sub_Admin';
        if (currentUser.role === 'Sub_Admin') targetStaffRole = 'Worker';

        let authorizedStaffIds = [];
        if (targetStaffRole) {
            const ids = await userService.getAuthorizedStaffUserIds(currentUser, targetStaffRole);
            if (ids) authorizedStaffIds = ids;
        }

        totalUsers += authorizedStaffIds.length + 1; // +1 for the currentUser themselves

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
