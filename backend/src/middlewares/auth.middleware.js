import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/response.util.js';
import * as userRepository from '../repositories/user.repository.js';

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return sendResponse(res, 401, false, 'Unauthorized Access: No token provided');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userRepository.findById(decoded.id);
        
        if (!user) {
            return sendResponse(res, 401, false, 'Unauthorized Access: User not found');
        }

        if (user.accountStatus === 'Inactive') {
            return sendResponse(res, 401, false, 'Account Inactive');
        }

        if (['Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker'].includes(user.role)) {
            // Need to import models at the top, or just use mongoose.model
            const mongoose = (await import('mongoose')).default;
            try {
                let profile = null;
                if (user.role === 'Zonal_Admin') profile = await mongoose.model('ZonalAdminProfile').findOne({ userId: user._id });
                if (user.role === 'Admin') profile = await mongoose.model('AdminProfile').findOne({ userId: user._id });
                if (user.role === 'Sub_Admin') profile = await mongoose.model('SubAdminProfile').findOne({ userId: user._id });
                if (user.role === 'Worker') profile = await mongoose.model('WorkerProfile').findOne({ userId: user._id });

                if (profile) {
                    user.featureRole = profile.featureRole;
                    user.domain = profile.domain;
                    user.zone = profile.zone;
                    user.region = profile.region;
                    user.category = profile.category;
                    user.speciality = profile.speciality;
                }
            } catch (err) {
                console.error('Auth Middleware: Error fetching admin profile', err);
            }
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return sendResponse(res, 401, false, 'Unauthorized Access: Token expired');
        }
        return sendResponse(res, 401, false, 'Unauthorized Access: Invalid token');
    }
};
