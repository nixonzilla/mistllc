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
          light: "#93c5fd", // light brand blue
          DEFAULT: "#3b82f6", // main brand blue
          dark: "#1e40af", // dark brand blue
        },
      },
    },
  },
  plugins: [],
};
