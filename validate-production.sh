#!/bin/bash

# Production Readiness Validation Script
# Run this before deployment to check for common issues

echo "🔍 Tradesman Finance Production Validation"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

# Check for required files
echo -e "\n📁 Checking required files..."

required_files=(
    "index.html"
    "services.html"
    "contact.html"
    "about.html"
    "public/css/industrial.css"
    "public/js/main.js"
    "robots.txt"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file exists"
    else
        echo -e "  ${RED}✗${NC} $file missing"
        ((ERRORS++))
    fi
done

# Check for console.log statements in JS files
echo -e "\n🔍 Checking for console.log statements..."
if grep -r "console\." public/js/*.js 2>/dev/null | grep -v "//.*console\." > /dev/null; then
    echo -e "  ${YELLOW}⚠${NC} Found console statements in JavaScript files (consider removing for production)"
    ((WARNINGS++))
else
    echo -e "  ${GREEN}✓${NC} No console statements found"
fi

# Check for localhost references (excluding conditional checks)
echo -e "\n🔍 Checking for localhost references..."
# Look for hardcoded localhost URLs, not conditional checks
if grep -r "http://localhost\|https://localhost" *.html public/js/*.js 2>/dev/null | grep -v "window.location.hostname" | grep -v "//.*localhost" > /dev/null; then
    echo -e "  ${RED}✗${NC} Found hardcoded localhost references (must be updated for production)"
    grep -r "http://localhost\|https://localhost" *.html public/js/*.js 2>/dev/null | grep -v "window.location.hostname" | grep -v "//" | head -5
    ((ERRORS++))
else
    echo -e "  ${GREEN}✓${NC} No problematic localhost references found"
fi

# Check backend configuration
echo -e "\n⚙️ Checking backend configuration..."
if [ -f "backend/.env" ]; then
    echo -e "  ${GREEN}✓${NC} Backend .env file exists"
    
    # Check for default values
    if grep -q "your-super-secret\|change-this\|your-" backend/.env 2>/dev/null; then
        echo -e "  ${RED}✗${NC} Default/placeholder values found in .env (must be updated)"
        ((ERRORS++))
    else
        echo -e "  ${GREEN}✓${NC} No obvious placeholder values in .env"
    fi
else
    echo -e "  ${YELLOW}⚠${NC} Backend .env file not found (required for backend deployment)"
    ((WARNINGS++))
fi

# Check for API endpoint configuration
echo -e "\n🌐 Checking API endpoints..."
api_refs=$(grep -r "api\." public/js/*.js 2>/dev/null | wc -l)
if [ "$api_refs" -gt 0 ]; then
    echo -e "  ${YELLOW}⚠${NC} Found $api_refs API references - ensure they point to production"
    ((WARNINGS++))
else
    echo -e "  ${GREEN}✓${NC} No hardcoded API references found"
fi

# Check image sizes
echo -e "\n🖼️ Checking image optimization..."
large_images=$(find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -size +500k 2>/dev/null | wc -l)
if [ "$large_images" -gt 0 ]; then
    echo -e "  ${YELLOW}⚠${NC} Found $large_images images over 500KB (consider optimizing)"
    ((WARNINGS++))
else
    echo -e "  ${GREEN}✓${NC} All images are reasonably sized"
fi

# Check for broken internal links
echo -e "\n🔗 Checking for broken internal links..."
broken_links=0
for html_file in *.html trades/*.html; do
    if [ -f "$html_file" ]; then
        # Extract href values and check if files exist
        grep -o 'href="[^"]*"' "$html_file" | sed 's/href="//;s/"//' | while read -r link; do
            # Skip external links, anchors, and root paths
            if [[ ! "$link" =~ ^(https?://|mailto:|tel:|#|/) ]]; then
                # Remove any query parameters or anchors
                clean_link=$(echo "$link" | sed 's/[#?].*//')
                if [ ! -f "$clean_link" ] && [ ! -f "${clean_link}.html" ]; then
                    echo -e "  ${YELLOW}⚠${NC} Possible broken link in $html_file: $link"
                    ((broken_links++))
                fi
            fi
        done
    fi
done

if [ "$broken_links" -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} No broken internal links found"
fi

# Summary
echo -e "\n=========================================="
echo "📊 Validation Summary"
echo "=========================================="

if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Ready for production.${NC}"
    exit 0
elif [ "$ERRORS" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  No critical errors, but $WARNINGS warning(s) found.${NC}"
    echo "Review warnings above before deploying to production."
    exit 0
else
    echo -e "${RED}❌ Found $ERRORS critical error(s) and $WARNINGS warning(s).${NC}"
    echo "Fix critical errors before deploying to production."
    exit 1
fi