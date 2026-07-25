/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0b0a0f',
          900: '#121019',
          800: '#1a1725',
          700: '#252032',
          600: '#332c44',
        },
        paper: {
          50: '#fbf7f0',
          100: '#f3ebdd',
          200: '#e4d6be',
        },
        ember: {
          400: '#f4b860',
          500: '#e8a13f',
          600: '#c9822a',
        },
        plum: {
          400: '#a78bfa',
          500: '#8b6df0',
          600: '#6d4fd6',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.35s ease-out both',
        'scan-line': 'scan-line 2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
