// Photo slider functionality
const slideImages = [
    '2020-03-18.jpg',
    '2020-08-12.jpg',
    '2021-08-02.jpg',
    '2021-08-28.jpg',
    '2021-11-17.jpg',
    '2022-01-06.jpg',
    '2022-01-10.jpg',
    '2022-02-06.jpg',
    '2022-02-16-2.jpg',
    '2022-02-16-3.jpg',
    '2022-02-16.jpg',
    '2022-03-01.jpg',
    '2022-03-03.jpg',
    '2022-04-19.jpg',
    '2022-05-16-2.jpg',
    '2022-05-16.jpg',
    '2022-06-10.jpg',
    '2022-10-27.jpg',
    'unnamed-2.jpg',
    'unnamed-3.jpg',
    'unnamed-4.jpg',
    'unnamed-5.jpg',
    'unnamed-6.jpg',
    'unnamed-7.jpg',
    'unnamed-8.jpg',
    'unnamed.jpg'
];

let currentSlide = 0;

// Initialize slider
function initSlider() {
    const slidesContainer = document.getElementById('slides');
    const dotsContainer = document.getElementById('sliderDots');

    // Add all images to slider
    slideImages.forEach((img, index) => {
        const slide = document.createElement('img');
        slide.src = `images/${img}`;
        slide.alt = `Pipes & Beans - Photo ${index + 1}`;
        slide.className = 'slide';
        slidesContainer.appendChild(slide);

        // Create dot for navigation
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });

    updateSlider();
}

// Change slide function
function changeSlide(direction) {
    currentSlide += direction;

    if (currentSlide >= slideImages.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slideImages.length - 1;
    }

    updateSlider();
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// Update slider display
function updateSlider() {
    const slides = document.getElementById('slides');
    const dots = document.getElementsByClassName('dot');

    slides.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

// Auto-play slider
function autoPlay() {
    changeSlide(1);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSlider();

    // Start auto-play
    setInterval(autoPlay, 5000);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'linear-gradient(to bottom, rgba(10, 10, 10, 0.95), transparent)';
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - scrolled / 600;
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('.menu-category, .contact-item, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        changeSlide(1); // Swipe left - next slide
    }
    if (touchEndX > touchStartX + 50) {
        changeSlide(-1); // Swipe right - previous slide
    }
}