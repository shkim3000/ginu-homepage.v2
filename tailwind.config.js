//** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        gray: {
          900: '#101828', 800: '#1F2937', 700: '#374151', 600: '#4B5563',
          500: '#6B7280', 400: '#9CA3AF', 300: '#D1D5DB', 200: '#E5E7EB',
          100: '#F3F4F6', 50: '#F9FAFB'
        }
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
