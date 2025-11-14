/**
 * Trade Forms Engine
 * Beautiful, engaging multi-step forms with Typeform-like functionality
 * Maintains industrial aesthetic of Tradesman Finance
 */

class TradeForm {
    constructor(config) {
        this.config = config;
        this.currentStep = 0;
        this.formData = {};
        this.container = null;
        this.progress = 0;
        this.totalSteps = config.steps.length;
        
        // Animation timing
        this.animationDuration = 400;
        this.typewriterSpeed = 50;
        
        // Initialize
        this.init();
    }
    
    init() {
        // Create form container
        this.container = document.getElementById(this.config.containerId);
        if (!this.container) {
            return;
        }
        
        // Clear container and add form class
        this.container.innerHTML = '';
        this.container.className = 'trade-form-container';
        
        // Create form structure
        this.createFormStructure();
        
        // Load saved progress if exists
        this.loadProgress();
        
        // Show first step
        this.showStep(this.currentStep);
        
        // Bind keyboard navigation
        this.bindKeyboardNavigation();
    }
    
    createFormStructure() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'trade-form-progress';
        progressBar.innerHTML = `
            <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: 0%"></div>
                <div class="progress-bolts">
                    ${this.createProgressBolts()}
                </div>
            </div>
            <div class="progress-text">
                <span class="progress-step">Step <span class="current-step">1</span> of ${this.totalSteps}</span>
                <span class="progress-percentage">0%</span>
            </div>
        `;
        
        // Create form wrapper
        const formWrapper = document.createElement('div');
        formWrapper.className = 'trade-form-wrapper';
        
        // Create step container
        const stepContainer = document.createElement('div');
        stepContainer.className = 'trade-form-steps';
        
        // Create navigation
        const navigation = document.createElement('div');
        navigation.className = 'trade-form-navigation';
        navigation.innerHTML = `
            <button type="button" class="btn-form-back" style="display: none;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back
            </button>
            <button type="button" class="btn-form-next">
                Continue
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        `;
        
        // Append all elements
        formWrapper.appendChild(stepContainer);
        formWrapper.appendChild(navigation);
        
        this.container.appendChild(progressBar);
        this.container.appendChild(formWrapper);
        
        // Store references
        this.progressBar = progressBar.querySelector('.progress-bar-fill');
        this.progressText = progressBar.querySelector('.progress-percentage');
        this.currentStepText = progressBar.querySelector('.current-step');
        this.stepContainer = stepContainer;
        this.backButton = navigation.querySelector('.btn-form-back');
        this.nextButton = navigation.querySelector('.btn-form-next');
        
