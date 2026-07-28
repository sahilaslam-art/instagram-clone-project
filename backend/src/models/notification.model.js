import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userRole: { type: String, enum: ['Customer', 'Owner', 'Admin'], required: true },
    
    notificationType: { type: String, required: true },
    notificationTitle: { type: String, required: true },
    notificationMessage: { type: String, required: true },
    
    isRead: { type: Boolean, default: false },
    
    referenceId: { type: mongoose.Schema.Types.ObjectId, default: null },
    
    createdDate: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export const Notification = mongoose.model('Notification', notificationSchema);
