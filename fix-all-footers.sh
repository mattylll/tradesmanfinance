#!/bin/bash

# Fix all footer issues on trade pages

echo "🔧 Fixing footer structure on all trade pages..."
echo "=============================================="

# Create proper footer HTML template
FOOTER_HTML='    <!-- Industrial Footer -->
    <footer class="industrial-footer" role="contentinfo">
        <div class="footer-top">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <div class="footer-logo">
                            <div class="logo-badge">TF</div>
                            <h3>TRADESMAN FINANCE</h3>
                        </div>
                        <p>Built tough for UK trades. No fancy talk, just proper business finance when you need it.</p>
                        <div class="contact-quick">
                            <a href="tel:02037780274" class="phone-big" aria-label="Call us on 020 3778 0274">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                                    <path d="M20 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3zm-1.5 1.5L13 12v-7c0-.55-.45-1-1-1s-1 .45-1 1v7c0 .38.21.71.53.88l5.5 3.18c.48.28 1.09.11 1.37-.37.28-.48.11-1.09-.37-1.37l-3.53-2.04z"/>
                                </svg>
                                020 3778 0274
                            </a>
                            <span class="open-hours">MON-FRI 9-6, SAT 9-1</span>
                        </div>
                    </div>
                    
                    <div class="footer-links-section">
                        <h3>WHAT WE DO</h3>
                        <ul role="list">
                            <li><a href="../services.html#equipment">Equipment Finance</a></li>
                            <li><a href="../services.html#business">Business Loans</a></li>
                            <li><a href="../services.html#invoice">Invoice Finance</a></li>
                            <li><a href="../services.html#vehicle">Vehicle Finance</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links-section">
                        <h3>THE COMPANY</h3>
                        <ul role="list">
                            <li><a href="../about.html">About Us</a></li>
                            <li><a href="#">How It Works</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="../contact.html">Get in Touch</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-trust">
                        <h3>WHY TRUST US</h3>
                        <div class="trust-badges">
                            <div class="trust-badge-item">
                                <span class="badge-icon">50K+</span>
                                <span class="badge-text">Happy Trades</span>
                            </div>
                            <div class="trust-badge-item">
                                <span class="badge-icon">£50M</span>
                                <span class="badge-text">Funded</span>
                            </div>
                            <div class="trust-badge-item">
                                <span class="badge-icon">24hr</span>
                                <span class="badge-text">Decisions</span>
                            </div>
                        </div>
                        <p style="margin-top: 20px; font-size: 12px; color: #808080;">We'\''re a finance broker, not a lender. We find you the best deals.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <div class="footer-bottom-content">
                    <p>&copy; 2025 Tradesman Finance Ltd. Company Reg: 123456. Built in Britain.</p>
                    <div class="footer-legal">
                        <a href="../privacy-policy.html">Privacy</a>
                        <span>|</span>
                        <a href="#">Terms</a>
                        <span>|</span>
                        <a href="#">Cookies</a>
                        <span>|</span>
                        <a href="../accessibility-statement.html">Accessibility</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>'

# Function to fix a single file
fix_footer() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    echo "Fixing: $(basename $file)"
    
    # Read everything up to the footer
    awk '/<footer|<!-- Footer|<!-- Industrial Footer/ {exit} 1' "$file" > "$temp_file"
    
    # Add the proper footer
    echo "$FOOTER_HTML" >> "$temp_file"
    
    # Add the closing scripts and body/html tags
    echo "" >> "$temp_file"
    echo "    <!-- Scripts -->" >> "$temp_file"
    echo "    <script src=\"../public/js/main.js\"></script>" >> "$temp_file"
    echo "    <!-- Mobile menu handler - fixes duplicate hamburger issue -->" >> "$temp_file"
    echo "    <script src=\"../public/js/mobile-menu-handler.js\"></script>" >> "$temp_file"
    echo "    <script src=\"../public/js/loader-fix.js\"></script>" >> "$temp_file"
    echo "    <script src=\"../public/js/dropdown-menu.js\"></script>" >> "$temp_file"
    echo "</body>" >> "$temp_file"
    echo "</html>" >> "$temp_file"
    
    # Replace the original file
    mv "$temp_file" "$file"
}

