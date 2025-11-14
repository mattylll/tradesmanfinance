/**
 * Email Fallback for Form Submission
 * Provides immediate form functionality using mailto: links
 * Replace this with proper backend when ready
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Override the submit handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            business: document.getElementById('business').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim(),
            amount: document.getElementById('amount').value.trim()
        };
        
        // Build email body
        let emailBody = `New Finance Enquiry from TradesmanFinance.co.uk\n\n`;
        emailBody += `Name: ${formData.name}\n`;
        emailBody += `Business: ${formData.business}\n`;
        emailBody += `Email: ${formData.email}\n`;
        emailBody += `Phone: ${formData.phone || 'Not provided'}\n`;
        emailBody += `Amount Needed: ${formData.amount || 'Not specified'}\n`;
        emailBody += `Service Type: ${formData.service || 'Not specified'}\n`;
        emailBody += `\nMessage:\n${formData.message}\n`;
        emailBody += `\n---\nSent from: ${window.location.href}`;
        
        // Create mailto link
        const subject = encodeURIComponent('New Finance Enquiry - ' + formData.business);
        const body = encodeURIComponent(emailBody);
        const recipient = 'info@tradesmanfinance.co.uk'; // CHANGE THIS TO YOUR EMAIL
        
        // Option 1: Open email client
        const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
        
        // Show instructions
        const modal = document.createElement('div');
        modal.className = 'email-modal';
        modal.innerHTML = `
            <div class="email-modal-content">
                <h2>Complete Your Enquiry</h2>
                <p>Your form data has been prepared. Choose how to send:</p>
                
                <div class="email-options">
                    <button onclick="window.open('${mailtoLink}', '_blank'); this.parentElement.parentElement.parentElement.remove();" class="btn-email-client">
                        Open Email Client
                        <small>Opens your default email app with pre-filled message</small>
                    </button>
                    
                    <div class="manual-email">
                        <h3>Or Copy & Send Manually:</h3>
                        <p><strong>Send to:</strong> ${recipient}</p>
                        <p><strong>Subject:</strong> New Finance Enquiry - ${formData.business}</p>
                        <textarea readonly onclick="this.select();">${emailBody}</textarea>
                        <button onclick="navigator.clipboard.writeText(this.previousElementSibling.value); alert('Copied to clipboard!'); this.parentElement.parentElement.parentElement.parentElement.remove();">
                            Copy to Clipboard
                        </button>
                    </div>
                </div>
                
                <button onclick="this.parentElement.parentElement.remove();" class="close-modal">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles
        if (!document.getElementById('email-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'email-modal-styles';
            style.textContent = `
                .email-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s;
                }
                
                .email-modal-content {
                    background: #fff;
                    padding: 30px;
                    max-width: 600px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    border: 3px solid #ff6b35;
                    box-shadow: 10px 10px 0 rgba(0,0,0,0.3);
                }
                
                .email-modal h2 {
                    color: #1a1a1a;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 2rem;
                    margin-bottom: 15px;
                }
                
                .email-modal p {
                    color: #666;
                    margin-bottom: 20px;
                }
                
                .email-options {
                    margin: 20px 0;
                }
                
                .btn-email-client {
                    display: block;
                    width: 100%;
                    padding: 15px;
                    background: #ff6b35;
                    color: #fff;
                    border: none;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-bottom: 30px;
                    transition: all 0.2s;
                }
                
                .btn-email-client:hover {
                    background: #ff8c42;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 0 rgba(0,0,0,0.3);
                }
                
                .btn-email-client small {
                    display: block;
                    font-size: 14px;
                    font-weight: normal;
                    margin-top: 5px;
                }
                
                .manual-email {
                    border-top: 2px solid #eee;
                    padding-top: 20px;
                }
                
                .manual-email h3 {
                    color: #333;
                    margin-bottom: 15px;
                }
                
                .manual-email textarea {
                    width: 100%;
                    height: 150px;
                    padding: 10px;
                    border: 2px solid #ddd;
                    font-family: monospace;
                    font-size: 12px;
                    margin: 10px 0;
                    resize: vertical;
                }
                
                .manual-email button {
                    background: #4ade80;
                    color: #1a1a1a;
                    border: 2px solid #1a1a1a;
                    padding: 10px 20px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .manual-email button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 3px 0 rgba(0,0,0,0.3);
                }
                
                .close-modal {
                    background: #666;
                    color: #fff;
                    border: none;
                    padding: 10px 30px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 20px;
                    transition: all 0.2s;
                }
                
                .close-modal:hover {
                    background: #333;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @media (max-width: 768px) {
                    .email-modal-content {
                        padding: 20px;
                        width: 95%;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Track submission attempt
        console.log('Form submission data:', formData);
        
        // Store submission locally (for debugging)
        const submissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
        submissions.push({
            ...formData,
            timestamp: new Date().toISOString(),
            url: window.location.href
        });
        localStorage.setItem('form_submissions', JSON.stringify(submissions));
        
        // Clear form
        contactForm.reset();
        
        // Clear calculator data if present
        sessionStorage.removeItem('calculatorData');
    });
});