document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header Logic
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 3. Reveal on Scroll (Intersection Observer)
    const observerOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. Hero Particle Animation
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = `rgba(0, 210, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        initCanvas();
        createParticles();
    });

    initCanvas();
    createParticles();
    animate();
});
// Show/Hide WhatsApp button on scroll
const whatsappBtn = document.querySelector('.whatsapp-float');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        whatsappBtn.style.opacity = "1";
        whatsappBtn.style.visibility = "visible";
    } else {
        whatsappBtn.style.opacity = "0";
        whatsappBtn.style.visibility = "hidden";
    }
});

// Initial state for the scroll logic above (add this to CSS .whatsapp-float if using JS)
// opacity: 0; visibility: hidden;
const textToType = "What I Build";
const typingElement = document.getElementById('typing-text');
let index = 0;
let hasTyped = false; // Prevents re-typing every time you scroll

function typeEffect() {
    if (index < textToType.length) {
        typingElement.textContent += textToType.charAt(index);
        index++;
        // Randomize speed slightly to look like a human/machine typing
        setTimeout(typeEffect, Math.random() * 150 + 50); 
    }
}

// Modify your existing Intersection Observer to trigger this
const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasTyped) {
            hasTyped = true; // Mark as done
            typeEffect();
        }
    });
}, { threshold: 0.5 });

// Start observing the title
typingObserver.observe(document.querySelector('#services .section-title'));
// --- Mobile Menu Auto-Close Logic ---
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navToggle = document.getElementById('nav-toggle'); // Ensure this ID matches your checkbox ID
        if (navToggle) {
            navToggle.checked = false;
        }
    });
});