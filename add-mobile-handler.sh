#!/bin/bash

# Add mobile menu handler script to all HTML files
echo "Adding mobile menu handler to all HTML files..."

# Find all HTML files and add the mobile menu handler after main.js
find . -name "*.html" -type f | while read -r file; do
    # Check if the file already has the mobile menu handler
    if grep -q "mobile-menu-handler.js" "$file"; then
        echo "  ✓ Already has handler: $file"
    else
        # Check if file has main.js
        if grep -q "main.js" "$file"; then
            # Add the mobile menu handler after main.js
            # Handle both relative and absolute paths
            if grep -q 'src=".*main.js"' "$file"; then
                # Get the path prefix used for main.js
                path_prefix=$(grep -o 'src="[^"]*public/js/main.js"' "$file" | sed 's/src="\(.*\)public\/js\/main.js"/\1/')
                
                # Add mobile menu handler with same path prefix
                sed -i.bak '/<script.*main\.js/a\
    <!-- Mobile menu handler - fixes duplicate hamburger issue -->\
    <script src="'"${path_prefix}public/js/mobile-menu-handler.js"'"></script>
' "$file"
                echo "  ✓ Added handler: $file"
            fi
        fi
    fi
done

# Clean up backup files
find . -name "*.html.bak" -type f -delete

echo "Mobile menu handler added to all HTML files!"