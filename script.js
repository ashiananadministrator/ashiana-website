// Ashiana CHS Redevelopment Portal - Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mainNav.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }

    // Close menu when clicking navigation links on mobile
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    });

    // 2. Document Search & Filter Logic
    const searchInput = document.getElementById('docSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const docCards = document.querySelectorAll('.doc-card');
    const noDocsMessage = document.getElementById('noDocsMessage');
    
    let activeCategory = 'all';
    let searchQuery = '';

    function filterDocuments() {
        let visibleCount = 0;
        
        docCards.forEach(card => {
            const title = card.querySelector('.doc-title').textContent.toLowerCase();
            const category = card.dataset.category;
            const matchesSearch = title.includes(searchQuery);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            if (noDocsMessage) noDocsMessage.style.display = 'block';
        } else {
            if (noDocsMessage) noDocsMessage.style.display = 'none';
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterDocuments();
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.filter;
            filterDocuments();
        });
    });

    // 3. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
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

    // 4. Contact Form Submission Mock
    const contactForm = document.getElementById('redevContactForm');
    const successAlert = document.getElementById('formSuccessAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('formName').value;
            const flat = document.getElementById('formFlat').value;
            const email = document.getElementById('formEmail').value;
            const message = document.getElementById('formMessage').value;

            const submission = {
                name,
                flat,
                email,
                message,
                timestamp: new Date().toISOString()
            };

            // Save submission to local storage for demonstration
            let submissions = JSON.parse(localStorage.getItem('ashiana_submissions') || '[]');
            submissions.push(submission);
            localStorage.setItem('ashiana_submissions', JSON.stringify(submissions));

            // Display success message
            if (successAlert) {
                successAlert.textContent = `Thank you, Mr./Ms. ${name}. Your response regarding Flat ${flat} has been recorded successfully.`;
                successAlert.style.display = 'block';
                
                // Hide alert after 5 seconds
                setTimeout(() => {
                    successAlert.style.display = 'none';
                }, 5000);
            }

            // Reset form
            contactForm.reset();
        });
    }
});
