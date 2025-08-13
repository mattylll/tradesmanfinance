const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const redis = require('redis');
const Bull = require('bull');
require('dotenv').config();

const leadRoutes = require('./routes/leadRoutes');
const automationRoutes = require('./routes/automationRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');
const logger = require('./utils/logger');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3001;

// Redis client for caching and queue management
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"]
    }
  },
  referrerPolicy: { policy: 'no-referrer' },
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:8080'],
  credentials: true
}));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json({
  limit: process.env.JSON_BODY_LIMIT || '1mb',
  verify: (req, res, buf) => {
    try { req.rawBody = buf.toString(); } catch (e) { /* ignore */ }
  }
}));
app.use(express.urlencoded({
  extended: true,
  limit: process.env.URLENCODED_BODY_LIMIT || '1mb',
  verify: (req, res, buf) => {
    try { req.rawBody = buf.toString(); } catch (e) { /* ignore */ }
  }
}));
app.use('/api/', limiter);

/**
 * Liveness probe
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

/**
 * Readiness probe - verifies MongoDB and Redis connectivity
 */
app.get('/ready', async (req, res) => {
  try {
    const mongoReady = mongoose.connection.readyState === 1;
    let redisReady = false;
    try {
      const pong = await redisClient.ping();
      redisReady = pong === 'PONG';
    } catch (e) {
      redisReady = false;
    }

    const ready = mongoReady && redisReady;
    res.status(ready ? 200 : 503).json({
      status: ready ? 'ready' : 'not-ready',
      services: {
        mongo: mongoReady,
        redis: redisReady
      },
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    res.status(503).json({ status: 'not-ready' });
  }
});

// API Routes
app.use('/api/leads', leadRoutes);
app.use('/api/automations', auth, automationRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/admin', auth, adminRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  logger.info('Connected to MongoDB');
}).catch(err => {
  logger.error('MongoDB connection error:', err);
  process.exit(1);
});

// Connect to Redis
redisClient.connect().then(() => {
  logger.info('Connected to Redis');
}).catch(err => {
  logger.error('Redis connection error:', err);
});

/**
 * Workers are started in a separate process (see src/worker.js).
 * This API process should not start workers to avoid duplicate processing.
 */

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await mongoose.connection.close();
  await redisClient.quit();
  process.exit(0);
});

module.exports = app;
