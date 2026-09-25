/** Double T Consulting — Tailwind config (brand tokens sampled from the logo) */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020F36',
          900: '#031850', // logo background — primary
          800: '#0A2263',
          700: '#1C2955', // raised surfaces on navy
          600: '#2A3A70',
        },
        orange: {
          400: '#EE8450',
          500: '#E0662A', // accent — CTAs, icons, underlines
          600: '#C2521A', // orange text/links on light backgrounds (AA)
        },
        silver: {
          100: '#E6E9EF',
          300: '#B8C0CE', // body text on navy, "T" metal tone
          500: '#8D95A4',
        },
        slate: {
          50: '#F5F7FA', // light section backgrounds
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      maxWidth: {
        site: '72rem',
      },
    },
  },
  plugins: [],
};
