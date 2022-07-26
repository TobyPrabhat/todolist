/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        transo: {
          '0%': {transform: 'translate(-100vw)'},
          '100%': {transform: 'translate(0)'}
        },
        opo: {
          '0%': {'opacity': 0},
          '100%': {'opacity': 1},
        },
      },
      animation: {
        transo: 'transo 2s ease-in-out 1',
        opo: 'opo 3s ease-in-out 1',
      }
    },
  },
  plugins: [],
}
