#!/bin/bash

# Production Preparation Script
# Prepares the codebase for production deployment

echo "🚀 Preparing TradesmanFinance for Production"
echo "============================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Create clean deployment directory
echo -e "\n${YELLOW}📦 Creating clean deployment package...${NC}"
rm -rf production_ready
mkdir -p production_ready

# Copy frontend files
echo "  Copying frontend files..."
cp -r *.html production_ready/
cp -r public production_ready/
cp -r trades production_ready/
cp -r includes production_ready/
cp robots.txt production_ready/

# Copy backend
echo "  Copying backend..."
cp -r backend production_ready/
# Remove development files from backend
rm -rf production_ready/backend/logs/*
rm -f production_ready/backend/.env
rm -rf production_ready/backend/node_modules

# Create production .htaccess
echo "  Creating .htaccess..."
cat > production_ready/.htaccess << 'EOF'
# Production .htaccess
Options -Indexes +FollowSymLinks
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Remove trailing slash
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [L,R=301]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+)$ $1.html [L,QSA]

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"
Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://api.tradesmanfinance.co.uk"

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>

# Compress text files
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>
EOF

# Create deployment instructions
echo "  Creating deployment instructions..."
cat > production_ready/DEPLOY-INSTRUCTIONS.txt << 'EOF'
TRADESMAN FINANCE - PRODUCTION DEPLOYMENT INSTRUCTIONS
======================================================

FRONTEND DEPLOYMENT (SiteGround)
--------------------------------
1. Upload all files (except backend folder) to public_html/
2. Ensure .htaccess is properly uploaded
3. Enable SSL in SiteGround Site Tools
4. Test the site at https://tradesmanfinance.co.uk

BACKEND DEPLOYMENT
------------------
1. Set up a VPS or cloud server (e.g., DigitalOcean, AWS EC2)
2. Install Node.js 18+ and MongoDB
3. Upload backend folder to server
4. Copy .env.production to .env and update all values
5. Install dependencies: npm install --production
6. Start with PM2:
   pm2 start src/server.js --name tradesman-api
   pm2 start src/worker.js --name tradesman-worker

API SUBDOMAIN SETUP
-------------------
1. Create subdomain: api.tradesmanfinance.co.uk
2. Point it to your backend server IP
3. Configure nginx/Apache to proxy to Node.js port 3001

CRITICAL CONFIGURATION
----------------------
Before going live, ensure:
✓ MongoDB is configured and accessible
✓ Redis is running
✓ SendGrid API key is valid
✓ Twilio credentials are set
✓ SSL certificates are active
✓ All environment variables are set

TESTING CHECKLIST
-----------------
[ ] Homepage loads with SSL
[ ] Calculator works
[ ] Contact form submits
[ ] All trade pages load
[ ] API health check responds
[ ] No console errors
[ ] Mobile responsive

MONITORING
----------
Set up monitoring for:
- Uptime (UptimeRobot)
- SSL certificate expiry
- API response times
- Error logging (Sentry)

Support: admin@tradesmanfinance.co.uk
EOF

echo -e "\n${GREEN}✅ Production package ready in 'production_ready' directory${NC}"
echo ""
echo "Next steps:"
echo "1. Review DEPLOY-INSTRUCTIONS.txt"
echo "2. Update backend/.env with production values"
echo "3. Test locally one more time"
echo "4. Deploy frontend to SiteGround"
echo "5. Deploy backend to your server"
echo ""
echo -e "${YELLOW}⚠️  Remember to:${NC}"
echo "  - Set up MongoDB and Redis"
echo "  - Configure all API keys"
echo "  - Enable SSL certificates"
echo "  - Set up monitoring"