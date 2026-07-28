import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRole } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';

import * as dashboardController from '../controllers/dashboard.controller.js';
import * as projectController from '../controllers/project.controller.js';
import * as investmentController from '../controllers/investment.controller.js';
import * as walletController from '../controllers/wallet.controller.js';
import * as userController from '../controllers/user.controller.js';
import * as kycController from '../controllers/kyc.controller.js';
import * as notificationController from '../controllers/notification.controller.js';
import * as supportController from '../controllers/support.controller.js';

import { investSchema } from '../validators/investment.validator.js';
import { amountSchema } from '../validators/wallet.validator.js';
import { updateProfileSchema } from '../validators/auth.validator.js';
import { submitKycSchema } from '../validators/kyc.validator.js';
import { createTicketSchema } from '../validators/support.validator.js';

const router = express.Router();

// All customer routes require authentication and Customer role
router.use(authenticate, authorizeRole('Customer'));

// Dashboard
router.get('/dashboard', dashboardController.getCustomerDashboard);

// Projects
router.get('/projects', projectController.getAvailableProjects);
router.get('/projects/:projectId', projectController.getProjectDetails);

// Cart (Missing APIs, linking to placeholders for now)
router.post('/cart', projectController.addToCart);
router.get('/cart', projectController.getCart);
router.delete('/cart/:projectId', projectController.removeFromCart);

// Investments
router.post('/investments', validate(investSchema), investmentController.invest);
router.get('/investments/live', investmentController.getLiveInvestments);
router.get('/investments/finished', investmentController.getFinishedInvestments);

// Wallet
router.get('/wallet', walletController.getWallet);
router.post('/wallet/add-funds', validate(amountSchema), walletController.addFunds);
router.post('/wallet/withdraw', validate(amountSchema), walletController.withdrawFunds);

// Profile & KYC
router.get('/profile', userController.getProfile);
router.put('/profile', validate(updateProfileSchema), userController.updateProfile);
router.post('/kyc', validate(submitKycSchema), kycController.submitKyc);

// Notifications & Support
router.get('/notifications', notificationController.getMyNotifications);
router.post('/support', validate(createTicketSchema), supportController.createTicket);
router.get('/support', supportController.getMyTickets);

export default router;
