import express from 'express';
import cors from 'cors';
import pino from 'pino';
import helmet from 'helmet';

import authRoutes from './src/routes/auth.routes.js';
import customerRoutes from './src/routes/customer.routes.js';
import ownerRoutes from './src/routes/owner.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import hierarchyRoutes from './src/routes/hierarchy.routes.js';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Custom NoSQL injection sanitizer (express-mongo-sanitize is incompatible with Express v5
// because req.query is a read-only getter in Express v5)
const sanitize = (obj) => {
    if (obj && typeof obj === 'object') {
        for (const key of Object.keys(obj)) {
            if (key.startsWith('$') || key.includes('.')) {
                delete obj[key];
            } else {
                sanitize(obj[key]);
            }
        }
    }
};
app.use((req, res, next) => {
    sanitize(req.body);
    sanitize(req.params);
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    logger.info({ method: req.method, url: req.url }, 'Incoming request');
    next();
});

// Role-based Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/owner', ownerRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/hierarchy', hierarchyRoutes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

export { app, logger };
