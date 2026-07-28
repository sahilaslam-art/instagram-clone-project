import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    // Owner Information
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Basic Project Information
    projectTitle: { type: String, required: true },
    projectCategory: { type: String, required: true },
    projectDescription: { type: String, required: true },
    projectLocation: { type: String, required: true },

    // Financial Information
    fundingTarget: { type: Number, required: true },
    currentRaisedAmount: { type: Number, default: 0 },
    minimumInvestmentAmount: { type: Number, required: true },
    expectedReturn: { type: Number, required: true }, // percentage
    riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], required: true },

    // Project Status
    projectStatus: { 
        type: String, 
        enum: ['Created', 'Submitted', 'Rejected', 'Stage', 'Live', 'Finished'], 
        default: 'Created' 
    },

    // Project Visibility
    projectVisibility: { 
        type: String, 
        enum: ['Draft', 'Submitted', 'Stage', 'Live', 'Finished'], 
        default: 'Draft' 
    },

    // Project Timeline
    createdDate: { type: Date, default: Date.now },
    submittedDate: { type: Date, default: null },
    approvedDate: { type: Date, default: null },
    liveDate: { type: Date, default: null },
    finishedDate: { type: Date, default: null },

    // Project Statistics
    totalInvestors: { type: Number, default: 0 },
    totalInvestments: { type: Number, default: 0 },
    fundingPercentage: { type: Number, default: 0 },

    // Project Metadata
    rejectionReason: { type: String, default: null },
    adminRemarks: { type: String, default: null }
}, {
    timestamps: true
});

// Middleware to calculate funding percentage before saving
projectSchema.pre('save', function () {
    if (this.fundingTarget > 0) {
        this.fundingPercentage = (this.currentRaisedAmount / this.fundingTarget) * 100;
    }
});

export const Project = mongoose.model('Project', projectSchema);
