import * as projectRepository from '../repositories/project.repository.js';
import * as userRepository from '../repositories/user.repository.js';
import * as notificationRepository from '../repositories/notification.repository.js';
import { ZonalAdminProfile } from '../models/zonal-admin.model.js';
import { AdminProfile } from '../models/admin.model.js';
import { SubAdminProfile } from '../models/sub-admin.model.js';
import { WorkerProfile } from '../models/worker.model.js';

// ---------------------------------------------------------------------------
// Internal Helper: Build geo-scoped MongoDB filter based on logged-in user
// Returns {} for Super_Admin (no restrictions), null if profile not found
// ---------------------------------------------------------------------------
export const buildGeoFilterForUser = async (currentUser) => {
    if (currentUser.role === 'Super_Admin') return {};

    if (currentUser.role === 'Zonal_Admin') {
        const p = await ZonalAdminProfile.findOne({ userId: currentUser._id });
        if (!p) return null;
        return { domain: p.domain, zone: p.zone };
    }
    if (currentUser.role === 'Admin') {
        const p = await AdminProfile.findOne({ userId: currentUser._id });
        if (!p) return null;
        return { domain: p.domain, zone: p.zone, region: p.region };
    }
    if (currentUser.role === 'Sub_Admin') {
        const p = await SubAdminProfile.findOne({ userId: currentUser._id });
        if (!p) return null;
        return { domain: p.domain, zone: p.zone, region: p.region, category: p.category };
    }
    if (currentUser.role === 'Worker') {
        const p = await WorkerProfile.findOne({ userId: currentUser._id });
        if (!p) return null;
        // Worker sees projects where their speciality is in requiredSpecialities
        return {
            domain: p.domain,
            zone: p.zone,
            region: p.region,
            category: p.category,
            requiredSpecialities: { $in: [p.speciality] }
        };
    }
    return null; // Unknown role — show nothing
};

// ---------------------------------------------------------------------------
// Internal Helper: Notify matching Zonal Admin when a project is submitted
// ---------------------------------------------------------------------------
const notifyZonalAdmin = async (project) => {
    const zonalProfile = await ZonalAdminProfile.findOne({
        domain: project.domain,
        zone: project.zone
    });
    if (!zonalProfile) return; // No Zonal Admin for this zone — skip

    await notificationRepository.create({
        userId: zonalProfile.userId,
        userRole: 'Zonal_Admin',
        notificationType: 'PROJECT_SUBMITTED',
        notificationTitle: 'New Project Submitted',
        notificationMessage: `A new project "${project.projectTitle}" has been submitted in your zone (${project.domain} > ${project.zone} > ${project.region}).`,
        referenceId: project._id
    });
};

// ---------------------------------------------------------------------------
// Internal Helper: Notify Owner when their project is reviewed
// ---------------------------------------------------------------------------
const notifyOwnerOfReview = async (project, status) => {
    const message = status === 'Rejected'
        ? `Your project "${project.projectTitle}" has been rejected. Please check the rejection reason and resubmit.`
        : `Your project "${project.projectTitle}" has been approved and moved to ${status} stage.`;

    await notificationRepository.create({
        userId: project.ownerId,
        userRole: 'Owner',
        notificationType: 'PROJECT_REVIEWED',
        notificationTitle: `Project ${status}`,
        notificationMessage: message,
        referenceId: project._id
    });
};

// ---------------------------------------------------------------------------
// CRUD
// ---------------------------------------------------------------------------

export const createProject = async (ownerId, projectData) => {
    return await projectRepository.create({
        ownerId,
        ...projectData,
        projectStatus: 'Created',
        projectVisibility: 'Draft'
    });
};

export const updateProject = async (ownerId, projectId, updateData) => {
    const project = await projectRepository.findByIdAndOwner(projectId, ownerId);
    if (!project) {
        throw new Error('Project not found');
    }

    if (project.projectStatus !== 'Created' && project.projectStatus !== 'Rejected') {
        throw new Error('Cannot update project in current status');
    }

    return await projectRepository.updateById(projectId, updateData);
};

