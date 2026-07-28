import * as notificationService from '../services/notification.service.js';
import { sendResponse } from '../utils/response.util.js';

export const getMyNotifications = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const notifications = await notificationService.getMyNotifications(userId);
        return sendResponse(res, 200, true, 'Notifications Retrieved', notifications);
    } catch (error) {
        next(error);
    }
};

export const markAsRead = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const notificationId = req.params.notificationId;
        const notification = await notificationService.markAsRead(notificationId, userId);
        return sendResponse(res, 200, true, 'Notification Marked as Read', notification);
    } catch (error) {
        next(error);
    }
};
