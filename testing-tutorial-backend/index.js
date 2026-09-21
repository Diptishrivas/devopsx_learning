import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/testing_db';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Root Welcome Route
app.get('/', (req, res) => {
  res.send('<h1>🚀 Backend Server is running & connected to MongoDB!</h1><p>Health check endpoint: <a href="/api/health">/api/health</a></p>');
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'testing-tutorial-backend is running', timestamp: new Date() });
});

// Connect to MongoDB & Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to local MongoDB successfully:', MONGO_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
  });
