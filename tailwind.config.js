/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import banner1 from './src/assets/banner1.jpg'
import banner2 from './src/assets/banner2.jpg'
import banner3 from './src/assets/banner3.webp'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        registerBg: "url('./src/assets/registerBg.svg')",
      },
      colors: {
        highlight: '#0091bd',
        pinkShade :'#ef509c',
        primary :'#211f1f',
        secondary :'#424242'
      },
    },
  },
  plugins: [daisyui],
}
