import * as projectRepository from '../repositories/project.repository.js';
import * as userRepository from '../repositories/user.repository.js';

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
    // Both 'Stage' and 'Live' are available for viewing.
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

export const reviewProject = async (projectId, adminData) => {
    const project = await projectRepository.findById(projectId);
    if (!project) {
        throw new Error('Project not found');
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
    
    return await projectRepository.updateById(projectId, updatePayload);
};

// Project Updates
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

export const getPendingProjects = async () => {
    return await projectRepository.findAllPending();
};

export const getActiveProjects = async () => {
    return await projectRepository.findActive();
};

export const getProjectInvestors = async (projectId) => {
    // This will be handled partly by Investment, but since it's an Owner API, we need to make sure 
    // the owner owns the project.
    return []; // Placeholder until I fix Investment repository.
};

// Cart Methods (Placeholder for missing feature)
export const addToCart = async (customerId, projectId) => {
    // Validate project
    const project = await projectRepository.findById(projectId);
    if (!project || project.projectStatus !== 'Stage') {
        throw new Error('Project not available for investment');
    }
    // Cart implementation will go here
    return { message: 'Added to cart' };
};

export const getCart = async (customerId) => {
    return [];
};

export const removeFromCart = async (customerId, projectId) => {
    return { message: 'Removed from cart' };
};
