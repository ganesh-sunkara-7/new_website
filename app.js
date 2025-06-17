// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initPreloader();
    initSidebar();
    initNavigation();
    initSkillsTabs();
    initScrollAnimations();
});

// Preloader functionality
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Sidebar functionality
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainContent = document.getElementById('main-content');
    
    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    // Close sidebar on mobile when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
}

// Skills tabs functionality
function initSkillsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.glass-card, .timeline-item, .skill-card, .project-card, .contact-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
}, 250));

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced cube rotation control
function initCubeInteraction() {
    const cube = document.querySelector('.cube');
    let isHovered = false;
    
    if (cube) {
        const cubeContainer = document.querySelector('.cube-container');
        
        cubeContainer.addEventListener('mouseenter', function() {
            isHovered = true;
            cube.style.animationPlayState = 'paused';
        });
        
        cubeContainer.addEventListener('mouseleave', function() {
            isHovered = false;
            cube.style.animationPlayState = 'running';
        });
        
        cubeContainer.addEventListener('mousemove', function(e) {
            if (isHovered) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const rotateX = (e.clientY - centerY) / 5;
                const rotateY = (e.clientX - centerX) / 5;
                
                cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
    }
}

// Initialize cube interaction after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initCubeInteraction, 1500); // Wait for preloader
});

// Smooth reveal animations for timeline items
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        if (item.classList.contains('timeline-item:nth-child(odd)') || item.getBoundingClientRect().left < window.innerWidth / 2) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        
        timelineObserver.observe(item);
    });
}

// Initialize timeline animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTimelineAnimations, 1500);
});

// Add typing effect to hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typingSpeed = 100;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        setTimeout(typeWriter, 2000); // Start after preloader
    }
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTypingEffect, 1500);
});

// Add parallax effect to sections
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual, .cube-container');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 768) {
        initParallaxEffect();
    }
});

// Add contact form validation (if needed in future)
function initContactValidation() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click tracking or validation here if needed
            console.log('Contact link clicked:', this.textContent);
        });
    });
}

// Initialize contact validation
document.addEventListener('DOMContentLoaded', function() {
    initContactValidation();
});

// Performance optimization: Lazy load animations
function initLazyAnimations() {
    const lazyElements = document.querySelectorAll('.skill-card, .project-card');
    
    const lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// Initialize lazy animations
document.addEventListener('DOMContentLoaded', function() {
    initLazyAnimations();
});

// Add custom cursor effect for interactive elements
function initCustomCursor() {
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .tab-btn, .contact-link, .social-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });
    });
}

// Initialize custom cursor
document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
});

// Add keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key closes sidebar
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('active');
        }
        
        // Arrow keys for tab navigation in skills section
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab) {
                const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
                const currentIndex = tabButtons.indexOf(activeTab);
                let nextIndex;
                
                if (e.key === 'ArrowLeft') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
                } else {
                    nextIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
                }
                
                tabButtons[nextIndex].click();
                tabButtons[nextIndex].focus();
            }
        }
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    initKeyboardNavigation();
});