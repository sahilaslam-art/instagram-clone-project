import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRole } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';

import * as dashboardController from '../controllers/dashboard.controller.js';
import * as projectController from '../controllers/project.controller.js';
import * as walletController from '../controllers/wallet.controller.js';
import * as userController from '../controllers/user.controller.js';
import * as kycController from '../controllers/kyc.controller.js';
import * as notificationController from '../controllers/notification.controller.js';
import * as supportController from '../controllers/support.controller.js';

import { createProjectSchema, updateProjectSchema, createUpdateSchema } from '../validators/project.validator.js';
import { amountSchema } from '../validators/wallet.validator.js';
import { updateProfileSchema } from '../validators/auth.validator.js';
import { submitKycSchema } from '../validators/kyc.validator.js';
import { createTicketSchema } from '../validators/support.validator.js';

const router = express.Router();

// All owner routes require authentication and Owner role
router.use(authenticate, authorizeRole('Owner'));

// Dashboard
router.get('/dashboard', dashboardController.getOwnerDashboard);

// Projects
router.post('/projects', validate(createProjectSchema), projectController.createProject);
router.put('/projects/:projectId', validate(updateProjectSchema), projectController.updateProject);
router.post('/projects/:projectId/submit', projectController.submitProject);
router.get('/projects', projectController.getOwnerProjects);
router.post('/projects/:projectId/updates', validate(createUpdateSchema), projectController.addProjectUpdate);
router.get('/projects/:projectId/updates', projectController.getProjectUpdates);

// Investors (Missing API)
router.get('/projects/:projectId/investors', projectController.getProjectInvestors);

// Wallet
router.get('/wallet', walletController.getWallet);
router.post('/wallet/withdraw', validate(amountSchema), walletController.withdrawFunds);

// Profile & KYC
router.get('/profile', userController.getProfile);
router.put('/profile', validate(updateProfileSchema), userController.updateProfile);
router.post('/profile/update-request', userController.createProfileUpdateRequest);
router.post('/kyc', validate(submitKycSchema), kycController.submitKyc);

// Notifications & Support
router.get('/notifications', notificationController.getMyNotifications);
router.post('/support', validate(createTicketSchema), supportController.createTicket);
router.get('/support', supportController.getMyTickets);

export default router;
