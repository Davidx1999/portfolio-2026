/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a', // Off-Black
        surface: '#121212',
        foreground: '#f9fafb', // Zinc-50
      },
      fontFamily: {
        sans: ['Geist', 'Outfit', 'Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
