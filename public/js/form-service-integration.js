/**
 * Form Service Integration
 * Automatically sends form submissions via email
 * Multiple service options included - uncomment the one you want to use
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Remove any existing submit handlers
    const newForm = contactForm.cloneNode(true);
    contactForm.parentNode.replaceChild(newForm, contactForm);
    
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // ============================================
    // OPTION 1: Web3Forms (No signup required, just get key)
    // Get your key at: https://web3forms.com/
    // ============================================
    
    const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY_HERE'; // Replace with your key
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        const formData = new FormData(form);
        formData.append("access_key", WEB3FORMS_KEY);
        
        // Add calculator data if present
        const calculatorData = sessionStorage.getItem('calculatorData');
        if (calculatorData) {
            formData.append("calculator_data", calculatorData);
        }
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                showNotification('Thank you! We\'ll get back to you within 24 hours.', 'success');
                form.reset();
                sessionStorage.removeItem('calculatorData');
                
                // Remove calculator summary if present
                const summaryBox = document.querySelector('.calculator-summary-box');
                if (summaryBox) summaryBox.remove();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            showNotification('Sorry, there was an error. Please try again or call us.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
    
    
    // ============================================
    // OPTION 2: Formspree (Free tier available)
    // Sign up at: https://formspree.io
    // ============================================
    /*
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your endpoint
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Thank you! We\'ll get back to you within 24 hours.', 'success');
                form.reset();
                sessionStorage.removeItem('calculatorData');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            showNotification('Sorry, there was an error. Please try again or call us.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
    */
    
    
    // ============================================
    // OPTION 3: FormSubmit (No signup, just email)
    // Just use your email as the endpoint
    // ============================================
    /*
    const YOUR_EMAIL = 'your-email@example.com'; // Replace with your email
    form.action = `https://formsubmit.co/${YOUR_EMAIL}`;
    form.method = 'POST';
    
    // Add hidden fields for FormSubmit features
    const hiddenFields = [
        { name: '_subject', value: 'New Finance Enquiry from Website' },
        { name: '_captcha', value: 'false' }, // Disable captcha
        { name: '_template', value: 'table' }, // Use table template
        { name: '_next', value: window.location.origin + '/thank-you.html' } // Redirect after
    ];
    
    hiddenFields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        form.appendChild(input);
    });
    */
    
    
    // ============================================
    // OPTION 4: EmailJS (Free tier, 200 emails/month)
    // Sign up at: https://www.emailjs.com/
    // ============================================
    /*
    // Add EmailJS SDK to your HTML: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form);
            showNotification('Thank you! We\'ll get back to you within 24 hours.', 'success');
            form.reset();
            sessionStorage.removeItem('calculatorData');
        } catch (error) {
            showNotification('Sorry, there was an error. Please try again or call us.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
    */
    
    
    // ============================================
    // OPTION 5: Getform (Free tier available)
    // Sign up at: https://getform.io/
    // ============================================
    /*
    const GETFORM_ENDPOINT = 'https://getform.io/f/YOUR_FORM_ID'; // Replace with your endpoint
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch(GETFORM_ENDPOINT, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showNotification('Thank you! We\'ll get back to you within 24 hours.', 'success');
                form.reset();
                sessionStorage.removeItem('calculatorData');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            showNotification('Sorry, there was an error. Please try again or call us.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
    */
    
    
    // Notification helper
    function showNotification(message, type) {
        // Remove any existing notifications
        const existing = document.querySelector('.form-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `form-notification form-notification-${type}`;
        notification.textContent = message;
        
        // Insert after form
        form.parentNode.insertBefore(notification, form.nextSibling);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    // Add notification styles
    if (!document.getElementById('form-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'form-notification-styles';
        style.textContent = `
            .form-notification {
                padding: 20px;
                margin: 20px 0;
                border: 3px solid;
                font-weight: bold;
                text-align: center;
                animation: slideIn 0.3s;
            }
            
            .form-notification-success {
                background: #4ade80;
                border-color: #22c55e;
                color: #14532d;
            }
            
            .form-notification-error {
                background: #fca5a5;
                border-color: #ef4444;
                color: #7f1d1d;
            }
            
            @keyframes slideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
});

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Choose one of the 5 options above
 * 2. Sign up for the service (most have free tiers)
 * 3. Get your API key/endpoint
 * 4. Uncomment that option's code
 * 5. Comment out or delete the other options
 * 6. Replace the placeholder values with your actual credentials
 * 
 * RECOMMENDED SERVICES:
 * 
 * - Web3Forms: Easiest, no signup, just get a key
 * - FormSubmit: Simplest, just use your email address
 * - Formspree: Most popular, reliable, good free tier
 * - EmailJS: Good for custom email templates
 * - Getform: Good analytics and file uploads
 */