#!/bin/bash

# List of files that need updates
files=(
    "trades/locations/birmingham/plumber-finance.html"
    "trades/locations/london/builder-finance.html"
    "trades/locations/london/carpenter-finance.html"
    "trades/locations/london/electrician-finance.html"
    "trades/locations/london/heating-engineer-finance.html"
    "trades/locations/london/plumber-finance.html"
    "trades/locations/manchester/builder-finance.html"
    "trades/locations/manchester/carpenter-finance.html"
    "trades/locations/manchester/electrician-finance.html"
    "trades/locations/manchester/heating-engineer-finance.html"
    "trades/locations/manchester/plumber-finance.html"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Updating $file..."
        # Add Guides link after Locations in navigation
        sed -i.bak '/<a href="\.\.\/[^"]*">Locations<\/a><\/li>/a\
                    <li><a href="../../../blog/">Guides</a></li>' "$file"
        rm -f "${file}.bak"
    fi
done

echo "Updates complete!"
