#!/bin/bash

# Production Deployment Package Creator
# Creates a clean, production-ready ZIP for TradesmanFinance.co.uk

echo "🚀 Creating Production Deployment Package..."
echo "========================================="

# Define the deployment directory and ZIP name
DEPLOY_DIR="tradesmanfinance-production"
ZIP_NAME="tradesmanfinance-production-$(date +%Y%m%d-%H%M%S).zip"

# Clean up any existing deployment directory
if [ -d "$DEPLOY_DIR" ]; then
    echo "Cleaning up existing deployment directory..."
    rm -rf "$DEPLOY_DIR"
fi

# Create fresh deployment directory
echo "Creating deployment directory..."
mkdir -p "$DEPLOY_DIR"

# Copy all necessary files
echo ""
echo "📁 Copying production files..."

# Copy HTML files (root level)
echo "  - Copying HTML pages..."
cp *.html "$DEPLOY_DIR/" 2>/dev/null || true

# Copy the trades directory (all trade pages)
echo "  - Copying trade pages..."
cp -r trades "$DEPLOY_DIR/"

# Copy the public directory (CSS, JS, images)
echo "  - Copying public assets..."
cp -r public "$DEPLOY_DIR/"

# Copy the includes directory if it exists
if [ -d "includes" ]; then
    echo "  - Copying includes..."
    cp -r includes "$DEPLOY_DIR/"
fi

# Copy robots.txt and other essential files
echo "  - Copying essential files..."
cp robots.txt "$DEPLOY_DIR/" 2>/dev/null || true

# Create .htaccess file for production
echo "  - Creating .htaccess..."
cat > "$DEPLOY_DIR/.htaccess" << 'EOF'
Options -Indexes +FollowSymLinks
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+)$ $1.html [L,QSA]

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
EOF

# Remove any development files that shouldn't be in production
echo ""
echo "🧹 Cleaning up development files..."
find "$DEPLOY_DIR" -name "*.sh" -delete
find "$DEPLOY_DIR" -name "*.md" -delete
find "$DEPLOY_DIR" -name ".DS_Store" -delete
find "$DEPLOY_DIR" -name "*.tmp" -delete
find "$DEPLOY_DIR" -name "*.bak" -delete

# Remove backend directory if it was copied
rm -rf "$DEPLOY_DIR/backend"
rm -rf "$DEPLOY_DIR/.git"
rm -rf "$DEPLOY_DIR/node_modules"
rm -rf "$DEPLOY_DIR/deploy"
rm -rf "$DEPLOY_DIR/deploy_clean"
rm -rf "$DEPLOY_DIR/.claude"

# Create the ZIP file
echo ""
echo "📦 Creating ZIP archive: $ZIP_NAME"
zip -r "$ZIP_NAME" "$DEPLOY_DIR" -q

# Calculate file sizes
TOTAL_SIZE=$(du -sh "$DEPLOY_DIR" | cut -f1)
ZIP_SIZE=$(du -sh "$ZIP_NAME" | cut -f1)

# Clean up the deployment directory
rm -rf "$DEPLOY_DIR"

echo ""
echo "✅ Production package created successfully!"
echo ""
echo "📊 Package Statistics:"
echo "  - Package name: $ZIP_NAME"
echo "  - Uncompressed size: $TOTAL_SIZE"
echo "  - Compressed size: $ZIP_SIZE"
echo ""
echo "📋 Package includes:"
echo "  ✓ All HTML pages (homepage, services, about, contact, etc.)"
echo "  ✓ 20 main trade pages"
echo "  ✓ 15 location-specific trade pages"
echo "  ✓ All CSS, JavaScript, and image assets"
echo "  ✓ Production-ready .htaccess configuration"
echo "  ✓ robots.txt for SEO"
echo ""
echo "🚀 Deployment Instructions:"
echo "  1. Upload $ZIP_NAME to Siteground File Manager"
echo "  2. Extract in public_html directory"
echo "  3. Verify SSL certificate is active"
echo "  4. Update DNS at 123-reg if needed"
echo "  5. Test all pages and functionality"
echo ""
echo "📝 Post-deployment checklist:"
echo "  [ ] Homepage loads with HTTPS"
echo "  [ ] Calculator works correctly"
echo "  [ ] All trade pages display properly"
echo "  [ ] Warning banner shows on all pages"
echo "  [ ] Footer displays correctly"
echo "  [ ] Mobile responsive works"
echo "  [ ] Contact form displays"
echo ""