// Proper selector functions
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Mobile Menu Toggle with smooth animations
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = $('.menu-toggle');
  const navMenu = $('.nav-menu');
  const navLinks = $$('.nav-menu a');

  // Toggle menu on button click
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      
      // Toggle icon with rotation
      const icon = menuToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('header')) {
      navMenu.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Theme Toggle
  const themeToggle = $('.theme-toggle');
  const body = $('body');
  const themeIcon = themeToggle.querySelector('i');

  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      body.classList.toggle('light-theme');
      
      const isLight = body.classList.contains('light-theme');
      themeIcon.classList.toggle('fa-moon', !isLight);
      themeIcon.classList.toggle('fa-sun', isLight);
      
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }
});

// Smooth Scroll with easing
$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = $(targetId);
    
    if (target) {
      const headerHeight = $('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar Hide on Scroll with smooth transitions
let lastScrollTop = 0;
const header = $('header');
let scrollTimeout;

window.addEventListener('scroll', function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  clearTimeout(scrollTimeout);
  
  if (currentScroll > lastScrollTop && currentScroll > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Enhanced Bubbles Animation with kinetic motion
const container = $('.bubbles');
const max = window.innerWidth < 768 ? 150 : 250;

function createBubble() {
  const bubble = document.createElement('span');
  const size = 8 + Math.random() * 25;
  const duration = 3 + Math.random() * 4;
  const leftPosition = Math.random() * 100;
  const delay = Math.random() * 0.5;
  
  bubble.style.cssText = `
    left: ${leftPosition}%;
    width: ${size}px;
    height: ${size}px;
    opacity: ${0.15 + Math.random() * 0.35};
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
  `;
  
  container.appendChild(bubble);
  setTimeout(() => bubble.remove(), (duration + delay) * 1000);
}

// Create initial bubbles with staggered timing
for (let i = 0; i < max; i++) {
  setTimeout(createBubble, i * 25);
}

// Create bubbles continuously for continuous effect
setInterval(createBubble, 150);

// Typing Animation - Cycle through roles
const typingTexts = $$('.typing-text');
typingTexts.forEach((el, index) => {
  const text = el.getAttribute('data-text');
  el.textContent = text;
  el.style.color = 'inherit';
  el.style.display = 'inline';
  el.style.visibility = 'hidden';
  el.style.opacity = '0';
  
  // Make first text visible initially
  if (index === 0) {
    setTimeout(() => {
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    }, 100);
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards for animation
$$('.skill-card, .project-card, .highlight-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(el);
});

// Tech Tags Click Handler with ripple effect
$$('.tech-tags span').forEach(tag => {
  tag.addEventListener('click', function(e) {
    e.stopPropagation();
    
    // Remove active class from all tags
    $$('.tech-tags span').forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked tag
    this.classList.add('active');
  });
});

// Remove active class when clicking outside
document.addEventListener('click', function() {
  $$('.tech-tags span').forEach(tag => tag.classList.remove('active'));
});

// Parallax effect on mouse move
document.addEventListener('mousemove', function(e) {
  const profileImg = $('.profile-img');
  if (profileImg) {
    const x = (e.clientX / window.innerWidth) * 10;
    const y = (e.clientY / window.innerHeight) * 10;
    profileImg.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
  }
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
