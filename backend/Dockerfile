# Backend API/Worker image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY src ./src

# Environment defaults (override in runtime)
ENV NODE_ENV=production \
    PORT=3001

# Healthcheck against readiness probe
HEALTHCHECK --interval=30s --timeout=5s --retries=5 CMD wget -qO- http://127.0.0.1:3001/ready || exit 1

EXPOSE 3001

# Default command (API). For worker, override with: npm run start:worker
CMD ["npm", "run", "start:api"]
