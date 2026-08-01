import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRole, authorizeFeature } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';

import * as dashboardController from '../controllers/dashboard.controller.js';
import * as projectController from '../controllers/project.controller.js';
import * as kycController from '../controllers/kyc.controller.js';
import * as supportController from '../controllers/support.controller.js';
import * as userController from '../controllers/user.controller.js';
import * as walletController from '../controllers/wallet.controller.js';

import { reviewProjectSchema } from '../validators/project.validator.js';
import { updateKycStatusSchema, submitKycSchema } from '../validators/kyc.validator.js';
import { respondTicketSchema } from '../validators/support.validator.js';

const router = express.Router();

import * as staffKycController from '../controllers/staff-kyc.controller.js';

// --- Base Admin Routes (Super & Sub Admins Only) ---
// We explicitly use authorizeRole for endpoints that shouldn't be accessible by feature-specific admins
const adminOnly = [authenticate, authorizeRole('Super_Admin', 'Sub_Admin')];

// Dashboard
router.get('/dashboard', adminOnly, dashboardController.getAdminDashboard);

// Restricted Accounts (All Admins)
const restrictedAccountsAuth = [authenticate, authorizeRole('Super_Admin', 'Zonal_Admin', 'Admin', 'Sub_Admin')];
router.get('/restricted-accounts', restrictedAccountsAuth, userController.getRestrictedAccounts);

// Sub-Admin Management (Super_Admin ONLY)
// Uses existing authorizeRole logic but requires authenticate
router.get('/sub-admins', authenticate, authorizeRole('Super_Admin'), userController.getAllSubAdmins);

// Hierarchy Staff Management (All Admins can access their subordinates)
const staffManagementAuth = [authenticate, authorizeRole('Super_Admin', 'Zonal_Admin', 'Admin', 'Sub_Admin')];
router.get('/staff-list/:role', staffManagementAuth, userController.getStaffListByRole);
router.get('/staff-details/:userId', staffManagementAuth, userController.getStaffDetails);

// Admin KYC Submission (All Admins)
router.post('/kyc/submit', authenticate, validate(submitKycSchema), kycController.submitKyc);

// Staff Verification (Super_Admin, Zonal_Admin, Admin, Sub_Admin)
const staffKycAuth = [authenticate, authorizeRole('Super_Admin', 'Zonal_Admin', 'Admin', 'Sub_Admin')];
router.get('/staff-verification/pending', staffKycAuth, staffKycController.getPendingStaffKyc);
router.put('/staff-verification/:kycId/review', staffKycAuth, validate(updateKycStatusSchema), staffKycController.reviewStaffKyc);

// --- Feature Admin Routes (Role-based access) ---

// KYC / Profile Admin Features
const customerKycAuth = [authenticate, authorizeRole('Super_Admin', 'Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker')];
const ownerKycAuth = [authenticate, authorizeRole('Super_Admin', 'Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker')];
const bothKycAuth = [authenticate, authorizeRole('Super_Admin', 'Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker')];

router.get('/customers', customerKycAuth, userController.getAllCustomers);
router.get('/owners', ownerKycAuth, userController.getAllOwners);
router.put('/users/:userId/status', bothKycAuth, userController.updateUserStatus);
router.get('/profile-updates', bothKycAuth, userController.getPendingProfileUpdates);
router.put('/profile-updates/:id/review', bothKycAuth, userController.reviewProfileUpdate);
router.get('/kyc/pending', bothKycAuth, kycController.getAllPendingKyc);
router.put('/kyc/:kycId/verify', bothKycAuth, validate(updateKycStatusSchema), kycController.reviewKyc);

// Project Admin Features
const projectAdminAuth = [authenticate, authorizeRole('Super_Admin', 'Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker')];
router.get('/projects/pending', projectAdminAuth, projectController.getPendingProjects);
router.get('/projects/active', projectAdminAuth, projectController.getActiveProjects);
router.put('/projects/:projectId/review', projectAdminAuth, validate(reviewProjectSchema), projectController.reviewProject);

// Finance Admin Features
const financeAdminAuth = [authenticate, authorizeRole('Super_Admin', 'Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker')];
router.get('/withdrawals/pending', financeAdminAuth, walletController.getPendingWithdrawals);
router.put('/withdrawals/:transactionId/process', financeAdminAuth, walletController.processWithdrawal);

// Support Admin Features
const supportAdminAuth = [authenticate, authorizeRole('Super_Admin', 'Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker')];
router.get('/support', supportAdminAuth, supportController.getAllTickets);
router.put('/support/:ticketId', supportAdminAuth, validate(respondTicketSchema), supportController.respondToTicket);

export default router;
