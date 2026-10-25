import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/testing_db';

// AWS Credentials & Configuration from Environment Variables
export const awsConfig = {
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  bucketName: process.env.AWS_S3_BUCKET || '',
};

// Universal CORS Middleware — Guarantees CORS & preflight (OPTIONS) headers on ALL requests
app.use((req, res, next) => {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true,
  })
);
app.use(express.json());

// ── MongoDB connection ────────────────────────────────────────
// On Vercel every request runs in a serverless function, so there is no
// long-lived server that can connect once at boot. Kicking off connect() at
// module load and hoping it finishes in time does NOT work: a request that
// arrives first makes Mongoose buffer the query, and 10s later it fails with
//   "Operation `users.findOne()` buffering timed out after 10000ms"  → HTTP 500
// So we cache one connection promise and await it before any route runs.
// Warm invocations reuse the same connection; cold ones wait for it properly.
let connectionPromise = null;

function connectDB() {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 })
      .catch((err) => {
        connectionPromise = null; // let the next request retry instead of caching the failure
        throw err;
      });
  }
  return connectionPromise;
}

// Gate for routes that actually touch the database.
const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    res.status(503).json({
      message: 'Database unavailable, please try again',
      error: err.message,
    });
  }
};

// Routes — ensureDB runs first so a model call never starts on a dead connection
app.use('/api/auth', ensureDB, authRoutes);

// Root Welcome Route
app.get('/', (req, res) => {
  res.send('<h1>🚀 Backend Server is running & connected to MongoDB!</h1><p>Health check endpoint: <a href="/api/health">/api/health</a></p>');
});

// Health Check — deliberately NOT behind ensureDB, so it still answers when the
// database is down. `db` tells you which half is broken.
app.get('/api/health', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: 'ok',
    message: 'testing-tutorial-backend is running',
    db: states[mongoose.connection.readyState] ?? 'unknown',
    timestamp: new Date(),
  });
});

// Local development only — Vercel imports `app` as a serverless handler and
// never calls listen(), so starting a listener there would be a no-op at best.
if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      console.log('✅ Connected to MongoDB successfully');
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ MongoDB Connection Error:', err);
    });
}

export default app;
