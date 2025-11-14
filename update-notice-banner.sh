#!/bin/bash

# Update notice banner across all HTML files
echo "Updating notice banner across all HTML files..."

# Find all HTML files with the old commercial-only text
find . -name "*.html" -type f | while read -r file; do
    # Check if file has the old text
    if grep -q "COMMERCIAL ONLY:.*£25K-£1M business loans" "$file"; then
        # Update the notice text
        sed -i.bak 's/<strong>COMMERCIAL ONLY:<\/strong> £25K-£1M business loans for registered UK companies. No personal loans./<strong>BUSINESS \&amp; PERSONAL LOANS:<\/strong> Rates from 6.5%. Business loans £25K-£1M direct. Personal loans through FCA regulated partners./g' "$file"
        echo "  ✓ Updated: $file"
    fi
done

# Clean up backup files
find . -name "*.html.bak" -type f -delete

echo "Notice banner updated across all HTML files!"