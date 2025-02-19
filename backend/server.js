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

const allowedOrigins = [
    'http://localhost:5173',
    'https://auth-app-sudhir-singhs-projects-6e01bfb3.vercel.app',
    'https://auth-lfusdffrd-sudhir-singhs-projects-6e01bfb3.vercel.app' // Add the correct frontend URL
];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(cors({
    origin: '*',
    credentials: true
}));



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

