/**
 * Loader fix - Ensures the loading screen is hidden after page load
 */

// Immediately hide loader on script execution
(function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
})();

// Also hide on DOMContentLoaded as backup
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
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