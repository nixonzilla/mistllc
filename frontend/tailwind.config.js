// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan all source files
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1e40af", // example custom brand color
          light: "#3b82f6",
          dark: "#1e3a8a",
        },
      },
    },
  },
  plugins: [],
};
