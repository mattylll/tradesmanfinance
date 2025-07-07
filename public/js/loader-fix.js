/**
 * Loader fix - Ensures the loading screen is hidden after page load
 */

// Hide loader immediately if page is already loaded
if (document.readyState === 'complete') {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    
    // Hide loader after a short delay to ensure everything is loaded
    setTimeout(function() {
        if (loader) {
            loader.style.transition = 'opacity 0.3s ease-out';
            loader.style.opacity = '0';
            
            // Remove loader from DOM after fade out
            setTimeout(function() {
                loader.style.display = 'none';
            }, 300);
        }
    }, 300);
});

// Fallback: Hide loader after max 3 seconds regardless
window.addEventListener('lo