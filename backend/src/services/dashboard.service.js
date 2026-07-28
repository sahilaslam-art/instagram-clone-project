import * as userRepository from '../repositories/user.repository.js';
import * as projectRepository from '../repositories/project.repository.js';
import * as investmentRepository from '../repositories/investment.repository.js';
import * as walletRepository from '../repositories/wallet.repository.js';
import * as notificationRepository from '../repositories/notification.repository.js';
import * as kycRepository from '../repositories/kyc.repository.js';
import * as supportRepository from '../repositories/support.repository.js';

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
    
    const pendingKYC = (await kycRepository.findAllPending()).length;
    const pendingProjects = (await projectRepository.findAllPending()).length;
    const openTickets = (await supportRepository.findAll('Open')).length;

    return {
        userStats: { totalUsers, totalCustomers, totalOwners },
        pendingApprovals: {
            kyc: pendingKYC,
            projects: pendingProjects
        },
        openSupportTickets: openTickets
    };
};
