import { Wallet } from '../models/wallet.model.js';
import { WalletTransaction } from '../models/wallet-transaction.model.js';

export const findWalletByUser = async (userId) => {
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
        wallet = await Wallet.create({ userId, availableBalance: 0 });
    }
    return wallet;
};

export const updateWalletBalance = async (walletId, amount) => {
    return await Wallet.findByIdAndUpdate(walletId, { $inc: { availableBalance: amount } }, { new: true });
};

export const createTransaction = async (transactionData) => {
    const transaction = new WalletTransaction(transactionData);
    return await transaction.save();
};

export const findTransactionsByWallet = async (walletId) => {
    return await WalletTransaction.find({ walletId }).sort('-createdAt');
};

export const findPendingWithdrawals = async () => {
    return await WalletTransaction.find({ 
        transactionType: { $in: ['Customer Withdrawal', 'Owner Withdrawal'] }, 
        transactionStatus: 'Pending' 
    })
    .populate('userId', 'fullName email')
    .sort('createdAt');
};

export const countPendingWithdrawals = async () => {
    return await WalletTransaction.countDocuments({ 
        transactionType: { $in: ['Customer Withdrawal', 'Owner Withdrawal'] }, 
        transactionStatus: 'Pending' 
    });
};


export const findTransactionById = async (id) => {
    return await WalletTransaction.findById(id).populate('walletId');
};

export const updateTransactionStatus = async (id, status) => {
    return await WalletTransaction.findByIdAndUpdate(id, { transactionStatus: status }, { new: true });
};
