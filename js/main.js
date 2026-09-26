/* ==========================================================
   Double T Consulting — page behavior
   Mobile menu · reveal-on-scroll · service accordions · contact form
   ========================================================== */

/* ---------- Mobile menu ---------- */
(function mobileMenu() {
  const btn = document.querySelector('[data-menu-toggle]');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('hidden', !open);
    btn.querySelector('[data-icon-open]').classList.toggle('hidden', open);
    btn.querySelector('[data-icon-close]').classList.toggle('hidden', !open);
  };

  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => e.matches && setOpen(false));
})();

/* ---------- Reveal on scroll ---------- */
(function reveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach((el) => io.observe(el));
})();

/* ---------- Service "What's included" toggles ---------- */
(function accordions() {
  document.querySelectorAll('[data-accordion]').forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      btn.querySelector('[data-chevron]')?.classList.toggle('rotate-180', !open);
    });
  });
})();

/* ---------- Contact form ---------- */
(function contactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  const rules = {
    name: (v) => v.trim().length >= 2 || 'Please enter your name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    phone: (v) => !v.trim() || /^[\d\s().+-]{7,}$/.test(v.trim()) || 'Please enter a valid phone number.',
    message: (v) => v.trim().length >= 10 || 'Please add a few details (at least 10 characters).',
  };

  const showError = (field, msg) => {
    const err = document.getElementById(`${field.name}-error`);
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) {
      err.textContent = msg || '';
      err.classList.toggle('hidden', !msg);
    }
  };

  const validateField = (field) => {
    const rule = rules[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    showError(field, result === true ? '' : result);
    return result === true;
  };

  Object.keys(rules).forEach((name) => {
    const field = form.elements[name];
    field?.addEventListener('blur', () => validateField(field));
    field?.addEventListener('input', () => field.getAttribute('aria-invalid') === 'true' && validateField(field));
  });

  const setStatus = (type, msg) => {
    status.className = `rounded-md p-4 text-sm ${
      type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
    }`;
    status.textContent = msg;
    status.hidden = false;
    status.focus();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = Object.keys(rules).map((n) => form.elements[n]).filter(Boolean);
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      fields.find((f) => f.getAttribute('aria-invalid') === 'true')?.focus();
      return;
    }

    // The hidden "_gotcha" honeypot is checked by Formspree on its end, so every
    // submission is sent and the visitor always sees a result.
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = (data.errors || []).map((er) => er.message).filter(Boolean).join(' ') || data.error || `Status ${res.status}`;
        throw new Error(detail);
      }
      form.reset();
      setStatus('success', 'Thanks — your message is on its way. I’ll get back to you within one business day.');
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus(
        'error',
        `Sorry, your message didn’t go through (${err.message || 'network error'}). Please email ty@doubletconsulting.com directly.`
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
})();
