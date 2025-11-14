/**
 * Industrial Animations
 * Handles all animations for the industrial theme
 */

document.addEventListener('DOMContentLoaded', function() {
    // Floating tools animation
    const tools = document.querySelectorAll('.floating-tools .tool-icon');
    tools.forEach((tool, index) => {
        tool.style.animation = `float ${3 + index}s ease-in-out infinite`;
        tool.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
            }
        });
    }
    
    // Parallax effect for construction background
    const constructionBg = document.getElementById('constructionScene');
    if (constructionBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            constructionBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.industrial-feature-card, .industrial-testimonial, .trade-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Hammer animation in CTA section
    const hammer = document.querySelector('.hammer-animation svg');
    if (hammer) {
        setInterval(() => {
            hammer.style.transform = 'rotate(-30deg)';
            setTimeout(() => {
                hammer.style.transform = 'rotate(0deg)';
            }, 200);
        }, 2000);
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(10deg); }
    }
    
    @keyframes ticker {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .industrial-feature-card,
    .industrial-testimonial,
    .trade-card {
        opacity: 0;
    }
    
    .hammer-animation svg {
        transform-origin: bottom center;
        transition: transform 0.2s ease;
    }
`;
document.head.appendChild(style);