export const submitProject = async (ownerId, projectId) => {
    const project = await projectRepository.findByIdAndOwner(projectId, ownerId);
    if (!project) {
        throw new Error('Project not found');
    }

    if (project.projectStatus !== 'Created' && project.projectStatus !== 'Rejected') {
        throw new Error('Cannot submit project in current status');
    }

    // Geo fields must be filled before submission
    if (!project.domain || !project.zone || !project.region || !project.category) {
        throw new Error('Please fill Domain, Zone, Region and Category before submitting');
    }

    // Notify the matching Zonal Admin
    await notifyZonalAdmin(project);

    return await projectRepository.updateById(projectId, {
        projectStatus: 'Submitted',
        projectVisibility: 'Submitted',
        submittedDate: new Date()
    });
};

export const getOwnerProjects = async (ownerId) => {
    return await projectRepository.findAllByOwner(ownerId);
};

export const getAvailableProjects = async (filters) => {
    // Public facing — no geo filter, only Stage/Live
    const stageProjects = await projectRepository.findAllByStatus('Stage', filters);
    const liveProjects = await projectRepository.findAllByStatus('Live', filters);
    return [...stageProjects, ...liveProjects];
};

export const getProjectDetails = async (projectId) => {
    const project = await projectRepository.findById(projectId);
    if (!project) {
        throw new Error('Project not found');
    }
    return project;
};

export const reviewProject = async (projectId, adminData, currentUser) => {
    const project = await projectRepository.findById(projectId);
    if (!project) {
        throw new Error('Project not found');
    }

    // Worker cannot review projects
    if (currentUser.role === 'Worker') {
        throw new Error('Not authorized to review projects');
    }

    // Verify admin has jurisdiction over this project
    if (currentUser.role !== 'Super_Admin') {
        const geoFilter = await buildGeoFilterForUser(currentUser);
        if (geoFilter === null) throw new Error('Admin profile not found');

        // Check each geo key of the admin against the project
        for (const [key, val] of Object.entries(geoFilter)) {
            if (project[key]?.toString() !== val?.toString()) {
                throw new Error('Not authorized to review this project — geographic mismatch');
            }
        }
    }

    const { status, adminRemarks, rejectionReason } = adminData;

    const updatePayload = {
        projectStatus: status,
        projectVisibility: status,
        adminRemarks: adminRemarks || null
    };

    if (status === 'Rejected') {
        if (!rejectionReason) throw new Error('Rejection reason is required');
        updatePayload.rejectionReason = rejectionReason;
    } else {
        updatePayload.rejectionReason = null;
        if (status === 'Stage') updatePayload.approvedDate = new Date();
        if (status === 'Live') updatePayload.liveDate = new Date();
    }

    const updated = await projectRepository.updateById(projectId, updatePayload);

    // Notify the Owner of the review result
    await notifyOwnerOfReview(project, status);

    return updated;
};

// ---------------------------------------------------------------------------
// Admin — Role-scoped project lists
// ---------------------------------------------------------------------------

export const getPendingProjects = async (currentUser) => {
    // Worker cannot see pending (submission review) projects
    if (currentUser.role === 'Worker') return [];

    const geoFilter = await buildGeoFilterForUser(currentUser);
    if (geoFilter === null) return [];

    return await projectRepository.findAllPending(geoFilter);
};

export const getActiveProjects = async (currentUser) => {
    const geoFilter = await buildGeoFilterForUser(currentUser);
    if (geoFilter === null) return [];

    return await projectRepository.findActive(geoFilter);
};

// ---------------------------------------------------------------------------
// Project Updates
// ---------------------------------------------------------------------------

export const addProjectUpdate = async (ownerId, projectId, updateData) => {
    const project = await projectRepository.findByIdAndOwner(projectId, ownerId);
    if (!project) {
        throw new Error('Project not found');
    }

    return await projectRepository.createUpdate({
        projectId,
        ownerId,
        updateTitle: updateData.updateTitle,
        updateDescription: updateData.updateDescription
    });
};

export const getProjectUpdates = async (projectId) => {
    return await projectRepository.findUpdatesByProject(projectId);
};

export const getProjectInvestors = async (projectId) => {
    return []; // Placeholder until Investment repository is complete
};

// ---------------------------------------------------------------------------
// Cart (Placeholder)
// ---------------------------------------------------------------------------

export const addToCart = async (customerId, projectId) => {
    const project = await projectRepository.findById(projectId);
    if (!project || project.projectStatus !== 'Stage') {
        throw new Error('Project not available for investment');
    }
    return { message: 'Added to cart' };
};

export const getCart = async (customerId) => {
    return [];
};

export const removeFromCart = async (customerId, projectId) => {
    return { message: 'Removed from cart' };
};
