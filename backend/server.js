import dotenv from 'dotenv';
dotenv.config();

import { app, logger } from './app.js';
import { connectDB } from './src/config/database.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
};

startServer();
