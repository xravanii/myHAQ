/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0B1F3A',
        'dark-navy': '#13294B',
        'beige': '#F5E6CC',
        'cream': '#FAF3E7',
        'gold-accent': '#D4A373',
      },
    },
  },
  plugins: [],
}