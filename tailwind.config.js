/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'text-[#201D1E]',
    'text-[#EC1F27]',
    'text-[#FFDE16]',
    'hover:bg-[#FFDE16]',
    'bg-[#201D1E]',
    'text-[#6A994E]',
    'bg-[#25262b]',
    'bg-[#FFDE16]',
    'bg-[#6A994E]',
    'text-white', 
    'hover:bg-red-700'
  ],  
}
