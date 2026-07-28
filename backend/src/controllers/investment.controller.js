import * as investmentService from '../services/investment.service.js';
import { sendResponse } from '../utils/response.util.js';

export const invest = async (req, res, next) => {
    try {
        const customerId = req.user._id;
        const investment = await investmentService.investInProject(customerId, req.body);
        return sendResponse(res, 201, true, 'Investment Successful', investment);
    } catch (error) {
        const knownErrors = ['Customer Not Verified', 'Project Not Available', 'Minimum Investment Not Met', 'Insufficient Wallet Balance'];
        if (knownErrors.includes(error.message)) {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};

export const getLiveInvestments = async (req, res, next) => {
    try {
        const customerId = req.user._id;
        const investments = await investmentService.getLiveInvestments(customerId);
        return sendResponse(res, 200, true, 'Live Investments Retrieved', investments);
    } catch (error) {
        next(error);
    }
};

export const getFinishedInvestments = async (req, res, next) => {
    try {
        const customerId = req.user._id;
        const investments = await investmentService.getFinishedInvestments(customerId);
        return sendResponse(res, 200, true, 'Finished Investments Retrieved', investments);
    } catch (error) {
        next(error);
    }
};
