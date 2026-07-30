import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRole } from '../middlewares/role.middleware.js';
import * as hierarchyController from '../controllers/hierarchy.controller.js';

const router = express.Router();

// Get Pending Users (for superiors to see who needs approval)
router.get('/pending/zonal-admins', authenticate, authorizeRole(['Super_Admin']), hierarchyController.getPendingZonalAdmins);
router.get('/pending/admins', authenticate, authorizeRole(['Zonal_Admin']), hierarchyController.getPendingAdmins);
router.get('/pending/sub-admins', authenticate, authorizeRole(['Admin']), hierarchyController.getPendingSubAdmins);
router.get('/pending/workers', authenticate, authorizeRole(['Sub_Admin']), hierarchyController.getPendingWorkers);

// Approve Users
router.post('/approve/zonal-admin/:id', authenticate, authorizeRole(['Super_Admin']), hierarchyController.approveZonalAdmin);
router.post('/approve/admin/:id', authenticate, authorizeRole(['Zonal_Admin']), hierarchyController.approveAdmin);
router.post('/approve/sub-admin/:id', authenticate, authorizeRole(['Admin']), hierarchyController.approveSubAdmin);
router.post('/approve/worker/:id', authenticate, authorizeRole(['Sub_Admin']), hierarchyController.approveWorker);

export default router;
