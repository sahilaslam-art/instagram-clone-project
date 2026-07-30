import mongoose from 'mongoose';

const kycVerificationSchema = new mongoose.Schema({
    // User Information
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userRole: { type: String, enum: ['Customer', 'Owner', 'Feature_Admin'], required: true },
    appliedFeatureRole: { type: String, default: null }, // Only for Feature_Admin

    // Personal Information (Matches DB Design)
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    address: { type: String, required: true },

    // Bank Information
    bankInfo: {
        accountHolderName: { type: String, required: true },
        bankName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        ifscCode: { type: String, required: true }
    },

    // KYC Documents (URLs to uploaded files)
    documents: {
        identityProof: { type: String, required: true },
        addressProof: { type: String, required: true },
        bankProof: { type: String, required: true },
        additionalDocuments: [{ type: String }]
    },

    // Verification Information
    verificationStatus: { 
        type: String, 
        enum: ['Incomplete', 'Pending', 'Verified', 'Rejected'], 
        default: 'Pending' 
    },
    submittedDate: { type: Date, default: Date.now },
    reviewedDate: { type: Date, default: null },

    // Review Information
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // User who did initial review (Super_Admin or Sub_Admin)
    rejectionReason: { type: String, default: null },
    
    // Sub-Admin specific fields for Feature_Admin verification
    subAdminDecision: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: null },
    subAdminReviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    subAdminReviewedDate: { type: Date, default: null },
}, {
    timestamps: true
});

export const KYCVerification = mongoose.model('KYCVerification', kycVerificationSchema);
