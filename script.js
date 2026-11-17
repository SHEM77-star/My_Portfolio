const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

// Reveal content smoothly as it enters the viewport.
document.documentElement.classList.add('reveal-ready');
const revealItems = document.querySelectorAll('.section-heading, .about-grid, .skill-card, .certificate-card, .project-card, .coming-soon, .education-card, .contact-inner > *');
revealItems.forEach((item, index) => {
  item.classList.add('reveal');
  if (item.classList.contains('skill-card')) item.style.transitionDelay = `${(index % 4) * 70}ms`;
});
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(item => revealObserver.observe(item));


// Continuously type and erase the specialization only; keep the name static.
(() => {
  const role = document.querySelector('.typing-role');
  if (!role) return;

  const specialization = role.dataset.typing || role.textContent.trim() || 'IT STUDENT & ASPIRING DEVELOPER';
  const typeSpeed = 62;
  const eraseSpeed = 32;
  const pauseAfterTyping = 1500;
  const pauseAfterErasing = 450;

  let index = 0;
  let deleting = false;

  const animate = () => {
    if (!deleting) {
      index++;
      role.textContent = specialization.slice(0, index);
      if (index >= specialization.length) {
        deleting = true;
        window.setTimeout(animate, pauseAfterTyping);
        return;
      }
      window.setTimeout(animate, typeSpeed);
    } else {
      index--;
      role.textContent = specialization.slice(0, index);
      if (index <= 0) {
        deleting = false;
        window.setTimeout(animate, pauseAfterErasing);
        return;
      }
      window.setTimeout(animate, eraseSpeed);
    }
  };

  role.textContent = '';
  animate();
})();
