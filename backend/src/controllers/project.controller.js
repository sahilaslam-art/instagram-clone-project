import * as projectService from '../services/project.service.js';
import { sendResponse } from '../utils/response.util.js';

export const createProject = async (req, res, next) => {
    try {
        const ownerId = req.user._id;
        const project = await projectService.createProject(ownerId, req.body);
        return sendResponse(res, 201, true, 'Project Created Successfully', project);
    } catch (error) {
        next(error);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const ownerId = req.user._id;
        const projectId = req.params.projectId;
        const project = await projectService.updateProject(ownerId, projectId, req.body);
        return sendResponse(res, 200, true, 'Project Updated Successfully', project);
    } catch (error) {
        if (error.message === 'Project not found' || error.message.includes('Cannot update project')) {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};

export const submitProject = async (req, res, next) => {
    try {
        const ownerId = req.user._id;
        const projectId = req.params.projectId;
        const project = await projectService.submitProject(ownerId, projectId);
        return sendResponse(res, 200, true, 'Project Submitted for Review', project);
    } catch (error) {
        if (error.message === 'Project not found' || error.message.includes('Cannot submit project')) {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};

export const getOwnerProjects = async (req, res, next) => {
    try {
        const ownerId = req.user._id;
        const projects = await projectService.getOwnerProjects(ownerId);
        return sendResponse(res, 200, true, 'Owner Projects Retrieved', projects);
    } catch (error) {
        next(error);
    }
};

export const getAvailableProjects = async (req, res, next) => {
    try {
        const filters = req.query;
        const projects = await projectService.getAvailableProjects(filters);
        return sendResponse(res, 200, true, 'Available Projects Retrieved', projects);
    } catch (error) {
        next(error);
    }
};

export const getProjectDetails = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const project = await projectService.getProjectDetails(projectId);
        
        // Optionally fetch updates
        const updates = await projectService.getProjectUpdates(projectId);
        
        return sendResponse(res, 200, true, 'Project Details Retrieved', { project, updates });
    } catch (error) {
        if (error.message === 'Project not found') {
            return sendResponse(res, 404, false, error.message);
        }
        next(error);
    }
};

export const reviewProject = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const project = await projectService.reviewProject(projectId, req.body, req.user);
        return sendResponse(res, 200, true, 'Project Reviewed Successfully', project);
    } catch (error) {
        if (error.message === 'Project not found' || error.message === 'Rejection reason is required' || error.message.includes('Not authorized')) {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};

export const addProjectUpdate = async (req, res, next) => {
    try {
        const ownerId = req.user._id;
        const projectId = req.params.projectId;
        const update = await projectService.addProjectUpdate(ownerId, projectId, req.body);
        return sendResponse(res, 201, true, 'Project Update Added', update);
    } catch (error) {
        if (error.message === 'Project not found') {
            return sendResponse(res, 404, false, error.message);
        }
        next(error);
    }
};

export const getProjectUpdates = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const updates = await projectService.getProjectUpdates(projectId);
        return sendResponse(res, 200, true, 'Project Updates Retrieved', updates);
    } catch (error) {
        next(error);
    }
};

export const getProjectInvestors = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const investors = await projectService.getProjectInvestors(projectId);
        return sendResponse(res, 200, true, 'Project Investors Retrieved', investors);
    } catch (error) {
        next(error);
    }
};

export const getPendingProjects = async (req, res, next) => {
    try {
        const projects = await projectService.getPendingProjects(req.user);
        return sendResponse(res, 200, true, 'Pending Projects Retrieved', projects);
    } catch (error) {
        next(error);
    }
};

export const getActiveProjects = async (req, res, next) => {
    try {
        const projects = await projectService.getActiveProjects(req.user);
        return sendResponse(res, 200, true, 'Active Projects Retrieved', projects);
    } catch (error) {
        next(error);
    }
};

// Cart
export const addToCart = async (req, res, next) => {
    try {
        const customerId = req.user._id;
        const { projectId } = req.body;
        const result = await projectService.addToCart(customerId, projectId);
        return sendResponse(res, 200, true, result.message, result);
    } catch (error) {
        next(error);
    }
};

export const getCart = async (req, res, next) => {
    try {
        const customerId = req.user._id;
        const cart = await projectService.getCart(customerId);
        return sendResponse(res, 200, true, 'Cart Retrieved', cart);
    } catch (error) {
        next(error);
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        const customerId = req.user._id;
        const projectId = req.params.projectId;
        const result = await projectService.removeFromCart(customerId, projectId);
        return sendResponse(res, 200, true, result.message, result);
    } catch (error) {
        next(error);
    }
};
