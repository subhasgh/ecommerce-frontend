/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx,tsx,html}",],
  theme: {
    extend: {
//        colors: {
  //           brown: { 700: "#6e3d2e",
    //  },
//},
       keyframes: {
      slideIn: {
        '0%': { transform: 'translateX(100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      progress: {
        '0%': { width: '100%' },
        '100%': { width: '0%' },
      },
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
      'slideIn': 'slideIn 0.4s ease-out',
      'progress': 'progress 3s linear forwards',
      'slideRight': 'slideRight 1.2s ease-out forwards',
        'fadeIn': 'fadeIn 1s ease-out forwards', 
    }
      
    
    },
},
  
  plugins: [],
}

