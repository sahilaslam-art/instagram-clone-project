import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // Basic Information
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Account Information
    role: { 
        type: String, 
        enum: ['Customer', 'Owner', 'Super_Admin', 'Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker'], 
        required: true 
    },
    accountStatus: { 
        type: String, 
        enum: ['Active', 'Inactive'], 
        default: 'Active' 
    },
    isEmailVerified: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false },
    isProfileComplete: { type: Boolean, default: false },
    kycStatus: { 
        type: String, 
        enum: ['Incomplete', 'Pending', 'Verified', 'Rejected'], 
        default: 'Incomplete' 
    },

    // Profile Information
    profilePhoto: { type: String, default: null },
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, enum: ['Male', 'Female', 'Other', null], default: null },
    address: { type: String, default: null },

    // Specific profile information (like domain, zone, region) will be stored in separate collections
    // linked by userId.

    // Bank Information
    bankInfo: {
        accountHolderName: { type: String, default: null },
        bankName: { type: String, default: null },
        accountNumber: { type: String, default: null },
        ifscCode: { type: String, default: null }
    },

    // Account Metadata
    lastLogin: { type: Date, default: null },
    lastProfileUpdate: { type: Date, default: null }
}, {
    timestamps: true // Automatically manages createdAt (Registration Date) and updatedAt
});

export const User = mongoose.model('User', userSchema);
