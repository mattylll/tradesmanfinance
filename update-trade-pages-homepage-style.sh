#!/bin/bash

# Update all trade pages to use homepage-style hero

echo "Updating trade pages to homepage style..."

# Update CSS reference
for file in trades/*-finance.html; do
    if [ -f "$file" ] && [ "$file" != "trades/plumber-finance.html" ]; then
        # Update CSS link
        sed -i '' 's/trade-hero-complete\.css/trade-hero-homepage-style.css/g' "$file"
        sed -i '' 's/Complete hero section with visuals/Homepage-style hero section/g' "$file"
        echo "Updated CSS: $file"
    fi
done

# Add warning banner after </head><body>
for file in trades/*-finance.html; do
    if [ -f "$file" ] && [ "$file" != "trades/plumber-finance.html" ]; then
        if ! grep -q "warning-banner" "$file"; then
            sed -i '' '/<body>/a\
    <!-- Warning Banner -->\
    <div class="warning-banner">\
        BUSINESS & PERSONAL LOANS: Rates from 6.5%. Business loans £25K-£1M. Personal loans available.\
    </div>\
    ' "$file"
            echo "Added banner: $file"
        fi
    fi
done

# Update hero titles to match homepage style
sed -i '' 's/<h1 class="hero-title">ELECTRICIAN<br>FINANCE UK<\/h1>/<h1 class="hero-title">ELECTRICIAN FINANCE FOR<br>PROPER TRADES<\/h1>/g' trades/electrician-finance.html
sed -i '' 's/<h1 class="hero-title">BUILDER<br>FINANCE UK<\/h1>/<h1 class="hero-title">BUILDER FINANCE FOR<br>PROPER TRADES<\/h1>/g' trades/builder-finance.html
sed -i '' 's/<h1 class="hero-title">CARPENTER<br>FINANCE UK<\/h1>/<h1 class="hero-title">CARPENTER FINANCE FOR<br>PROPER TRADES<\/h1>/g' trades/carpenter-finance.html
sed -i '' 's/<h1 class="hero-title">ROOFER<br>FINANCE UK<\/h1>/<h1 class="hero-title">ROOFER FINANCE FOR<br>PROPER TRADES<\/h1>/g' trades/roofer-finance.html
sed -i '' 's/<h1 class="hero-title">HEATING ENGINEER<br>FINANCE UK<\/h1>/<h1 class="hero-title">HEATING ENGINEER FINANCE FOR<br>PROPER TRADES<\/h1>/g' trades/heating-engineer-finance.html

# Update stats to match homepage
for file in trades/*-finance.html; do
    if [ -f "$file" ] && [ "$file" != "trades/plumber-finance.html" ]; then
        # Update first stat
        sed -i '' '/<div class="stat">/,/<\/div>/{
            s/<span class="stat-number">[^<]*<\/span>/<span class="stat-number">£500M+<\/span>/
            s/<span class="stat-label">[^<]*<\/span>/<span class="stat-label">Funded to Date<\/span>/
        }' "$file"
        echo "Updated stats: $file"
    fi
done

# Remove visual elements
for file in trades/*-finance.html; do
    if [ -f "$file" ] && [ "$file" != "trades/plumber-finance.html" ]; then
        # Remove hero-visual div
        sed -i '' '/<div class="hero-visual">/,/<\/div>[[:space:]]*<\/div>/d' "$file"
        echo "Removed visuals: $file"
    fi
done

# Update button text
for file in trades/*-finance.html; do
    if [ -f "$file" ] && [ "$file" != "trades/plumber-finance.html" ]; then
        sed -i '' 's/>GET FUNDED NOW/>APPLY NOW/g' "$file"
        # Remove SVG arrow if present
        sed -i '' '/<svg width="32"/,/<\/svg>/d' "$file"
        echo "Updated button: $file"
    fi
done

echo "Update complete!"

# Also update location-specific pages
echo "Updating location pages..."

for file in trades/locations/*/*-finance.html; do
    if [ -f "$file" ]; then
        # Update CSS
        sed -i '' 's/trade-hero-complete\.css/trade-hero-homepage-style.css/g' "$file"
        sed -i '' 's/Complete hero section with visuals/Homepage-style hero section/g' "$file"
        
        # Add warning banner if not present
        if ! grep -q "warning-banner" "$file"; then
            sed -i '' '/<body>/a\
    <!-- Warning Banner -->\
    <div class="warning-banner">\
        BUSINESS & PERSONAL LOANS: Rates from 6.5%. Business loans £25K-£1M. Personal loans available.\
    </div>\
    ' "$file"
        fi
        
        echo "Updated: $file"
    fi
done

echo "All trade pages updated to homepage style!"