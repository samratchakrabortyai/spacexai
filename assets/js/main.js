// Reveal animations on scroll
document.addEventListener('DOMContentLoaded', function() {
  
  // Add 'active' class to reveal elements
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  };
  
  // Initial check
  revealOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', revealOnScroll);
  
  // Animate on load
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('active');
    });
  }, 300);
  
});

// Simple count animation (optional)
function animateCount(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// Initialize counts if data-target exists
document.querySelectorAll('[data-target]').forEach(el => {
  const target = parseInt(el.getAttribute('data-target'));
  animateCount(el, target);
});
