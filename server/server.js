import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import path from 'path';

import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import { productsRoute } from './routes/products.js'; // Correctly import the products route

const app = express();
const port = process.env.PORT || 4000;

// Connect to the database
connectDB();

// Allowed origins for CORS
const allowedOrigins = ['http://localhost:5173'];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Fix __dirname issue for ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Routes
app.get('/', (req, res) => res.send("API Working Fine"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productsRoute); // Use the products route

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
