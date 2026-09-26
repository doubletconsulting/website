/* ==========================================================
   Double T Consulting — shared components
   Edit the header, footer, and CTA banner here once;
   every page picks up the change.
   ========================================================== */

document.documentElement.classList.add('js');

const SITE = {
  name: 'Double T Consulting',
  tagline: 'Emergency Management & Disaster Recovery',
  email: 'ty@doubletconsulting.com',
  phone: '(425) 969-3424',
  phoneHref: 'tel:+14259693424',
  location: 'Phoenix, Arizona',
  // Fill these in once SAM.gov registration is confirmed (leave '' to hide the line)
  uei: '',
  cage: '',
  naics: '541611 · 541990 · 561210 · 611430',
};

const NAV = [
  { href: 'index.html', label: 'Home', page: 'home' },
  { href: 'about.html', label: 'About', page: 'about' },
  { href: 'services.html', label: 'Services', page: 'services' },
  { href: 'contact.html', label: 'Contact', page: 'contact' },
];

function currentPage() {
  return document.body.dataset.page || 'home';
}

/* ---------- Header ---------- */
function renderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  const page = currentPage();
  const links = NAV.map(
    (n) =>
      `<a href="${n.href}" class="nav-link" ${n.page === page ? 'aria-current="page"' : ''}>${n.label}</a>`
  ).join('');
  const mobileLinks = NAV.map(
    (n) =>
      `<a href="${n.href}" class="block rounded-md px-3 py-3 text-base font-medium ${
        n.page === page ? 'bg-white/10 text-white' : 'text-silver-300 hover:bg-white/5 hover:text-white'
      }" ${n.page === page ? 'aria-current="page"' : ''}>${n.label}</a>`
  ).join('');

  el.outerHTML = `
  <header class="sticky top-0 z-50 border-b border-white/10 bg-navy-900/95 backdrop-blur" data-header>
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900">Skip to content</a>
    <div class="container-site flex h-16 items-center justify-between lg:h-20">
      <a href="index.html" class="flex items-center gap-3" aria-label="${SITE.name} home">
        <img src="assets/img/mark-96.png" alt="" width="44" height="44" class="h-10 w-10 lg:h-11 lg:w-11">
        <span class="leading-tight">
          <span class="block font-heading text-base font-bold text-white lg:text-lg">${SITE.name}</span>
          <span class="hidden text-[0.65rem] font-medium uppercase tracking-[0.18em] text-silver-300 sm:block">${SITE.tagline}</span>
        </span>
      </a>

      <nav class="hidden items-center gap-8 md:flex" aria-label="Primary">
        ${links}
        <a href="contact.html" class="btn-primary !px-5 !py-2.5">Request a Consultation</a>
      </nav>

      <button type="button" class="inline-flex h-10 w-10 items-center justify-center rounded-md text-silver-100 hover:bg-white/10 md:hidden"
        aria-controls="mobile-menu" aria-expanded="false" aria-label="Open menu" data-menu-toggle>
        <svg class="h-6 w-6" data-icon-open fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>
        <svg class="hidden h-6 w-6" data-icon-close fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>

    <div id="mobile-menu" class="hidden border-t border-white/10 md:hidden">
      <nav class="container-site space-y-1 py-4" aria-label="Mobile">
        ${mobileLinks}
        <a href="contact.html" class="btn-primary mt-3 w-full">Request a Consultation</a>
      </nav>
    </div>
  </header>`;
}

/* ---------- CTA banner (any element with data-component="cta") ---------- */
function renderCTA() {
  document.querySelectorAll('[data-component="cta"]').forEach((el) => {
    const title = el.dataset.title || 'Ready before the next disaster?';
    const text =
      el.dataset.text ||
      'Let’s talk about your plans, your people, and where the gaps are — before an incident finds them for you.';
    el.outerHTML = `
    <section class="relative overflow-hidden bg-navy-900">
      <img src="assets/img/mark-640.webp" alt="" class="pointer-events-none absolute -left-24 top-1/2 w-96 -translate-y-1/2 opacity-[0.06]" loading="lazy">
      <div class="container-site relative flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between lg:py-20">
        <div class="max-w-2xl">
          <h2 class="font-heading text-3xl font-bold text-white sm:text-4xl">${title}</h2>
          <p class="mt-4 text-lg text-silver-300">${text}</p>
        </div>
        <a href="contact.html" class="btn-primary shrink-0">Request a Consultation
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </section>`;
  });
}

/* ---------- Footer ---------- */
function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  const year = new Date().getFullYear();
  const ids = [
    SITE.uei && `UEI ${SITE.uei}`,
    SITE.cage && `CAGE ${SITE.cage}`,
    SITE.naics && `NAICS ${SITE.naics}`,
  ]
    .filter(Boolean)
    .join(' &nbsp;·&nbsp; ');

  el.outerHTML = `
  <footer class="border-t-4 border-orange-500 bg-navy-950 text-silver-300">
    <div class="container-site grid gap-10 py-14 md:grid-cols-3">
      <div>
        <div class="flex items-center gap-3">
          <img src="assets/img/mark-96.png" alt="" width="48" height="48" class="h-12 w-12" loading="lazy">
          <span class="font-heading text-lg font-bold text-white">${SITE.name}, LLC</span>
        </div>
        <p class="mt-4 max-w-xs text-sm leading-relaxed">Executive public-safety and emergency-management leadership for response, recovery, and resilience.</p>
      </div>

      <div>
        <h2 class="font-heading text-xs font-semibold uppercase tracking-eyebrow text-white">Explore</h2>
        <ul class="mt-4 space-y-2 text-sm">
          ${NAV.map((n) => `<li><a href="${n.href}" class="hover:text-white">${n.label}</a></li>`).join('')}
        </ul>
      </div>

      <div>
        <h2 class="font-heading text-xs font-semibold uppercase tracking-eyebrow text-white">Contact</h2>
        <ul class="mt-4 space-y-2 text-sm">
          <li><a href="mailto:${SITE.email}" class="hover:text-white">${SITE.email}</a></li>
          <li><a href="${SITE.phoneHref}" class="hover:text-white">${SITE.phone}</a></li>
          <li>${SITE.location} · Deployable nationwide</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="container-site flex flex-col gap-2 py-6 text-xs text-silver-500 md:flex-row md:justify-between">
        <p>© ${year} ${SITE.name}, LLC. All rights reserved.</p>
        ${ids ? `<p>${ids}</p>` : ''}
      </div>
    </div>
  </footer>`;
}

renderHeader();
renderCTA();
renderFooter();
