// Initialize AOS Animation Library
AOS.init({
    duration: 1000,
    once: true,
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');

    // Hamburger Animation
    hamburger.classList.toggle('toggle');
});

// Close mobile menu when a link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        hamburger.classList.remove('toggle');
    });
});

// Countdown Timer
const eventDate = new Date('March 28, 2026 12:00:00').getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const gap = eventDate - now;

    // Time calculations
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    // Update DOM
    document.getElementById('days').innerText = textDay < 10 ? '0' + textDay : textDay;
    document.getElementById('hours').innerText = textHour < 10 ? '0' + textHour : textHour;
    document.getElementById('minutes').innerText = textMinute < 10 ? '0' + textMinute : textMinute;
    document.getElementById('seconds').innerText = textSecond < 10 ? '0' + textSecond : textSecond;

    // If countdown is finished
    if (gap < 0) {
        clearInterval(countdown);
        document.getElementById('countdown').innerHTML = '<h3>The Event Has Started!</h3>';
    }
}, 1000);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// RSVP Form Handling
const rsvpForm = document.getElementById('rsvp-form');
const formStatus = document.getElementById('form-status');

// PASTE YOUR GOOGLE SCRIPT URL HERE
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxdxBCQgAq7Np3ZVtjwzWWSKwIHH0STwReqEZIST046il5Td0yeasd5ne-D5XJ1OHbQqw/exec';

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Removed configuration check since URL is set

    formStatus.innerText = 'Sending...';
    formStatus.style.color = '#333';

    // Collect form data and convert to URLSearchParams
    const formData = new FormData(rsvpForm);
    const data = new URLSearchParams(formData);

    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
        .then(response => {
            // With no-cors, we can't check response.ok, so we assume success if it didn't throw
            formStatus.innerText = `Thank you! Your RSVP has been received.`;
            formStatus.style.color = 'green';
            rsvpForm.reset();

            setTimeout(() => {
                formStatus.innerText = '';
            }, 5000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            formStatus.innerText = 'Error sending RSVP. Please try again.';
            formStatus.style.color = 'red';
        });
});

// Hero Background Slider
const hero = document.querySelector('.hero');
const heroImages = [
    'gellery/aqiqah_boy_1.png',
    'gellery/aqiqah_boy_2.jpeg'
];
let currentHeroImageIndex = 0;

function changeHeroBackground() {
    currentHeroImageIndex = (currentHeroImageIndex + 1) % heroImages.length;
    hero.style.backgroundImage = `url('${heroImages[currentHeroImageIndex]}')`;
}

// Change background every 5 seconds
setInterval(changeHeroBackground, 5000);

// Get Directions logic
function getDirections() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                // Create Google Maps Directions URL
                const url = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=Resaldar+Baba+Banquet+Hall,+Ranchi`;
                window.open(url, '_blank');
            },
            (error) => {
                console.error("Error getting location: ", error);
                // Fallback if user denies location or error
                alert("Could not retrieve your location. Opening map with destination only.");
                window.open("https://maps.google.com/?q=Resaldar+Baba+Banquet+Hall,+Ranchi", '_blank');
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
        window.open("https://maps.google.com/?q=Resaldar+Baba+Banquet+Hall,+Ranchi", '_blank');
        window.open("https://maps.google.com/?q=Resaldar+Baba+Banquet+Hall,+Ranchi", '_blank');
    }
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const galleryItems = document.querySelectorAll('.gallery-item img');

let currentImageIndex = 0;
const images = [];

// Collect all images sources
galleryItems.forEach((item, index) => {
    images.push(item.src);
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = images[currentImageIndex];
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Disable scrolling
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}

function changeImage(n) {
    currentImageIndex += n;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    lightboxImg.src = images[currentImageIndex];
}

closeBtn.addEventListener('click', closeLightbox);

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});

// Touch Swipe Support for Lightbox
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe Left -> Next Image
        changeImage(1);
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe Right -> Prev Image
        changeImage(-1);
    }
}
