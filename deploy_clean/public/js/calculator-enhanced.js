/**
 * Enhanced Calculator Functionality
 * Handles the new calculator design with display values
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cache calculator elements
    const loanAmountSlider = document.getElementById('loanAmountSlider');
    const loanAmountInput = document.getElementById('loanAmount');
    const loanAmountDisplay = document.getElementById('loanAmountDisplay');
    
    const loanTermSlider = document.getElementById('loanTermSlider');
    const loanTermInput = document.getElementById('loanTerm');
    const loanTermDisplay = document.getElementById('loanTermDisplay');
    
    const interestRateSlider = document.getElementById('interestRateSlider');
    const interestRateInput = document.getElementById('interestRate');
    const interestRateDisplay = document.getElementById('interestRateDisplay');
    
    const monthlyPaymentEl = document.getElementById('monthlyPayment');
    const totalInterestEl = document.getElementById('totalInterest');
    const totalAmountEl = document.getElementById('totalAmount');
    
    // Check if calculator elements exist
    if (!loanAmountSlider || !loanTermSlider || !interestRateSlider) {
        return; // Exit if not on calculator page
    }
    
    // ================================================================
    // CALCULATOR FUNCTIONS
    // ================================================================
    
    /**
     * Format number as currency
     */
    function formatCurrency(amount) {
        return '£' + Math.round(amount).toLocaleString('en-GB');
    }
    
    /**
     * Format number with commas
     */
    function formatNumber(num) {
        return Math.round(num).toLocaleString('en-GB');
    }
    
    /**
     * Calculate loan details
     */
    function calculateLoan() {
        const principal = parseFloat(loanAmountInput.value);
        const months = parseFloat(loanTermInput.value);
        const annualRate = parseFloat(interestRateInput.value);
        
        // Convert annual rate to monthly rate
        const monthlyRate = (annualRate / 100) / 12;
        
        // Calculate monthly payment using amortization formula
        const monthlyPayment = principal * 
            (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
            (Math.pow(1 + monthlyRate, months) - 1);
        
        // Calculate totals
        const totalAmount = monthlyPayment * months;
        const totalInterest = totalAmount - principal;
        
        return {
            monthlyPayment: monthlyPayment,
            totalInterest: totalInterest,
            totalAmount: totalAmount
        };
    }
    
    /**
     * Update display values
     */
    function updateDisplay() {
        // Update display values
        if (loanAmountDisplay) {
            loanAmountDisplay.textContent = formatCurrency(loanAmountInput.value);
        }
        
        if (loanTermDisplay) {
            loanTermDisplay.textContent = loanTermInput.value;
        }
        
        if (interestRateDisplay) {
            interestRateDisplay.textContent = interestRateInput.value + '%';
        }
        
        // Calculate and update results
        const results = calculateLoan();
        
        if (monthlyPaymentEl) {
            monthlyPaymentEl.textContent = formatCurrency(results.monthlyPayment);
            // Add animation
            monthlyPaymentEl.style.transform = 'scale(1.05)';
            setTimeout(() => {
                monthlyPaymentEl.style.transform = 'scale(1)';
            }, 200);
        }
        
        if (totalInterestEl) {
            totalInterestEl.textContent = formatCurrency(results.totalInterest);
        }
        
        if (totalAmountEl) {
            totalAmountEl.textContent = formatCurrency(results.totalAmount);
        }
        
        // Update ARIA live regions for accessibility
        announceChange();
    }
    
    /**
     * Announce changes to screen readers
     */
    function announceChange() {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Monthly payment updated to ${monthlyPaymentEl.textContent}`;
        
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }
    
    /**
     * Sync slider with input
     */
    function syncInputs(source, target) {
        target.value = source.value;
    }
    
    // ================================================================
    // EVENT LISTENERS
    // ================================================================
    
    // Loan amount controls
    loanAmountSlider.addEventListener('input', function() {
        syncInputs(this, loanAmountInput);
        updateDisplay();
    });
    
    loanAmountInput.addEventListener('change', function() {
        // Validate input
        const value = parseFloat(this.value);
        const min = parseFloat(this.min);
        const max = parseFloat(this.max);
        
        if (value < min) this.value = min;
        if (value > max) this.value = max;
        
        syncInputs(this, loanAmountSlider);
        updateDisplay();
    });
    
    // Loan term controls
    loanTermSlider.addEventListener('input', function() {
        syncInputs(this, loanTermInput);
        updateDisplay();
    });
    
    loanTermInput.addEventListener('change', function() {
        // Validate input
        const value = parseFloat(this.value);
        const min = parseFloat(this.min);
        const max = parseFloat(this.max);
        
        if (value < min) this.value = min;
        if (value > max) this.value = max;
        
        syncInputs(this, loanTermSlider);
        updateDisplay();
    });
    
    // Interest rate controls
    interestRateSlider.addEventListener('input', function() {
        syncInputs(this, interestRateInput);
        updateDisplay();
    });
    
    interestRateInput.addEventListener('change', function() {
        // Validate input
        const value = parseFloat(this.value);
        const min = parseFloat(this.min);
        const max = parseFloat(this.max);
        
        if (value < min) this.value = min;
        if (value > max) this.value = max;
        
        syncInputs(this, interestRateSlider);
        updateDisplay();
    });
    
    // ================================================================
    // KEYBOARD NAVIGATION
    // ================================================================
    
    // Add keyboard shortcuts for sliders
    [loanAmountSlider, loanTermSlider, interestRateSlider].forEach(slider => {
        slider.addEventListener('keydown', function(e) {
            const step = parseFloat(this.step);
            const value = parseFloat(this.value);
            
            switch(e.key) {
                case 'ArrowUp':
                case 'ArrowRight':
                    e.preventDefault();
                    this.value = value + step;
                    this.dispatchEvent(new Event('input'));
                    break;
                case 'ArrowDown':
                case 'ArrowLeft':
                    e.preventDefault();
                    this.value = value - step;
                    this.dispatchEvent(new Event('input'));
                    break;
                case 'Home':
                    e.preventDefault();
                    this.value = this.min;
                    this.dispatchEvent(new Event('input'));
                    break;
                case 'End':
                    e.preventDefault();
                    this.value = this.max;
                    this.dispatchEvent(new Event('input'));
                    break;
            }
        });
    });
    
    // ================================================================
    // STORE CALCULATOR DATA
    // ================================================================
    
    window.storeCalculatorData = function() {
        const data = {
            loanAmount: loanAmountInput.value,
            loanTerm: loanTermInput.value,
            interestRate: interestRateInput.value,
            monthlyPayment: monthlyPaymentEl.textContent,
            totalInterest: totalInterestEl.textContent,
            totalAmount: totalAmountEl.textContent,
            timestamp: new Date().toISOString()
        };
        
        // Store in sessionStorage for form pre-population
        sessionStorage.setItem('calculatorData', JSON.stringify(data));
        
        // Track event if analytics is available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'calculator_apply', {
                'loan_amount': data.loanAmount,
                'loan_term': data.loanTerm,
                'interest_rate': data.interestRate
            });
        }
        
        return true;
    };
    
    // ================================================================
    // INITIALIZE
    // ================================================================
    
    // Set initial display values
    updateDisplay();
    
    // Add smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        .result-value {
            transition: transform 0.2s ease;
        }
        
        .input-display {
            transition: color 0.2s ease, transform 0.2s ease;
        }
        
        input[type="range"]:active + .input-display {
            color: #ff8c42;
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
    
    // ================================================================
    // PERFORMANCE OPTIMIZATION
    // ================================================================
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Use debounced update for smoother performance on slower devices
    const debouncedUpdate = debounce(updateDisplay, 10);
    
    // Option to use debounced version for better performance
    if (window.matchMedia('(max-width: 768px)').matches) {
        // Use debounced version on mobile for better performance
        [loanAmountSlider, loanTermSlider, interestRateSlider].forEach(slider => {
            slider.removeEventListener('input', updateDisplay);
            slider.addEventListener('input', debouncedUpdate);
        });
    }
});