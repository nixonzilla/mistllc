// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {}, // ✅ Tailwind v4 plugin
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
