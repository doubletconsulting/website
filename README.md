# Double T Consulting — website

Static site: HTML + Tailwind CSS + vanilla JS, hosted on GitHub Pages at doubletconsulting.com.

## Files
- `index.html`, `about.html`, `services.html`, `contact.html` — the four pages
- `js/components.js` — shared header, footer, CTA banner, and contact info (edit once, updates every page)
- `js/main.js` — mobile menu, scroll animations, service toggles, contact form
- `css/output.css` — compiled styles (this is what the site uses; already built)
- `css/input.css` + `tailwind.config.js` — source styles and brand colors
- `CNAME` — tells GitHub Pages the custom domain

## Quick edits
- Contact info / UEI / CAGE: top of `js/components.js` (`SITE` object)
- Contact form: replace `YOUR_FORM_ID` in `contact.html` with your Formspree ID
- Headshot: see the `HEADSHOT` comment in `index.html`
- Capability statement PDF: see the `CAPABILITY STATEMENT` comment in `contact.html`
- Resume PDF: replace `assets/docs/Ty_Trenary_Resume.pdf` (keep the same file name); web version lives in `about.html`
- Headshot: `assets/img/ty-trenary.jpg`

## Rebuilding CSS (only if you add new Tailwind classes)
Requires Node.js: `npm install` then `npm run build`.
