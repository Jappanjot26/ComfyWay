/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7fa',
          100: '#cceef5',
          200: '#99dded',
          300: '#66cbe4',
          400: '#33badc',
          500: '#0891b2', // Primary teal
          600: '#0673a0',
          700: '#05568f',
          800: '#03387e',
          900: '#021b6c',
        },
        secondary: {
          50: '#eaf4ff',
          100: '#d6e8ff',
          200: '#add2ff',
          300: '#85bcff',
          400: '#5ca6ff',
          500: '#3390ff',
          600: '#2676e6',
          700: '#1a5dcc',
          800: '#1e3a8a', // Secondary navy
          900: '#0f1d45',
        },
        accent: {
          50: '#fefaec',
          100: '#fef5d9',
          200: '#fcecb3',
          300: '#fbe28d',
          400: '#fad967',
          500: '#fbbf24', // Accent gold
          600: '#e2a01f',
          700: '#c9811a',
          800: '#b16216',
          900: '#984311',
        },
        success: {
          500: '#10b981',
        },
        warning: {
          500: '#f97316',
        },
        error: {
          500: '#ef4444',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}