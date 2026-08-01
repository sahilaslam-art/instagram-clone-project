import mongoose from 'mongoose';

const subAdminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    


    // Geographic/Categorical Mapping
    domain: { type: String, required: true }, // e.g., D1 to D9
    zone: { type: String, required: true },   // e.g., Z1 to Z9
    region: { type: String, required: true }, // e.g., R1 to R20
    category: { type: String, required: true }, // e.g., C1 to C10

    // Metadata
    isVerifiedByAdmin: { type: Boolean, default: false },
    assignedAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, {
    timestamps: true
});

export const SubAdminProfile = mongoose.model('SubAdminProfile', subAdminSchema);
