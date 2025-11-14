#!/bin/bash

# Function to update a location index.html file
update_location_file() {
    local file="$1"
    echo "Processing: $file"
    
    # Check if already has Guides dropdown
    if grep -q "Guides Dropdown" "$file"; then
        echo "  Already has Guides in header"
        return 0
    fi
    
    # Create temp file
    temp_file="${file}.tmp"
    
    # Process the file
    awk '
    /<!-- Locations Dropdown -->/ {
        in_locations = 1
    }
    in_locations && /<\/li>[ \t]*$/ && !found_end {
        print
        found_end = 1
        print ""
        print "                    <!-- Guides Dropdown -->"
        print "                    <li class=\"has-dropdown\">"
        print "                        <a href=\"../../../blog/\">Guides</a>"
        print "                        <div class=\"dropdown-menu\">"
        print "                            <div class=\"dropdown-section\">"
        print "                                <h3>Equipment Guides</h3>"
        print "                                <div class=\"dropdown-links\">"
        print "                                    <a href=\"../../../blog/scaffolding-materials-finance-guide.html\">Scaffolding Materials Finance</a>"
        print "                                    <a href=\"../../../blog/woodworking-equipment-finance-options.html\">Woodworking Equipment Finance</a>"
        print "                                    <a href=\"../../../blog/metalwork-equipment-financing.html\">Metalwork Equipment Financing</a>"
        print "                                </div>"
        print "                            </div>"
        print "                            <div class=\"dropdown-section\">"
        print "                                <h3>Trade Finance Guides</h3>"
        print "                                <div class=\"dropdown-links\">"
        print "                                    <a href=\"../../../blog/bathroom-fitting-finance-explained.html\">Bathroom Fitting Finance</a>"
        print "                                    <a href=\"../../../blog/home-tradesman-equipment-loans.html\">Home Tradesman Startup Finance</a>"
        print "                                    <a href=\"../../../blog/\">View All Guides →</a>"
        print "                                </div>"
        print "                            </div>"
        print "                        </div>"
        print ""
        print "                        <!-- Mobile submenu -->"
        print "                        <div class=\"mobile-submenu\">"
        print "                            <a href=\"../../../blog/scaffolding-materials-finance-guide.html\">Scaffolding Finance</a>"
        print "                            <a href=\"../../../blog/woodworking-equipment-finance-options.html\">Woodworking Equipment</a>"
        print "                            <a href=\"../../../blog/bathroom-fitting-finance-explained.html\">Bathroom Fitting</a>"
        print "                            <a href=\"../../../blog/\">View All Guides →</a>"
        print "                        </div>"
        print "                    </li>"
        in_locations = 0
        next
    }
    {print}
    ' "$file" > "$temp_file"
    
    # Add footer section if needed
    if ! grep -q "GUIDES & RESOURCES" "$file"; then
        awk '
        /<div class="footer-trust">/ {
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
        }
        {print}
        ' "$temp_file" > "${temp_file}2"
        mv "${temp_file}2" "$temp_file"
    fi
    
    # Replace original file
    mv "$temp_file" "$file"
    echo "  Updated successfully"
}

# Update location index files that need it
for city in bradford bristol cardiff coventry edinburgh glasgow greater-london greater-manchester leeds leicester liverpool london manchester newcastle nottingham sheffield west-midlands; do
    file="trades/locations/$city/index.html"
    if [ -f "$file" ]; then
        update_location_file "$file"
    fi
done

echo "All location pages updated!"
