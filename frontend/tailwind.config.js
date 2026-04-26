/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm dark charcoal — replaces blue-navy
        navy: {
          50: '#f7f5f5',
          100: '#ede9e9',
          200: '#d4cccc',
          300: '#b0a4a4',
          400: '#8a7878',
          500: '#6a5a5a',
          600: '#4e4040',
          700: '#3a2e2e',
          800: '#261e1e',
          900: '#140f0f',
        },
        // Crimson red — from the Jobrythm logo
        electric: {
          50: '#fff3f3',
          100: '#ffd9d9',
          200: '#ffb0b0',
          300: '#ff7b7b',
          400: '#f04444',
          500: '#c41e1e',
          600: '#a31818',
          700: '#821313',
          800: '#600e0e',
          900: '#3f0909',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
