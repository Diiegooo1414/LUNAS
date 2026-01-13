/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.js",       // <--- AÑADE ESTO (si lightbox.js está junto al index.html)
    "./js/**/*.js"  // <--- AÑADE ESTO TAMBIÉN (por si decides meterlo en una carpeta js)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}