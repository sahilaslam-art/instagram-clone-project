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

// Feature Admin KYC Submission (Does not require feature authorization, just the role)
router.post('/feature-admin/kyc', authenticate, authorizeRole('Feature_Admin'), validate(submitKycSchema), kycController.submitKyc);

// --- Base Admin Routes (Super & Sub Admins Only) ---
// We explicitly use authorizeRole for endpoints that shouldn't be accessible by ANY Feature_Admin
const adminOnly = [authenticate, authorizeRole('Super_Admin', 'Sub_Admin')];

// Dashboard
router.get('/dashboard', adminOnly, dashboardController.getAdminDashboard);

// Sub-Admin Management (Super_Admin ONLY)
// Uses existing authorizeRole logic but requires authenticate
router.post('/sub-admins', authenticate, authorizeRole('Super_Admin'), userController.promoteToSubAdmin);
router.get('/sub-admins', authenticate, authorizeRole('Super_Admin'), userController.getAllSubAdmins);

// Feature Admin Requests
router.get('/feature-requests', adminOnly, kycController.getPendingFeatureAdmins);
router.put('/feature-requests/:requestId/review', adminOnly, kycController.reviewFeatureAdmin);

// --- Feature Admin Routes (Role-based access) ---

// KYC Admin Features
const kycAdminAuth = [authenticate, authorizeFeature('KYC Admin')];
router.get('/customers', kycAdminAuth, userController.getAllCustomers);
router.get('/owners', kycAdminAuth, userController.getAllOwners);
router.put('/users/:userId/status', kycAdminAuth, userController.updateUserStatus);
router.get('/profile-updates', kycAdminAuth, userController.getPendingProfileUpdates);
router.put('/profile-updates/:id/review', kycAdminAuth, userController.reviewProfileUpdate);
router.get('/kyc/pending', kycAdminAuth, kycController.getAllPendingKyc);
router.put('/kyc/:kycId/verify', kycAdminAuth, validate(updateKycStatusSchema), kycController.reviewKyc);

// Project Admin Features
const projectAdminAuth = [authenticate, authorizeFeature('Project Admin')];
router.get('/projects/pending', projectAdminAuth, projectController.getPendingProjects);
router.get('/projects/active', projectAdminAuth, projectController.getActiveProjects);
router.put('/projects/:projectId/review', projectAdminAuth, validate(reviewProjectSchema), projectController.reviewProject);

// Finance Admin Features
const financeAdminAuth = [authenticate, authorizeFeature('Finance Admin')];
router.get('/withdrawals/pending', financeAdminAuth, walletController.getPendingWithdrawals);
router.put('/withdrawals/:transactionId/process', financeAdminAuth, walletController.processWithdrawal);

// Support Admin Features
const supportAdminAuth = [authenticate, authorizeFeature('Support Admin')];
router.get('/support', supportAdminAuth, supportController.getAllTickets);
router.put('/support/:ticketId', supportAdminAuth, validate(respondTicketSchema), supportController.respondToTicket);

export default router;
