const logger = require('../utils/logger');

// NotFound handler for unmatched routes (to be used before this as needed)
function notFound(req, res, next) {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
}

/**
 * Centralized error handler
 * - Logs server-side details
 * - Returns safe JSON to clients
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const status = err.status || err.statusCode || 500;

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors ? Object.values(err.errors).map(e => e.message) : undefined
    });
  }

  // express-validator errors forwarded manually should already be handled upstream

  // Generic response
  const response = {
    error: status >= 500 ? 'Server error' : (err.message || 'Request error')
  };

  // In non-production, include minimal debug
  if (process.env.NODE_ENV !== 'production') {
    response.debug = {
      message: err.message,
      ...(err.code ? { code: err.code } : {}),
    };
  }

  // Attach a simple correlation/request id if present
  const requestId = req.headers['x-request-id'] || req.id;
  if (requestId) {
    response.requestId = requestId;
  }

  // Log full details server-side
  logger.error(JSON.stringify({
    msg: 'API error',
    status,
    method: req.method,
    url: req.originalUrl,
    requestId,
    ip: req.ip,
    body: safeBody(req),
    stack: err.stack
  }));

  return res.status(status).json(response);
}

function safeBody(req) {
  // Avoid logging sensitive fields
  const clone = { ...(req.body || {}) };
  const redact = ['password', 'token', 'auth', 'authorization', 'otp'];
  redact.forEach(k => {
    if (clone[k] !== undefined) clone[k] = '[REDACTED]';
  });
  return clone;
}

module.exports = errorHandler;
module.exports.notFound = notFound;
