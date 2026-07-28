import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRole } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';

import * as dashboardController from '../controllers/dashboard.controller.js';
import * as projectController from '../controllers/project.controller.js';
import * as kycController from '../controllers/kyc.controller.js';
import * as supportController from '../controllers/support.controller.js';
import * as userController from '../controllers/user.controller.js';
import * as walletController from '../controllers/wallet.controller.js';

import { reviewProjectSchema } from '../validators/project.validator.js';
import { updateKycStatusSchema } from '../validators/kyc.validator.js';
import { respondTicketSchema } from '../validators/support.validator.js';

const router = express.Router();

// All admin routes require authentication and Admin role
router.use(authenticate, authorizeRole('Admin'));

// Dashboard
router.get('/dashboard', dashboardController.getAdminDashboard);

// Users
router.get('/customers', userController.getAllCustomers);
router.get('/owners', userController.getAllOwners);
router.put('/users/:userId/status', userController.updateUserStatus);

// Profile Updates
router.get('/profile-updates', userController.getPendingProfileUpdates);
router.put('/profile-updates/:id/review', userController.reviewProfileUpdate);

// KYC
router.get('/kyc/pending', kycController.getAllPendingKyc);
router.put('/kyc/:kycId/verify', validate(updateKycStatusSchema), kycController.reviewKyc);

// Projects
router.get('/projects/pending', projectController.getPendingProjects);
router.get('/projects/active', projectController.getActiveProjects);
router.put('/projects/:projectId/review', validate(reviewProjectSchema), projectController.reviewProject);

// Withdrawals (Missing APIs)
router.get('/withdrawals/pending', walletController.getPendingWithdrawals);
router.put('/withdrawals/:transactionId/process', walletController.processWithdrawal);

// Support
router.get('/support', supportController.getAllTickets);
router.put('/support/:ticketId', validate(respondTicketSchema), supportController.respondToTicket);

export default router;
