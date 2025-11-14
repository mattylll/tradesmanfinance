/**
 * FormSubmit Integration - NO SIGNUP REQUIRED
 * Just replace the email address below
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // ===== CHANGE THIS EMAIL ADDRESS =====
    const YOUR_EMAIL = 'info@tradesmanfinance.co.uk'; // CHANGE THIS TO YOUR EMAIL
    // =====================================
    
    // Configure form for FormSubmit
    contactForm.action = `https://formsubmit.co/${YOUR_EMAIL}`;
    contactForm.method = 'POST';
    
    // Add FormSubmit configuration fields
    const configs = [
        { name: '_subject', value: 'New Finance Enquiry - TradesmanFinance.co.uk' },
        { name: '_captcha', value: 'false' }, // Disable captcha for better UX
        { name: '_template', value: 'table' }, // Clean table format in email
        { name: '_autoresponse', value: 'Thank you for your enquiry! We will get back to you within 24 hours.' },
        { name: '_next', value: window.location.origin + '/contact.html?success=true' } // Redirect back with success
    ];
    
    // Add hidden configuration fields
    configs.forEach(config => {
        if (!contactForm.querySelector(`input[name="${config.name}"]`)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = config.name;
            input.value = config.value;
            contactForm.appendChild(input);
        }
    });
    
    // Handle AJAX submission for better UX
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Add calculator data if present
        const calculatorData = sessionStorage.getItem('calculatorData');
        if (calculatorData) {
            const calcInput = document.createElement('input');
            calcInput.type = 'hidden';
            calcInput.name = 'calculator_quote';
            calcInput.value = calculatorData;
            contactForm.appendChild(calcInput);
        }
        
        try {
            // Submit form data
            const formData = new FormData(contactForm);
            
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
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
                
            } else {
                throw new Error('Submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('error', 'Sorry, there was an error. Please try again or call us on 020 3778 0274.');
        } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
    
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showNotification('success', 'Thank you for your enquiry! We\'ll contact you within 24 hours.');
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    function showNotification(type, message) {
        // Remove any existing notifications
        const existing = document.querySelector('.form-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `form-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                ${type === 'success' ? '✓' : '⚠'}
            </div>
            <div class="notification-message">${message}</div>
        `;
        
        // Insert at top of form
        const formContainer = contactForm.closest('.contact-form-industrial') || contactForm.parentElement;
        formContainer.insertBefore(notification, formContainer.firstChild);
        
        // Scroll to notification
        notification.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 10000);
    }
    
    // Add styles for notifications
    if (!document.getElementById('formsubmit-styles')) {
        const style = document.createElement('style');
        style.id = 'formsubmit-styles';
        style.textContent = `
            .form-notification {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 20px;
                margin-bottom: 30px;
                border: 3px solid;
                font-weight: 600;
                transition: opacity 0.3s;
                animation: slideDown 0.3s ease;
            }
            
            .notification-success {
                background: #dcfce7;
                border-color: #4ade80;
                color: #166534;
            }
            
            .notification-error {
                background: #fee2e2;
                border-color: #f87171;
                color: #991b1b;
            }
            
            .notification-icon {
                font-size: 24px;
                font-weight: bold;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: currentColor;
                color: white;
            }
            
            .notification-success .notification-icon {
                background: #4ade80;
            }
            
            .notification-error .notification-icon {
                background: #f87171;
            }
            
            .notification-message {
                flex: 1;
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
        `;
        document.head.appendChild(style);
    }
});

/**
 * HOW IT WORKS:
 * 
 * 1. FormSubmit is a free service that sends form data to your email
 * 2. No signup required - just use your email address
 * 3. First submission will send a confirmation email to activate
 * 4. After activation, all submissions go directly to your inbox
 * 
 * FEATURES:
 * - Sends formatted emails with all form data
 * - Auto-response to users
 * - Spam protection built-in
 * - Works immediately
 * 
 * ACTIVATION:
 * 1. Submit a test form
 * 2. Check your email for activation link
 * 3. Click the link to activate
 * 4. All future submissions will be sent automatically
 */