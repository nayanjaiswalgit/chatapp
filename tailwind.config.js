/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: { 
      'Tilefont': 'Noto Sans',
        },
    extend: {
      
 


    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}