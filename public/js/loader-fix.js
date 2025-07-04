/**
 * Loader fix - Ensures the loading screen is hidden after page load
 */
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    
    // Hide loader after a short delay to ensure everything is loaded
    setTimeout(function() {
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            
            // Remove loader from DOM after fade out
            setTimeout(function() {
                loader.style.display = 'none';
            }, 300);
        }
    }, 500);
});

// Fallback: Hide loader after max 3 seconds regardless
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader && loader.style.display !== 'none') {
            loader.style.display = 'none';
        }
    }, 3000);
});