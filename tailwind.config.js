/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx,html}",],
  theme: {
    extend: {
              keyframes: {
        slideRight: {
          '0%': { transform: 'translateX(0)', opacity: '0' },
          '100%': { transform: 'translateX(80px)', opacity: '1' },
        },
        fadeIn: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
  },
      
      animation: {
        slideRight: 'slideRight 1.2s ease-out forwards',
        fadeIn: 'fadeIn 1s ease-out forwards',    
  },
    },
},
  
  plugins: [],
}

