// Mobile Menu Handler - Unified solution for mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.industrial-nav');
    const header = document.querySelector('.industrial-header');
    const dropdowns = document.querySelectorAll('.has-dropdown');
    
    // Only proceed if elements exist
    if (!mobileMenuToggle || !nav) return;
    
    // Create overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
    `;
    document.body.appendChild(overlay);
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = nav.classList.contains('mobile-active');
        
        if (isOpen) {
            // Close menu
            nav.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active', 'is-active');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        } else {
            // Open menu
            nav.classList.add('mobile-active');
            mobileMenuToggle.classList.add('active', 'is-active');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        nav.classList.remove('mobile-active');
        mobileMenuToggle.classList.remove('active', 'is-active');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
    
    // Handle dropdown toggles on mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector(':scope > a');
        if (!link) return;

        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && nav.classList.contains('mobile-active')) {
                e.preventDefault();
                e.stopPropagation();
                
                const isExpanded = dropdown.classList.contains('mobile-expanded');
                
                // Close all other dropdowns
                dropdowns.forEach(other => {
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
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                // Reset mobile menu state on desktop
                nav.classList.remove('mobile-active');
                mobileMenuToggle.classList.remove('active', 'is-active');
                overlay.style.display = 'none';
                document.body.style.overflow = '';
                
                // Remove mobile dropdown states
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('mobile-expanded');
                });
            }
        }, 250);
    });
    
    // Prevent dropdown menus from closing when clicking inside
    const dropdownMenus = document.querySelectorAll('.dropdown-menu, .mobile-submenu');
    dropdownMenus.forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('mobile-active')) {
            nav.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active', 'is-active');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});