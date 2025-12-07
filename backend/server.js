import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';


import passport from './config/passport.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import httpLogger from './config/httpLogger.js';
import logger from './config/logger.js';
import { authRoutes } from './modules/auth/index.js';
import { categoryRoutes } from './modules/category/index.js';
import { itemRoutes } from './modules/item/index.js';
import { imageRoutes } from './modules/image/index.js';
import { promoRoutes } from './modules/promo/index.js';
import { cartRoutes } from './modules/cart/index.js';
import { orderRoutes } from './modules/order/index.js';
import { aiRoutes } from './modules/ai/index.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();


const app = express();

// Security & Performance Middleware
app.use(helmet());
app.use(compression());

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/fashio-two',
      ttl: 24 * 60 * 60 // 1 day
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "none", // Required for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use(httpLogger);

// Apply general rate limiting to all routes
app.use(generalLimiter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fashio-two')
  .then(() => logger.info('MongoDB connected successfully'))
  .catch((err) => logger.error({ err }, 'MongoDB connection error'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/promos', promoRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
