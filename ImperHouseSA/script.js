document.addEventListener('DOMContentLoaded', () => {
    // Handling contact form submission
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`¡Gracias ${name}! Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.`);
            form.reset();
        });
    }

    // Scroll Logic for Day/Night Effect
    const heroBg = document.querySelector('.hero-bg');
    const lights = document.querySelectorAll('.light-source');

    // Max scroll distance to complete the transition (e.g., 500px or window height)
    const transitionHeight = window.innerHeight * 0.8;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Calculate ratio (0 to 1) based on scroll
        // We limit it to 1 so it stays night after scrolling past the threshold
        let ratio = Math.min(scrollY / transitionHeight, 1);

        // Update Filters:
        // Brightness: 1.1 -> 0.4
        // Sepia: 0.1 -> 0.0
        // Hue: 0 -> 200deg (Blue shift)

        const brightness = 1.1 - (ratio * 0.7);
        const hue = ratio * 200;
        const contrast = 1 + (ratio * 0.2);

        if (heroBg) {
            heroBg.style.filter = `brightness(${brightness}) hue-rotate(${hue}deg) contrast(${contrast})`;
        }

        // Update Lights Opacity
        // Lights start turning on after 30% ratio to simulate "getting dark first"
        if (ratio > 0.3) {
            // Remap ratio 0.3->1.0 to 0->1 for lights opacity
            const lightOpacity = (ratio - 0.3) / 0.7;
            lights.forEach(light => {
                light.style.opacity = lightOpacity;
                light.style.transform = `scale(${0.8 + (lightOpacity * 0.4)})`;
            });
        } else {
            lights.forEach(light => {
                light.style.opacity = 0;
                light.style.transform = 'scale(0.8)';
            });
        }
    });

    // Section Visibility Logic (Focus Mode)
    // Identify all major blocks
    const sections = document.querySelectorAll('.section, .brands-section, .hero, .footer');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px', // Active when in the middle 60% of screen
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                // If the user wants the previous section to disappear, we remove the class
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
        // Force Hero to be in view initially
        if (section.id === 'hero') section.classList.add('in-view');
    });

    // Header scroll background effect (Secondary)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
