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

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return sendResponse(res, 401, false, 'Unauthorized Access: Token expired');
        }
        return sendResponse(res, 401, false, 'Unauthorized Access: Invalid token');
    }
};
