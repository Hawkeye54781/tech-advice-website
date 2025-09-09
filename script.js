// Smooth scrolling for navigation links
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

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// EmailJS Configuration
// Replace these with your actual EmailJS credentials after setup
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
    SERVICE_ID: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID' // Replace with your EmailJS template ID
};

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// Form handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            // Show configuration message if not set up yet
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                
                showFormStatus('error', '⚙️ EmailJS not configured yet. Please check the setup instructions in the console.');
                console.log('%c📧 EmailJS Setup Required!', 'color: #f59e0b; font-size: 16px; font-weight: bold;');
                console.log('Please follow these steps to enable email sending:');
                console.log('1. Go to https://www.emailjs.com/ and create a free account');
                console.log('2. Set up an email service (Gmail, Outlook, etc.)');
                console.log('3. Create an email template');
                console.log('4. Replace the credentials in script.js');
                console.log('5. Form data would be:', data);
            }, 1000);
            return;
        }
        
        // Send email using EmailJS
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
            from_name: data.name,
            from_email: data.email,
            category: data.category,
            budget: data.budget || 'Not specified',
            timeline: data.timeline || 'Not specified',
            message: data.message,
            to_name: 'Tech Advice Hub', // Your name
        })
        .then(() => {
            // Success
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            showFormStatus('success', '✅ Thank you for your message! I\'ll get back to you within 24 hours with personalized tech advice.');
            
            // Reset form
            contactForm.reset();
            
            // Update character counter
            const charCounter = document.querySelector('.char-counter');
            if (charCounter) {
                charCounter.textContent = '0 characters (minimum 20)';
                charCounter.style.color = 'var(--error)';
            }
        })
        .catch((error) => {
            // Error
            console.error('EmailJS Error:', error);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            showFormStatus('error', '❌ Sorry, there was an error sending your message. Please try again or contact me directly.');
        });
    });
}

function validateForm(data) {
    const errors = [];
    
    // Check required fields
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter your full name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.category) {
        errors.push('Please select what you need help with');
    }
    
    if (!data.message || data.message.trim().length < 20) {
        errors.push('Please provide more details about your needs (at least 20 characters)');
    }
    
    if (errors.length > 0) {
        showFormStatus('error', errors.join('<br>'));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormStatus(type, message) {
    if (!formStatus) return;
    
    formStatus.className = `form-status ${type}`;
    formStatus.innerHTML = message;
    formStatus.style.display = 'block';
    
    // Scroll to status message
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-hide success messages after 8 seconds
    if (type === 'success') {
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 8000);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .about-content, .contact-form');
    animateElements.forEach(el => observer.observe(el));
});

// Header background on scroll
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove background based on scroll position
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Support button interactions
document.addEventListener('DOMContentLoaded', () => {
    const revolutBtn = document.getElementById('revolut-btn');
    const donationBtn = document.getElementById('donation-btn');
    
    if (revolutBtn) {
        revolutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // You can replace this with actual Revolut link
            alert('Revolut tag: @your-tag\n\nThank you for considering a donation!');
        });
    }
    
    if (donationBtn) {
        donationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // You can replace this with actual donation platform link
            alert('Donation platform coming soon!\n\nThank you for your interest in supporting this service!');
        });
    }
});

// Form field enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Auto-resize textarea
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.max(120, this.scrollHeight) + 'px';
        });
    }
    
    // Character counter for message field
    if (textarea) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = `
            font-size: 0.875rem;
            color: var(--text-light);
            text-align: right;
            margin-top: 0.5rem;
        `;
        textarea.parentNode.appendChild(charCounter);
        
        function updateCharCounter() {
            const count = textarea.value.length;
            const minLength = 20;
            charCounter.textContent = `${count} characters${count < minLength ? ` (minimum ${minLength})` : ''}`;
            charCounter.style.color = count < minLength ? 'var(--error)' : 'var(--text-light)';
        }
        
        textarea.addEventListener('input', updateCharCounter);
        updateCharCounter();
    }
    
    // Form field focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });
});

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Performance: Lazy load images (if you add images later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
}

// Add some Easter eggs for tech enthusiasts
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
                alert('🎮 Konami Code activated! You\'re a true tech enthusiast!');
            }, 2000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation for Easter egg
const rainbowCSS = `
@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}
`;
const style = document.createElement('style');
style.textContent = rainbowCSS;
document.head.appendChild(style);
