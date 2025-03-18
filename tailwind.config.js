/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1a2a42',
        terracotta: '#c06d59',
        gold: '#e6b980',
        stone: '#f5f5f0',
        charcoal: '#2d2d2d',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