# Fix location pages footer (with adjusted paths)
fix_location_footer() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    echo "Fixing location page: $(basename $(dirname $file))/$(basename $file)"
    
    # Read everything up to the footer
    awk '/<footer|<!-- Footer|<!-- Industrial Footer/ {exit} 1' "$file" > "$temp_file"
    
    # Add footer with corrected paths for location pages (3 levels deep)
    cat >> "$temp_file" << 'EOF'
    <!-- Industrial Footer -->
    <footer class="industrial-footer" role="contentinfo">
        <div class="footer-top">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <div class="footer-logo">
                            <div class="logo-badge">TF</div>
                            <h3>TRADESMAN FINANCE</h3>
                        </div>
                        <p>Built tough for UK trades. No fancy talk, just proper business finance when you need it.</p>
                        <div class="contact-quick">
                            <a href="tel:02037780274" class="phone-big" aria-label="Call us on 020 3778 0274">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                                    <path d="M20 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3zm-1.5 1.5L13 12v-7c0-.55-.45-1-1-1s-1 .45-1 1v7c0 .38.21.71.53.88l5.5 3.18c.48.28 1.09.11 1.37-.37.28-.48.11-1.09-.37-1.37l-3.53-2.04z"/>
                                </svg>
                                020 3778 0274
                            </a>
                            <span class="open-hours">MON-FRI 9-6, SAT 9-1</span>
                        </div>
                    </div>
                    
                    <div class="footer-links-section">
                        <h3>WHAT WE DO</h3>
                        <ul role="list">
                            <li><a href="../../../services.html#equipment">Equipment Finance</a></li>
                            <li><a href="../../../services.html#business">Business Loans</a></li>
                            <li><a href="../../../services.html#invoice">Invoice Finance</a></li>
                            <li><a href="../../../services.html#vehicle">Vehicle Finance</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links-section">
                        <h3>THE COMPANY</h3>
                        <ul role="list">
                            <li><a href="../../../about.html">About Us</a></li>
                            <li><a href="#">How It Works</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="../../../contact.html">Get in Touch</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-trust">
                        <h3>WHY TRUST US</h3>
                        <div class="trust-badges">
                            <div class="trust-badge-item">
                                <span class="badge-icon">50K+</span>
                                <span class="badge-text">Happy Trades</span>
                            </div>
                            <div class="trust-badge-item">
                                <span class="badge-icon">£50M</span>
                                <span class="badge-text">Funded</span>
                            </div>
                            <div class="trust-badge-item">
                                <span class="badge-icon">24hr</span>
                                <span class="badge-text">Decisions</span>
                            </div>
                        </div>
                        <p style="margin-top: 20px; font-size: 12px; color: #808080;">We're a finance broker, not a lender. We find you the best deals.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <div class="footer-bottom-content">
                    <p>&copy; 2025 Tradesman Finance Ltd. Company Reg: 123456. Built in Britain.</p>
                    <div class="footer-legal">
                        <a href="../../../privacy-policy.html">Privacy</a>
                        <span>|</span>
                        <a href="#">Terms</a>
                        <span>|</span>
                        <a href="#">Cookies</a>
                        <span>|</span>
                        <a href="../../../accessibility-statement.html">Accessibility</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="../../../public/js/main.js"></script>
    <!-- Mobile menu handler - fixes duplicate hamburger issue -->
    <script src="../../../public/js/mobile-menu-handler.js"></script>
    <script src="../../../public/js/loader-fix.js"></script>
    <script src="../../../public/js/dropdown-menu.js"></script>
</body>
</html>
EOF
    
    # Replace the original file
    mv "$temp_file" "$file"
}

# Fix main trade pages
echo ""
echo "📁 Fixing main trade pages..."
for file in trades/*-finance.html; do
    if [ -f "$file" ]; then
        # Skip plumber-finance as it already has correct structure
        if [[ "$file" == *"plumber-finance.html" ]]; then
            echo "Skipping plumber-finance.html (already correct)"
            continue
        fi
        fix_footer "$file"
    fi
done

# Fix location pages
echo ""
echo "📁 Fixing location trade pages..."
for file in trades/locations/*/*-finance.html; do
    if [ -f "$file" ]; then
        fix_location_footer "$file"
    fi
done

echo ""
echo "✅ All footers have been fixed!"
echo ""
echo "Summary:"
echo "- Fixed footer structure to match homepage"
echo "- Added proper classes (footer-top, footer-grid, etc.)"
echo "- Fixed all ARIA attributes"
echo "- Ensured proper paths for links"