/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ethiopia: {
          teff: {
            50: '#FAF6EE',
            100: '#F4ECD8',
            200: '#E9D6AD',
            300: '#DEBF83',
            400: '#D2A859',
            500: '#C59334', // Primary Teff Gold
            600: '#A37424',
            700: '#7E551A',
            800: '#5A3A12',
            900: '#38220A',
          },
          clay: {
            50: '#FAF2EE',
            100: '#F3E1D7',
            200: '#E6C0AD',
            300: '#D79D82',
            400: '#C77B59',
            500: '#B85C38', // Mitad Clay Terracotta
            600: '#994426',
            700: '#7A321A',
            800: '#5C2211',
            900: '#3E1409',
          },
          earth: {
            50: '#F7F4F0',
            100: '#EDE7DE',
            200: '#D8CCBC',
            300: '#C2B099',
            400: '#A89275',
            500: '#8A7255',
            600: '#6E5740',
            700: '#533F2D',
            800: '#3A2A1D',
            900: '#22170E', // Deep Earth Brown
          },
          mesob: {
            red: '#9E2A2B',
            green: '#2D5A27',
            gold: '#D4A373',
            navy: '#1D3557',
            straw: '#E9D8A6',
          },
          obsidian: '#0E0C0A',
          charcoal: '#1A1715',
          linen: '#F9F7F2',
          cream: '#F4EFE6',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'var(--font-fidel)', 'system-ui', 'sans-serif'],
        ethiopic: ['var(--font-fidel)', 'Noto Sans Ethiopic', 'Abyssinica SIL', 'sans-serif'],
      },
      animation: {
        'steam-rise': 'steam 3s ease-out infinite',
        'bubble-pulse': 'pulseBubble 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slow-spin': 'spin 30s linear infinite',
        'heat-shimmer': 'shimmer 2s ease-in-out infinite alternate',
      },
      keyframes: {
        steam: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '0' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-40px) scale(1.4)', opacity: '0' },
        },
        pulseBubble: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.25)', opacity: '1' },
        },
        shimmer: {
          '0%': { filter: 'brightness(1)' },
          '100%': { filter: 'brightness(1.2) drop-shadow(0 0 15px rgba(184,92,56,0.5))' },
        },
      },
    },
  },
  plugins: [],
};
