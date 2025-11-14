/**
 * Accessible Calculator
 * Ensures calculator is keyboard navigable and screen reader friendly
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to calculator inputs
    const calculatorInputs = document.querySelectorAll('.calculator-form input[type="range"], .calculator-form input[type="number"]');
    
    calculatorInputs.forEach(input => {
        // Add aria-valuemin, aria-valuemax, aria-valuenow
        if (input.type === 'range') {
            input.setAttribute('role', 'slider');
            input.setAttribute('aria-valuemin', input.min);
            input.setAttribute('aria-valuemax', input.max);
            input.setAttribute('aria-valuenow', input.value);
            
            // Update aria-valuenow on change
            input.addEventListener('input', function() {
                this.setAttribute('aria-valuenow', this.value);
                
                // Announce changes to screen readers
                const announcement = document.createElement('div');
                announcement.setAttribute('role', 'status');
                announcement.setAttribute('aria-live', 'polite');
                announcement.className = 'sr-only';
                
                if (this.id.includes('Amount')) {
                    announcement.textContent = `Loan amount changed to £${parseInt(this.value).toLocaleString()}`;
                } else if (this.id.includes('Term')) {
                    announcement.textContent = `Loan term changed to ${this.value} months`;
                }
                
                document.body.appendChild(announcement);
                setTimeout(() => announcement.remove(), 1000);
            });
        }
    });
    
    // Ensure calculator results are announced
    const resultElements = document.querySelectorAll('.calc-results .result-value');
    resultElements.forEach(result => {
        result.setAttribute('aria-live', 'polite');
        result.setAttribute('aria-atomic', 'true');
    });
    
    // Add keyboard navigation hints
    const calculatorContainer = document.querySelector('.calculator-container');
    if (calculatorContainer) {
        const helpText = document.createElement('p');
        helpText.className = 'sr-only';
        helpText.textContent = 'Use arrow keys to adjust slider values. Tab to navigate between fields.';
        calculatorContainer.insertBefore(helpText, calculatorContainer.firstChild);
    }
    
    // Ensure focus styles are visible
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .calculator-form input:focus {
            outline: 3px solid #ff6b35;
            outline-offset: 2px;
        }
        
        .calculator-form .btn-industrial:focus {
            outline: 3px solid #ff6b35;
            outline-offset: 2px;
        }
        
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0,0,0,0);
            white-space: nowrap;
            border-width: 0;
        }
    `;
    document.head.appendChild(focusStyle);
});