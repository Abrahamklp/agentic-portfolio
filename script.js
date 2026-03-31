document.addEventListener('DOMContentLoaded', () => {
    // 1. Elements
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const whatsappBtn = document.querySelector('.whatsapp-float');
    const typingElement = document.getElementById('typing-text');
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas?.getContext('2d');

    // 2. Sticky Header & WhatsApp Visibility
    window.addEventListener('scroll', () => {
        // Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // WhatsApp Button
        if (whatsappBtn) {
            if (window.scrollY > 300) {
                whatsappBtn.style.opacity = "1";
                whatsappBtn.style.visibility = "visible";
            } else {
                whatsappBtn.style.opacity = "0";
                whatsappBtn.style.visibility = "hidden";
            }
        }
    });

    // 3. MOBILE MENU LOGIC (Unified)
    if (menuToggle && navLinks) {
        // Toggle on click
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the document click from closing it immediately
            navLinks.classList.toggle('active');
        });

        // Auto-close when a link is clicked
        document.querySelectorAll('#navLinks a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Close if clicking outside the menu
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // 4. Reveal on Scroll & Typing Effect
    let hasTyped = false;
    const textToType = "What I Build";

    function typeEffect() {
        if (typingElement && !hasTyped) {
            let index = 0;
            const timer = setInterval(() => {
                if (index < textToType.length) {
                    typingElement.textContent += textToType.charAt(index);
                    index++;
                } else {
                    clearInterval(timer);
                    hasTyped = true;
                }
            }, 100);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal animation
                if (entry.target.classList.contains('reveal')) {
                    entry.target.classList.add('active');
                }
                // Trigger typing if it's the title
                if (entry.target.id === 'services') {
                    typeEffect();
                }
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    const servicesSection = document.querySelector('#services');
    if (servicesSection) observer.observe(servicesSection);

    // 5. Hero Particle Animation
    if (canvas && ctx) {
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
            for (let i = 0; i < 60; i++) { particles.push(new Particle()); }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => { initCanvas(); createParticles(); });
        initCanvas();
        createParticles();
        animate();
    }
});
