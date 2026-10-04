/**
 * Kanu Sheoran — Portfolio Interactive Logic
 * Handles theme toggling, project/skill filters, clipboard utilities, form validation, and scroll tracking.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initProjectFilters();
  initSkillFilters();
  initCopyEmail();
  initContactForm();
  initScrollSpy();
  updateCurrentYear();
  initAvatarModeSwitcher();
  initInteractiveTerminal();
  initInteractiveStickers();
  initCard3DTilt();
  initScrollProgress();
  initLiveClock();
  initScrollReveal();
  initCountUpMetrics();
  initConfettiEasterEgg();
  initHeroFolderTabs();
  initProjectSpotlight();
});

/* ==========================================================================
   1. Theme Toggle (Light / Dark Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  // Retrieve saved preference or default to light (as per aesthetic)
  const savedTheme = localStorage.getItem('ks_portfolio_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ks_portfolio_theme', newTheme);
  });
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!mobileMenuBtn || !mobileDrawer) return;

  mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileDrawer.classList.toggle('open');
    mobileDrawer.setAttribute('aria-hidden', isExpanded);
  });

  // Close drawer when any link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    });
  });
}

/* ==========================================================================
   3. Interactive Project Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.proj-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardType = card.getAttribute('data-proj-type');

        if (filterValue === 'all' || filterValue === cardType) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Interactive Skills Filtering
   ========================================================================== */
function initSkillFilters() {
  const skillTabBtns = document.querySelectorAll('.filter-tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!skillTabBtns.length || !skillCards.length) return;

  skillTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const category = btn.getAttribute('data-skill-tab');

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');

        if (category === 'all' || category === cardCat) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Copy Email to Clipboard
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const email = 'kanu081106@gmail.com';

  if (!copyBtn || !toast) return;

  let toastTimer;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      showToast(`Copied ${email} to clipboard!`);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      showToast('Click to email: kanu081106@gmail.com');
    }
  });

  function showToast(msg) {
    if (toastMessage) toastMessage.textContent = msg;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* ==========================================================================
   6. Contact Form Validation & Friendly Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successBanner = document.getElementById('formSuccessMessage');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const messageInput = document.getElementById('formMessage');
    const subjectSelect = document.getElementById('formSubject');

    let isValid = true;

    // Reset error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    if (!nameInput.value.trim()) {
      document.getElementById('nameError').textContent = 'Please enter your name.';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      document.getElementById('messageError').textContent = 'Please write a brief message.';
      isValid = false;
    }

    if (!isValid) return;

    // Provide visual feedback
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Preparing Email...</span>`;

    // Construct mailto link so user's default email client can also send it directly
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectSelect.value} - From ${nameInput.value}`);
    const body = encodeURIComponent(
      `Hello Kanu,\n\nName: ${nameInput.value}\nEmail: ${emailInput.value}\nSubject: ${subjectSelect.value}\n\nMessage:\n${messageInput.value}\n`
    );
    const mailtoUrl = `mailto:kanu081106@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      if (successBanner) {
        successBanner.style.display = 'block';
      }
      submitBtn.innerHTML = `<span>Message Prepared ✓</span>`;

      // Trigger user's mail client
      window.location.href = mailtoUrl;

      // Reset form after a short delay
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 4000);
    }, 600);
  });
}

/* ==========================================================================
   7. Scroll Spy & Active Nav Highlighting
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   8. Footer Current Year
   ========================================================================== */
function updateCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   9. Interactive Avatar Mode Switcher
   ========================================================================== */
function initAvatarModeSwitcher() {
  const modeBtns = document.querySelectorAll('.avatar-mode-btn');
  const speechText = document.getElementById('avatarSpeechText');
  const avatarCircle = document.getElementById('avatarCircle');

  if (!modeBtns.length || !speechText) return;

  const modeContent = {
    dev: {
      quote: '"Writing clean C++ algorithms & responsive React web apps ⚡"',
      border: 'var(--brand-blue)',
      bubbleBg: 'var(--bg-surface-alt)'
    },
    cloud: {
      quote: '"Architecting resilient systems on GCP, Compute Engine & BigQuery ☁️"',
      border: '#0284C7',
      bubbleBg: '#F0F9FF'
    },
    creative: {
      quote: '"Weaving poetry, +50% brand growth, TEDx partnerships & design thinking 🎨"',
      border: '#EA580C',
      bubbleBg: '#FFF7ED'
    }
  };

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-mode') || 'dev';
      const data = modeContent[mode];

      if (data) {
        // Animate speech bubble update
        speechText.style.opacity = '0';
        speechText.style.transform = 'translateY(4px)';

        setTimeout(() => {
          speechText.textContent = data.quote;
          speechText.style.opacity = '1';
          speechText.style.transform = 'translateY(0)';
        }, 150);

        if (avatarCircle) {
          avatarCircle.style.borderColor = data.border;
          avatarCircle.style.boxShadow = `0 8px 24px ${data.border}40, var(--shadow-tactile)`;
        }
      }
    });
  });
}

/* ==========================================================================
   10. Interactive Mini Terminal in Hero Section
   ========================================================================== */
function initInteractiveTerminal() {
  const terminal = document.getElementById('heroTerminal');
  const termOutput = document.getElementById('terminalOutput');
  const chipBtns = document.querySelectorAll('.term-chip-btn');

  if (!terminal || !termOutput || !chipBtns.length) return;

  const commandResponses = {
    whoami: `<p class="term-line"><span class="term-prompt">$</span> whoami</p>
