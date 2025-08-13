/**
 * Dropdown Menu Functionality - Fixed Version
 * Handles desktop dropdowns and mobile menu with proper animation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.industrial-nav');
    const navDropdowns = document.querySelectorAll('.has-dropdown');
    
    // State management
    let isAnimating = false;
    let mobileMenuOpen = false;
    
    // ================================================================
    // MOBILE MENU TOGGLE
    // ================================================================
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Prevent rapid clicking
            if (isAnimating) return;
            
            isAnimating = true;
            mobileMenuOpen = !mobileMenuOpen;
            
            // Toggle menu state
            if (mobileMenuOpen) {
                nav.classList.add('mobile-open');
                mobileToggle.classList.add('active');
            } else {
                nav.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
                
                // Close all dropdowns when closing menu
                navDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('mobile-expanded');
                });
            }
            
            // Reset animation flag after transition
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        });
    }
    
    // ================================================================
    // MOBILE DROPDOWN TOGGLES
    // ================================================================
    
    navDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('> a');
        
        if (link) {
            link.addEventListener('click', function(e) {
                // Only handle clicks on mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isExpanded = dropdown.classList.contains('mobile-expanded');
                    
                    // Close all other dropdowns
                    navDropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('mobile-expanded');
                        }
                    });
                    
                    // Toggle current dropdown
                    if (isExpanded) {
                        dropdown.classList.remove('mobile-expanded');
                    } else {
                        dropdown.classList.add('mobile-expanded');
                    }
                }
            });
        }
    });
    
    // ================================================================
    // DESKTOP DROPDOWN HOVER
    // ================================================================
    
    // Prevent dropdown from closing when clicking inside
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // ================================================================
    // CLOSE MOBILE MENU ON OUTSIDE CLICK
    // ================================================================
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && mobileMenuOpen) {
            // Check if click is outside menu and toggle
            if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileMenuOpen = false;
                nav.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
                
                // Close all dropdowns
                navDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('mobile-expanded');
                });
            }
        }
    });
    
    // ================================================================
    // HANDLE WINDOW RESIZE
    // ================================================================
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        
        resizeTimer = setTimeout(function() {
            // Reset mobile menu on desktop
            if (window.innerWidth > 768) {
                mobileMenuOpen = false;
                nav.classList.remove('mobile-open');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                }
                
                // Remove mobile classes
                navDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('mobile-expanded');
                });
            }
        }, 250);
    });
    
    // ================================================================
    // KEYBOARD NAVIGATION
    // ================================================================
    
    // ESC key closes mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOpen) {
            mobileMenuOpen = false;
            nav.classList.remove('mobile-open');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }
            
            // Close all dropdowns
            navDropdowns.forEach(dropdown => {
                dropdown.classList.remove('mobile-expanded');
            });
        }
    });
    
    // ================================================================
    // ACCESSIBILITY ENHANCEMENTS
    // ================================================================
    
    // Add ARIA attributes
    if (mobileToggle) {
        mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
        mobileToggle.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded on toggle
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const isActive = mobileToggle.classList.contains('active');
                    mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
                }
            });
        });
        
        observer.observe(mobileToggle, { attributes: true });
    }
    
    // Add ARIA to dropdowns
    navDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('> a');
        const submenu = dropdown.querySelector('.mobile-submenu, .dropdown-menu');
        
        if (link && submenu) {
            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');
            
            // Update aria-expanded on state change
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'class') {
                        const isExpanded = dropdown.classList.contains('mobile-expanded');
                        link.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
                    }
                });
            });
            
            observer.observe(dropdown, { attributes: true });
        }
    });
});

// ================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================================================

document.addEventListener('click', function(e) {
    // Check if clicked element is an anchor link
    const link = e.target.closest('a[href^="#"]');
    
    if (link) {
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            const nav = document.querySelector('.industrial-nav');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (nav && nav.classList.contains('mobile-open')) {
                nav.classList.remove('mobile-open');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                }
            }
            
            // Smooth scroll to target
            const headerHeight = document.querySelector('.industrial-header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});