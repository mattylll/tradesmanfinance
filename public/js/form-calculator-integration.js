/**
 * Form Calculator Integration
 * Pulls calculator data from sessionStorage and populates the contact form
 */

document.addEventListener('DOMContentLoaded', function() {
    // Prevent double execution
    if (window._calculatorIntegrationLoaded) return;
    window._calculatorIntegrationLoaded = true;

    // Check if we're on the contact page - support both form IDs
    const contactForm = document.getElementById('contact-form') || document.getElementById('contactForm');
    if (!contactForm) return;

    // Try to get calculator data from sessionStorage
    const calculatorDataStr = sessionStorage.getItem('calculatorData');
    if (!calculatorDataStr) return;

    try {
        const calculatorData = JSON.parse(calculatorDataStr);
        
        // Populate the amount field
        const amountField = document.getElementById('amount');
        if (amountField && calculatorData.loanAmount) {
            // Format the amount nicely
            const amount = parseInt(calculatorData.loanAmount);
            amountField.value = '£' + amount.toLocaleString('en-GB');
        }
        
        // Add a calculator summary box at the top of the form
        const formHeader = document.querySelector('.form-header-industrial');
        if (formHeader && calculatorData.monthlyPayment) {
            const summaryBox = document.createElement('div');
            summaryBox.className = 'calculator-summary-box';
            summaryBox.innerHTML = `
                <div class="summary-title">YOUR FINANCE QUOTE</div>
                <div class="summary-grid">
                    <div class="summary-item">
                        <span class="summary-label">Loan Amount:</span>
                        <span class="summary-value">£${parseInt(calculatorData.loanAmount).toLocaleString('en-GB')}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Term:</span>
                        <span class="summary-value">${calculatorData.loanTerm} months</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Monthly Payment:</span>
                        <span class="summary-value">${calculatorData.monthlyPayment}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Rate:</span>
                        <span class="summary-value">${calculatorData.interestRate}% APR</span>
                    </div>
                </div>
                <div class="summary-note">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                    This is your personalized quote based on your calculator inputs
                </div>
            `;
            
            // Insert after the form header
            formHeader.parentNode.insertBefore(summaryBox, formHeader.nextSibling);
        }
        
        // Check if there's a message/notes field to add calculator details
        const messageField = document.getElementById('message') || document.querySelector('textarea[name="message"]');
        if (messageField && !messageField.value) {
            // Pre-fill with calculator details
            messageField.value = `Calculator Quote Details:
- Loan Amount: £${parseInt(calculatorData.loanAmount).toLocaleString('en-GB')}
- Term: ${calculatorData.loanTerm} months
- Interest Rate: ${calculatorData.interestRate}% APR
- Monthly Payment: ${calculatorData.monthlyPayment}
- Total Interest: ${calculatorData.totalInterest}
- Total to Repay: ${calculatorData.totalAmount}

Additional Notes: `;
        }
        
        // Add hidden fields to preserve calculator data in form submission
        const form = document.querySelector('form');
        if (form) {
            // Add hidden fields for calculator data
            const hiddenFields = [
                { name: 'calculator_amount', value: calculatorData.loanAmount },
                { name: 'calculator_term', value: calculatorData.loanTerm },
                { name: 'calculator_rate', value: calculatorData.interestRate },
                { name: 'calculator_monthly', value: calculatorData.monthlyPayment },
                { name: 'calculator_total', value: calculatorData.totalAmount }
            ];
            
            hiddenFields.forEach(field => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = field.name;
                input.value = field.value;
                form.appendChild(input);
            });
        }
        
        // Add some CSS for the summary box
        if (!document.getElementById('calculator-summary-styles')) {
            const style = document.createElement('style');
            style.id = 'calculator-summary-styles';
            style.textContent = `
                .calculator-summary-box {
                    background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
                    border: 3px solid #ffd93d;
                    border-radius: 0;
                    padding: 25px;
                    margin: 20px 0 30px 0;
                    position: relative;
                    box-shadow: 5px 5px 0 rgba(0,0,0,0.3);
                }
                
                .calculator-summary-box::before {
                    content: '';
                    position: absolute;
                    top: -3px;
                    left: -3px;
                    right: -3px;
                    bottom: -3px;
                    background: repeating-linear-gradient(
                        45deg,
                        #ffd93d,
                        #ffd93d 10px,
                        #1a1a1a 10px,
                        #1a1a1a 20px
                    );
                    z-index: -1;
                }
                
                .summary-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1.8rem;
                    color: #fff;
                    margin-bottom: 15px;
                    text-shadow: 2px 2px 0 rgba(0,0,0,0.3);
                }
                
                .summary-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-bottom: 15px;
                }
                
                .summary-item {
                    background: rgba(255,255,255,0.1);
                    padding: 10px;
                    border-left: 3px solid #ffd93d;
                }
                
                .summary-label {
                    display: block;
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.9);
                    margin-bottom: 5px;
                }
                
                .summary-value {
                    display: block;
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #fff;
                }
                
                .summary-note {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px;
                    background: rgba(0,0,0,0.2);
                    color: rgba(255,255,255,0.9);
                    font-size: 0.9rem;
                }
                
                .summary-note svg {
                    flex-shrink: 0;
                    fill: #ffd93d;
                }
                
                @media (max-width: 768px) {
                    .summary-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
    } catch (error) {
        // Silently fail if data is corrupted
        console.error('Error loading calculator data:', error);
    }
});