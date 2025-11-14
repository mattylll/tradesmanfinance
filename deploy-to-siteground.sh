#!/bin/bash
# Siteground Quick Deploy Script
# This deploys only the frontend (backend can be added later)

echo "🚀 Deploying to Siteground..."

# Configuration - UPDATE THESE!
SITEGROUND_USER="your_username"
SITEGROUND_HOST="your_server.siteground.com"
SITEGROUND_PATH="/home/${SITEGROUND_USER}/public_html"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}📦 Preparing files for deployment...${NC}"

# Create a deployment directory
rm -rf deploy_temp
mkdir -p deploy_temp

# Copy all frontend files
cp -r *.html deploy_temp/
cp -r public deploy_temp/
cp -r trades deploy_temp/
cp -r includes deploy_temp/
cp robots.txt deploy_temp/

# Create .htaccess for Siteground
cat > deploy_temp/.htaccess << 'EOF'
# Siteground Optimized .htaccess
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

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
</IfModule>

# Compress text files
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript
</IfModule>

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
EOF

echo -e "${GREEN}✅ Files prepared${NC}"

# Deploy via rsync (if you have SSH access)
if command -v rsync &> /dev/null; then
    echo -e "${YELLOW}📤 Uploading to Siteground via rsync...${NC}"
    rsync -avz --delete \
        --exclude 'backend' \
        --exclude '.git' \
        --exclude 'node_modules' \
        --exclude '.env' \
        --exclude '*.sh' \
        deploy_temp/ ${SITEGROUND_USER}@${SITEGROUND_HOST}:${SITEGROUND_PATH}/
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Deployment successful!${NC}"
    else
        echo -e "${RED}❌ Rsync failed. Try FTP method below.${NC}"
    fi
else
    echo -e "${YELLOW}📁 Files ready in deploy_temp/ folder${NC}"
    echo -e "${YELLOW}Upload this folder to Siteground via:${NC}"
    echo "1. Siteground File Manager (Site Tools > File Manager)"
    echo "2. FTP client (FileZilla, Cyberduck)"
    echo "   - Host: ${SITEGROUND_HOST}"
    echo "   - Username: ${SITEGROUND_USER}"
    echo "   - Upload to: public_html/"
fi

echo -e "${GREEN}🎉 Frontend deployment complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Update DNS at 123-reg (see instructions below)"
echo "2. Enable SSL in Siteground Site Tools"
echo "3. Test your site at https://tradesmanfinance.co.uk"