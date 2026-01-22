// Proper selector functions
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = $('.menu-toggle');
  const navMenu = $('.nav-menu');
  const navLinks = $$('.nav-menu a');

  // Toggle menu on button click
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      
      // Toggle icon
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
});

// Smooth Scroll
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

// Navbar Hide on Scroll
let lastScrollTop = 0;
const header = $('header');

window.addEventListener('scroll', function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll > lastScrollTop && currentScroll > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Bubbles Animation
const container = $('.bubbles');
const max = window.innerWidth < 768 ? 200 : 300;

function createBubble() {
  const bubble = document.createElement('span');
  const size = 10 + Math.random() * 20;
  const duration = 2 + Math.random() * 3;
  const leftPosition = Math.random() * 100;
  
  bubble.style.cssText = `
    left: ${leftPosition}%;
    width: ${size}px;
    height: ${size}px;
    opacity: ${0.1 + Math.random() * 0.3};
    animation-duration: ${duration}s;
  `;
  
  container.appendChild(bubble);
  setTimeout(() => bubble.remove(), duration * 1000);
}

// Create initial bubbles
for (let i = 0; i < max; i++) {
  setTimeout(createBubble, i * 30);
}

// Create bubbles continuously
setInterval(createBubble, 100);

// Typing Effect
const typingText = "Hello, I'm Aayush 👋";
const typingElement = $('#typing-text');
let charIndex = 0;

function typeWriter() {
  if (charIndex < typingText.length) {
    typingElement.textContent += typingText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 120);
  }
}

typeWriter();


// Tech Tags Click Handler
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
