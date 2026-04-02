/* 
    Dhruv Patni Portfolio Interactivity
    Terminal System Emulation
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const roles = ["HIGH-PERFORMANCE WEB APPS", "SECURE BACKEND SYSTEMS", "TERMINAL UI EXPERIENCES", "SCALABLE ARCHITECTURES"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80; // slightly faster for terminal feel

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 30; // faster delete
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80 + Math.random() * 50; // Randomize typing speed for realism
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // 2. Glitch link scramble on hover
    const glitchLinks = document.querySelectorAll('.glitch-link');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";

    glitchLinks.forEach(link => {
        let interval = null;
        link.addEventListener('mouseover', event => {
            let iteration = 0;
            clearInterval(interval);
            const originalText = event.target.dataset.text;
            
            interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if(index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");
                
                if(iteration >= originalText.length){
                    clearInterval(interval);
                }
                
                iteration += 1 / 3;
            }, 30);
        });
        
        link.addEventListener('mouseout', event => {
            clearInterval(interval);
            event.target.innerText = event.target.dataset.text;
        });
    });

    // 3. Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Form Submission (Demo)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '>> TRANSMITTING...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('SYSTEM MESSAGE: Transmission successful. (This is a demo. In a live environment, it sends an email.)');
                submitBtn.textContent = '>> PACKET DELIVERED';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }
});
