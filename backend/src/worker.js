require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const { startAutomationWorkers } = require('./automations/workers');

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection in worker:', reason);
});
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception in worker:', err);
  process.exit(1);
});

async function start() {
  try {
    // Connect to MongoDB for job processors that use models
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('Worker connected to MongoDB');

    // Start Bull queue processors and cron jobs
    startAutomationWorkers();

    logger.info('Lead automation worker is running');
  } catch (err) {
    logger.error('Worker startup error:', err);
    process.exit(1);
  }
}

start();

// Graceful shutdown
async function shutdown(signal) {
  try {
    logger.info(`${signal} received, shutting down worker gracefully`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (e) {
    logger.error('Error during worker shutdown:', e);
    process.exit(1);
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
