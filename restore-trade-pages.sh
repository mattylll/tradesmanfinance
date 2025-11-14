#!/bin/bash

echo "Restoring and fixing all trade pages..."

# Function to fix truncated files by ensuring proper closing tags
fix_trade_page() {
    local file="$1"
    local trade_name="$2"
    local trade_title="$3"
    local subtitle="$4"
    
    # Check if file is truncated (missing closing tags)
    if ! grep -q "</html>" "$file"; then
        echo "Fixing truncated file: $file"
        
        # Add missing sections based on trade type
        cat >> "$file" << 'EOF'
                </div>
            </div>
        </section>

        <!-- Pain Points Section -->
        <section class="pain-points">
            <div class="container">
                <h2 class="section-title">COMMON CHALLENGES WE SOLVE</h2>
                <div class="pain-grid">
                    <div class="pain-card">
                        <h3>Equipment Finance</h3>
                        <p>Get the latest tools and equipment with flexible payment plans tailored to your cash flow.</p>
                    </div>
                    <div class="pain-card">
                        <h3>Working Capital</h3>
                        <p>Bridge the gap between jobs and payments with quick access to working capital.</p>
                    </div>
                    <div class="pain-card">
                        <h3>Vehicle Finance</h3>
                        <p>Finance vans and vehicles essential for your trade with competitive rates.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Benefits Section -->
        <section class="benefits-section">
            <div class="container">
                <h2 class="section-title">WHY CHOOSE TRADESMAN FINANCE</h2>
                <ul class="benefits-list">
                    <li><strong>24 Hour Decisions:</strong> Get answers fast, not in weeks</li>
                    <li><strong>Bad Credit OK:</strong> We look at your business, not just your credit score</li>
                    <li><strong>Flexible Terms:</strong> 1-5 year terms to match your needs</li>
                    <li><strong>No Hidden Fees:</strong> Transparent pricing from day one</li>
                </ul>
            </div>
        </section>

        <!-- Finance Options -->
        <section class="finance-options">
            <div class="container">
                <h2 class="section-title">FINANCE OPTIONS AVAILABLE</h2>
                <div class="options-grid">
                    <div class="option-card">
                        <h3>Equipment Finance</h3>
                        <p>£1,000 - £150,000</p>
                        <ul>
                            <li>New and used equipment</li>
                            <li>Spread the cost over 1-5 years</li>
                            <li>Tax efficient funding</li>
                        </ul>
                    </div>
                    <div class="option-card">
                        <h3>Business Loans</h3>
                        <p>£5,000 - £500,000</p>
                        <ul>
                            <li>Unsecured options available</li>
                            <li>Fixed monthly payments</li>
                            <li>Use for any business purpose</li>
                        </ul>
                    </div>
                    <div class="option-card">
                        <h3>Asset Finance</h3>
                        <p>£1,000 - £250,000</p>
                        <ul>
                            <li>Release cash from existing assets</li>
                            <li>Refinance equipment you own</li>
                            <li>Improve cash flow immediately</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works -->
        <section class="how-it-works">
            <div class="container">
                <h2 class="section-title">HOW IT WORKS</h2>
                <div class="process-steps">
                    <div class="process-step">
                        <div class="step-number">1</div>
                        <h3>Apply Online</h3>
                        <p>Quick 2-minute application</p>
                    </div>
                    <div class="process-step">
                        <div class="step-number">2</div>
                        <h3>Get Decision</h3>
                        <p>Response within 24 hours</p>
                    </div>
                    <div class="process-step">
                        <div class="step-number">3</div>
                        <h3>Receive Funds</h3>
                        <p>Money in your account fast</p>
                    </div>
                    <div class="process-step">
                        <div class="step-number">4</div>
                        <h3>Grow Business</h3>
                        <p>Use funds to expand and profit</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Trust Section -->
        <section class="trust-section">
            <div class="container">
                <h2 class="section-title">TRUSTED BY TRADESMEN</h2>
                <div class="trust-grid">
                    <div class="trust-stat">
                        <span class="trust-number">4,200+</span>
                        <span class="trust-label">Businesses Funded</span>
                    </div>
                    <div class="trust-stat">
                        <span class="trust-number">£180M+</span>
                        <span class="trust-label">Total Funded</span>
                    </div>
                    <div class="trust-stat">
                        <span class="trust-number">4.7/5</span>
                        <span class="trust-label">Customer Rating</span>
                    </div>
                    <div class="trust-stat">
                        <span class="trust-number">96%</span>
                        <span class="trust-label">Would Recommend</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section">
            <div class="container">
                <h2>Ready to Flow with Success?</h2>
                <p>Get your plumbing business funded in 24 hours</p>
                <a href="../contact.html" class="btn-massive-industrial">APPLY NOW</a>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="industrial-footer">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>TRADESMAN FINANCE</h3>
                    <p>Built tough for UK trades. We fund your business ambitions with honest advice and real results.</p>
                </div>
                <div class="footer-section">
                    <h4>QUICK LINKS</h4>
                    <ul>
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="../services.html">Services</a></li>
                        <li><a href="../about.html">About</a></li>
                        <li><a href="../contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>TRADES</h4>
                    <ul>
                        <li><a href="electrician-finance.html">Electrician Finance</a></li>
                        <li><a href="plumber-finance.html">Plumber Finance</a></li>
                        <li><a href="builder-finance.html">Builder Finance</a></li>
                        <li><a href="carpenter-finance.html">Carpenter Finance</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>CONTACT</h4>
                    <p>📞 020 3778 0274</p>
                    <p>✉️ info@tradesmanfinance.co.uk</p>
                    <p>Mon-Fri: 9am-5:30pm</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2023 Tradesman Finance Ltd. All Rights Reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="../public/js/main.js"></script>
    <script src="../public/js/dropdown-menu.js"></script>
    <script src="../public/js/stats-animation.js"></script>
    <script src="../public/js/industrial-animations.js"></script>
</body>
</html>
EOF
    fi
}

# Fix all truncated files
fix_trade_page "trades/electrician-finance.html" "Electrician" "ELECTRICIAN FINANCE FOR PROPER TRADES" "POWER UP YOUR BUSINESS"
fix_trade_page "trades/builder-finance.html" "Builder" "BUILDER FINANCE FOR PROPER TRADES" "BUILD YOUR EMPIRE"
fix_trade_page "trades/carpenter-finance.html" "Carpenter" "CARPENTER FINANCE FOR PROPER TRADES" "CRAFT YOUR FUTURE"
fix_trade_page "trades/heating-engineer-finance.html" "Heating Engineer" "HEATING ENGINEER FINANCE FOR PROPER TRADES" "HEAT UP YOUR BUSINESS"
fix_trade_page "trades/roofer-finance.html" "Roofer" "ROOFER FINANCE FOR PROPER TRADES" "REACH NEW HEIGHTS"

# Check all other trade pages
for file in trades/*-finance.html; do
    if ! grep -q "</html>" "$file"; then
        basename=$(basename "$file")
        echo "Fixing: $basename"
        fix_trade_page "$file" "Trade" "TRADE FINANCE FOR PROPER TRADES" "GROW YOUR BUSINESS"
    fi
done

# Update CSS references to use final fix
for file in trades/*-finance.html trades/locations/*/*-finance.html; do
    if [ -f "$file" ]; then
        # Replace the homepage style CSS with final fix
        sed -i '' 's/trade-hero-homepage-style\.css/trade-pages-final-fix.css/g' "$file"
        echo "Updated CSS: $file"
    fi
done

echo "All trade pages restored and fixed!"