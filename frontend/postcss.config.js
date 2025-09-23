import "./tailwind.config.js";

// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {}, // ✅ use this instead of "tailwindcss"
    autoprefixer: {},
    // Optionally, you can add cssnano for minification in production
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
