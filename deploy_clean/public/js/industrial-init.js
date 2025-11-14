/**
 * Industrial Theme Initialization
 * Initializes all industrial theme components
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize calculator if section exists
    const calculatorSection = document.getElementById('calculator-section');
    if (calculatorSection) {
        initializeIndustrialCalculator();
    }
    
    // Initialize testimonial carousel
    initializeTestimonialCarousel();
    
    // Initialize trust ticker
    initializeTrustTicker();
});

function initializeIndustrialCalculator() {
    const calculatorHTML = `
        <div class="calculator-container">
            <h2 class="calculator-title">BUILD YOUR LOAN</h2>
            <p class="calculator-subtitle">See what you could borrow. No credit check. No obligations.</p>
            
            <div class="calculator-form">
                <div class="calc-input-group">
                    <label for="calcAmount">How much do you need?</label>
                    <div class="range-input-wrapper">
                        <input type="range" id="calcAmountSlider" min="25000" max="1000000" step="5000" value="150000">
                        <input type="number" id="calcAmount" min="25000" max="1000000" step="5000" value="150000">
                    </div>
                    <div class="range-labels">
                        <span>£25K</span>
                        <span>£1M</span>
                    </div>
                </div>
                
                <div class="calc-input-group">
                    <label for="calcTerm">Over how many months?</label>
                    <div class="range-input-wrapper">
                        <input type="range" id="calcTermSlider" min="3" max="60" step="1" value="36">
                        <input type="number" id="calcTerm" min="3" max="60" step="1" value="36">
                    </div>
                    <div class="range-labels">
                        <span>3 months</span>
                        <span>60 months</span>
                    </div>
                </div>
                
                <div class="calc-results">
                    <div class="result-item">
                        <span class="result-label">Estimated Monthly Payment</span>
                        <span class="result-value" id="monthlyPaymentCalc">£4,583</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Total Repayment</span>
                        <span class="result-value" id="totalRepaymentCalc">£165,000</span>
                    </div>
                </div>
                
                <div class="calc-actions">
                    <a href="contact.html" class="btn-industrial btn-primary-industrial">
                        GET THIS DEAL
                    </a>
                    <p class="calc-disclaimer">Representative APR 12.9%. Rates from 6.9% to 29.9%.</p>
                </div>
            </div>
        </div>
    `;
    
    const calculatorSection = document.querySelector('.industrial-calculator-section .container');
    if (calculatorSection) {
        calculatorSection.innerHTML = calculatorHTML;
        
        // Set up calculator functionality
        const amountSlider = document.getElementById('calcAmountSlider');
        const amountInput = document.getElementById('calcAmount');
        const termSlider = document.getElementById('calcTermSlider');
        const termInput = document.getElementById('calcTerm');
        
        function updateCalculation() {
            const amount = parseInt(amountInput.value);
            const term = parseInt(termInput.value);
            const rate = 0.129 / 12; // 12.9% APR monthly
            
            const monthlyPayment = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
            const totalRepayment = monthlyPayment * term;
            
            document.getElementById('monthlyPaymentCalc').textContent = '£' + Math.round(monthlyPayment).toLocaleString();
            document.getElementById('totalRepaymentCalc').textContent = '£' + Math.round(totalRepayment).toLocaleString();
        }
        
        // Update slider background
        function updateSliderBackground(slider) {
            const min = slider.min;
            const max = slider.max;
            const val = slider.value;
            const percentage = ((val - min) / (max - min)) * 100;
            slider.style.background = `linear-gradient(to right, #ff6b35 0%, #ff6b35 ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
        }
        
        // Sync sliders and inputs
        amountSlider.addEventListener('input', function() {
            amountInput.value = this.value;
            updateSliderBackground(this);
            updateCalculation();
        });
        
        amountInput.addEventListener('input', function() {
            amountSlider.value = this.value;
            updateSliderBackground(amountSlider);
            updateCalculation();
        });
        
        termSlider.addEventListener('input', function() {
            termInput.value = this.value;
            updateSliderBackground(this);
            updateCalculation();
        });
        
        termInput.addEventListener('input', function() {
            termSlider.value = this.value;
            updateSliderBackground(termSlider);
            updateCalculation();
        });
        
        // Initial slider backgrounds
        updateSliderBackground(amountSlider);
        updateSliderBackground(termSlider);
        
        // Initial calculation
        updateCalculation();
    }
}

function initializeTestimonialCarousel() {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;
    
    // Clone testimonials for infinite scroll
    const testimonials = track.querySelectorAll('.industrial-testimonial');
    testimonials.forEach(testimonial => {
        const clone = testimonial.cloneNode(true);
        track.appendChild(clone);
    });
}

function initializeTrustTicker() {
    const ticker = document.querySelector('.trust-ticker');
    if (!ticker) return;
    
    // Ticker animation is handled by CSS
    ticker.style.animation = 'ticker 30s linear infinite';
}