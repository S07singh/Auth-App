import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import connectB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 5000;
connectB();


const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

// api endpoints
app.get('/', (req, res) => {
    res.send('Api Working!');
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log('listening on port ' + port));

