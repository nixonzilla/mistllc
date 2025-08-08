// index.js — MISTLLC backend entry point

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
dotenv.config();

const app = express();

// ===== Middleware =====
app.use(cors()); // Allow frontend requests
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ===== API Routes =====
app.get('/api', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to the MISTLLC API',
    timestamp: new Date().toISOString()
  });
});

// Example: more routes
// import authRoutes from './routes/auth.js';
// app.use('/api/auth', authRoutes);

// ===== Production Frontend Handling =====
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  const frontendPath = path.join(__dirname, 'frontend', 'dist');

  app.use(express.static(frontendPath));

  // Rate limiter for frontend catch-all route
  const frontendLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  // Send all non-API requests to frontend index.html, with rate limiting
  app.get('*', frontendLimiter, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// ===== Error Handling =====
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 MISTLLC server running on port ${PORT}`);
});
