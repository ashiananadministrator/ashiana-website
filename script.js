// Ashiana CHS Redevelopment Portal - Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Translation Logic
    let currentLang = localStorage.getItem('ashiana_lang') || 'en';

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('ashiana_lang', lang);
        
        // Update document lang attribute
        document.documentElement.lang = lang;

        // Sync language selector active classes
        const langLinks = document.querySelectorAll('.lang-link');
        langLinks.forEach(link => {
            if (link.dataset.lang === lang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Translate elements with data-i18n attribute
        const i18nElements = document.querySelectorAll('[data-i18n]');
        i18nElements.forEach(el => {
            const key = el.dataset.i18n;
            if (window.portalTranslations && window.portalTranslations[lang] && window.portalTranslations[lang][key]) {
                el.textContent = window.portalTranslations[lang][key];
            }
        });

        // Translate inputs/textareas with data-i18n-placeholder attribute
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (window.portalTranslations && window.portalTranslations[lang] && window.portalTranslations[lang][key]) {
                el.placeholder = window.portalTranslations[lang][key];
            }
        });

        // Update document title and description meta tag
        if (window.portalTranslations && window.portalTranslations[lang]) {
            document.title = window.portalTranslations[lang].meta_title || document.title;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc && window.portalTranslations[lang].meta_desc) {
                metaDesc.setAttribute('content', window.portalTranslations[lang].meta_desc);
            }
        }

        // Re-run search/filter in case of language changes affecting titles
        filterDocuments();
    }

    // Bind language selector event listeners
    const langLinks = document.querySelectorAll('.lang-link');
    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            applyLanguage(link.dataset.lang);
        });
    });

    // 2. Mobile Menu Toggle
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

    // 3. Document Search & Filter Logic
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
            const originalTitle = card.dataset.titleEn ? card.dataset.titleEn.toLowerCase() : '';
            const category = card.dataset.category;
            const matchesSearch = title.includes(searchQuery) || originalTitle.includes(searchQuery);
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

    // 4. Scroll to Top Button
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



    // 6. Visitor Counter Logic (using CounterAPI.dev)
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

    // Initialize Active Language
    applyLanguage(currentLang);
});
