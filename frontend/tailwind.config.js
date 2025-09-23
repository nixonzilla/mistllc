/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // enable class-based dark mode
  theme: {
    extend: {
      backgroundImage: {
        "gradient-light": "linear-gradient(to bottom right, #f9fafb, #e5e7eb)", // light gray gradient
        "gradient-dark": "linear-gradient(to bottom right, #1f2937, #111827)", // dark gray gradient
      },
      colors: {
        primary: "#1f2937", // slate-800
        secondary: "#4b5563", // gray-600
        accent: "#ef4444", // red-500
      },
    },
  },
  plugins: [],
};