        // Bind navigation events
        this.backButton.addEventListener('click', () => this.previousStep());
        this.nextButton.addEventListener('click', () => this.nextStep());
    }
    
    createProgressBolts() {
        let bolts = '';
        for (let i = 0; i < this.totalSteps; i++) {
            bolts += `<div class="progress-bolt ${i === 0 ? 'active' : ''}" data-step="${i}"></div>`;
        }
        return bolts;
    }
    
    showStep(stepIndex) {
        const step = this.config.steps[stepIndex];
        if (!step) return;
        
        // Update current step
        this.currentStep = stepIndex;
        
        // Function to show the step content
        const showStepContent = () => {
            this.stepContainer.innerHTML = '';
            
            // Create step content
            const stepContent = document.createElement('div');
            stepContent.className = 'trade-form-step active';
            stepContent.setAttribute('data-step', stepIndex);
            
            // Add step HTML based on type
            const stepHTML = this.createStepHTML(step);
            stepContent.innerHTML = stepHTML;
            
            // Append to container
            this.stepContainer.appendChild(stepContent);
            
            // Make sure content is visible
            stepContent.style.display = 'block';
            stepContent.style.opacity = '1';
            stepContent.style.transform = 'translateX(0)';
            
            // Apply typewriter effect to question if applicable
            if (step.question && stepIndex > 0) {
                const questionElement = stepContent.querySelector('.step-question');
                if (questionElement) {
                    // Show the question immediately for now
                    questionElement.textContent = step.question;
                    // Optionally add typewriter effect later
                    // this.typewriterEffect(questionElement);
                }
            }
            
            // Focus first input
            setTimeout(() => {
                const firstInput = stepContent.querySelector('input, select, textarea');
                if (firstInput) firstInput.focus();
            }, this.animationDuration);
            
            // Update progress
            this.updateProgress();
            
            // Update navigation
            this.updateNavigation();
            
            // Bind step-specific events
            this.bindStepEvents(step, stepContent);
        };

        // Always show content immediately for now to avoid animation issues
        showStepContent();
    }
    
    createStepHTML(step) {
        let html = '';
        
        // Add trade icon if welcome step
        if (step.type === 'welcome') {
            html += `
                <div class="step-icon-large">
                    ${this.config.icon}
                </div>
            `;
        }
        
        // Add question
        if (step.question) {
            html += `<h2 class="step-question" data-text="${step.question}"></h2>`;
        }
        
        // Add subtitle if exists
        if (step.subtitle) {
            html += `<p class="step-subtitle">${step.subtitle}</p>`;
        }
        
        // Add input based on type
        switch (step.type) {
            case 'welcome':
                html += `
                    <div class="welcome-content">
                        <h1 class="welcome-title">Let's Get Your ${this.config.tradeName} Business Funded</h1>
                        <p class="welcome-subtitle">Takes just ${this.config.estimatedTime} minutes • No obligation • Instant decision</p>
                    </div>
                `;
                break;
                
            case 'text':
                html += `
                    <div class="input-group">
                        <input type="text" 
                               id="${step.id}" 
                               name="${step.id}" 
                               placeholder="${step.placeholder || ''}"
                               ${step.required ? 'required' : ''}
                               class="form-input-large">
                        ${step.hint ? `<span class="input-hint">${step.hint}</span>` : ''}
                    </div>
                `;
                break;
                
            case 'email':
                html += `
                    <div class="input-group">
                        <input type="email" 
                               id="${step.id}" 
                               name="${step.id}" 
                               placeholder="${step.placeholder || ''}"
                               ${step.required ? 'required' : ''}
                               class="form-input-large">
                        <span class="input-validation"></span>
                    </div>
                `;
                break;
                
            case 'phone':
                html += `
                    <div class="input-group">
                        <input type="tel" 
                               id="${step.id}" 
                               name="${step.id}" 
                               placeholder="${step.placeholder || ''}"
                               ${step.required ? 'required' : ''}
                               class="form-input-large">
                        <span class="input-hint">We'll only call about your application</span>
                    </div>
                `;
                break;
                
            case 'select-cards':
                html += `
                    <div class="select-cards-grid">
                        ${step.options.map(option => `
                            <div class="select-card" data-value="${option.value}">
                                ${option.icon ? `<div class="card-icon">${option.icon}</div>` : ''}
                                <div class="card-title">${option.label}</div>
                                ${option.description ? `<div class="card-description">${option.description}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
                break;
                
            case 'slider':
                html += `
                    <div class="slider-group">
                        <div class="slider-value-display">
                            <span class="currency">£</span>
                            <span class="slider-value">${step.defaultValue || step.min}</span>
                        </div>
                        <div class="slider-container">
                            <input type="range" 
                                   id="${step.id}" 
                                   name="${step.id}" 
                                   min="${step.min}" 
                                   max="${step.max}" 
                                   step="${step.step || 1000}" 
                                   value="${step.defaultValue || step.min}"
                                   class="form-slider">
                            <div class="slider-labels">
                                <span>£${(step.min / 1000).toFixed(0)}k</span>
                                <span>£${(step.max / 1000).toFixed(0)}k</span>
                            </div>
                        </div>
                        ${step.hint ? `<span class="input-hint">${step.hint}</span>` : ''}
                    </div>
                `;
                break;
                
            case 'checkbox-cards':
                html += `
                    <div class="checkbox-cards-grid">
                        ${step.options.map(option => `
                            <label class="checkbox-card">
                                <input type="checkbox" name="${step.id}" value="${option.value}">
                                <div class="checkbox-card-content">
                                    ${option.icon ? `<div class="card-icon">${option.icon}</div>` : ''}
                                    <div class="card-title">${option.label}</div>
                                    <div class="checkbox-indicator"></div>
                                </div>
                            </label>
                        `).join('')}
                    </div>
                `;
                break;
                
            case 'emoji-select':
                html += `
                    <div class="emoji-select-group">
                        ${step.options.map(option => `
                            <div class="emoji-option" data-value="${option.value}">
                                <div class="emoji-icon">${option.emoji}</div>
                                <div class="emoji-label">${option.label}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
                break;
                
            case 'textarea':
                html += `
                    <div class="input-group">
                        <textarea id="${step.id}" 
                                  name="${step.id}" 
                                  placeholder="${step.placeholder || ''}"
                                  rows="4"
                                  class="form-textarea-large"></textarea>
                        <span class="input-hint">Optional - anything else we should know?</span>
                    </div>
                `;
                break;
                
            case 'summary':
                html += this.createSummaryHTML();
                break;
        }
        
        return html;
    }
    
    createSummaryHTML() {
        return `
            <div class="form-summary">
                <h3 class="summary-title">Almost done! Let's review your details:</h3>
                <div class="summary-grid">
                    ${Object.entries(this.formData).map(([key, value]) => {
                        const step = this.config.steps.find(s => s.id === key);
                        if (!step || !value) return '';
                        return `
                            <div class="summary-item">
                                <span class="summary-label">${step.summaryLabel || step.question}</span>
                                <span class="summary-value">${this.formatSummaryValue(value, step)}</span>
                                <button type="button" class="btn-edit" data-step="${step.id}">Edit</button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    formatSummaryValue(value, step) {
        if (step.type === 'slider') {
            return `£${parseInt(value).toLocaleString()}`;
        }
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        return value;
    }
    
    bindStepEvents(step, container) {
        switch (step.type) {
            case 'select-cards':
                container.querySelectorAll('.select-card').forEach(card => {
                    card.addEventListener('click', (e) => {
                        // Remove previous selection
                        container.querySelectorAll('.select-card').forEach(c => c.classList.remove('selected'));
                        // Add selection
                        card.classList.add('selected');
                        // Store value
                        this.formData[step.id] = card.dataset.value;
                        // Enable next button
                        this.nextButton.disabled = false;
                        // Update navigation to ensure button stays enabled
                        this.updateNavigation();
                        // Auto-advance after short delay
                        if (step.autoAdvance !== false) {
                            setTimeout(() => this.nextStep(), 300);
                        }
                    });
                });
                break;
                
            case 'slider':
                const slider = container.querySelector('.form-slider');
                const display = container.querySelector('.slider-value');
                slider.addEventListener('input', (e) => {
                    const value = parseInt(e.target.value);
                    display.textContent = value.toLocaleString();
                    this.formData[step.id] = value;
                    // Animate value change
                    display.classList.add('pop');
                    setTimeout(() => display.classList.remove('pop'), 200);
                });
                // Set initial value
                this.formData[step.id] = slider.value;
                break;
                
            case 'checkbox-cards':
                container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        const selected = Array.from(container.querySelectorAll('input[type="checkbox"]:checked'))
                            .map(cb => cb.value);
                        this.formData[step.id] = selected;
                    });
                });
                break;
                
            case 'emoji-select':
                container.querySelectorAll('.emoji-option').forEach(option => {
                    option.addEventListener('click', () => {
                        container.querySelectorAll('.emoji-option').forEach(o => o.classList.remove('selected'));
                        option.classList.add('selected');
                        this.formData[step.id] = option.dataset.value;
                        // Auto-advance
                        setTimeout(() => this.nextStep(), 300);
                    });
                });
                break;
                
            case 'summary':
                container.querySelectorAll('.btn-edit').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const stepId = e.target.dataset.step;
                        const stepIndex = this.config.steps.findIndex(s => s.id === stepId);
                        if (stepIndex > -1) {
                            this.showStep(stepIndex);
                        }
                    });
                });
                break;
                
            default:
                // Standard inputs
                const input = container.querySelector('input, textarea');
                if (input) {
                    input.addEventListener('input', (e) => {
                        this.formData[step.id] = e.target.value;
                        this.validateInput(input, step);
                    });
                    
                    // Enter key to advance
                    input.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            this.nextStep();
                        }
                    });
                }
        }
    }
    
    validateInput(input, step) {
        const value = input.value;
        let isValid = true;
        
        if (step.type === 'email') {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            const validation = input.parentElement.querySelector('.input-validation');
            if (validation) {
                validation.textContent = isValid && value ? '✓ Valid email' : '';
                validation.className = `input-validation ${isValid && value ? 'valid' : ''}`;
            }
        }
        
        // Enable/disable next button based on validation
        if (step.required) {
            this.nextButton.disabled = !value || !isValid;
        }
    }
    
    typewriterEffect(element) {
        if (!element || !element.dataset.text) return;
        
        const text = element.dataset.text;
        element.textContent = '';
        let index = 0;
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, this.typewriterSpeed);
            }
        };
        
        type();
    }
    
    fadeOut(element, callback) {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            element.style.transition = `all ${this.animationDuration}ms ease-out`;
            element.style.opacity = '0';
            element.style.transform = 'translateX(-20px)';
            
            setTimeout(callback, this.animationDuration);
        }, 10);
    }
    
    fadeIn(element) {
        element.style.display = 'block';
        element.style.opacity = '0';
        element.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            element.style.transition = `all ${this.animationDuration}ms ease-out`;
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 10);
    }
    
    updateProgress() {
        this.progress = ((this.currentStep + 1) / this.totalSteps) * 100;
        this.progressBar.style.width = `${this.progress}%`;
        this.progressText.textContent = `${Math.round(this.progress)}%`;
        this.currentStepText.textContent = this.currentStep + 1;
        
        // Update progress bolts
        document.querySelectorAll('.progress-bolt').forEach((bolt, index) => {
            bolt.classList.toggle('active', index <= this.currentStep);
            bolt.classList.toggle('current', index === this.currentStep);
        });
    }
    
    updateNavigation() {
        // Show/hide back button
        this.backButton.style.display = this.currentStep > 0 ? 'flex' : 'none';
        
        // Update next button
        const isLastStep = this.currentStep === this.totalSteps - 1;
        this.nextButton.innerHTML = isLastStep ? `
            Submit Application
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        ` : `
            Continue
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        `;
        
        // Enable next button for most cases - we want to capture all leads
        const currentStepConfig = this.config.steps[this.currentStep];
        
        // Only disable for text inputs that are truly required and empty
        if (currentStepConfig.required && 
            (currentStepConfig.type === 'text' || currentStepConfig.type === 'email' || currentStepConfig.type === 'phone') && 
            !this.formData[currentStepConfig.id]) {
            this.nextButton.disabled = true;
        } else {
            // For select cards, sliders, etc., always enable once user has interacted
            this.nextButton.disabled = false;
        }
    }
    
    nextStep() {
        // Only validate text inputs that are truly required
        const currentStepConfig = this.config.steps[this.currentStep];
        if (currentStepConfig.required && 
            (currentStepConfig.type === 'text' || currentStepConfig.type === 'email' || currentStepConfig.type === 'phone') &&
            !this.formData[currentStepConfig.id]) {
            this.shakeButton(this.nextButton);
            return;
        }
        
        // Save progress
        this.saveProgress();
        
        // Check if last step
        if (this.currentStep === this.totalSteps - 1) {
            this.submitForm();
            return;
        }
        
        // Move to next step
        this.showStep(this.currentStep + 1);
    }
    
    previousStep() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    }
    
    shakeButton(button) {
        button.classList.add('shake');
        setTimeout(() => button.classList.remove('shake'), 500);
    }
    
    bindKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'TEXTAREA') return;
            
            switch (e.key) {
                case 'Enter':
                    if (!e.target.matches('input, select')) {
                        e.preventDefault();
                        this.nextStep();
                    }
                    break;
                case 'ArrowLeft':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.previousStep();
                    }
                    break;
                case 'ArrowRight':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.nextStep();
                    }
                    break;
            }
        });
    }
    
    saveProgress() {
        const progressData = {
            currentStep: this.currentStep,
            formData: this.formData,
            timestamp: new Date().getTime()
        };
        localStorage.setItem(`tradeForm_${this.config.tradeId}`, JSON.stringify(progressData));
    }
    
    loadProgress() {
        const saved = localStorage.getItem(`tradeForm_${this.config.tradeId}`);
        if (saved) {
            const progressData = JSON.parse(saved);
            // Check if saved data is less than 24 hours old
            const dayInMs = 24 * 60 * 60 * 1000;
            if (new Date().getTime() - progressData.timestamp < dayInMs) {
                this.formData = progressData.formData;
                // Show resume prompt
                this.showResumePrompt(progressData.currentStep);
            }
        }
    }
    
    showResumePrompt(savedStep) {
        const prompt = document.createElement('div');
        prompt.className = 'resume-prompt';
        prompt.innerHTML = `
            <div class="resume-content">
                <h3>Welcome back! 👋</h3>
                <p>Looks like you started an application. Want to continue where you left off?</p>
                <div class="resume-actions">
                    <button type="button" class="btn-resume-yes">Yes, continue</button>
                    <button type="button" class="btn-resume-no">Start over</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(prompt);
        
        prompt.querySelector('.btn-resume-yes').addEventListener('click', () => {
            this.currentStep = savedStep;
            this.showStep(savedStep);
            prompt.remove();
        });
        
        prompt.querySelector('.btn-resume-no').addEventListener('click', () => {
            this.formData = {};
            localStorage.removeItem(`tradeForm_${this.config.tradeId}`);
            prompt.remove();
        });
    }
    
    async submitForm() {
        // Show loading state
        this.nextButton.disabled = true;
        this.nextButton.innerHTML = `
            <span class="spinner"></span>
            Submitting...
        `;
        
        try {
            // Restructure form data to match backend schema
            const submissionData = {
                firstName: this.formData.name?.split(' ')[0] || '',
                lastName: this.formData.name?.split(' ').slice(1).join(' ') || '',
                email: this.formData.email,
                phone: this.formData.phone,
                businessName: this.formData.businessName,
                tradeType: this.config.tradeId,
                location: {
                    city: this.formData.location || '',
                    postcode: this.formData.postcode || ''
                },
                financeDetails: {
                    purpose: this.formData.financeType || 'equipment',
                    amount: parseInt(this.formData.amount) || 0,
                    urgency: this.formData.urgency || 'this-month',
                    specificNeeds: this.formData.specificNeeds || ''
                },
                businessInfo: {
                    yearsTrading: parseInt(this.formData.yearsTrading) || 0,
                    monthlyRevenue: parseInt(this.formData.monthlyRevenue) || 0,
                    companyNumber: this.formData.companyNumber || '',
                    vatRegistered: this.formData.vatRegistered === 'yes',
                    employees: parseInt(this.formData.employees) || 0,
                    accreditations: this.formData.accreditations ? [this.formData.accreditations] : []
                }
            };
            
            // Submit to Formspree
            const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdklyrlp';
            
            // Convert to FormData for Formspree
            const formData = new FormData();
            formData.append('name', submissionData.name);
            formData.append('email', submissionData.email);
            formData.append('phone', submissionData.phone);
            formData.append('businessName', submissionData.businessName);
            formData.append('tradeType', submissionData.tradeType);
            formData.append('location', `${submissionData.location.city} ${submissionData.location.postcode}`);
            formData.append('financeAmount', submissionData.financeDetails.amount);
            formData.append('financePurpose', submissionData.financeDetails.purpose);
            formData.append('urgency', submissionData.financeDetails.urgency);
            formData.append('specificNeeds', submissionData.financeDetails.specificNeeds);
            formData.append('yearsTrading', submissionData.businessInfo.yearsTrading);
            formData.append('monthlyRevenue', submissionData.businessInfo.monthlyRevenue);
            formData.append('companyNumber', submissionData.businessInfo.companyNumber);
            formData.append('vatRegistered', submissionData.businessInfo.vatRegistered ? 'Yes' : 'No');
            formData.append('employees', submissionData.businessInfo.employees);
            formData.append('accreditations', submissionData.businessInfo.accreditations.join(', '));
            formData.append('_subject', `New ${this.config.tradeName} Finance Enquiry - ${submissionData.businessName}`);
            
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                const result = await response.json();
                
                // Clear saved progress
                localStorage.removeItem(`tradeForm_${this.config.tradeId}`);
                
                // Formspree doesn't return a lead ID, so we'll generate one locally
                this.leadId = `TF-${Date.now()}`;
                
                // Show success screen
                this.showSuccessScreen();
            } else {
                const error = await response.json();
                // Handle Formspree errors format
                if (error.errors) {
                    const errorMessages = error.errors.map(err => err.message || err).join(', ');
                    throw new Error(errorMessages);
                } else {
                    throw new Error(error.message || 'Submission failed');
                }
            }
        } catch (error) {
            // Log error silently in production
            
            // Reset button
            this.nextButton.disabled = false;
            this.nextButton.innerHTML = `
                Try Again
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            `;
            
            // Show specific error message
            const errorMessage = error.message || 'Sorry, there was an error submitting your application. Please try again or call us directly.';
            this.showErrorScreen(errorMessage);
        }
    }
    
    showSuccessScreen(estimatedResponseTime = '2 hours') {
        // Check experience level for different messaging
        const yearsTrading = this.formData.yearsTrading;
        const isNewTrader = yearsTrading === '0-2';
        
        const messageContent = isNewTrader ? {
            title: "Thanks! We're Looking at Options 👍",
            message: `Thanks for your interest in ${this.config.tradeName} finance. We're exploring the best funding options for businesses at your stage.`,
            nextSteps: [
                "We're reviewing specialist lenders for newer businesses",
                "Our team will call you within 24 hours to discuss options",
                "We may have alternative solutions that could work for you"
            ]
        } : {
            title: "Application Submitted! 🎉",
            message: `We'll review your ${this.config.tradeName} finance application and get back to you within 24 hours.`,
            nextSteps: [
                "We'll review your application with our panel of lenders",
                "You'll receive a decision within 24 hours",
                "If approved, funds can be in your account within 48 hours"
            ]
        };

        this.container.innerHTML = `
            <div class="form-success">
                <div class="success-icon">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                </div>
                <h2 class="success-title">${messageContent.title}</h2>
                <p class="success-message">${messageContent.message}</p>
                <div class="success-info">
                    <p><strong>What happens next?</strong></p>
                    <ul>
                        ${messageContent.nextSteps.map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>
                <div class="success-actions">
                    <a href="/" class="btn-industrial">Back to Homepage</a>
                    <a href="/trades/${this.config.tradeId}-finance.html" class="btn-industrial-outline">Learn More</a>
                </div>
            </div>
        `;
    }
    
    showErrorScreen(errorMessage = 'Don\'t worry, your information is safe. Please try again or give us a call.') {
        this.container.innerHTML = `
            <div class="form-error">
                <div class="error-icon">⚠️</div>
                <h2 class="error-title">Oops! Something went wrong</h2>
                <p class="error-message">${errorMessage}</p>
                <div class="error-actions">
                    <button type="button" class="btn-industrial" onclick="location.reload()">Try Again</button>
                    <a href="tel:02037780274" class="btn-industrial-outline">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/>
                        </svg>
                        Call Us: 020 3778 0274
                    </a>
                </div>
            </div>
        `;
    }
}

// Export for use
window.TradeForm = TradeForm;
