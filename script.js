window.addEventListener('DOMContentLoaded', () => {

    // THEME TOGGLE
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // HAMBURGER MENU
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // ANIMATED COUNTERS
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const increment = Math.ceil(target / 50);
                const interval = setInterval(() => {
                    count = Math.min(count + increment, target);
                    entry.target.textContent = count + '+';
                    if (count >= target) clearInterval(interval);
                }, 40);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));

    // CONTACT FORM
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && typeof emailjs !== 'undefined') {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = contactForm.querySelector('[name="from_name"]').value.trim();
            const email = contactForm.querySelector('[name="reply_to"]').value.trim();
            const message = contactForm.querySelector('[name="message"]').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name) { alert('Please enter your name.'); return; }
            if (!email || !emailRegex.test(email)) { alert('Please enter a valid email.'); return; }
            if (!message) { alert('Please enter a message.'); return; }

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            emailjs.sendForm('web hosting', 'template_dborolh', this)
                .then(() => {
                    alert('Message Sent Successfully!');
                    contactForm.reset();
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, (error) => {
                    alert('Failed to send. Please try again.');
                    console.log('FAILED...', error);
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                });
        });
    }

}); // <-- this closing bracket ends the DOMContentLoaded