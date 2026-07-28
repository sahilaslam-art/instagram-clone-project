import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
    // User Information
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    // Wallet Information
    availableBalance: { type: Number, default: 0 },

    // Wallet Statistics
    totalAmountAdded: { type: Number, default: 0 },
    totalInvestmentAmount: { type: Number, default: 0 },
    totalReturnAmount: { type: Number, default: 0 },
    totalCustomerWithdrawals: { type: Number, default: 0 },
    totalOwnerWithdrawals: { type: Number, default: 0 },

    // Wallet Metadata
    walletStatus: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    createdDate: { type: Date, default: Date.now },
    lastUpdatedDate: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Update lastUpdatedDate on every save
walletSchema.pre('save', function() {
    this.lastUpdatedDate = new Date();
});

export const Wallet = mongoose.model('Wallet', walletSchema);
