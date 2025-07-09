// Dropdown Menu Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile dropdown toggles
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    
    navDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        // Only add click handler for mobile
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('mobile-expanded');
                
                // Close other dropdowns
                navDropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('mobile-expanded');
                    }
                });
            }
        });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                // Remove mobile classes on desktop
                navDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('mobile-expanded');
                });
            }
        }, 250);
    });
    
    // Prevent dropdown from closing when clicking inside
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});

// Update mobile menu functionality to handle dropdowns
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.industrial-nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
            
            // Animate hamburger to X
            const spans = mobileToggle.querySelectorAll('span');
            if (nav.classList.contains('mobile-open')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                
                // Close all dropdowns when closing mobile menu
                document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('mobile-expanded');
                });
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.industrial-nav') && !e.target.closest('.mobile-menu-toggle')) {
                nav.classList.remove('mobile-open');
                
                // Reset hamburger animation
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (mobileToggle) {
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                
                // Close all dropdowns
                document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('mobile-expanded');
                });
            }
        }
    });
});