/**
 * TradesmanFinance Debug Framework
 * A comprehensive debugging tool for development and production diagnostics
 * 
 * Features:
 * - Categorized console logging
 * - Performance metrics tracking
 * - CSS/JS resource verification
 * - Form submission monitoring
 * - Network request logging
 * - Browser compatibility checks
 * - Visual debug mode
 * - Error stack trace capture
 * - Local storage persistence
 * - Debug data export
 * 
 * Usage:
 * - Enable: TradesmanDebug.enable()
 * - Disable: TradesmanDebug.disable()
 * - Toggle visual mode: TradesmanDebug.toggleVisualMode()
 * - Export logs: TradesmanDebug.exportLogs()
 */

(function(window) {
    'use strict';

    // Debug Framework Configuration
    const CONFIG = {
        MAX_LOG_ENTRIES: 100,
        STORAGE_KEY: 'tradesman_debug_logs',
        SETTINGS_KEY: 'tradesman_debug_settings',
        PERFORMANCE_THRESHOLD: {
            PAGE_LOAD: 3000,      // 3 seconds
            RESOURCE_LOAD: 1000,  // 1 second
            API_RESPONSE: 2000    // 2 seconds
        },
        LOG_LEVELS: {
            DEBUG: { level: 0, color: '#888', icon: '🔍' },
            INFO: { level: 1, color: '#0066cc', icon: 'ℹ️' },
            WARN: { level: 2, color: '#ff9900', icon: '⚠️' },
            ERROR: { level: 3, color: '#ff3333', icon: '❌' }
        }
    };

    // Main Debug Framework Class
    class DebugFramework {
        constructor() {
            this.enabled = false;
            this.visualMode = false;
            this.logs = [];
            this.performance = {
                marks: {},
                measures: {},
                resources: []
            };
            this.errors = [];
            this.networkRequests = [];
            this.formSubmissions = [];
            this.cssLoadStatus = new Map();
            this.jsLoadStatus = new Map();
            this.browserInfo = this.detectBrowser();
            this.debugPanel = null;
            
            // Load settings from localStorage
            this.loadSettings();
            
            // Initialize if enabled
            if (this.enabled) {
                this.initialize();
            }
        }

        // Initialize the debug framework
        initialize() {
            this.log('INFO', 'Debug Framework Initialized', {
                browser: this.browserInfo,
                timestamp: new Date().toISOString()
            });

            // Set up error handlers
            this.setupErrorHandlers();
            
            // Monitor performance
            this.setupPerformanceMonitoring();
            
            // Monitor network requests
            this.setupNetworkMonitoring();
            
            // Monitor resource loading
            this.setupResourceMonitoring();
            
            // Monitor form submissions
            this.setupFormMonitoring();
            
            // Check browser compatibility
            this.checkBrowserCompatibility();
            
            // Auto-detect common issues
            this.runDiagnostics();
        }

        // Enable debug mode
        enable() {
            this.enabled = true;
            this.saveSettings();
            if (!this.initialized) {
                this.initialize();
                this.initialized = true;
            }
            this.log('INFO', 'Debug Mode Enabled');
            return 'Debug mode enabled';
        }

        // Disable debug mode
        disable() {
            this.enabled = false;
            this.visualMode = false;
            this.saveSettings();
            this.removeVisualMode();
            this.log('INFO', 'Debug Mode Disabled');
            return 'Debug mode disabled';
        }

        // Toggle visual debug mode
        toggleVisualMode() {
            if (!this.enabled) {
                console.warn('Enable debug mode first');
                return;
            }
            
            this.visualMode = !this.visualMode;
            if (this.visualMode) {
                this.createDebugPanel();
            } else {
                this.removeVisualMode();
            }
            return `Visual mode ${this.visualMode ? 'enabled' : 'disabled'}`;
        }

        // Log message with category
        log(level, message, data = null) {
            if (!this.enabled) return;
            
            const logLevel = CONFIG.LOG_LEVELS[level] || CONFIG.LOG_LEVELS.INFO;
            const timestamp = new Date().toISOString();
            const logEntry = {
                timestamp,
                level,
                message,
                data,
                stack: level === 'ERROR' ? new Error().stack : null,
                url: window.location.href,
                userAgent: navigator.userAgent
            };

            // Add to logs array (maintain max size)
            this.logs.push(logEntry);
            if (this.logs.length > CONFIG.MAX_LOG_ENTRIES) {
                this.logs.shift();
            }

            // Console output with styling
            const consoleStyle = `color: ${logLevel.color}; font-weight: bold;`;
            console.log(
                `%c${logLevel.icon} [${level}] ${timestamp.split('T')[1].split('.')[0]} - ${message}`,
                consoleStyle,
                data || ''
            );

            // Update visual panel if active
            if (this.visualMode && this.debugPanel) {
                this.updateDebugPanel();
            }

            // Save to localStorage
            this.saveLogs();
        }

        // Setup error handlers
        setupErrorHandlers() {
            // Global error handler
            window.addEventListener('error', (event) => {
                this.log('ERROR', `JavaScript Error: ${event.message}`, {
                    filename: event.filename,
                    line: event.lineno,
                    column: event.colno,
                    error: event.error ? event.error.stack : 'No stack trace',
                    timestamp: event.timeStamp
                });
                this.errors.push(event);
            });

            // Unhandled promise rejection handler
            window.addEventListener('unhandledrejection', (event) => {
                this.log('ERROR', `Unhandled Promise Rejection: ${event.reason}`, {
                    promise: event.promise,
                    reason: event.reason,
                    stack: event.reason?.stack || 'No stack trace'
                });
                this.errors.push(event);
            });

            // Resource loading errors
            window.addEventListener('error', (event) => {
                if (event.target !== window) {
                    const target = event.target;
                    if (target.tagName === 'LINK') {
                        this.log('ERROR', `CSS Failed to Load: ${target.href}`, {
                            href: target.href,
                            rel: target.rel
                        });
                        this.cssLoadStatus.set(target.href, 'failed');
                    } else if (target.tagName === 'SCRIPT') {
                        this.log('ERROR', `Script Failed to Load: ${target.src}`, {
                            src: target.src,
                            async: target.async,
                            defer: target.defer
                        });
                        this.jsLoadStatus.set(target.src, 'failed');
                    }
                }
            }, true);
        }

        // Setup performance monitoring
        setupPerformanceMonitoring() {
            // Monitor page load performance
            if (window.performance && window.performance.timing) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        const perfData = this.getPerformanceMetrics();
                        this.log('INFO', 'Page Performance Metrics', perfData);
                        
                        // Check for slow page load
                        if (perfData.loadTime > CONFIG.PERFORMANCE_THRESHOLD.PAGE_LOAD) {
                            this.log('WARN', `Slow Page Load Detected: ${perfData.loadTime}ms`, perfData);
                        }
                    }, 0);
                });
            }

            // Monitor resource timing
            if (window.PerformanceObserver) {
                try {
                    const resourceObserver = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            this.performance.resources.push(entry);
                            
                            if (entry.duration > CONFIG.PERFORMANCE_THRESHOLD.RESOURCE_LOAD) {
                                this.log('WARN', `Slow Resource: ${entry.name}`, {
                                    duration: entry.duration,
                                    type: entry.initiatorType,
                                    size: entry.transferSize
                                });
                            }
                        }
                    });
                    resourceObserver.observe({ entryTypes: ['resource'] });
                } catch (e) {
                    this.log('WARN', 'PerformanceObserver not supported', e);
                }
            }
        }

        // Setup network monitoring
        setupNetworkMonitoring() {
            // Intercept fetch requests
            const originalFetch = window.fetch;
            window.fetch = (...args) => {
                const startTime = performance.now();
                const [url, options = {}] = args;
                
                this.log('DEBUG', `Network Request: ${options.method || 'GET'} ${url}`, options);
                
                return originalFetch.apply(window, args)
                    .then(response => {
                        const duration = performance.now() - startTime;
                        const logData = {
                            url,
                            method: options.method || 'GET',
                            status: response.status,
                            duration: Math.round(duration),
                            ok: response.ok
                        };
                        
                        this.networkRequests.push(logData);
                        
                        if (!response.ok) {
                            this.log('ERROR', `Network Error: ${response.status} ${url}`, logData);
                        } else if (duration > CONFIG.PERFORMANCE_THRESHOLD.API_RESPONSE) {
                            this.log('WARN', `Slow API Response: ${url}`, logData);
                        } else {
                            this.log('DEBUG', `Network Response: ${response.status} ${url}`, logData);
                        }
                        
                        return response;
                    })
                    .catch(error => {
                        const duration = performance.now() - startTime;
                        this.log('ERROR', `Network Request Failed: ${url}`, {
                            error: error.message,
                            duration: Math.round(duration)
                        });
                        throw error;
                    });
            };

            // Intercept XMLHttpRequest
            const originalXHROpen = XMLHttpRequest.prototype.open;
            const originalXHRSend = XMLHttpRequest.prototype.send;
            
            XMLHttpRequest.prototype.open = function(method, url, ...args) {
                this._debugData = { method, url, startTime: null };
                return originalXHROpen.apply(this, [method, url, ...args]);
            };
            
            XMLHttpRequest.prototype.send = function(...args) {
                if (this._debugData) {
                    this._debugData.startTime = performance.now();
                    
                    this.addEventListener('load', () => {
                        const duration = performance.now() - this._debugData.startTime;
                        window.TradesmanDebug.log('DEBUG', `XHR Response: ${this.status} ${this._debugData.url}`, {
                            method: this._debugData.method,
                            status: this.status,
                            duration: Math.round(duration)
                        });
                    });
                    
                    this.addEventListener('error', () => {
                        window.TradesmanDebug.log('ERROR', `XHR Failed: ${this._debugData.url}`, {
                            method: this._debugData.method
                        });
                    });
                }
                return originalXHRSend.apply(this, args);
            };
        }

        // Setup resource monitoring
        setupResourceMonitoring() {
            // Check CSS files
            const styleSheets = document.querySelectorAll('link[rel="stylesheet"]');
            styleSheets.forEach(link => {
                const href = link.href;
                if (href) {
                    // Check if stylesheet is accessible
                    fetch(href, { method: 'HEAD' })
                        .then(response => {
                            if (response.ok) {
                                this.cssLoadStatus.set(href, 'loaded');
                                this.log('DEBUG', `CSS Loaded: ${href}`);
                            } else {
                                this.cssLoadStatus.set(href, 'failed');
                                this.log('ERROR', `CSS Load Failed: ${href}`, { status: response.status });
                            }
                        })
                        .catch(error => {
                            this.cssLoadStatus.set(href, 'failed');
                            this.log('ERROR', `CSS Load Error: ${href}`, { error: error.message });
                        });
                }
            });

            // Check JavaScript files
            const scripts = document.querySelectorAll('script[src]');
            scripts.forEach(script => {
                const src = script.src;
                if (src) {
                    this.jsLoadStatus.set(src, 'loaded');
                    this.log('DEBUG', `Script Loaded: ${src}`);
                }
            });
        }

        // Setup form monitoring
        setupFormMonitoring() {
            document.addEventListener('submit', (event) => {
                const form = event.target;
                const formData = new FormData(form);
                const data = {};
                
                for (const [key, value] of formData.entries()) {
                    data[key] = value;
                }
                
                const submission = {
                    timestamp: new Date().toISOString(),
                    formId: form.id || 'unnamed-form',
                    action: form.action,
                    method: form.method,
                    data: data
                };
                
                this.formSubmissions.push(submission);
                this.log('INFO', `Form Submitted: ${submission.formId}`, submission);
            });

            // Monitor form validation errors
            document.addEventListener('invalid', (event) => {
                const input = event.target;
                this.log('WARN', `Form Validation Error: ${input.name || input.id}`, {
                    value: input.value,
                    validity: input.validity,
                    message: input.validationMessage
                });
            }, true);
        }

        // Check browser compatibility
        checkBrowserCompatibility() {
            const features = {
                'Fetch API': typeof fetch !== 'undefined',
                'Promise': typeof Promise !== 'undefined',
                'Local Storage': typeof localStorage !== 'undefined',
                'Session Storage': typeof sessionStorage !== 'undefined',
                'Service Worker': 'serviceWorker' in navigator,
                'WebSocket': typeof WebSocket !== 'undefined',
                'Intersection Observer': typeof IntersectionObserver !== 'undefined',
                'CSS Grid': CSS.supports('display', 'grid'),
                'CSS Flexbox': CSS.supports('display', 'flex'),
                'Custom Properties': CSS.supports('--custom', 'property')
            };

            const unsupported = Object.entries(features)
                .filter(([feature, supported]) => !supported)
                .map(([feature]) => feature);

            if (unsupported.length > 0) {
                this.log('WARN', 'Browser Compatibility Issues', {
                    unsupported,
                    browser: this.browserInfo
                });
            } else {
                this.log('INFO', 'Browser Compatibility Check Passed', {
                    browser: this.browserInfo,
                    features
                });
            }

            return features;
        }

        // Detect browser information
        detectBrowser() {
            const ua = navigator.userAgent;
            let browser = 'Unknown';
            let version = 'Unknown';

            if (ua.indexOf('Firefox') > -1) {
                browser = 'Firefox';
                version = ua.match(/Firefox\/(\d+)/)?.[1] || version;
            } else if (ua.indexOf('Chrome') > -1) {
                browser = 'Chrome';
                version = ua.match(/Chrome\/(\d+)/)?.[1] || version;
            } else if (ua.indexOf('Safari') > -1) {
                browser = 'Safari';
                version = ua.match(/Version\/(\d+)/)?.[1] || version;
            } else if (ua.indexOf('Edge') > -1) {
                browser = 'Edge';
                version = ua.match(/Edge\/(\d+)/)?.[1] || version;
            } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
                browser = 'Internet Explorer';
                version = ua.match(/(?:MSIE |rv:)(\d+)/)?.[1] || version;
            }

            return {
                browser,
                version,
                userAgent: ua,
                platform: navigator.platform,
                language: navigator.language,
                cookieEnabled: navigator.cookieEnabled,
                onLine: navigator.onLine,
                screenResolution: `${screen.width}x${screen.height}`,
                viewport: `${window.innerWidth}x${window.innerHeight}`
            };
        }

        // Run diagnostics to detect common issues
        runDiagnostics() {
            const diagnostics = {
                timestamp: new Date().toISOString(),
                issues: [],
                warnings: [],
                info: []
            };

            // Check for missing CSS files
            const missingCSS = Array.from(this.cssLoadStatus.entries())
                .filter(([url, status]) => status === 'failed')
                .map(([url]) => url);
            
            if (missingCSS.length > 0) {
                diagnostics.issues.push({
                    type: 'Missing CSS',
                    files: missingCSS,
                    impact: 'Visual styling may be broken'
                });
            }

            // Check for JavaScript errors
            if (this.errors.length > 0) {
                diagnostics.issues.push({
                    type: 'JavaScript Errors',
                    count: this.errors.length,
                    impact: 'Functionality may be impaired'
                });
            }

            // Check for slow resources
            const slowResources = this.performance.resources
                .filter(r => r.duration > CONFIG.PERFORMANCE_THRESHOLD.RESOURCE_LOAD)
                .map(r => ({ name: r.name, duration: r.duration }));
            
            if (slowResources.length > 0) {
                diagnostics.warnings.push({
                    type: 'Slow Resources',
                    resources: slowResources,
                    impact: 'Page may feel sluggish'
                });
            }

            // Check for console errors
            const errorLogs = this.logs.filter(log => log.level === 'ERROR');
            if (errorLogs.length > 0) {
                diagnostics.issues.push({
                    type: 'Console Errors',
                    count: errorLogs.length,
                    recent: errorLogs.slice(-3)
                });
            }

            // Check localStorage availability
            try {
                localStorage.setItem('debug_test', 'test');
                localStorage.removeItem('debug_test');
                diagnostics.info.push('localStorage is available');
            } catch (e) {
                diagnostics.issues.push({
                    type: 'Storage Error',
                    message: 'localStorage is not available',
                    impact: 'Cannot persist debug data'
                });
            }

            // Check network connectivity
            if (!navigator.onLine) {
                diagnostics.warnings.push({
                    type: 'Offline',
                    message: 'No network connection detected'
                });
            }

            // Log diagnostics results
            if (diagnostics.issues.length > 0) {
                this.log('ERROR', 'Diagnostic Issues Found', diagnostics.issues);
            }
            if (diagnostics.warnings.length > 0) {
                this.log('WARN', 'Diagnostic Warnings', diagnostics.warnings);
            }

            return diagnostics;
        }

        // Get performance metrics
        getPerformanceMetrics() {
            const timing = performance.timing;
            const metrics = {
                // Navigation timing
                loadTime: timing.loadEventEnd - timing.navigationStart,
                domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
                domInteractive: timing.domInteractive - timing.navigationStart,
                
                // Network timing
                fetchTime: timing.responseEnd - timing.fetchStart,
                dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
                tcpConnection: timing.connectEnd - timing.connectStart,
                
                // Processing timing
                requestTime: timing.responseStart - timing.requestStart,
                responseTime: timing.responseEnd - timing.responseStart,
                domProcessing: timing.domComplete - timing.domLoading,
                
                // Resource counts
                resourceCount: performance.getEntriesByType('resource').length,
                
                // Memory (if available)
                memory: performance.memory ? {
                    usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB',
                    totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1048576) + ' MB',
                    limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + ' MB'
                } : null
            };

            return metrics;
        }

        // Create visual debug panel
        createDebugPanel() {
            // Remove existing panel if any
            this.removeVisualMode();

            // Create panel container
            this.debugPanel = document.createElement('div');
            this.debugPanel.id = 'tradesman-debug-panel';
            this.debugPanel.innerHTML = `
                <style>
                    #tradesman-debug-panel {
                        position: fixed;
                        bottom: 0;
                        right: 0;
                        width: 400px;
                        max-height: 500px;
                        background: rgba(26, 26, 26, 0.95);
                        color: #fff;
                        font-family: 'Courier New', monospace;
                        font-size: 12px;
                        z-index: 999999;
                        border: 2px solid #ff6b35;
                        border-radius: 8px 8px 0 0;
                        box-shadow: 0 -4px 20px rgba(0,0,0,0.5);
                        display: flex;
                        flex-direction: column;
                    }
                    
                    #debug-panel-header {
                        background: #ff6b35;
                        padding: 10px;
                        cursor: move;
                        user-select: none;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    #debug-panel-title {
                        font-weight: bold;
                        font-size: 14px;
                    }
                    
                    #debug-panel-controls {
                        display: flex;
                        gap: 10px;
                    }
                    
                    .debug-control-btn {
                        background: rgba(255,255,255,0.2);
                        border: 1px solid #fff;
                        color: #fff;
                        padding: 4px 8px;
                        cursor: pointer;
                        border-radius: 4px;
                        font-size: 11px;
                    }
                    
                    .debug-control-btn:hover {
                        background: rgba(255,255,255,0.3);
                    }
                    
                    #debug-panel-tabs {
                        display: flex;
                        background: #2d2d2d;
                        border-bottom: 1px solid #444;
                    }
                    
                    .debug-tab {
                        flex: 1;
                        padding: 8px;
                        text-align: center;
                        cursor: pointer;
                        border-right: 1px solid #444;
                        transition: background 0.2s;
                    }
                    
                    .debug-tab:last-child {
                        border-right: none;
                    }
                    
                    .debug-tab:hover {
                        background: #3d3d3d;
                    }
                    
                    .debug-tab.active {
                        background: #1a1a1a;
                        color: #ff6b35;
                    }
                    
                    #debug-panel-content {
                        flex: 1;
                        overflow-y: auto;
                        padding: 10px;
                        background: #1a1a1a;
                    }
                    
                    .debug-log-entry {
                        margin-bottom: 8px;
                        padding: 6px;
                        background: rgba(255,255,255,0.05);
                        border-radius: 4px;
                        border-left: 3px solid #444;
                        word-wrap: break-word;
                    }
                    
                    .debug-log-entry.ERROR {
                        border-left-color: #ff3333;
                        background: rgba(255,51,51,0.1);
                    }
                    
                    .debug-log-entry.WARN {
                        border-left-color: #ff9900;
                        background: rgba(255,153,0,0.1);
                    }
                    
                    .debug-log-entry.INFO {
                        border-left-color: #0066cc;
                        background: rgba(0,102,204,0.1);
                    }
                    
                    .debug-log-entry.DEBUG {
                        border-left-color: #888;
                    }
                    
                    .debug-log-time {
                        color: #888;
                        font-size: 10px;
                    }
                    
                    .debug-log-level {
                        font-weight: bold;
                        margin-right: 8px;
                    }
                    
                    .debug-log-message {
                        margin-top: 4px;
                    }
                    
                    .debug-log-data {
                        margin-top: 4px;
                        padding: 4px;
                        background: rgba(0,0,0,0.3);
                        border-radius: 2px;
                        font-size: 11px;
                        color: #aaa;
                        max-height: 100px;
                        overflow-y: auto;
                    }
                    
                    .debug-metric {
                        display: flex;
                        justify-content: space-between;
                        padding: 6px;
                        background: rgba(255,255,255,0.05);
                        margin-bottom: 4px;
                        border-radius: 4px;
                    }
                    
                    .debug-metric-label {
                        color: #aaa;
                    }
                    
                    .debug-metric-value {
                        color: #ff6b35;
                        font-weight: bold;
                    }
                    
                    #debug-panel-minimized {
                        display: none;
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        background: #ff6b35;
                        color: #fff;
                        padding: 10px 15px;
                        border-radius: 25px;
                        cursor: pointer;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                        font-weight: bold;
                        z-index: 999999;
                    }
                    
                    #debug-panel.minimized {
                        display: none;
                    }
                    
                    #debug-panel.minimized + #debug-panel-minimized {
                        display: block;
                    }
                </style>
                
                <div id="debug-panel-header">
                    <span id="debug-panel-title">🔧 Debug Console</span>
                    <div id="debug-panel-controls">
                        <button class="debug-control-btn" onclick="TradesmanDebug.clearLogs()">Clear</button>
                        <button class="debug-control-btn" onclick="TradesmanDebug.exportLogs()">Export</button>
                        <button class="debug-control-btn" onclick="TradesmanDebug.minimizePanel()">_</button>
                        <button class="debug-control-btn" onclick="TradesmanDebug.toggleVisualMode()">✕</button>
                    </div>
                </div>
                
                <div id="debug-panel-tabs">
                    <div class="debug-tab active" data-tab="logs">Logs</div>
                    <div class="debug-tab" data-tab="performance">Performance</div>
                    <div class="debug-tab" data-tab="network">Network</div>
                    <div class="debug-tab" data-tab="errors">Errors</div>
                </div>
                
                <div id="debug-panel-content"></div>
            `;

            // Create minimized button
            const minimizedBtn = document.createElement('div');
            minimizedBtn.id = 'debug-panel-minimized';
            minimizedBtn.innerHTML = '🔧 Debug';
            minimizedBtn.onclick = () => this.maximizePanel();

            document.body.appendChild(this.debugPanel);
            document.body.appendChild(minimizedBtn);

            // Setup tab switching
            this.setupTabSwitching();
            
            // Initial content load
            this.updateDebugPanel('logs');

            // Make panel draggable
            this.makePanelDraggable();
        }

        // Setup tab switching for debug panel
        setupTabSwitching() {
            const tabs = this.debugPanel.querySelectorAll('.debug-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    this.updateDebugPanel(tab.dataset.tab);
                });
            });
        }

        // Update debug panel content
        updateDebugPanel(tab = 'logs') {
            const content = this.debugPanel.querySelector('#debug-panel-content');
            if (!content) return;

            let html = '';

            switch(tab) {
                case 'logs':
                    html = this.renderLogs();
                    break;
                case 'performance':
                    html = this.renderPerformance();
                    break;
                case 'network':
                    html = this.renderNetwork();
                    break;
                case 'errors':
                    html = this.renderErrors();
                    break;
            }

            content.innerHTML = html;
        }

        // Render logs tab
        renderLogs() {
            const recentLogs = this.logs.slice(-20).reverse();
            return recentLogs.map(log => `
                <div class="debug-log-entry ${log.level}">
                    <div>
                        <span class="debug-log-time">${log.timestamp.split('T')[1].split('.')[0]}</span>
                        <span class="debug-log-level">${CONFIG.LOG_LEVELS[log.level].icon} ${log.level}</span>
                    </div>
                    <div class="debug-log-message">${this.escapeHtml(log.message)}</div>
                    ${log.data ? `<pre class="debug-log-data">${this.escapeHtml(JSON.stringify(log.data, null, 2))}</pre>` : ''}
                </div>
            `).join('');
        }

        // Render performance tab
        renderPerformance() {
            const metrics = this.getPerformanceMetrics();
            let html = '<h4 style="margin-top: 0; color: #ff6b35;">Performance Metrics</h4>';
            
            html += `
                <div class="debug-metric">
                    <span class="debug-metric-label">Page Load Time</span>
                    <span class="debug-metric-value">${metrics.loadTime}ms</span>
                </div>
                <div class="debug-metric">
                    <span class="debug-metric-label">DOM Ready</span>
                    <span class="debug-metric-value">${metrics.domContentLoaded}ms</span>
                </div>
                <div class="debug-metric">
                    <span class="debug-metric-label">Network Fetch</span>
                    <span class="debug-metric-value">${metrics.fetchTime}ms</span>
                </div>
                <div class="debug-metric">
                    <span class="debug-metric-label">DNS Lookup</span>
                    <span class="debug-metric-value">${metrics.dnsLookup}ms</span>
                </div>
                <div class="debug-metric">
                    <span class="debug-metric-label">Resources Loaded</span>
                    <span class="debug-metric-value">${metrics.resourceCount}</span>
                </div>
            `;
            
            if (metrics.memory) {
                html += `
                    <h4 style="margin-top: 15px; color: #ff6b35;">Memory Usage</h4>
                    <div class="debug-metric">
                        <span class="debug-metric-label">JS Heap Used</span>
                        <span class="debug-metric-value">${metrics.memory.usedJSHeapSize}</span>
                    </div>
                    <div class="debug-metric">
                        <span class="debug-metric-label">JS Heap Total</span>
                        <span class="debug-metric-value">${metrics.memory.totalJSHeapSize}</span>
                    </div>
                `;
            }
            
            return html;
        }

        // Render network tab
        renderNetwork() {
            const recentRequests = this.networkRequests.slice(-10).reverse();
            let html = '<h4 style="margin-top: 0; color: #ff6b35;">Recent Network Requests</h4>';
            
            if (recentRequests.length === 0) {
                html += '<p style="color: #888;">No network requests captured yet.</p>';
            } else {
                recentRequests.forEach(req => {
                    const statusColor = req.ok ? '#4CAF50' : '#ff3333';
                    html += `
                        <div class="debug-metric" style="flex-direction: column; align-items: flex-start;">
                            <div style="width: 100%; display: flex; justify-content: space-between;">
                                <span style="color: ${statusColor}; font-weight: bold;">${req.method} ${req.status}</span>
                                <span style="color: #ff6b35;">${req.duration}ms</span>
                            </div>
                            <div style="color: #aaa; font-size: 10px; margin-top: 4px; word-break: break-all;">
                                ${this.escapeHtml(req.url)}
                            </div>
                        </div>
                    `;
                });
            }
            
            return html;
        }

        // Render errors tab
        renderErrors() {
            let html = '<h4 style="margin-top: 0; color: #ff6b35;">Errors & Issues</h4>';
            
            const errorLogs = this.logs.filter(log => log.level === 'ERROR').slice(-10).reverse();
            
            if (errorLogs.length === 0 && this.errors.length === 0) {
                html += '<p style="color: #4CAF50;">✓ No errors detected</p>';
            } else {
                errorLogs.forEach(log => {
                    html += `
                        <div class="debug-log-entry ERROR">
                            <div class="debug-log-time">${log.timestamp.split('T')[1].split('.')[0]}</div>
                            <div class="debug-log-message">${this.escapeHtml(log.message)}</div>
                            ${log.stack ? `<pre class="debug-log-data" style="font-size: 10px;">${this.escapeHtml(log.stack)}</pre>` : ''}
                        </div>
                    `;
                });
            }
            
            // CSS load failures
            const failedCSS = Array.from(this.cssLoadStatus.entries())
                .filter(([url, status]) => status === 'failed');
            
            if (failedCSS.length > 0) {
                html += '<h4 style="margin-top: 15px; color: #ff6b35;">Failed CSS Resources</h4>';
                failedCSS.forEach(([url]) => {
                    html += `<div class="debug-metric" style="color: #ff3333; font-size: 11px;">${this.escapeHtml(url)}</div>`;
                });
            }
            
            return html;
        }

        // Make panel draggable
        makePanelDraggable() {
            const header = this.debugPanel.querySelector('#debug-panel-header');
            let isDragging = false;
            let dragOffset = { x: 0, y: 0 };

            header.addEventListener('mousedown', (e) => {
                if (e.target.tagName === 'BUTTON') return;
                isDragging = true;
                dragOffset.x = e.clientX - this.debugPanel.offsetLeft;
                dragOffset.y = e.clientY - this.debugPanel.offsetTop;
                document.body.style.userSelect = 'none';
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                this.debugPanel.style.left = (e.clientX - dragOffset.x) + 'px';
                this.debugPanel.style.top = (e.clientY - dragOffset.y) + 'px';
                this.debugPanel.style.right = 'auto';
                this.debugPanel.style.bottom = 'auto';
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
                document.body.style.userSelect = '';
            });
        }

        // Minimize panel
        minimizePanel() {
            if (this.debugPanel) {
                this.debugPanel.classList.add('minimized');
            }
        }

        // Maximize panel
        maximizePanel() {
            if (this.debugPanel) {
                this.debugPanel.classList.remove('minimized');
            }
        }

        // Remove visual mode
        removeVisualMode() {
            const panel = document.getElementById('tradesman-debug-panel');
            const minimized = document.getElementById('debug-panel-minimized');
            if (panel) panel.remove();
            if (minimized) minimized.remove();
            this.debugPanel = null;
        }

        // Clear logs
        clearLogs() {
            this.logs = [];
            this.errors = [];
            this.networkRequests = [];
            this.formSubmissions = [];
            this.saveLogs();
            this.log('INFO', 'Logs cleared');
            if (this.visualMode) {
                this.updateDebugPanel();
            }
        }

        // Export logs
        exportLogs() {
            const exportData = {
                timestamp: new Date().toISOString(),
                browser: this.browserInfo,
                logs: this.logs,
                errors: this.errors,
                networkRequests: this.networkRequests,
                formSubmissions: this.formSubmissions,
                performance: this.getPerformanceMetrics(),
                cssLoadStatus: Array.from(this.cssLoadStatus.entries()),
                jsLoadStatus: Array.from(this.jsLoadStatus.entries()),
                diagnostics: this.runDiagnostics()
            };

            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `tradesman-debug-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.log('INFO', 'Debug logs exported');
        }

        // Save logs to localStorage
        saveLogs() {
            if (!this.enabled) return;
            
            try {
                const dataToSave = {
                    logs: this.logs.slice(-CONFIG.MAX_LOG_ENTRIES),
                    errors: this.errors.slice(-20),
                    networkRequests: this.networkRequests.slice(-50),
                    formSubmissions: this.formSubmissions.slice(-20)
                };
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(dataToSave));
            } catch (e) {
                console.error('Failed to save debug logs:', e);
            }
        }

        // Load logs from localStorage
        loadLogs() {
            try {
                const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
                if (saved) {
                    const data = JSON.parse(saved);
                    this.logs = data.logs || [];
                    this.errors = data.errors || [];
                    this.networkRequests = data.networkRequests || [];
                    this.formSubmissions = data.formSubmissions || [];
                }
            } catch (e) {
                console.error('Failed to load debug logs:', e);
            }
        }

        // Save settings to localStorage
        saveSettings() {
            try {
                localStorage.setItem(CONFIG.SETTINGS_KEY, JSON.stringify({
                    enabled: this.enabled,
                    visualMode: this.visualMode
                }));
            } catch (e) {
                console.error('Failed to save debug settings:', e);
            }
        }

        // Load settings from localStorage
        loadSettings() {
            try {
                const saved = localStorage.getItem(CONFIG.SETTINGS_KEY);
                if (saved) {
                    const settings = JSON.parse(saved);
                    this.enabled = settings.enabled || false;
                    this.visualMode = settings.visualMode || false;
                }
            } catch (e) {
                console.error('Failed to load debug settings:', e);
            }
        }

        // Escape HTML for safe display
        escapeHtml(text) {
            if (typeof text !== 'string') {
                text = String(text);
            }
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Public API for manual performance marks
        mark(name) {
            if (performance.mark) {
                performance.mark(name);
                this.log('DEBUG', `Performance mark: ${name}`);
            }
        }

        // Public API for performance measures
        measure(name, startMark, endMark) {
            if (performance.measure) {
                try {
                    performance.measure(name, startMark, endMark);
                    const entries = performance.getEntriesByName(name);
                    if (entries.length > 0) {
                        this.log('INFO', `Performance measure: ${name}`, {
                            duration: entries[entries.length - 1].duration
                        });
                    }
                } catch (e) {
                    this.log('ERROR', `Failed to measure: ${name}`, e);
                }
            }
        }
    }

    // Create and expose the debug framework instance
    const debugInstance = new DebugFramework();
    
    // Expose to global scope
    window.TradesmanDebug = debugInstance;

    // Auto-enable in development mode (localhost)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Auto-enable but don't show visual mode by default
        debugInstance.enable();
        console.log('%c[TradesmanDebug] Auto-enabled for development', 'color: #ff6b35; font-weight: bold;');
        console.log('Commands: TradesmanDebug.toggleVisualMode(), TradesmanDebug.exportLogs(), TradesmanDebug.disable()');
    }

    // Expose debug controls via console
    console.log('%c[TradesmanDebug] Available', 'color: #0066cc; font-weight: bold;');
    console.log('Enable: TradesmanDebug.enable()');
    console.log('Visual Mode: TradesmanDebug.toggleVisualMode()');
    console.log('Export: TradesmanDebug.exportLogs()');

})(window);