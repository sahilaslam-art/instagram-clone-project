import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    


    // Geographic/Categorical Mapping
    domain: { type: String, required: true }, // e.g., D1 to D9
    zone: { type: String, required: true },   // e.g., Z1 to Z9
    region: { type: String, required: true }, // e.g., R1 to R20
    category: { type: String, required: true }, // e.g., C1 to C10
    speciality: { type: String, required: true }, 

    // Metadata
    isVerifiedBySubAdmin: { type: Boolean, default: false },
    assignedSubAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, {
    timestamps: true
});

export const WorkerProfile = mongoose.model('WorkerProfile', workerSchema);
