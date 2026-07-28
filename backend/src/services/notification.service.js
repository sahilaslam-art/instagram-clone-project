import * as notificationRepository from '../repositories/notification.repository.js';

export const getMyNotifications = async (userId) => {
    return await notificationRepository.findByUser(userId);
};

export const markAsRead = async (notificationId, userId) => {
    return await notificationRepository.markAsRead(notificationId, userId);
};
