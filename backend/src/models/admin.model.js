import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    


    // Geographic Mapping
    domain: { type: String, required: true }, // e.g., D1 to D9
    zone: { type: String, required: true },   // e.g., Z1 to Z9
    region: { type: String, required: true }, // e.g., R1 to R20

    // Metadata
    isVerifiedByZonalAdmin: { type: Boolean, default: false },
    assignedZonalAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, {
    timestamps: true
});

export const AdminProfile = mongoose.model('AdminProfile', adminSchema);
