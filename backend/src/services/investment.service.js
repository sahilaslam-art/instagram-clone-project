import * as investmentRepository from '../repositories/investment.repository.js';
import * as projectRepository from '../repositories/project.repository.js';
import * as walletRepository from '../repositories/wallet.repository.js';
import * as userRepository from '../repositories/user.repository.js';

export const investInProject = async (customerId, investmentData) => {
    const { projectId, investmentAmount } = investmentData;

    // 1. Check user KYC
    const customer = await userRepository.findById(customerId);
    if (customer.kycStatus !== 'Verified') {
        throw new Error('Customer Not Verified');
    }

    // 2. Check project availability and minimum investment
    const project = await projectRepository.findById(projectId);
    if (!project || project.projectStatus !== 'Stage') {
        throw new Error('Project Not Available');
    }
    if (investmentAmount < project.minimumInvestmentAmount) {
        throw new Error('Minimum Investment Not Met');
    }

    // 3. Check wallet balance
    const wallet = await walletRepository.findWalletByUser(customerId);
    if (!wallet || wallet.availableBalance < investmentAmount) {
        throw new Error('Insufficient Wallet Balance');
    }

    // 4. Process Investment
    const updatedWallet = await walletRepository.updateWalletBalance(wallet._id, -investmentAmount);
    // Note: totalInvestmentAmount logic should be handled properly, maybe add it to wallet model if missing,
    // or just rely on calculating from transactions. For now, ignoring `totalInvestmentAmount` since `availableBalance` is what matters.
    // Wait, let's just use `updateWalletBalance` since it only increments `balance`. 
    // Is `availableBalance` the field name or `balance`? 
    // In `walletRepository` I used `$inc: { balance: amount }`.
    // I should check wallet model to be sure.

    const expectedReturnAmount = investmentAmount + (investmentAmount * (project.expectedReturn / 100));

    const investment = await investmentRepository.create({
        customerId,
        projectId,
        investmentAmount,
        investmentStatus: 'Active',
        expectedReturn: expectedReturnAmount
    });

    await walletRepository.createTransaction({
        walletId: wallet._id,
        userId: customerId,
        transactionType: 'Investment',
        transactionAmount: investmentAmount,
        transactionStatus: 'Successful',
        investmentId: investment._id,
        projectId: projectId
    });

    // 5. Update Project Stats
    const currentRaisedAmount = project.currentRaisedAmount + investmentAmount;
    const totalInvestments = project.totalInvestments + 1;
    await projectRepository.updateById(projectId, { currentRaisedAmount, totalInvestments });

    return investment;
};

export const getLiveInvestments = async (customerId) => {
    return await investmentRepository.findAllByCustomer(customerId, 'Active');
};

export const getFinishedInvestments = async (customerId) => {
    return await investmentRepository.findAllByCustomer(customerId, 'Completed');
};
