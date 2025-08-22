/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#ff4d6d",
          dark: "#cc3956",
          light: "#ff6f88"
        }
      }
    }
  },
  plugins: []
}
