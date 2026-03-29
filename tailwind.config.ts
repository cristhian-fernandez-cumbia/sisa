import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      /* ── Colores SISA ── */
      colors: {
        'sisa-blue':  '#2E7CF6',
        'sisa-green': '#34C759',
        'sisa-red':   '#FF453A',
        'sisa-amber': '#FFB800',
        'sisa-gray':  '#C5C5C5',
      },

      /* ── Sombras personalizadas ── */
      boxShadow: {
        'card':       '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 6px 20px rgba(0,0,0,0.12)',
        'modal':      '0 20px 60px rgba(0,0,0,0.18)',
        'nav':        '0 -1px 12px rgba(0,0,0,0.06)',
        'fab':        '0 4px 16px rgba(46,124,246,0.40)',
      },

      /* ── Border radius ── */
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      /* ── Fuentes ── */
      fontFamily: {
        sans: [
          'Inter',
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },

      /* ── Espaciado extra ── */
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
      },

      /* ── Ancho máximo ── */
      maxWidth: {
        'mobile': '430px',
        'tablet': '768px',
      },

      /* ── Keyframes ── */
      keyframes: {
        'slide-up': {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(0.96)' },
        },
      },

      /* ── Animaciones ── */
      animation: {
        'slide-up':      'slide-up 0.3s cubic-bezier(0.32,0.72,0,1)',
        'slide-down':    'slide-down 0.25s ease-out',
        'fade-in':       'fade-in 0.2s ease-out',
        'scale-in':      'scale-in 0.2s ease-out',
        'bounce-subtle': 'bounce-subtle 0.2s ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;