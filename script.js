/* Mark JS active — reveals are hidden via .js .reveal, so no flash without JS */
document.documentElement.classList.add('js');

/* ─── TextScramble ───────────────────────────────────────────────────────── */
class TextScramble {
  constructor(el, cursorEl) {
    this.el = el;
    this.cursorEl = cursorEl;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.words = ['Builder', 'Engineer', 'Researcher', 'Problem Solver'];
    this.wordIndex = 0;
    this.running = false;
  }

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  scrambleTo(word) {
    return new Promise(resolve => {
      this.cursorEl.classList.add('paused');

      const len = word.length;
      const scrambleCounts = Array.from({ length: len }, () => this.rand(6, 10));
      const stagger = 40;
      let frame = 0;
      const result = Array(len).fill('');

      const tick = () => {
        let done = true;

        for (let i = 0; i < len; i++) {
          const startFrame = i * (stagger / 16);
          const totalFrames = startFrame + scrambleCounts[i];

          if (frame < totalFrames) {
            result[i] = this.chars[this.rand(0, this.chars.length - 1)];
            done = false;
          } else {
            result[i] = word[i];
          }
        }

        this.el.textContent = result.join('');
        frame++;

        if (!done) {
          requestAnimationFrame(tick);
        } else {
          this.el.textContent = word;
          this.cursorEl.classList.remove('paused');
          resolve();
        }
      };

      requestAnimationFrame(tick);
    });
  }

  async run() {
    if (this.running) return;
    this.running = true;

    while (true) {
      const word = this.words[this.wordIndex % this.words.length];
      await this.scrambleTo(word);
      this.wordIndex++;
      await new Promise(r => setTimeout(r, 2400));
    }
  }
}

/* ─── Scroll progress bar ────────────────────────────────────────────────── */
const progressBar = document.getElementById('scrollProgress');
const header = document.getElementById('site-header');

function updateScroll() {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = maxScroll > 0
    ? (scrollY / maxScroll * 100) + '%'
    : '0%';
  header.classList.toggle('scrolled', scrollY > 60);
}

window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

/* ─── Scroll reveal ──────────────────────────────────────────────────────── */

/* Elements already in the viewport on load get made visible immediately,
   with no transition, so there's no opacity-0 flash. */
function makeVisibleNow(el) {
  el.style.transition = 'none';
  el.classList.add('visible');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.transition = '';
  }));
}

const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    const parent = el.closest('.exp-stack, .skills-grid, .projects-grid');
    if (parent) {
      const siblings = Array.from(parent.querySelectorAll('.reveal:not(.visible)'));
      const idx = siblings.indexOf(el);
      if (idx > 0) el.style.transitionDelay = (idx * 70) + 'ms';
    }

    el.classList.add('visible');
    obs.unobserve(el);
  });
}, { threshold: 0.12 });

const vh = window.innerHeight;
document.querySelectorAll('.reveal').forEach(el => {
  const top = el.getBoundingClientRect().top;
  if (top < vh) {
    makeVisibleNow(el);
  } else {
    revealObserver.observe(el);
  }
});

/* ─── Active nav link ────────────────────────────────────────────────────── */
const navLinks = document.querySelectorAll('.nav-link[data-section]');
const sectionIds = ['experience', 'skills', 'projects', 'contact'];
const visibleSections = new Set();

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      visibleSections.add(target.id);
    } else {
      visibleSections.delete(target.id);
    }
  });

  const active = sectionIds.find(id => visibleSections.has(id)) || '';
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === active));
}, { rootMargin: '0px 0px -45% 0px', threshold: 0 });

sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

/* ─── Count-up stats ─────────────────────────────────────────────────────── */
function easeOutQuad(t) { return 1 - (1 - t) * (1 - t); }

function animateCountUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1000;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.round(easeOutQuad(progress) * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat-val').forEach(animateCountUp);
    statsObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ─── Init scramble ──────────────────────────────────────────────────────── */
const scrambleWordEl = document.getElementById('scrambleWord');
const scrambleCursorEl = document.getElementById('scrambleCursor');

if (scrambleWordEl && scrambleCursorEl) {
  scrambleWordEl.textContent = 'Builder';
  const ts = new TextScramble(scrambleWordEl, scrambleCursorEl);
  ts.run();
}
