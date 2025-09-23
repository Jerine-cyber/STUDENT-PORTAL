/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      animation: {
        blob: "blob 7s infinite",
      },
      boxShadow: {
        '3d-dark': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3), inset 0 3px 5px rgba(255, 255, 255, 0.05), inset 0 -3px 5px rgba(0, 0, 0, 0.2)',
        '3d-dark-hover': '0 25px 30px -5px rgba(0, 0, 0, 0.5), 0 15px 15px -5px rgba(0, 0, 0, 0.4), inset 0 4px 6px rgba(255, 255, 255, 0.08), inset 0 -4px 6px rgba(0, 0, 0, 0.3)',
        '3d-green': '0 0 15px rgba(34, 197, 94, 0.7), inset 0 0 8px rgba(255, 255, 255, 0.5)',
        '3d-red': '0 0 15px rgba(239, 68, 68, 0.7), inset 0 0 8px rgba(255, 255, 255, 0.5)',
        '3d-glow': '0 0 30px rgba(79, 70, 229, 0.6), 0 0 60px rgba(124, 58, 237, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)',
        '3d-glow-hover': '0 0 40px rgba(79, 70, 229, 0.8), 0 0 80px rgba(124, 58, 237, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.15)',
      }
    },
  },
  plugins: [],
}
