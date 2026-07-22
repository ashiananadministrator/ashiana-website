/* cv/script.js - Interactive Portfolio Scripts */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Set Copyright Year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 1b. Scroll Progress Indicator
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + '%';
        }
    });

    // 2. Theme Toggle (Dark / Light Mode)
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlEl = document.documentElement;
    
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }

    // 3. Mobile Navigation Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinksContainer.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
    
    // Close mobile menu when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    });

    // 4. Typing Effect for Subtitle
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["Full Stack Engineer", "Systems Administrator", "Problem Solver"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between word cycles
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            typedTextSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            typedTextSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }
    
    if (typedTextSpan && textArray.length) {
        setTimeout(type, newTextDelay);
    }

    // 5. Intersection Observer: Timeline Slide-In & Skill Bar Fill
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    // Observer for Timeline Items
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Observer for Skill Bars
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetFill = entry.target;
                const targetLevel = targetFill.getAttribute('data-level');
                targetFill.style.width = targetLevel;
                observer.unobserve(targetFill);
            }
        });
    }, {
        threshold: 0.1
    });
    
    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });

    // 6. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to current
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Set animation fade out/in effect
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 200);
            });
        });
    });

    // 7. Scroll-To-Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            if (scrollTopBtn) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.pointerEvents = 'auto';
            }
        } else {
            if (scrollTopBtn) {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.pointerEvents = 'none';
            }
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 8. Navigation Active State on Scroll
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Subtract navbar height (70px) and offset (150px) for accuracy
            if (window.scrollY >= (sectionTop - 220)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 9. Contact Form Submission (Mock Handler with Premium Alert popup)
    const contactForm = document.getElementById('portfolioContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Generate a modern popup feedback inside container
            const originalButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonHTML = originalButton.innerHTML;
            
            originalButton.disabled = true;
            originalButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Mock network call
            setTimeout(() => {
                originalButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                originalButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; // Success Green
                
                // Show simple feedback banner at top of form
                const alertBanner = document.createElement('div');
                alertBanner.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                alertBanner.style.border = '1px solid #10b981';
                alertBanner.style.color = '#10b981';
                alertBanner.style.padding = '1rem';
                alertBanner.style.borderRadius = '8px';
                alertBanner.style.marginBottom = '1.5rem';
                alertBanner.style.textAlign = 'center';
                alertBanner.style.fontSize = '0.95rem';
                alertBanner.style.fontFamily = 'var(--font-heading)';
                alertBanner.style.fontWeight = '600';
                alertBanner.innerText = `Thank you, ${name}! Your message has been sent successfully.`;
                
                contactForm.insertBefore(alertBanner, contactForm.firstChild);
                
                // Reset form fields
                contactForm.reset();
                
                // Restore button state after 3 seconds
                setTimeout(() => {
                    alertBanner.remove();
                    originalButton.disabled = false;
                    originalButton.innerHTML = originalButtonHTML;
                    originalButton.style.background = ''; // Revert to stylesheet default
                }, 4000);
                
            }, 1500);
        });
    }
});
