import mongoose from 'mongoose';
import { User } from './src/models/user.model.js';
import argon2 from 'argon2';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/stagefund';

const resetDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Drop the entire database
        await mongoose.connection.db.dropDatabase();
        console.log('✅ Database dropped successfully');

        const hashedPassword = await argon2.hash('admin123');
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
        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@stagefund.com');
        console.log('Password: admin123');
        
    } catch (err) {
        console.error('Error resetting database:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
};

resetDb();
