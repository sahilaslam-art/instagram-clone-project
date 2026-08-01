import { Project } from '../models/project.model.js';
import { ProjectUpdate } from '../models/project-update.model.js';

export const findById = async (id) => {
    return await Project.findById(id).populate('ownerId', 'fullName email');
};

export const findByIdAndOwner = async (id, ownerId) => {
    return await Project.findOne({ _id: id, ownerId });
};

export const findAllByStatus = async (status, filters = {}) => {
    const query = { projectVisibility: status, ...filters };
    return await Project.find(query).populate('ownerId', 'fullName').sort('-createdAt');
};

export const findAllByOwner = async (ownerId) => {
    return await Project.find({ ownerId }).sort('-createdAt');
};

export const findAllPending = async () => {
    return await Project.find({ projectStatus: 'Submitted' }).populate('ownerId', 'fullName').sort('createdAt');
};

export const countPending = async () => {
    return await Project.countDocuments({ projectStatus: 'Submitted' });
};


export const findActive = async () => {
    return await Project.find({ projectStatus: { $in: ['Stage', 'Live', 'Finished'] } }).populate('ownerId', 'fullName email').sort('-createdAt');
};

export const create = async (projectData) => {
    const project = new Project(projectData);
    return await project.save();
};

export const updateById = async (id, updateData) => {
    return await Project.findByIdAndUpdate(id, updateData, { new: true });
};

// Updates
export const createUpdate = async (updateData) => {
    return await ProjectUpdate.create(updateData);
};

export const findUpdatesByProject = async (projectId) => {
    return await ProjectUpdate.find({ projectId }).sort({ publishedDate: -1 });
};
