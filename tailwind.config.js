/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx,html}",],
  theme: {
    extend: {
       keyframes: {
      slideIn: {
        '0%': { transform: 'translateX(100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      progress: {
        '0%': { width: '100%' },
        '100%': { width: '0%' },
      },
    },
    animation: {
      'slide-in': 'slideIn 0.4s ease-out',
      'progress': 'progress 3s linear forwards',
    },
    },
  },
  plugins: [],
}

