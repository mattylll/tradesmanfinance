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
        if (!this.container) return;
        
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
        
        // Clear container with fade out
        this.fadeOut(this.stepContainer, () => {
            this.stepContainer.innerHTML = '';
            
            // Create step content
            const stepContent = document.createElement('div');
            stepContent.className = 'trade-form-step active';
            stepContent.setAttribute('data-step', stepIndex);
            
            // Add step HTML based on type
            stepContent.innerHTML = this.createStepHTML(step);
            
            // Append to container
            this.stepContainer.appendChild(stepContent);
            
            // Fade in
            this.fadeIn(stepContent);
            
            // Apply typewriter effect to question if applicable
            if (step.question) {
                this.typewriterEffect(stepContent.querySelector('.step-question'));
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
        });
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
        
        // Disable next if required field is empty
        const currentStepConfig = this.config.steps[this.currentStep];
        if (currentStepConfig.required && !this.formData[currentStepConfig.id]) {
            this.nextButton.disabled = true;
        } else {
            this.nextButton.disabled = false;
        }
    }
    
    nextStep() {
        // Validate current step
        const currentStepConfig = this.config.steps[this.currentStep];
        if (currentStepConfig.required && !this.formData[currentStepConfig.id]) {
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
            // Add trade identification
            this.formData.trade = this.config.tradeId;
            this.formData.tradeName = this.config.tradeName;
            
            // Submit to API
            const response = await fetch('/api/trade-application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.formData)
            });
            
            if (response.ok) {
                // Clear saved progress
                localStorage.removeItem(`tradeForm_${this.config.tradeId}`);
                
                // Show success screen
                this.showSuccessScreen();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorScreen();
        }
    }
    
    showSuccessScreen() {
        this.container.innerHTML = `
            <div class="form-success">
                <div class="success-icon">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                </div>
                <h2 class="success-title">Application Submitted! 🎉</h2>
                <p class="success-message">We'll review your ${this.config.tradeName} finance application and get back to you within 24 hours.</p>
                <div class="success-info">
                    <p><strong>What happens next?</strong></p>
                    <ul>
                        <li>We'll review your application with our panel of lenders</li>
                        <li>You'll receive a decision within 24 hours</li>
                        <li>If approved, funds can be in your account within 48 hours</li>
                    </ul>
                </div>
                <div class="success-actions">
                    <a href="/" class="btn-industrial">Back to Homepage</a>
                    <a href="/trades/${this.config.tradeId}-finance.html" class="btn-industrial-outline">Learn More</a>
                </div>
            </div>
        `;
    }
    
    showErrorScreen() {
        this.container.innerHTML = `
            <div class="form-error">
                <div class="error-icon">⚠️</div>
                <h2 class="error-title">Oops! Something went wrong</h2>
                <p class="error-message">Don't worry, your information is safe. Please try again or give us a call.</p>
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