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
        dark: {
          DEFAULT: '#050505', // Almost black
          lighter: '#121212', // Slightly lighter black
          card: '#181818',    // Card background
        },
        cosmicAccent: {
          DEFAULT: '#6d78ff', // Cosmic blue
          darker: '#4c5dc7', // Darker cosmic blue
          bright: '#8b95ff',  // Brighter cosmic blue
          muted: '#5a6ad9',   // Muted cosmic blue
          purple: '#7b68ff',  // Cosmic purple
          cyan: '#68e8ff',    // Cosmic cyan
        },
        redAccent: {
          DEFAULT: '#6d78ff', // Map to cosmic blue for backward compatibility
          darker: '#4c5dc7', 
          bright: '#8b95ff',  
          muted: '#5a6ad9',   
        },
        purple: {
          DEFAULT: '#7B2CBF', // Primary purple
          accent: '#C77DFF',  // Accent purple
          light: '#9D4EDD',   // Light purple
          dark: '#3C096C',    // Dark purple
          surface: '#1A0033', // Surface/background color
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
        'neon-cosmic': '0 0 5px rgba(109, 120, 255, 0.5), 0 0 20px rgba(109, 120, 255, 0.3)',
        'neon-cosmic-hover': '0 0 10px rgba(109, 120, 255, 0.7), 0 0 30px rgba(109, 120, 255, 0.5)',
        'neon-red': '0 0 5px rgba(109, 120, 255, 0.5), 0 0 20px rgba(109, 120, 255, 0.3)',
        'neon-red-hover': '0 0 10px rgba(109, 120, 255, 0.7), 0 0 30px rgba(109, 120, 255, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-cosmic': 'pulseCosmic 2s infinite',
        'pulse-red': 'pulseCosmic 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulseCosmic 3s infinite ease-in-out',
        'float-subtle': 'floatSubtle 4s infinite ease-in-out',
        'word-reveal': 'wordReveal 0.8s ease forwards',
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
        pulseCosmic: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(109, 120, 255, 0.5), 0 0 20px rgba(109, 120, 255, 0.3)' },
          '50%': { boxShadow: '0 0 10px rgba(109, 120, 255, 0.7), 0 0 30px rgba(109, 120, 255, 0.5)' },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(109, 120, 255, 0.5), 0 0 20px rgba(109, 120, 255, 0.3)' },
          '50%': { boxShadow: '0 0 10px rgba(109, 120, 255, 0.7), 0 0 30px rgba(109, 120, 255, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulseCosmic: {
          '0%, 100%': { textShadow: '0 0 5px rgba(109, 120, 255, 0.3), 0 0 10px rgba(109, 120, 255, 0.2)' },
          '50%': { textShadow: '0 0 15px rgba(109, 120, 255, 0.8), 0 0 25px rgba(109, 120, 255, 0.5)' },
        },
        glowPulse: {
          '0%, 100%': { textShadow: '0 0 5px rgba(109, 120, 255, 0.3), 0 0 10px rgba(109, 120, 255, 0.2)' },
          '50%': { textShadow: '0 0 15px rgba(109, 120, 255, 0.8), 0 0 25px rgba(109, 120, 255, 0.5)' },
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        wordReveal: {
          '0%': { opacity: 0, transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-professional': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0891b2 0%, #38bdf8 100%)',
        'gradient-skill': 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)',
        'gradient-cosmic': 'linear-gradient(135deg, #6d78ff 0%, #4c5dc7 100%)',
        'gradient-red': 'linear-gradient(135deg, #6d78ff 0%, #4c5dc7 100%)',
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.purple.accent'),
              '&:hover': {
                color: theme('colors.purple.light'),
              },
            },
            h1: {
              color: theme('colors.white'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.purple.accent'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.purple.light'),
              fontWeight: '600',
            },
            h4: {
              color: theme('colors.white'),
              fontWeight: '600',
            },
            strong: {
              color: theme('colors.white'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.purple.DEFAULT'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.purple.accent'),
            },
            'ol > li::before': {
              color: theme('colors.purple.accent'),
            },
            hr: {
              borderColor: theme('colors.gray.700'),
            },
            pre: {
              backgroundColor: theme('colors.dark.lighter'),
            },
            code: {
              color: theme('colors.purple.accent'),
            },
            'pre code': {
              color: theme('colors.gray.300'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 