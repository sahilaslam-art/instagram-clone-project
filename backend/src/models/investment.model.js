import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
    // Customer Information
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Project Information
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },

    // Investment Information
    investmentAmount: { type: Number, required: true },
    investmentDate: { type: Date, default: Date.now },
    investmentStatus: { 
        type: String, 
        enum: ['Pending', 'Active', 'Completed'], 
        default: 'Pending' 
    },

    // Return Information
    expectedReturn: { type: Number, required: true }, // amount based on percentage
    actualReturn: { type: Number, default: null },
    profitLoss: { type: Number, default: null },
    settlementDate: { type: Date, default: null }
}, {
    timestamps: true
});

export const Investment = mongoose.model('Investment', investmentSchema);
