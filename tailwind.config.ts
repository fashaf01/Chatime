import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Chatime purple, deepened for a premium feel
        grape: {
          50: '#F6F1FC',
          100: '#EADEF8',
          200: '#D6BDF0',
          300: '#BC97E4',
          400: '#9E6FD4',
          500: '#7F4BC0',
          600: '#5B2C8D', // brand purple
          700: '#4A2373',
          800: '#341751',
          900: '#220E37',
          950: '#150720',
        },
        cream: '#FDF9F4',
        sand: '#F2E7D9',
        // Warm accent — Ceylon tea gold
        gold: {
          300: '#F2D48A',
          400: '#E8BC5A',
          500: '#D9A032',
          600: '#B57F1E',
        },
        boba: '#3A2416',
      },
      fontFamily: {
        // Sinhala and Tamil sit *after* the Latin faces rather than replacing
        // them. Outfit and Jakarta have no Sinhala or Tamil glyphs, so the
        // browser falls through to Noto for exactly those characters and keeps
        // the brand faces for Latin. That means a heading, or a Sinhala
        // sentence containing an English drink name, renders correctly with no
        // per-locale class switching — and nothing can force English text into
        // the Noto face.
        display: [
          'var(--font-display)',
          'var(--font-sinhala)',
          'var(--font-tamil)',
          'system-ui',
          'sans-serif',
        ],
        body: [
          'var(--font-body)',
          'var(--font-sinhala)',
          'var(--font-tamil)',
          'system-ui',
          'sans-serif',
        ],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(6deg)' },
        },
        rise: {
          '0%': { transform: 'translateY(120%) scale(0.6)', opacity: '0' },
          '15%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-40%) scale(1)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        swirl: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        rise: 'rise 9s linear infinite',
        marquee: 'marquee 32s linear infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        swirl: 'swirl 26s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
