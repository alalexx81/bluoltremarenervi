/**
 * Blu Oltremare - JavaScript functionality
 * Language switching, tab navigation, and interactive elements
 */

// ============================================
// LANGUAGE SWITCHING
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Get all language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Get saved language preference or default to 'it'
    const savedLang = localStorage.getItem('bluoltremareLang') || 'it';
    
    // Initialize with saved language
    switchLanguage(savedLang);
    
    // Add event listeners to all language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // ============================================
    // TAB SWITCHING
    // ============================================

    // Get all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const parentTabs = this.closest('.tabs');
            
            if (!parentTabs) return;
            
            // Remove active class from all buttons in this tab group
            parentTabs.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents in this tab group
            const parentCard = parentTabs.closest('.card');
            if (parentCard) {
                parentCard.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the selected tab content
                const selectedContent = parentCard.querySelector('#' + tabId);
                if (selectedContent) {
                    selectedContent.classList.add('active');
                }
            }
        });
    });
});

/**
 * Switch language for entire page
 * @param {string} lang - Language code ('it' or 'en')
 */
function switchLanguage(lang) {
    // Validate language
    if (lang !== 'it' && lang !== 'en') {
        console.warn('Invalid language:', lang, '- defaulting to Italian');
        lang = 'it';
    }

    // Save language preference
    localStorage.setItem('bluoltremareLang', lang);

    // Get all language-dependent elements
    const langContents = document.querySelectorAll('[id$="-it"], [id$="-en"]');
    const langButtons = document.querySelectorAll('.lang-btn');
    const heroTitles = document.querySelectorAll('.hero-title-it, .hero-title-en');
    const heroSubtitles = document.querySelectorAll('.hero-subtitle-it, .hero-subtitle-en');

    // Remove active class from all language elements
    langContents.forEach(el => el.classList.remove('active'));
    langButtons.forEach(btn => btn.classList.remove('active'));
    heroTitles.forEach(el => el.classList.remove('active'));
    heroSubtitles.forEach(el => el.classList.remove('active'));

    // Add active class to selected language
    const langSuffix = lang === 'it' ? '-it' : '-en';
    
    // Activate language content blocks
    document.querySelectorAll('[id$="' + langSuffix + '"]').forEach(el => {
        el.classList.add('active');
    });

    // Activate language buttons
    document.querySelectorAll(`[data-lang="${lang}"]`).forEach(btn => {
        btn.classList.add('active');
    });

    // Activate hero titles and subtitles
    if (lang === 'it') {
        document.querySelector('.hero-title-it')?.classList.add('active');
        document.querySelector('.hero-subtitle-it')?.classList.add('active');
    } else {
        document.querySelector('.hero-title-en')?.classList.add('active');
        document.querySelector('.hero-subtitle-en')?.classList.add('active');
    }

    // Update document language attribute for accessibility
    document.documentElement.lang = lang;
}

/**
 * Smooth scroll to element (for future navigation links)
 * @param {string} elementId - ID of the element to scroll to
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Handle external link tracking (optional)
 * Tracks clicks to booking platforms for analytics
 */
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[target="_blank"]');
    if (link && link.href) {
        // You could add analytics tracking here
        console.log('External link clicked:', link.href);
    }
});

/**
 * Detect and handle different viewport sizes
 * Adjust tab behavior for mobile if needed
 */
const mediaQueryList = window.matchMedia('(max-width: 600px)');

function handleViewportChange(e) {
    if (e.matches) {
        // Mobile view - ensure first tab is active
        const firstTabBtn = document.querySelector('.tab-btn');
        if (firstTabBtn && !firstTabBtn.classList.contains('active')) {
            firstTabBtn.click();
        }
    }
}

mediaQueryList.addEventListener('change', handleViewportChange);

// Initial check
handleViewportChange(mediaQueryList);
