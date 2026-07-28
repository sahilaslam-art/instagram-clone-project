import mongoose from 'mongoose';

const walletTransactionSchema = new mongoose.Schema({
    // Wallet Information
    walletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Transaction Information
    transactionType: { 
        type: String, 
        enum: ['Add Funds', 'Investment', 'Investment Return', 'Customer Withdrawal', 'Owner Withdrawal'], 
        required: true 
    },
    transactionAmount: { type: Number, required: true },
    transactionStatus: { 
        type: String, 
        enum: ['Pending', 'Successful', 'Failed'], 
        default: 'Pending' 
    },
    transactionDate: { type: Date, default: Date.now },

    // Reference Information
    investmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Investment', default: null },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null },
    withdrawalRequestId: { type: mongoose.Schema.Types.ObjectId, default: null } // assuming withdrawal request is handled separately
}, {
    timestamps: true
});

export const WalletTransaction = mongoose.model('WalletTransaction', walletTransactionSchema);
