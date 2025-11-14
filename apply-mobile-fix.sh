#!/bin/bash

# Apply mobile menu fix CSS to all HTML files
echo "Applying mobile menu fix to all HTML files..."

# Find all HTML files and add the mobile menu fix CSS before </head>
find . -name "*.html" -type f | while read -r file; do
    # Check if the file already has the mobile menu fix
    if grep -q "mobile-menu-fix.css" "$file"; then
        echo "  ✓ Already fixed: $file"
    else
        # Check if file has </head> tag
        if grep -q "</head>" "$file"; then
            # Add the mobile menu fix CSS right before </head>
            sed -i.bak '/<\/head>/i\
    <!-- Mobile menu fix - MUST be loaded last -->\
    <link rel="stylesheet" href="/public/css/mobile-menu-fix.css?v=1.0">
' "$file"
            echo "  ✓ Fixed: $file"
        fi
    fi
done

# Clean up backup files
find . -name "*.html.bak" -type f -delete

echo "Mobile menu fix applied to all HTML files!"
echo ""
echo "Note: The fix CSS file uses absolute paths (/public/css/)"
echo "This ensures it works correctly in all subdirectories."