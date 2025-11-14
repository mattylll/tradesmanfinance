#!/bin/bash

# Trade Pages Production Fix Script
# Fixes all 35 trade pages to match homepage quality

echo "🔧 Starting Trade Pages Production Fix..."
echo "======================================"

# Function to fix a single trade page
fix_trade_page() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    echo "Fixing: $file"
    
    # Read the file content
    content=$(cat "$file")
    
    # Step 1: Remove the old warning banner from inside body
    content=$(echo "$content" | sed '/<body>/,/<\/header>/{
        /<div class="warning-banner">/,/<\/div>/d
    }')
    
    # Step 2: Add proper industrial-notice after header
    # Check if industrial-notice already exists
    if ! echo "$content" | grep -q "industrial-notice"; then
        content=$(echo "$content" | awk '
        /<\/header>/ {
            print $0
            print ""
            print "    <!-- Business Notice Bar -->"
            print "    <div class=\"industrial-notice\" role=\"complementary\" aria-label=\"Important notice\">"
            print "        <div class=\"container\">"
            print "            <div class=\"notice-content\">"
            print "                <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\">"
            print "                    <title>Warning icon</title>"
            print "                    <path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"/>"
            print "                </svg>"
            print "                <p><strong>BUSINESS & PERSONAL LOANS:</strong> Rates from 6.5%. Business loans £25K-£1M. Personal loans available.</p>"
            print "            </div>"
            print "        </div>"
            print "    </div>"
            next
        }
        { print }
        ')
    fi
    
    # Step 3: Update CSS includes - remove old trade CSS files, add new one
    content=$(echo "$content" | sed '
        # Remove old trade CSS files
        /trade-pages-layout-fix\.css/d
        /trade-pages-final-fix\.css/d
        /trade-pages-fix\.css/d
        /trade-hero-complete\.css/d
        /trade-hero-enhanced\.css/d
        /trade-hero-homepage-style\.css/d
    ')
    
    # Add new production CSS after button-hover-fix.css
    if ! echo "$content" | grep -q "trade-pages-production.css"; then
        content=$(echo "$content" | sed '/button-hover-fix\.css/a\
    <!-- Trade Pages Production Styling -->\
    <link rel="stylesheet" href="../public/css/trade-pages-production.css?v=1.0">')
    fi
    
    # For location pages (3 levels deep), fix the path
    if [[ "$file" == *"/locations/"* ]]; then
        content=$(echo "$content" | sed 's|href="../public/css/trade-pages-production.css|href="../../public/css/trade-pages-production.css|g')
    fi
    
    # Step 4: Fix footer structure - ensure proper classes
    content=$(echo "$content" | sed '
        # Fix footer classes
        s/<footer>/<footer class="industrial-footer" role="contentinfo">/g
        s/<footer class="footer">/<footer class="industrial-footer" role="contentinfo">/g
        
        # Fix ul role attributes
        s/<ul>/<ul role="list">/g
    ')
    
    # Step 5: Clean up any duplicate mobile menu fixes
    if echo "$content" | grep -c "mobile-menu-fix.css" | grep -q "2"; then
        # Remove the first occurrence (keep the last one)
        content=$(echo "$content" | awk '!seen && /mobile-menu-fix\.css/ {seen=1; next} 1')
    fi
    
    # Write the fixed content
    echo "$content" > "$file"
}

# Fix all main trade pages
echo ""
echo "📁 Fixing main trade pages..."
for file in trades/*-finance.html; do
    if [ -f "$file" ]; then
        fix_trade_page "$file"
    fi
done

# Fix all location-specific trade pages
echo ""
echo "📁 Fixing location-specific trade pages..."
for file in trades/locations/*/*-finance.html; do
    if [ -f "$file" ]; then
        fix_trade_page "$file"
    fi
done

echo ""
echo "✅ All trade pages have been fixed!"
echo ""
echo "Summary of changes:"
echo "- ✓ Warning banner moved to proper location"
echo "- ✓ CSS consolidated to trade-pages-production.css"
echo "- ✓ Footer structure fixed with proper classes"
echo "- ✓ Removed conflicting CSS files"
echo "- ✓ Added proper ARIA attributes"
echo ""
echo "Next steps:"
echo "1. Test a few pages locally to verify"
echo "2. Run validation script"
echo "3. Create production package"