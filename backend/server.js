import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Environment-based CORS configuration
const isProduction = process.env.NODE_ENV === 'production';

// Use a simple CORS configuration that works with Vercel deployments
app.use(cors({
    // Allow all origins in development, or any Vercel preview/production URLs
    origin: true, // This allows any origin - more permissive but will solve the immediate issue
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// For debugging CORS issues
app.use((req, res, next) => {
    console.log(`Request from origin: ${req.headers.origin}`);
    next();
});

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS preflight response - add an explicit OPTIONS handler
app.options('*', (req, res) => {
    res.status(200).end();
});

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something broke!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
