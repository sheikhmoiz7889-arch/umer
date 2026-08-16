/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Baloo 2"', 'cursive'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        playful: ['"Fredoka"', 'sans-serif'],
      },
      colors: {
        mint: {
          50: '#f0fdf6',
          100: '#dcfce9',
          200: '#bbf7d3',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        sun: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        },
        bubble: {
          50: '#fff1f5',
          100: '#ffe4ec',
          200: '#fecdd9',
          300: '#fda4c0',
          400: '#fb7193',
          500: '#f43f6e',
          600: '#e11d57',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        navy: {
          700: '#1e3a5f',
          800: '#172f4a',
          900: '#0f2236',
        },
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'float-mid': 'floatMid 5s ease-in-out infinite',
        'float-fast': 'floatFast 4s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
        'wiggle': 'wiggle 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(6deg)' },
        },
        floatMid: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(-5deg)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(8deg)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      boxShadow: {
        'glow-mint': '0 0 40px -8px rgba(74, 222, 128, 0.5)',
        'glow-sun': '0 0 40px -8px rgba(250, 204, 21, 0.5)',
        'glow-bubble': '0 0 40px -8px rgba(251, 113, 147, 0.5)',
        'glow-sky': '0 0 40px -8px rgba(56, 189, 248, 0.5)',
        'soft': '0 10px 40px -12px rgba(15, 34, 54, 0.18)',
        'float': '0 20px 50px -12px rgba(15, 34, 54, 0.25)',
      },
    },
  },
  plugins: [],
};
