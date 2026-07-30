import mongoose from 'mongoose';

const zonalAdminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    
    // Functional Role
    featureRole: { 
        type: String, 
        enum: [
            'Owner verification and profile update admin', 
            'Customer verification and profile update admin', 
            'Project verification and projects update admin', 
            'Support admin', 
            'Owner / Customer withdrawal manage admin'
        ], 
        required: true 
    },

    // Geographic Mapping
    domain: { type: String, required: true }, // e.g., D1 to D9
    zone: { type: String, required: true },   // e.g., Z1 to Z9

    // Metadata
    isVerifiedBySuperAdmin: { type: Boolean, default: false },
    assignedSuperAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, {
    timestamps: true
});

export const ZonalAdminProfile = mongoose.model('ZonalAdminProfile', zonalAdminSchema);
