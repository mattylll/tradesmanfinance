/**
 * Formspree Integration for TradesmanFinance.co.uk
 * Endpoint: https://formspree.io/f/mdklyrlp
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Formspree endpoint
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdklyrlp';
    
    // Configure form
    contactForm.action = FORMSPREE_ENDPOINT;
    contactForm.method = 'POST';
    
    // Handle submission with AJAX for better UX
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Create FormData
        const formData = new FormData(contactForm);
        
        // Add calculator data if present
        const calculatorData = sessionStorage.getItem('calculatorData');
        if (calculatorData) {
            const calcDetails = JSON.parse(calculatorData);
            formData.append('_calculator_quote', `
                Amount: £${parseInt(calcDetails.loanAmount).toLocaleString('en-GB')}
                Term: ${calcDetails.loanTerm} months
                Rate: ${calcDetails.interestRate}% APR
                Monthly: ${calcDetails.monthlyPayment}
                Total: ${calcDetails.totalAmount}
            `);
        }
        
        // Add metadata
        formData.append('_subject', `New Finance Enquiry - ${formData.get('business') || 'TradesmanFinance'}`);
        
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Success!
                showNotification('success', 'Thank you for your enquiry! We\'ll contact you within 24 hours.');
                
                // Clear form
                contactForm.reset();
                
                // Clear calculator data
                sessionStorage.removeItem('calculatorData');
                
                // Remove calculator summary if present
                const summaryBox = document.querySelector('.calculator-summary-box');
                if (summaryBox) summaryBox.remove();
                
                // Hide clear button
                const clearBtn = document.getElementById('clearQuote');
                if (clearBtn) clearBtn.style.display = 'none';
                
                // Track conversion
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'form_name': 'contact',
                        'service': formData.get('service'),
                        'amount': formData.get('amount')
                    });
                }
                
            } else {
                // Handle errors
                if (data.errors) {
                    const errorMessages = data.errors.map(err => err.message).join(', ');
                    throw new Error(errorMessages);
                } else {
                    throw new Error('Form submission failed');
                }
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('error', 'Sorry, there was an error sending your enquiry. Please try again or call us on 020 3778 0274.');
        } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
    
    function showNotification(type, message) {
        // Remove any existing notifications
        const existing = document.querySelector('.form-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `form-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    ${type === 'success' ? 
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>' : 
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 2L2 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/></svg>'
                    }
                </div>
                <div class="notification-message">${message}</div>
            </div>
        `;
        
        // Insert at top of form container
        const formContainer = contactForm.closest('.contact-form-industrial') || contactForm.parentElement;
        formContainer.insertBefore(notification, formContainer.firstChild);
        
        // Scroll to notification
        notification.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 8000);
    }
    
    // Add styles for notifications
    if (!document.getElementById('formspree-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'formspree-notification-styles';
        style.textContent = `
            .form-notification {
                margin-bottom: 30px;
                border: 3px solid;
                background: #fff;
                box-shadow: 5px 5px 0 rgba(0,0,0,0.2);
                animation: slideDown 0.3s ease;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 20px;
                padding: 20px;
            }
            
            .notification-success {
                border-color: #4ade80;
                background: linear-gradient(to right, #dcfce7 0%, #fff 100%);
            }
            
            .notification-success .notification-icon {
                color: #22c55e;
            }
            
            .notification-error {
                border-color: #ff6b35;
                background: linear-gradient(to right, #fee2e2 0%, #fff 100%);
            }
            
            .notification-error .notification-icon {
                color: #ff6b35;
            }
            
            .notification-icon {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: currentColor;
                border-radius: 0;
                position: relative;
            }
            
            .notification-icon svg {
                stroke: white;
                width: 24px;
                height: 24px;
            }
            
            .notification-icon::after {
                content: '';
                position: absolute;
                inset: -3px;
                border: 3px solid currentColor;
                opacity: 0.3;
            }
            
            .notification-message {
                flex: 1;
                font-size: 16px;
                font-weight: 600;
                color: #1a1a1a;
                line-height: 1.5;
            }
            
            @keyframes slideDown {
                from {
                    transform: translateY(-20px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: translateY(-10px);
                }
            }
            
            @media (max-width: 768px) {
                .notification-content {
                    gap: 15px;
                    padding: 15px;
                }
                
                .notification-message {
                    font-size: 14px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Log form configuration
    console.log('Formspree integration active - Endpoint:', FORMSPREE_ENDPOINT);
});