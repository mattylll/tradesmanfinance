const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

/**
 * Admin authentication middleware
 * Allows either:
 *  - Static API key via x-admin-key header (matches ADMIN_API_KEY)
 *  - JWT Bearer token with role: 'admin' using JWT_SECRET
 */
module.exports = function auth(req, res, next) {
  try {
    // API Key auth
    const adminKey = req.headers['x-admin-key'] || req.headers['x-admin-token'];
    if (adminKey && process.env.ADMIN_API_KEY && adminKey === process.env.ADMIN_API_KEY) {
      req.admin = { method: 'api-key' };
      return next();
    }

    // JWT auth
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (token && process.env.JWT_SECRET) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded && (decoded.role === 'admin' || decoded.isAdmin === true)) {
          req.admin = { method: 'jwt', user: decoded };
          return next();
        }
      } catch (err) {
        logger.warn('Invalid JWT provided for admin route');
      }
    }

    // Not authorized
    return res.status(401).json({ error: 'Unauthorized' });
  } catch (error) {
    logger.error('Admin auth middleware error:', error);
    return res.status(500).json({ error: 'Auth error' });
  }
};
