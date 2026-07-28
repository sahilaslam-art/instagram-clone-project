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
            role: 'Admin',
            isActive: true
        });

        await adminUser.save();
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
