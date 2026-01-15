// main.js - All shared JavaScript for SpacexAI site

console.log("%c🚀 Welcome to SpacexAI Research Cohort!", "color:#667eea;font-size:18px;font-weight:bold");

// Loading screen
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 600);
    }, 800);
  }
  AOS.init({ duration: 1000, once: true });
});

// Theme toggle
document.querySelectorAll('.theme-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-theme');
    const isLight = document.documentElement.classList.contains('light-theme');
    btn.innerHTML = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
});
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.add('light-theme');
  document.querySelectorAll('.theme-toggle').forEach(b => b.innerHTML = '☀️');
}

// Mobile menu
document.querySelectorAll('.hamburger').forEach(hamburger => {
  hamburger.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 100);
});

// Typewriter effect (home page)
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
  const phrases = [
    "Explainable AI for Space",
    "Autonomous CubeSat Operations",
    "55+ International Researchers",
    "SGAC-UNOOSA Recognition"
  ];
  let i = 0, j = 0, current = "", deleting = false;
  const type = () => {
    current = phrases[i];
    typewriterElement.textContent = deleting ? current.substring(0, j-1) : current.substring(0, j+1);
    j = deleting ? j-1 : j+1;
    if (!deleting && j === current.length+1) { deleting = true; setTimeout(type, 2000); }
    else if (deleting && j === 0) { deleting = false; i = (i+1) % phrases.length; setTimeout(type, 500); }
    else setTimeout(type, deleting ? 60 : 100);
  };
  type();
}

// Counter animation
document.querySelectorAll('.count').forEach(counter => {
  const target = counter.getAttribute('data-target');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let count = 0;
        const timer = setInterval(() => {
          count += Math.ceil(target / 50);
          if (count >= target) { count = target; clearInterval(timer); }
          counter.textContent = count + (counter.textContent.includes('+') ? '+' : '');
        }, 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(counter);
});

// 3D Tilt (Vanilla Tilt)
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = (x - centerX) / 10;
    const rotateX = (centerY - y) / 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

// Abstract expand/collapse
document.querySelectorAll('.abstract-card .toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.abstract-card').classList.toggle('open');
  });
});

// Custom cursor (optional)
const cursor = document.querySelector('.cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}
