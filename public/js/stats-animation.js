/**
 * Stats Animation
 * Animates numbers counting up when they come into view
 */

document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateNumber);
                } else {
                    // Handle different formats for final display
                    if (target === 50) {
                        stat.textContent = '£50M+';
                    } else if (target === 50000) {
                        stat.textContent = '50,000+';
                    } else if (target === 24) {
                        stat.textContent = '24';
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                }
            };
            
            updateNumber();
        });
    }
    
    // Intersection Observer to trigger animation when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateStats();
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe the stats grid
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        observer.observe(statsGrid);
    }
    
    // Also animate hero calculator amount
    const heroCalcAmount = document.getElementById('heroCalcAmount');
    if (heroCalcAmount) {
        let calcCurrent = 0;
        const calcTarget = 250000;
        const calcIncrement = calcTarget / 100;
        
        const updateCalcAmount = () => {
            calcCurrent += calcIncrement;
            if (calcCurrent < calcTarget) {
                heroCalcAmount.textContent = Math.floor(calcCurrent).toLocaleString();
                requestAnimationFrame(updateCalcAmount);
            } else {
                heroCalcAmount.textContent = calcTarget.toLocaleString();
            }
        };
        
        // Start after a short delay
        setTimeout(updateCalcAmount, 1000);
    }
});