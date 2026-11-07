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
    const modalStatus = document.getElementById('modal-status');
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

      if (!card.dataset.video && thumbImg) {
        const img = document.createElement('img');
        img.src = thumbImg.src;
        img.alt = title ? title.textContent : '';
        modalMedia.appendChild(img);
        modalMedia.hidden = false;
      } else if (!card.dataset.video) {
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
      const videoUrl = card.dataset.video;

      if (videoUrl) {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.controls = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.setAttribute('aria-label', `${title ? title.textContent : 'Project'} demo video`);
        modalMedia.appendChild(video);
        modalMedia.hidden = false;
      }

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

      modalStatus?.classList.toggle('is-visible', card.dataset.status === 'wip');

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

  // Certificate preview modal
  const certificateModal = document.getElementById('certificate-modal');
  if (certificateModal) {
    const certificateTitle = document.getElementById('certificate-modal-title');
    const certificateContent = document.getElementById('certificate-modal-content');
    const certificateClose = document.getElementById('certificate-modal-close');
    const certificateVerify = document.getElementById('certificate-verify');
    let certificateTrigger = null;

    const closeCertificateModal = () => {
      certificateModal.hidden = true;
      certificateModal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
      certificateContent.innerHTML = '';
      if (certificateTrigger) certificateTrigger.focus();
    };

    document.querySelectorAll('[data-cert-preview]').forEach(card => {
      card.addEventListener('click', () => {
        certificateTrigger = card;
        const source = card.dataset.certPreview;
        const title = card.dataset.certTitle || 'Certificate';
        const isPdf = source.toLowerCase().endsWith('.pdf');
        certificateTitle.textContent = title;
        certificateContent.innerHTML = '';

        if (isPdf) {
          const frame = document.createElement('iframe');
          frame.src = source;
          frame.title = `${title} certificate PDF`;
          certificateContent.appendChild(frame);
          certificateContent.classList.add('is-pdf');
        } else {
          const image = document.createElement('img');
          image.src = source;
          image.alt = `${title} certificate`;
          certificateContent.appendChild(image);
          certificateContent.classList.remove('is-pdf');
        }

        if (card.dataset.certVerify) {
          certificateVerify.href = card.dataset.certVerify;
          certificateVerify.hidden = false;
        } else {
          certificateVerify.hidden = true;
          certificateVerify.removeAttribute('href');
        }

        certificateModal.hidden = false;
        certificateModal.classList.add('is-open');
        document.body.classList.add('modal-open');
        certificateClose.focus();
      });
    });

    certificateClose.addEventListener('click', closeCertificateModal);
    certificateModal.addEventListener('click', event => {
      if (event.target === certificateModal) closeCertificateModal();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !certificateModal.hidden) closeCertificateModal();
    });
  }



  // Back to top button

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
