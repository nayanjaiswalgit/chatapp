/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: { 
      'Tilefont': 'Tilt Neon',
        },
    extend: {
      
 


    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}