#!/bin/bash

# Fix CTA buttons on all trade pages

echo "🔧 Fixing CTA buttons on trade pages..."
echo "======================================"

# Function to fix CTA buttons in a file
fix_cta_buttons() {
    local file="$1"
    echo "Fixing CTAs in: $(basename $file)"
    
    # Fix any buttons that try to scroll to non-existent form containers
    # Replace with direct link to contact page
    sed -i '' 's|href="#[^"]*-form-container"|href="../contact.html"|g' "$file"
    
    # Remove onclick="scrollToForm()" since the form doesn't exist
    sed -i '' 's|onclick="scrollToForm()"||g' "$file"
    
    # For location pages (3 levels deep), fix the contact path
    if [[ "$file" == *"/locations/"* ]]; then
        sed -i '' 's|href="../contact.html"|href="../../../contact.html"|g' "$file"
    fi
}

# Fix main trade pages
echo ""
echo "📁 Fixing main trade pages..."
for file in trades/*-finance.html; do
    if [ -f "$file" ]; then
        fix_cta_buttons "$file"
    fi
done

# Fix location pages
echo ""
echo "📁 Fixing location trade pages..."
for file in trades/locations/*/*-finance.html; do
    if [ -f "$file" ]; then
        # These need different path to contact
        echo "Fixing CTAs in: $(basename $(dirname $file))/$(basename $file)"
        
        # Fix form container links
        sed -i '' 's|href="#[^"]*-form-container"|href="../../../contact.html"|g' "$file"
        
        # Remove onclick handlers
        sed -i '' 's|onclick="scrollToForm()"||g' "$file"
    fi
done

echo ""
echo "✅ All CTA buttons fixed!"
echo ""
echo "Summary:"
echo "- All 'Get Funded Now' buttons link to contact page"
echo "- All 'Apply Now' buttons link to contact page"
echo "- Removed broken form scroll functions"
echo "- Fixed paths for location pages"