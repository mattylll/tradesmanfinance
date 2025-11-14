#!/bin/bash

# Production Validation Script
# Validates all trade pages are properly formatted

echo "🔍 Validating Production Readiness..."
echo "===================================="
echo ""

# Initialize counters
TOTAL_PAGES=0
PASS_COUNT=0
FAIL_COUNT=0
ISSUES=""

# Function to validate a single page
validate_page() {
    local file="$1"
    local page_name=$(basename "$file")
    local errors=""
    
    TOTAL_PAGES=$((TOTAL_PAGES + 1))
    
    # Check 1: Industrial notice present
    if ! grep -q "industrial-notice" "$file"; then
        errors="${errors}❌ Missing industrial-notice banner\n"
    fi
    
    # Check 2: Production CSS included
    if ! grep -q "trade-pages-production.css" "$file"; then
        errors="${errors}❌ Missing trade-pages-production.css\n"
    fi
    
    # Check 3: No old CSS files
    if grep -q "trade-pages-layout-fix\|trade-pages-final-fix\|trade-hero-complete\|trade-hero-enhanced" "$file"; then
        errors="${errors}❌ Old CSS files still present\n"
    fi
    
    # Check 4: Footer has proper class
    if ! grep -q 'class="industrial-footer"' "$file"; then
        errors="${errors}❌ Footer missing industrial-footer class\n"
    fi
    
    # Check 5: Warning banner NOT inside body
    if grep -A1 "<body>" "$file" | grep -q "warning-banner"; then
        errors="${errors}❌ Old warning banner still in body\n"
    fi
    
    # Check 6: Has hero section
    if ! grep -q "trade-hero" "$file"; then
        errors="${errors}❌ Missing hero section\n"
    fi
    
    # Check 7: Has proper meta tags
    if ! grep -q '<meta name="description"' "$file"; then
        errors="${errors}❌ Missing meta description\n"
    fi
    
    # Report results
    if [ -z "$errors" ]; then
        echo "✅ $page_name"
        PASS_COUNT=$((PASS_COUNT + 1))
    else
        echo "❌ $page_name"
        echo -e "$errors"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        ISSUES="${ISSUES}\n${page_name}:\n${errors}"
    fi
}

# Test main trade pages
echo "📁 Validating main trade pages..."
echo "---------------------------------"
for file in trades/*-finance.html; do
    if [ -f "$file" ]; then
        validate_page "$file"
    fi
done

echo ""
echo "📁 Validating location pages..."
echo "--------------------------------"
for file in trades/locations/*/*-finance.html; do
    if [ -f "$file" ]; then
        validate_page "$file"
    fi
done

# Summary
echo ""
echo "======================================"
echo "📊 VALIDATION SUMMARY"
echo "======================================"
echo "Total pages checked: $TOTAL_PAGES"
echo "✅ Passed: $PASS_COUNT"
echo "❌ Failed: $FAIL_COUNT"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo "🎉 SUCCESS! All pages are production-ready!"
    echo ""
    echo "✅ All trade pages have:"
    echo "  • Proper warning banner placement"
    echo "  • Consolidated production CSS"
    echo "  • Correct footer structure"
    echo "  • Clean hero sections"
    echo "  • SEO meta tags"
    echo ""
    echo "📦 Production package is ready for deployment!"
else
    echo "⚠️  WARNING: Some pages have issues!"
    echo ""
    echo "Issues found:"
    echo -e "$ISSUES"
    echo ""
    echo "Please fix these issues before deployment."
fi

# Check production package
echo ""
echo "📦 Production Packages:"
ls -lh tradesmanfinance-production*.zip 2>/dev/null || echo "No production packages found"