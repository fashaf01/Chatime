import type { Config } from 'tailwindcss';

/**
 * Palette sampled directly from chatime.com.au and chatime.com — both run the
 * same global design system, so these are the real brand values, not guesses.
 * #500778 is the primary purple; the brights are used sparingly as category and
 * accent colours, exactly as they are on the official sites.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#F7F3FA',
          100: '#F0EAF4', // official section tint
          200: '#DCCEE8',
          300: '#B296C8', // official lilac
          400: '#8C6BAE',
          500: '#72439B', // official mid purple
          600: '#5C2D91', // official secondary
          700: '#502875', // logo lettering
          800: '#500778', // OFFICIAL PRIMARY
          900: '#3A0557',
          950: '#25033A',
        },
        magenta: '#812990',
        cyan: '#19BECF',
        leaf: '#75B743',
        jade: '#00A664',
        // Same hue darkened for text on a jade tint — the brand green itself
        // only reaches 2.7:1 there, which fails AA for small labels.
        'jade-deep': '#00713F',
        tangerine: '#F47929',
        coral: '#F16776',
        ink: '#1A1A1A',
        boba: '#3A2416',
      },
      fontFamily: {
        // Chatime's own face is Lasiver, which is commercially licensed. Figtree
        // is the closest free geometric-humanist match — same tall x-height and
        // circular bowls — so the site reads as Chatime without licensing it.
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.035em',
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(80, 7, 120, 0.08), 0 12px 32px -12px rgba(80, 7, 120, 0.16)',
        lift: '0 8px 20px -6px rgba(80, 7, 120, 0.18), 0 24px 56px -20px rgba(80, 7, 120, 0.28)',
        pill: '0 6px 18px -6px rgba(80, 7, 120, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(4deg)' },
        },
        rise: {
          '0%': { transform: 'translateY(120%) scale(0.6)', opacity: '0' },
          '15%': { opacity: '0.55' },
          '100%': { transform: 'translateY(-40%) scale(1)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        swirl: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        rise: 'rise 9s linear infinite',
        marquee: 'marquee 34s linear infinite',
        swirl: 'swirl 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
