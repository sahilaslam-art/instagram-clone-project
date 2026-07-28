import { Notification } from '../models/notification.model.js';

export const findByUser = async (userId) => {
    return await Notification.find({ userId }).sort('-createdAt');
};

export const create = async (notificationData) => {
    const notification = new Notification(notificationData);
    return await notification.save();
};

export const markAsRead = async (id, userId) => {
    return await Notification.findOneAndUpdate(
        { _id: id, userId },
        { isRead: true },
        { new: true }
    );
};
