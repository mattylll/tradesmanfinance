/**
 * @fileoverview Main JavaScript functionality for TradesmanFinance.co.uk
 * Handles loan calculator, contact form, mobile menu, and page interactions
 * @author TradesmanFinance Development Team
 * @version 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    /**
     * Initializes the loan calculator functionality
     * Sets up input/slider synchronization and loan calculations
     * @function initializeLoanCalculator
     */
    function initializeLoanCalculator() {
        const loanAmountInput = document.getElementById('loanAmount');
        const loanAmountSlider = document.getElementById('loanAmountSlider');
        const loanTermInput = document.getElementById('loanTerm');
        const loanTermSlider = document.getElementById('loanTermSlider');
        const interestRateInput = document.getElementById('interestRate');
        const interestRateSlider = document.getElementById('interestRateSlider');
        
        if (!loanAmountInput || !loanTermInput || !interestRateInput) {
            return;
        }
        
        /**
         * Synchronizes input values with slider values
         * @function syncInputs
         * @inner
         */
        function syncInputs() {
            loanAmountInput.value = loanAmountSlider.value;
            loanTermInput.value = loanTermSlider.value;
            interestRateInput.value = interestRateSlider.value;
            calculateLoan();
        }
        
        /**
         * Synchronizes slider values with input values
         * @function syncSliders
         * @inner
         */
        function syncSliders() {
            loanAmountSlider.value = loanAmountInput.value;
            loanTermSlider.value = loanTermInput.value;
            interestRateSlider.value = interestRateInput.value;
            calculateLoan();
        }
        
        /**
         * Calculates loan details using amortization formula
         * Updates monthly payment, total interest, and total amount displays
         * @function calculateLoan
         * @inner
         */
        function calculateLoan() {
            const principal = parseFloat(loanAmountInput.value);
            const months = parseInt(loanTermInput.value);
            const annualRate = parseFloat(interestRateInput.value);
            const monthlyRate = annualRate / 100 / 12;
            
            // Calculate monthly payment using amortization formula
            const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                                  (Math.pow(1 + monthlyRate, months) - 1);
            
            const totalAmount = monthlyPayment * months;
            const totalInterest = totalAmount - principal;
            
            // Update display
            document.getElementById('monthlyPayment').textContent = '£' + monthlyPayment.toFixed(2);
            document.getElementById('totalInterest').textContent = '£' + totalInterest.toFixed(2);
            document.getElementById('totalAmount').textContent = '£' + totalAmount.toFixed(2);
        }
        
        // Event listeners
        loanAmountSlider.addEventListener('input', syncInputs);
        loanTermSlider.addEventListener('input', syncInputs);
        interestRateSlider.addEventListener('input', syncInputs);
        
        loanAmountInput.addEventListener('input', syncSliders);
        loanTermInput.addEventListener('input', syncSliders);
        interestRateInput.addEventListener('input', syncSliders);
        
        /**
         * Stores calculator values in sessionStorage for form pre-filling
         * @function storeCalculatorData
         * @inner
         */
        function storeCalculatorData() {
            const calculatorData = {
                loanAmount: loanAmountInput.value,
                loanTerm: loanTermInput.value,
                interestRate: interestRateInput.value,
                monthlyPayment: document.getElementById('monthlyPayment').textContent
            };
            sessionStorage.setItem('calculatorData', JSON.stringify(calculatorData));
        }
        
        // Make storeCalculatorData globally available for onclick
        window.storeCalculatorData = storeCalculatorData;
        
        // Update storage when values change
        [loanAmountInput, loanTermInput, interestRateInput].forEach(input => {
            input.addEventListener('input', storeCalculatorData);
        });
        
        // Initial calculation
        calculateLoan();
        storeCalculatorData();
    }
    
    // Initialize calculator if on homepage
    initializeLoanCalculator();
    
    /**
     * Pre-fills contact form with calculator data if available
     * @function prefillContactForm
     */
    function prefillContactForm() {
        // Skip if form-calculator-integration.js already handled this
        if (window._calculatorIntegrationLoaded) return;

        const calculatorData = sessionStorage.getItem('calculatorData');
        if (calculatorData && contactForm) {
            const data = JSON.parse(calculatorData);
            const amountField = document.getElementById('amount');
            const messageField = document.getElementById('message');

            if (amountField && !amountField.value) {
                amountField.value = '£' + parseInt(data.loanAmount).toLocaleString();
            }

            if (messageField && !messageField.value) {
                const defaultMessage = `I'm interested in borrowing ${amountField.value} over ${data.loanTerm} months. Based on your calculator, the monthly payment would be approximately ${data.monthlyPayment}.`;
                messageField.value = defaultMessage;
            }
        }
    }
    
    // Enhanced Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Pre-fill form if coming from calculator
        prefillContactForm();
        // Add loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                business: document.getElementById('business').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim(),
                amount: document.getElementById('amount').value.trim(),
                website: document.getElementById('website') ? document.getElementById('website').value : '' // Honeypot field
            };
            
            // Validation
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Please fill out all required fields.', 'error');
                return;
            }
            
            // Business validation
            if (!formData.business) {
                showNotification('Please enter your business name. We only provide commercial lending.', 'error');
                return;
            }
            
            // Amount validation (minimum £25k)
            if (formData.amount) {
                const amountNum = parseInt(formData.amount.replace(/[£,]/g, ''));
                if (amountNum < 25000) {
                    showNotification('Minimum loan amount is £25,000. We specialize in commercial lending.', 'error');
                    return;
                }
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Phone validation (UK format)
            if (formData.phone && !/^[\d\s+()-]+$/.test(formData.phone)) {
                showNotification('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission (replace with actual API call)
            try {
                // Send data to backend API
                const result = await submitFormToAPI(formData);
                
                // Success
                showNotification('Thank you for your enquiry! We will get back to you within 24 hours.', 'success');
                contactForm.reset();
                
                // Track submission (analytics)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'form_name': 'contact',
                        'service_interest': formData.service
                    });
                }
            } catch (error) {
                showNotification('Sorry, there was an error sending your message. Please try again or call us directly.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
    
    /**
     * Submits form data to backend API with CSRF protection
     * @async
     * @function submitFormToAPI
     * @param {Object} data - Form data to submit
     * @param {string} data.name - Contact name
     * @param {string} data.email - Contact email
     * @param {string} data.business - Business name
     * @param {string} data.message - Contact message
     * @returns {Promise<Object>} API response
     * @throws {Error} When submission fails
     */
    async function submitFormToAPI(data) {
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:3001/api/leads/submit' 
            : 'https://api.tradesmanfinance.co.uk/api/leads/submit';
        
        try {
            // Restructure data to match backend schema
            const submissionData = {
                firstName: data.name?.split(' ')[0] || '',
                lastName: data.name?.split(' ').slice(1).join(' ') || '',
                email: data.email,
                phone: data.phone || '',
                businessName: data.business || data.businessName || 'Not specified',
                tradeType: data.trade || 'builder', // Default to builder if not specified
                location: {
                    city: data.city || '',
                    postcode: data.postcode || ''
                },
                financeDetails: {
                    purpose: data.service || 'working-capital',
                    amount: parseInt(data.amount) || 50000,
                    urgency: data.urgency || 'this-month'
                },
                businessInfo: {
                    yearsTrading: parseInt(data.yearsTrading) || 1,
                    monthlyRevenue: parseInt(data.monthlyRevenue) || 10000
                }
            };
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submissionData)
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                // Handle specific error cases
                if (response.status === 409) {
                    throw new Error('Security validation failed. Please refresh the page and try again.');
                }
                throw new Error(result.message || 'Submission failed');
            }
            
            return result;
        } catch (error) {
            // Log error silently in production
            throw error;
        }
    }
    
    /**
     * Shows notification message to user
     * @function showNotification
     * @param {string} message - Message to display
     * @param {string} type - Notification type ('success', 'error', 'info')
     */
    function showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Insert at top of page
        document.body.insertBefore(notification, document.body.firstChild);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle - Skip if mobile-menu-handler.js is loaded
    // Check for existing toggle button (by class or ID)
    const existingToggle = document.querySelector('.mobile-menu-toggle');
    if (existingToggle) {
        // Mobile menu is handled by mobile-menu-handler.js
        return; // Exit early to prevent duplicate functionality
    }
    
    // Legacy mobile menu code (kept for backward compatibility)
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('nav') || document.querySelector('.industrial-nav');
    const header = document.querySelector('header') || document.querySelector('.industrial-header');
    
    // Only create overlay if no existing mobile menu handler
    if (!document.querySelector('.mobile-menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
    }
    
    const updatedMobileMenuToggle = mobileMenuToggle;
    
    if (updatedMobileMenuToggle && nav) {
        updatedMobileMenuToggle.addEventListener('click', function() {
            const isOpen = nav.classList.contains('mobile-open');
            
            nav.classList.toggle('mobile-open');
            updatedMobileMenuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            overlay.classList.toggle('active');
            
            // Update aria-expanded
            updatedMobileMenuToggle.setAttribute('aria-expanded', !isOpen);
            
            // Animate hamburger to X
            if (!isOpen) {
                updatedMobileMenuToggle.classList.add('is-active');
            } else {
                updatedMobileMenuToggle.classList.remove('is-active');
            }
        });
        
        // Close menu when clicking on overlay
        overlay.addEventListener('click', function() {
            nav.classList.remove('mobile-open');
            updatedMobileMenuToggle.classList.remove('active', 'is-active');
            document.body.classList.remove('menu-open');
            overlay.classList.remove('active');
            updatedMobileMenuToggle.setAttribute('aria-expanded', 'false');
        });
        
        // Close menu when clicking on a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-open');
                updatedMobileMenuToggle.classList.remove('active', 'is-active');
                document.body.classList.remove('menu-open');
                overlay.classList.remove('active');
                updatedMobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('mobile-open')) {
                nav.classList.remove('mobile-open');
                updatedMobileMenuToggle.classList.remove('active', 'is-active');
                document.body.classList.remove('menu-open');
                overlay.classList.remove('active');
                updatedMobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Touch gesture support for swipe-to-close
        let touchStartX = 0;
        let touchEndX = 0;
        
        nav.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        nav.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            // Swipe right to close (50px threshold)
            if (touchEndX > touchStartX + 50 && nav.classList.contains('mobile-open')) {
                nav.classList.remove('mobile-open');
                updatedMobileMenuToggle.classList.remove('active', 'is-active');
                document.body.classList.remove('menu-open');
                overlay.classList.remove('active');
                updatedMobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Add scroll effect to header
    let lastScroll = 0;
    // header is already declared above, no need to redeclare
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
    
    // Form field animations
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        if (input) {
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
            
            // Check initial values
            if (input.value) {
                group.classList.add('focused');
            }
        }
    });
});