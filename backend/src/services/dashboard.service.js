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

export const getAdminDashboard = async () => {
    const totalUsers = await userRepository.countAll();
    const totalCustomers = await userRepository.countByRole('Customer');
    const totalOwners = await userRepository.countByRole('Owner');
    
    const staffVerification = await kycRepository.countPendingByRoles(['Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker']);
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
