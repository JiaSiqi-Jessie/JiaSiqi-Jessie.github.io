// Main JavaScript for the website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize parallax effects
    initializeParallaxEffects();
});

// Animation initialization
function initializeAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-in');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Scroll effects
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        // Add/remove glass effect based on scroll
        if (scrolled > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.35)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.25)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.style.cssText = `
        display: none;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        padding: 10px;
        color: #2c3e50;
        cursor: pointer;
        backdrop-filter: blur(5px);
    `;
    
    // Insert toggle button
    const navbar = document.querySelector('.navbar .container');
    navbar.appendChild(mobileToggle);
    
    // Toggle functionality
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        const icon = mobileToggle.querySelector('i');
        icon.className = navMenu.classList.contains('mobile-open') ? 
            'fas fa-times' : 'fas fa-bars';
    });
    
    // Show/hide toggle button based on screen size
    function handleResize() {
        if (window.innerWidth <= 768) {
            mobileToggle.style.display = 'block';
        } else {
            mobileToggle.style.display = 'none';
            navMenu.classList.remove('mobile-open');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax effects
function initializeParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Apply parallax to glass cards
        const glassCards = document.querySelectorAll('.glass-card');
        glassCards.forEach((card, index) => {
            const speed = (index % 3 + 1) * 0.1;
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// News management functions for admin
let newsData = [
    {
        date: '2025.01',
        content: 'Awarded HKU SEED Fund for Basic Research for project on thermal environment assessment'
    },
    {
        date: '2024.12',
        content: 'New paper published in <em>Energy and Buildings</em> on global cooling potentials of green roofs'
    },
    {
        date: '2024.08',
        content: 'Started position as Research Assistant Professor at HKU'
    },
    {
        date: '2024.06',
        content: 'Selected for Shanghai Magnolia Program'
    }
];

// Update news display
function updateNewsDisplay() {
    const newsList = document.getElementById('news-list');
    if (newsList) {
        newsList.innerHTML = newsData.map((item, index) => `
            <div class="news-item slide-in" style="animation-delay: ${index * 0.1}s">
                <span class="date">${item.date}</span>
                <p>${item.content}</p>
            </div>
        `).join('');
    }
}

// Dynamic background animation
function createBackgroundAnimation() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const particles = [];
    const particleCount = 50;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.1
        };
    }
    
    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(52, 152, 219, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(52, 152, 219, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Initialize background animation
createBackgroundAnimation();

// Add CSS for mobile menu
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(15px);
            flex-direction: column;
            padding: 20px;
            border-radius: 0 0 15px 15px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
        }
        
        .nav-menu.mobile-open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }
        
        .navbar .container {
            position: relative;
        }
    }
`;

// Add mobile menu styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Export functions for use in other scripts
window.siteUtils = {
    updateNewsDisplay,
    newsData
};