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

        const hashedPassword = await argon2.hash('admin123');

        // Seed Super Admin only — all other roles register themselves via the app
        const existingAdmin = await User.findOne({ email: 'admin@stagefund.com' });
        if (existingAdmin) {
            console.log('Super Admin already exists!');
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
            console.log('✅ Super Admin created successfully!');
            console.log('Email: admin@stagefund.com');
            console.log('Password: admin123');
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
