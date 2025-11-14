#!/bin/bash

# Function to update navigation in a file
update_nav() {
    local file="$1"
    echo "  Updating $file"
    
    # Create temp file
    temp_file="${file}.tmp"
    
    # Check if file already has Guides dropdown
    if grep -q "Guides Dropdown" "$file"; then
        echo "    Already has Guides dropdown"
        cp "$file" "$temp_file"
    else
        # Add Guides after Locations in nav
        sed '/<a href="[^"]*locations[^"]*">Locations<\/a><\/li>/a\
                    <li><a href="../../../blog/">Guides</a></li>' "$file" > "$temp_file"
    fi
    
    # Check if footer needs update
    if ! grep -q "GUIDES & RESOURCES" "$temp_file"; then
        # Add footer section before footer-trust
        awk '
        /<div class="footer-trust">/ && !added {
            print "                    <div class=\"footer-links-section\">"
            print "                        <h3>GUIDES & RESOURCES</h3>"
            print "                        <ul role=\"list\">"
            print "                            <li><a href=\"../../../blog/\">Equipment Finance Guides</a></li>"
            print "                            <li><a href=\"../../../blog/scaffolding-materials-finance-guide.html\">Scaffolding Finance</a></li>"
            print "                            <li><a href=\"../../../blog/woodworking-equipment-finance-options.html\">Woodworking Equipment</a></li>"
            print "                            <li><a href=\"../../../blog/bathroom-fitting-finance-explained.html\">Bathroom Fitting</a></li>"
            print "                        </ul>"
            print "                    </div>"
            print ""
            added = 1
        }
        {print}
        ' "$temp_file" > "${temp_file}2"
        mv "${temp_file}2" "$temp_file"
    fi
    
    # Replace original file
    mv "$temp_file" "$file"
    echo "    Done"
}

# Update Birmingham trade pages
echo "Updating Birmingham trade pages..."
update_nav "trades/locations/birmingham/builder-finance.html"
update_nav "trades/locations/birmingham/carpenter-finance.html"
update_nav "trades/locations/birmingham/plumber-finance.html"

# Update London trade pages
echo "Updating London trade pages..."
for file in trades/locations/london/*-finance.html; do
    if [ -f "$file" ]; then
        update_nav "$file"
    fi
done

# Update Manchester trade pages
echo "Updating Manchester trade pages..."
for file in trades/locations/manchester/*-finance.html; do
    if [ -f "$file" ]; then
        update_nav "$file"
    fi
done

echo "All city trade pages updated!"
