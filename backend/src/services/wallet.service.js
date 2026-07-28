import * as walletRepository from '../repositories/wallet.repository.js';

export const getWallet = async (userId) => {
    const wallet = await walletRepository.findWalletByUser(userId);
    const transactions = await walletRepository.findTransactionsByWallet(wallet._id);
    return { wallet, transactions };
};

export const addFunds = async (userId, amount) => {
    let wallet = await walletRepository.findWalletByUser(userId);

    // In a real application, you would integrate a payment gateway here.
    wallet = await walletRepository.updateWalletBalance(wallet._id, amount);
    // Note: totalAmountAdded should be incremented. We can do it by saving.
    wallet.totalAmountAdded += amount;
    await wallet.save();

    const transaction = await walletRepository.createTransaction({
        walletId: wallet._id,
        userId: userId,
        transactionType: 'Add Funds',
        transactionAmount: amount,
        transactionStatus: 'Successful'
    });

    return { wallet, transaction };
};

export const withdrawFunds = async (userId, userRole, amount) => {
    let wallet = await walletRepository.findWalletByUser(userId);

    if (wallet.availableBalance < amount) {
        throw new Error('Insufficient Balance');
    }

    wallet = await walletRepository.updateWalletBalance(wallet._id, -amount);
    
    if (userRole === 'Customer') {
        wallet.totalCustomerWithdrawals += amount;
    } else if (userRole === 'Owner') {
        wallet.totalOwnerWithdrawals += amount;
    }
    
    await wallet.save();

    const transaction = await walletRepository.createTransaction({
        walletId: wallet._id,
        userId: userId,
        transactionType: userRole === 'Customer' ? 'Customer Withdrawal' : 'Owner Withdrawal',
        transactionAmount: amount,
        transactionStatus: 'Pending' 
    });

    return { wallet, transaction };
};

// Admin
export const getPendingWithdrawals = async () => {
    return await walletRepository.findPendingWithdrawals();
};

export const processWithdrawal = async (transactionId, status) => {
    const transaction = await walletRepository.findTransactionById(transactionId);
    if (!transaction) {
        throw new Error('Transaction not found');
    }

    if (transaction.transactionStatus !== 'Pending') {
        throw new Error('Transaction is not pending');
    }

    // If rejected, refund the wallet
    if (status === 'Failed') {
        const wallet = await walletRepository.updateWalletBalance(transaction.walletId, transaction.transactionAmount);
        if (transaction.transactionType === 'Customer Withdrawal') {
            wallet.totalCustomerWithdrawals -= transaction.transactionAmount;
        } else if (transaction.transactionType === 'Owner Withdrawal') {
            wallet.totalOwnerWithdrawals -= transaction.transactionAmount;
        }
        await wallet.save();
    }

    return await walletRepository.updateTransactionStatus(transactionId, status);
};
