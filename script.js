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


  // Project detail modal
  const modal = document.getElementById('project-modal');

  if (modal) {
    const modalMedia = document.getElementById('modal-media');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalGithub = document.getElementById('modal-github');
    const modalZip = document.getElementById('modal-zip');
    const modalClose = document.getElementById('modal-close');

    let lastFocusedElement = null;

    const openModal = (card) => {
      const thumb = card.querySelector('.project-thumb');
      const thumbImg = thumb ? thumb.querySelector('img') : null;
      const category = card.querySelector('.project-category');
      const title = card.querySelector('.project-title');
      const shortDesc = card.querySelector('.project-desc');
      const fullDesc = card.querySelector('.project-desc-full');
      const tags = card.querySelectorAll('.project-tags li');

      // Media: reuse the card's image if it has one, otherwise leave blank
      modalMedia.innerHTML = '';
      if (thumbImg) {
        const img = document.createElement('img');
        img.src = thumbImg.src;
        img.alt = title ? title.textContent : '';
        modalMedia.appendChild(img);
        modalMedia.hidden = false;
      } else {
        modalMedia.hidden = true;
      }

      modalCategory.textContent = category ? category.textContent : '';
      modalTitle.textContent = title ? title.textContent : '';
      modalDesc.textContent = fullDesc ? fullDesc.textContent : (shortDesc ? shortDesc.textContent : '');

      modalTags.innerHTML = '';
      tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag.textContent;
        modalTags.appendChild(li);
      });

      const githubUrl = card.dataset.github;
      const zipUrl = card.dataset.zip;

      if (githubUrl) {
        modalGithub.href = githubUrl;
        modalGithub.classList.remove('is-hidden');
      } else {
        modalGithub.classList.add('is-hidden');
      }

      if (zipUrl) {
        modalZip.href = zipUrl;
        modalZip.classList.remove('is-hidden');
      } else {
        modalZip.classList.add('is-hidden');
      }

      lastFocusedElement = document.activeElement;
      modal.hidden = false;
      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
      modalClose.focus();
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.hidden = true;
      document.body.classList.remove('modal-open');
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    };

    document.querySelectorAll('.project-card').forEach(card => {
      const triggers = card.querySelectorAll('.project-thumb, .project-link');
      triggers.forEach(trigger => {
        trigger.addEventListener('click', () => openModal(card));
      });
    });

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.hidden) {
        closeModal();
      }
    });
  }

  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
  });

});