<p class="term-output">Kanu Sheoran — B.Tech CSE (Cloud Computing) @ LPU (Class of 2028)</p>`,
    
    cloud: `<p class="term-line"><span class="term-prompt">$</span> gcloud status</p>
<p class="term-output">[ACTIVE] Google Cloud Platform · Compute Engine · BigQuery · Cloud SDK</p>`,
    
    quote: `<p class="term-line"><span class="term-prompt">$</span> echo $TAGLINE</p>
<p class="term-output">"Code provides the architecture, Cloud enables scale, Creativity adds soul."</p>`,
    
    clear: `<p class="term-line"><span class="term-prompt">$</span> clear</p>
<p class="term-output">Ready for input. Click any chip above to query profile!</p>`
  };

  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      const response = commandResponses[cmd];

      if (response) {
        termOutput.style.opacity = '0.5';
        setTimeout(() => {
          termOutput.innerHTML = response;
          termOutput.style.opacity = '1';
        }, 100);
      }
    });
  });
}

/* ==========================================================================
   11. Interactive Floating Stickers
   ========================================================================== */
function initInteractiveStickers() {
  const stickers = document.querySelectorAll('.interactive-sticker, .avatar-sticker');

  stickers.forEach(sticker => {
    sticker.addEventListener('click', () => {
      sticker.classList.remove('bounce');
      void sticker.offsetWidth; // trigger reflow
      sticker.classList.add('bounce');
    });
  });
}

/* ==========================================================================
   12. Smooth 3D Card Tilt Micro-Interaction
   ========================================================================== */
function initCard3DTilt() {
  // Only enable on desktop with hover capability
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const tiltCards = document.querySelectorAll('.project-card, .pillar-mini-card, .polaroid-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}

/* ==========================================================================
   13. Scroll Progress Indicator
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   14. Live Clock (Indian Standard Time)
   ========================================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;

  function updateClock() {
    try {
      const now = new Date();
      // Format to IST
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      clockEl.textContent = `🕒 ${timeStr} IST`;
    } catch (e) {
      clockEl.textContent = `🕒 India (IST)`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   15. Scroll-Driven Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const elementsToReveal = document.querySelectorAll(
    '.binder-card, .education-dossier, .skill-category-card, .project-card, .timeline-item, .polaroid-card, .contact-dossier-wrapper, .section-heading'
  );

  elementsToReveal.forEach((el, index) => {
    el.classList.add('reveal-on-scroll');
    // Add staggered delay to child cards within grids
    const staggerIndex = (index % 4) + 1;
    el.classList.add(`stagger-${staggerIndex}`);
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  elementsToReveal.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   16. Animated Metrics Count-Up
   ========================================================================== */
function initCountUpMetrics() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1200; // ms
        const startTime = performance.now();

        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic formula
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeOut * target);

          if (target < 10 && prefix === '0') {
            el.textContent = `${prefix}${currentVal}${suffix}`;
          } else {
            el.textContent = `${prefix}${currentVal}${suffix}`;
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        }

        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
}

/* ==========================================================================
   17. Flower Click Sparkle & Confetti Easter Egg
   ========================================================================== */
function initConfettiEasterEgg() {
  const flower = document.getElementById('flowerEasterEgg');
  const canvas = document.getElementById('confettiCanvas');
  if (!flower || !canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  flower.addEventListener('click', (e) => {
    // Determine burst origin from flower position
    const rect = flower.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    createParticles(originX, originY);
  });

  function createParticles(x, y) {
    const colors = ['#F59E0B', '#FBBF24', '#0F5FD8', '#38BDF8', '#10B981', '#EC4899', '#FFFBEB'];

    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 40 + 70,
        isPetal: Math.random() > 0.4
      });
    }

    if (!animationId) {
      animateParticles();
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.vx *= 0.98; // air resistance
      p.rotation += p.rotationSpeed;
      p.opacity = Math.max(0, 1 - (p.life / p.maxLife));

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.isPetal) {
        // Draw flower petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw star or circle
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      if (p.life >= p.maxLife || p.opacity <= 0) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      animationId = requestAnimationFrame(animateParticles);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationId = null;
    }
  }
}

/* ==========================================================================
   18. Hero Folder Secondary Tabs Interactive Switcher
   ========================================================================== */
function initHeroFolderTabs() {
  const folderTabs = document.querySelectorAll('.folder-tabs-header .folder-tab');
  const termOutput = document.getElementById('terminalOutput');

  if (!folderTabs.length || !termOutput) return;

  const tabContents = {
    main: `<p class="term-line"><span class="term-prompt">$</span> cat focus_areas.json</p>
