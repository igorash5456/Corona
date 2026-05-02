// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Observe feature and service cards
document.querySelectorAll('.feature-card, .service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== SMOOTH NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for logo link
        if (href === '#') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== BUTTON HOVER EFFECTS =====
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===== NAV LINK ACTIVE STATE =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== ADD ACTIVE NAV LINK STYLING (Optional CSS) =====
// Add this to style.css if you want:
// .nav-links a.active::after {
//     width: 100%;
// }

// ===== LAZY LOAD VIDEO =====
const video = document.querySelector('.hero-video');

// Check if video is visible in viewport
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            video.play();
        } else {
            video.pause();
        }
    });
});

videoObserver.observe(video);

// ===== DYNAMIC YEAR IN FOOTER =====
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-copyright');
    
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
    }
});

// ===== ADD TO CART / BOOKING LOGIC =====
const bookingButtons = document.querySelectorAll('.btn-primary, .cta-button');

bookingButtons.forEach(button => {
    if (button.textContent.includes('Забронировать') || button.textContent.includes('Связаться')) {
        button.addEventListener('click', function() {
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});

// ===== MOBILE MENU TOGGLE (If you add mobile menu in future) =====
// Add this when implementing mobile hamburger menu
// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.nav-links');
// 
// if (hamburger) {
//     hamburger.addEventListener('click', function() {
//         navLinks.classList.toggle('active');
//     });
// }

// ===== WINDOW RESIZE HANDLING =====
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Add any responsive adjustments here if needed
        console.log('Window resized');
    }, 250);
});

// ===== PAGE LOAD COMPLETE =====
window.addEventListener('load', function() {
    console.log('Corona Restaurant Website Loaded Successfully');
    // Add any post-load actions here
});
