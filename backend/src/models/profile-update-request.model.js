import mongoose from 'mongoose';

const profileUpdateRequestSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    oldDetails: {
        type: Object,
        required: true
    },
    newDetails: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    rejectionReason: {
        type: String
    }
}, { timestamps: true });

export const ProfileUpdateRequest = mongoose.model('ProfileUpdateRequest', profileUpdateRequestSchema);
