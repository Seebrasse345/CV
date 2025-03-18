/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2e1065',
          light: '#4c1d95',
          dark: '#1e0645',
        },
        secondary: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
        },
        text: {
          DEFAULT: '#333333',
          light: '#666666',
        },
        background: {
          light: '#f5f5f5',
          dark: '#121212',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 5px 15px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.12)',
        'button': '0 2px 5px rgba(0, 0, 0, 0.1)',
        'button-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}; 