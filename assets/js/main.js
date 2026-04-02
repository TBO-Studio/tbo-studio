// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message envoyé ✓';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = 'Envoyer le message <svg class="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ===== GSAP ANIMATIONS =====
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Helper: animate elements only if they exist
  function animateFrom(selector, vars) {
    const els = gsap.utils.toArray(selector);
    if (!els.length) return;
    els.forEach(el => {
      gsap.fromTo(el,
        { autoAlpha: 0, ...vars.from },
        {
          autoAlpha: 1,
          x: 0, y: 0, scale: 1, rotation: 0,
          duration: vars.duration || 0.8,
          ease: vars.ease || 'power2.out',
          delay: vars.delay || 0,
          scrollTrigger: {
            trigger: vars.trigger || el,
            start: vars.start || 'top 85%',
            once: true
          }
        }
      );
    });
  }

  // -- HERO: timeline on page load (no scroll trigger) --
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (document.querySelector('.animate-fade-in')) {
    heroTl
      .fromTo('.animate-fade-in',
        { autoAlpha: 0, y: -20 },
        { autoAlpha: 1, y: 0, duration: 0.6 }
      )
      .fromTo('.animate-slide-up',
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15 },
        '-=0.3'
      )
      .fromTo('.blob',
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 0.15, duration: 1.2, stagger: 0.2, ease: 'elastic.out(1, 0.5)' },
        '-=0.6'
      );
  }

  // -- SERVICES: section header --
  animateFrom('#services > div > .reveal:first-child', {
    from: { y: 40 },
    start: 'top 85%'
  });

  // -- SERVICES: cards stagger --
  const serviceCards = gsap.utils.toArray('#services .service-card');
  if (serviceCards.length) {
    gsap.set(serviceCards, { autoAlpha: 0, y: 80 });
    ScrollTrigger.batch(serviceCards, {
      start: 'top 88%',
      once: true,
      onEnter: batch => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out'
        });
      }
    });
  }

  // -- ABOUT: slide from sides --
  const aboutSection = document.querySelector('#about');
  if (aboutSection) {
    const aboutCols = aboutSection.querySelectorAll(':scope > div > .grid > div');
    // Left column
    animateFrom('#about .about-visual', {
      from: { x: -80 },
      trigger: '#about',
      start: 'top 75%',
      duration: 1,
      ease: 'power3.out'
    });
    // Right column text
    const aboutText = aboutSection.querySelector('.grid > div:last-child');
    if (aboutText) {
      gsap.fromTo(aboutText,
        { autoAlpha: 0, x: 80 },
        {
          autoAlpha: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '#about', start: 'top 75%', once: true }
        }
      );
    }

    // Floating badges pop
    const badges = gsap.utils.toArray('.floating-badge');
    if (badges.length) {
      gsap.set(badges, { autoAlpha: 0, scale: 0 });
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top 65%',
        once: true,
        onEnter: () => {
          gsap.to(badges, {
            autoAlpha: 1, scale: 1,
            duration: 0.5, stagger: 0.1, ease: 'back.out(2)'
          });
        }
      });
    }
  }

  // -- PORTFOLIO: header --
  animateFrom('#portfolio > div > .reveal:first-child', {
    from: { y: 40 },
    start: 'top 85%'
  });

  // -- PORTFOLIO: cards --
  const portfolioCards = gsap.utils.toArray('.portfolio-card');
  if (portfolioCards.length) {
    gsap.set(portfolioCards, { autoAlpha: 0, y: 80, rotation: 2 });
    ScrollTrigger.batch(portfolioCards, {
      start: 'top 88%',
      once: true,
      onEnter: batch => {
        gsap.to(batch, {
          autoAlpha: 1, y: 0, rotation: 0,
          duration: 0.8, stagger: 0.15, ease: 'power2.out'
        });
      }
    });
  }

  // -- TESTIMONIALS: cards --
  const testimonialCards = gsap.utils.toArray('.testimonial-card');
  if (testimonialCards.length) {
    gsap.set(testimonialCards, { autoAlpha: 0, scale: 0.85 });
    ScrollTrigger.batch(testimonialCards, {
      start: 'top 88%',
      once: true,
      onEnter: batch => {
        gsap.to(batch, {
          autoAlpha: 1, scale: 1,
          duration: 0.7, stagger: 0.15, ease: 'power2.out'
        });
      }
    });
  }

  // -- CONTACT --
  const contactReveals = gsap.utils.toArray('#contact .reveal');
  if (contactReveals.length) {
    gsap.set(contactReveals, { autoAlpha: 0, y: 50 });
    ScrollTrigger.create({
      trigger: '#contact',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(contactReveals, {
          autoAlpha: 1, y: 0,
          duration: 0.8, stagger: 0.2, ease: 'power2.out'
        });
      }
    });
  }

  // -- BLOG CARDS (blog.html) --
  const blogCards = gsap.utils.toArray('.blog-card');
  if (blogCards.length) {
    gsap.set(blogCards, { autoAlpha: 0, y: 60 });
    ScrollTrigger.batch(blogCards, {
      start: 'top 90%',
      once: true,
      onEnter: batch => {
        gsap.to(batch, {
          autoAlpha: 1, y: 0,
          duration: 0.7, stagger: 0.12, ease: 'power2.out'
        });
      }
    });
  }

  // -- ARTICLE PAGE: h2 titles --
  const articleH2s = gsap.utils.toArray('.article-content h2');
  if (articleH2s.length) {
    articleH2s.forEach(h2 => {
      gsap.fromTo(h2,
        { autoAlpha: 0, x: -30 },
        {
          autoAlpha: 1, x: 0,
          duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: h2, start: 'top 88%', once: true }
        }
      );
    });
  }
}
