document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu after clicking a link
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight active nav link based on scroll position
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let current = sections[0]?.id;
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // Theme toggle (light / dark mode) — toggles a class on <body>
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'light') {
    document.body.classList.add('theme-light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('theme-light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

});
