/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-light": "linear-gradient(to bottom right, #f9fafb, #e5e7eb)",
        "gradient-dark": "linear-gradient(to bottom right, #1f2937, #111827)",
      },
      colors: {
        primary: "#1f2937",
        secondary: "#4b5563",
        accent: "#ef4444",
      },
    },
  },
  plugins: [],
};