<p class="term-output">{ "focus": ["Cloud Computing", "C++ Systems", "Web Architecture", "UI Design"] }</p>
<p class="term-line"><span class="term-prompt">$</span> gcloud --version</p>
<p class="term-output">Google Cloud SDK (GCP · BigQuery · Compute Engine)</p>`,

    cloud: `<p class="term-line"><span class="term-prompt">$</span> inspect --env=cloud-computing</p>
<p class="term-output">PROJECT: Lovely Professional University · Cloud Specialization</p>
<p class="term-output">SERVICES: GCP Compute Engine, BigQuery, Network Telemetry</p>
<p class="term-output">STATUS: 99.9% Uptime Architecture Verified ✓</p>`,

    creativity: `<p class="term-line"><span class="term-prompt">$</span> open creativity.tsx</p>
<p class="term-output">COMMUNITY: TEDxLPU Women 2025 (Sponsorship Lead)</p>
<p class="term-output">MARKETING: Café 18o'5 (+50% Social Reach Growth)</p>
<p class="term-output">ARTS: Writing, Poetry, Drawing, Clay & Crafting ✨</p>`
  };

  folderTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      folderTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabKey = tab.getAttribute('data-folder-tab') || 'main';
      const output = tabContents[tabKey];

      if (output) {
        termOutput.style.opacity = '0.3';
        setTimeout(() => {
          termOutput.innerHTML = output;
          termOutput.style.opacity = '1';
        }, 120);
      }
    });
  });
}

/* ==========================================================================
   19. Project Card Spotlight Effect
   ========================================================================== */
function initProjectSpotlight() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}


