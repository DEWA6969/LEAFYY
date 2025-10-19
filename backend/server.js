const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Initialize DB pool on server start
require('./config/database');
require('dotenv').config({ path: './config.env' });

// Import routes
const authRoutes = require('./routes/auth');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Leafyy Mobile API Server',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        verifyOTP: 'POST /api/auth/verify-otp',
        resendOTP: 'POST /api/auth/resend-otp',
        forgotPassword: 'POST /api/auth/forgot-password',
        resetPassword: 'POST /api/auth/reset-password',
        getProfile: 'GET /api/auth/profile (requires token)',
        updateProfile: 'PUT /api/auth/profile (requires token)'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   🌱 LeafyyTech Mobile API Server         ║
║                                        ║
║   Server running on port: ${PORT}      ║
║   Database: ${process.env.DB_NAME || 'leafyy'}            ║
║                                        ║
║   API Documentation:                   ║
║   http://localhost:${PORT}                ║
╚═══════════════════════════════════════╝
  `);
});

module.exports = app;
