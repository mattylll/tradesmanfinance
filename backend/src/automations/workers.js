const leadAutomation = require('./leadAutomation');
const logger = require('../utils/logger');

/**
 * Start all automation workers
 */
function startAutomationWorkers() {
  logger.info('Starting automation workers...');
  
  // The leadAutomation module automatically initializes its queues
  // when imported, so we just need to log that it's started
  logger.info('Lead automation workers started');
  
  // Monitor queue health
  setInterval(() => {
    monitorQueueHealth();
  }, 60000); // Check every minute
}

/**
 * Monitor queue health and log statistics
 */
async function monitorQueueHealth() {
  try {
    const queues = [
      leadAutomation.newLeadQueue,
      leadAutomation.followUpQueue,
      leadAutomation.nurturingQueue
    ];

    for (const queue of queues) {
      const counts = await queue.getJobCounts();
      const health = {
        name: queue.name,
        waiting: counts.waiting,
        active: counts.active,
        completed: counts.completed,
        failed: counts.failed,
        delayed: counts.delayed
      };
      
      // Log warning if too many failed jobs
      if (counts.failed > 10) {
        logger.warn(`High failed job count in ${queue.name}: ${counts.failed}`);
      }
      
      // Log if queue is backed up
      if (counts.waiting > 100) {
        logger.warn(`Queue backup in ${queue.name}: ${counts.waiting} waiting`);
      }
    }
  } catch (error) {
    logger.error('Error monitoring queue health:', error);
  }
}

module.exports = {
  startAutomationWorkers
};