// Simple SPA Routing Logic
function navigate(sectionId) {
    // 1. Update Navigation Links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });

    // 2. Hide all sections & Remove animations
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
        // Reset animations so they re-play when section becomes active again
        const animatedElements = section.querySelectorAll('.animate-up');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow */
            el.style.animation = null; 
        });
    });

    // 3. Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Handle Hash Changes (E.g. #about, #tech)
window.addEventListener('hashchange', () => {
    let hash = window.location.hash.substring(1);
    if (!hash) hash = 'about'; // Default
    navigate(hash);
});

// Initialize on Load
window.addEventListener('DOMContentLoaded', () => {
    let hash = window.location.hash.substring(1);
    if (!hash) hash = 'about';
    navigate(hash);
});

// Smooth scroll for nav links (prevents default jump)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        window.history.pushState(null, null, `#${sectionId}`);
        navigate(sectionId);
    });
});
