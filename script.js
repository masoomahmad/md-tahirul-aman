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

// RSVP Form Handling (Mock)
const rsvpForm = document.getElementById('rsvp-form');
const formStatus = document.getElementById('form-status');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate form submission
    const name = document.getElementById('name').value;
    const guests = document.getElementById('guests').value;

    // In a real app, you would send this data to a backend
    console.log(`RSVP: ${name} with ${guests} guests`);

    formStatus.innerText = `Thank you, ${name}! Your RSVP has been received.`;
    formStatus.style.color = 'green';

    rsvpForm.reset();

    setTimeout(() => {
        formStatus.innerText = '';
    }, 5000);
});
