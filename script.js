const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* Mobile Menu */
const menuToggle = $('.menu-toggle'), navMenu = $('.nav-menu');
menuToggle.onclick = () => {
  navMenu.classList.toggle('active');
  menuToggle.querySelector('i').classList.toggle('fa-bars');
  menuToggle.querySelector('i').classList.toggle('fa-times');
};
$$('.nav-menu a').forEach(a => a.onclick = () => {
  navMenu.classList.remove('active');
  menuToggle.querySelector('i').className = 'fas fa-bars';
});

/* Smooth Scroll */
$$('a[href^="#"]').forEach(a => a.onclick = e => {
  e.preventDefault();
  const t = $(a.getAttribute('href'));
  if (t) scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
});

/* Navbar Scroll Hide */
let last = 0, header = $('header');
addEventListener('scroll', () => {
  let cur = pageYOffset;
  header.style.transform = cur > last && cur > 100 ? 'translateY(-100%)' : 'translateY(0)';
  last = cur;
});

/* Bubbles */
const container = $('.bubbles');
const max = innerWidth < 768 ? 80 : innerWidth < 1200 ? 120 : 150;

function bubble() {
  const b = document.createElement('span');
  const s = 5 + Math.random() * 50, d = 5 + Math.random() * 10;
  b.style.cssText = `
    left:${Math.random()*100}%;
    width:${s}px;height:${s}px;
    opacity:${0.1+Math.random()*0.3};
    animation-duration:${d}s;
  `;
  container.appendChild(b);
  setTimeout(() => b.remove(), d * 1000);
}

for (let i = 0; i < max; i++) setTimeout(bubble, i * 40);
setInterval(() => bubble(), 300);
