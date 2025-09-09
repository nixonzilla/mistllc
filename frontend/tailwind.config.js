/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "mist-pink": "#FF61A6",
        "mist-red": "#FF3D00",
        "mist-yellow": "#FFD600",
      },
    },
  },
  plugins: [],
}
