/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a8a', // Deep blue
          light: '#3b82f6',   // Lighter blue
          dark: '#0c2461',    // Darker blue
        },
        secondary: {
          DEFAULT: '#0891b2', // Teal
          light: '#38bdf8',   // Sky blue
        },
        accent: {
          DEFAULT: '#6d28d9', // Purple
          light: '#a855f7',   // Light purple
        },
        text: {
          DEFAULT: '#1f2937', // Dark gray
          light: '#6b7280',   // Medium gray
        },
        background: {
          light: '#ffffff',   // White
          gradient: 'linear-gradient(120deg, #f0f9ff, #e6f7ff)', // Light blue gradient
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 5px 15px rgba(0, 0, 0, 0.08)',
        'button': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'button-hover': '0 2px 5px rgba(0, 0, 0, 0.12)',
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-professional': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0891b2 0%, #38bdf8 100%)',
        'gradient-skill': 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)',
      },
    },
  },
  plugins: [],
}; 