import * as walletService from '../services/wallet.service.js';
import { sendResponse } from '../utils/response.util.js';

export const getWallet = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const result = await walletService.getWallet(userId);
        return sendResponse(res, 200, true, 'Wallet Details Retrieved', result);
    } catch (error) {
        next(error);
    }
};

export const addFunds = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { amount } = req.body;
        const result = await walletService.addFunds(userId, amount);
        return sendResponse(res, 200, true, 'Funds Added Successfully', result);
    } catch (error) {
        next(error);
    }
};

export const withdrawFunds = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const userRole = req.user.role;
        const { amount } = req.body;
        
        const result = await walletService.withdrawFunds(userId, userRole, amount);
        return sendResponse(res, 200, true, 'Withdrawal Requested Successfully', result);
    } catch (error) {
        if (error.message === 'Insufficient Balance') {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};

export const getPendingWithdrawals = async (req, res, next) => {
    try {
        const result = await walletService.getPendingWithdrawals();
        return sendResponse(res, 200, true, 'Pending Withdrawals Retrieved', result);
    } catch (error) {
        next(error);
    }
};

export const processWithdrawal = async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId;
        const { status } = req.body; // 'Successful' or 'Failed'
        const result = await walletService.processWithdrawal(transactionId, status);
        return sendResponse(res, 200, true, `Withdrawal Processed as ${status}`, result);
    } catch (error) {
        if (error.message === 'Transaction not found' || error.message === 'Transaction is not pending') {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};
