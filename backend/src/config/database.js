import mongoose from 'mongoose';
import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose.connect(uri);
        logger.info('MongoDB Connected successfully');
    } catch (error) {
        logger.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};
