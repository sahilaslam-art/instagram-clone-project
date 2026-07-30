import mongoose from 'mongoose';
import { User } from './src/models/user.model.js';
import argon2 from 'argon2';

import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stagefund';

const seedAdmin = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@stagefund.com' });
        
        const hashedPassword = await argon2.hash('admin123');
        
        if (existingAdmin) {
            console.log('Admin already exists!');
        } else {
        const adminUser = new User({
            fullName: 'Super Admin',
            email: 'admin@stagefund.com',
            mobileNumber: '0000000000',
            password: hashedPassword,
            role: 'Super_Admin',
            isActive: true,
            isEmailVerified: true,
            isMobileVerified: true
        });

        await adminUser.save();
        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@stagefund.com');
        console.log('Password: admin123');
        }

        // Check if sub admin already exists
        const existingSubAdmin = await User.findOne({ email: 'subadmin@stagefund.com' });
        if (!existingSubAdmin) {
            const subAdminUser = new User({
                fullName: 'Sub Admin',
                email: 'subadmin@stagefund.com',
                mobileNumber: '0000000001',
                password: hashedPassword,
                role: 'Sub_Admin',
                isActive: true,
                isEmailVerified: true,
                isMobileVerified: true
            });
            await subAdminUser.save();
            console.log('✅ Sub-Admin user created successfully!');
            console.log('Email: subadmin@stagefund.com');
            console.log('Password: admin123');
        } else {
            console.log('Sub-Admin already exists!');
        }
        
    } catch (err) {
        console.error('Error seeding admin:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
};

seedAdmin();
