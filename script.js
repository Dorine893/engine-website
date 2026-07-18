// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// ============================================
// Dropdown (tap-to-open on mobile, hover on desktop via CSS)
// ============================================
document.querySelectorAll('.nav-dropdown > a').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            trigger.parentElement.classList.toggle('open');
        }
    });
});

// Close mobile menu when a real link is clicked
document.querySelectorAll('.nav-links a:not(.nav-dropdown > a)').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('open');
    });
});

// ============================================
// Hero slideshow (home page only)
// ============================================
const slides = document.querySelectorAll('.hero-slide');
const navContainer = document.getElementById('slideshowNav');

if (slides.length && navContainer) {
    let currentSlide = 0;
    let autoplayInterval;

    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slide-dot');
        if (index === 0) dot.classList.add('active');

        dot.onclick = () => {
            clearInterval(autoplayInterval);
            showSlide(index);
            startAutoplay();
        };

        navContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slide-dot');

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function startAutoplay() {
        autoplayInterval = setInterval(() => showSlide(currentSlide + 1), 3500);
    }

    startAutoplay();
}

// ============================================
// Generic horizontal scroll-track helper
// (used by workshop quicknav + arduino photo gallery)
// ============================================
function scrollTrack(trackId, dir) {
    const track = document.getElementById(trackId);
    if (!track) return;
    track.scrollBy({ left: dir * 220, behavior: 'smooth' });
}

function scrollTrackY(trackId, dir) {
    const track = document.getElementById(trackId);
    if (!track) return;
    track.scrollBy({ top: dir * 150, behavior: 'smooth' });
}

// ============================================
// Workshop photo carousel — 2x2 pages
// ============================================
function cycleWorkshopPhotos(btn, dir) {
    const container = btn.closest('.workshop-photos');
    if (!container) return;
    const pages = Array.from(container.querySelectorAll('.workshop-photo-page'));
    const dots = Array.from(container.querySelectorAll('.wp-dot'));
    let activeIndex = pages.findIndex(p => p.classList.contains('active'));
    if (activeIndex === -1) activeIndex = 0;
    pages[activeIndex].classList.remove('active');
    if (dots[activeIndex]) dots[activeIndex].classList.remove('active');
    const next = (activeIndex + dir + pages.length) % pages.length;
    pages[next].classList.add('active');
    if (dots[next]) dots[next].classList.add('active');
}

function goToWorkshopPhotoPage(dot, index) {
    const container = dot.closest('.workshop-photos');
    if (!container) return;
    const pages = container.querySelectorAll('.workshop-photo-page');
    const dots = container.querySelectorAll('.wp-dot');
    pages.forEach((p, i) => p.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

// ============================================
// Regional workshop grid — show more / jump-to-workshop
// ============================================
function toggleWorkshopList() {
    const grid = document.getElementById('workshopList');
    const btn = document.getElementById('showMoreBtn');
    if (!grid || !btn) return;
    grid.classList.toggle('expanded');
    btn.textContent = grid.classList.contains('expanded') ? 'Show Fewer ↑' : 'Show All Workshops ↓';
}

function goToWorkshop(id) {
    const grid = document.getElementById('workshopList');
    if (grid) grid.classList.add('expanded');
    const btn = document.getElementById('showMoreBtn');
    if (btn) btn.textContent = 'Show Fewer ↑';
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
}
