import { User } from './src/models/user.model.js';
import { KYCVerification } from './src/models/kyc-verification.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

async function verifyHierarchyKycLogic() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const zonalAdminEmail = 'zonal@test.com';
        const adminEmail = 'admin1@test.com';

        const zonalAdmin = await User.findOne({ email: zonalAdminEmail });
        const admin = await User.findOne({ email: adminEmail });

        if (!zonalAdmin || !admin) {
            console.log('Test users not found, run seed-test-users.js first.');
            process.exit(1);
        }

        // Test 1: Zonal Admin submits KYC
        console.log('--- Submitting KYC for Zonal Admin ---');
        await KYCVerification.deleteMany({ userId: zonalAdmin._id });
        await KYCVerification.create({
            userId: zonalAdmin._id,
            userRole: zonalAdmin.role,
            fullName: zonalAdmin.fullName,
            dateOfBirth: new Date(),
            gender: 'Male',
            address: 'Zonal Admin HQ',
            bankInfo: { accountHolderName: 'Zonal', bankName: 'SBI', accountNumber: '123', ifscCode: 'SBIN00' },
            documents: { identityProof: 'id.jpg', addressProof: 'add.jpg', bankProof: 'bank.jpg' },
            verificationStatus: 'Pending'
        });
        await User.findByIdAndUpdate(zonalAdmin._id, { kycStatus: 'Pending' });
        console.log('Zonal Admin KYC created.');

        // Test 2: Admin submits KYC
        console.log('--- Submitting KYC for Admin ---');
        await KYCVerification.deleteMany({ userId: admin._id });
        await KYCVerification.create({
            userId: admin._id,
            userRole: admin.role,
            fullName: admin.fullName,
            dateOfBirth: new Date(),
            gender: 'Male',
            address: 'Admin HQ',
            bankInfo: { accountHolderName: 'Admin', bankName: 'HDFC', accountNumber: '456', ifscCode: 'HDFC00' },
            documents: { identityProof: 'id.jpg', addressProof: 'add.jpg', bankProof: 'bank.jpg' },
            verificationStatus: 'Pending'
        });
        await User.findByIdAndUpdate(admin._id, { kycStatus: 'Pending' });
        console.log('Admin KYC created.');

        console.log('Both are Pending now.');

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

verifyHierarchyKycLogic();
