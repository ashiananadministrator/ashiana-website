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

    // 4. Contact Form Submission
    const contactForm = document.getElementById('redevContactForm');
    const successAlert = document.getElementById('formSuccessAlert');
    const submitBtn = document.getElementById('btnFormSubmit');

    // Google Apps Script Web App URL (Insert your URL here after deploying)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/a/macros/ashianasociety.com/s/AKfycbx0CLmuVJUr68eh2_QepBhModUuFXFx2TiMFxcJBL9e3EI3byU3JDBRe06DeYCNTH4R/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formName').value;
            const flat = document.getElementById('formFlat').value;
            const email = document.getElementById('formEmail').value;
            const type = document.getElementById('formType').value;
            const message = document.getElementById('formMessage').value;

            // Change button state to loading
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            }

            const formData = {
                name,
                flat,
                email,
                type,
                message,
                timestamp: new Date().toLocaleString()
            };

            // Save submission to local storage as backup
            let submissions = JSON.parse(localStorage.getItem('ashiana_submissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('ashiana_submissions', JSON.stringify(submissions));

            if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
                // Submit to Google Sheets and Email Apps Script
                fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(() => {
                        handleSuccess(name, flat);
                    })
                    .catch(error => {
                        console.error('Error submitting form:', error);
                        // Fallback to local success if network issues but we saved it locally
                        handleSuccess(name, flat);
                    });
            } else {
                // Fallback demonstration if URL is not configured yet
                setTimeout(() => {
                    handleSuccess(name, flat);
                }, 1000);
            }
        });
    }

    function handleSuccess(name, flat) {
        if (successAlert) {
            successAlert.textContent = `Thank you, Mr./Ms. ${name}. Your response regarding Flat ${flat} has been recorded successfully.`;
            successAlert.style.display = 'block';

            setTimeout(() => {
                successAlert.style.display = 'none';
            }, 5000);
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Request';
        }
        if (contactForm) {
            contactForm.reset();
        }
    }

    // 5. Visitor Counter Logic (using CounterAPI.dev)
    const visitorCountValue = document.getElementById('visitorCountValue');
    if (visitorCountValue) {
        fetch('https://api.counterapi.dev/v1/ashianasociety/visits/up')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && typeof data.count !== 'undefined') {
                    // Format the number with commas (e.g. 1,234)
                    visitorCountValue.textContent = Number(data.count).toLocaleString();
                } else {
                    visitorCountValue.textContent = '1';
                }
            })
            .catch(error => {
                console.error('Error updating visitor count:', error);
                visitorCountValue.textContent = '--';
            });
    }
});
