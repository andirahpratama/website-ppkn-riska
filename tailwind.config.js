/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffdf5',
          100: '#fef7db',
          200: '#feecac',
          300: '#fddb73',
          400: '#fbc53b',
          500: '#f5b800', // Sesuai PRD #F5B800
          600: '#d49b00',
          700: '#aa7400',
          800: '#875a07',
          900: '#6f480a',
        },
        patriot: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#d32f2f', // Sesuai PRD #D32F2F
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        surface: {
          ground: '#f8fafc',
          card: '#ffffff',
          dark: '#1e293b', // Sesuai PRD #1E293B
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(15, 23, 42, 0.05)',
        'soft': '0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
        'soft-lg': '0 20px 40px -15px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'glow-gold': '0 0 25px rgba(245, 184, 0, 0.35)',
        'glow-patriot': '0 0 25px rgba(211, 47, 47, 0.3)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
