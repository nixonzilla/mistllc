// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables for current mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // cleaner imports
      },
    },
    build: {
      target: "esnext", // modern output for Cloudflare Pages
      sourcemap: mode === "development", // source maps only in dev
      minify: "esbuild", // fast + optimized
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"], // split vendor bundle
          },
        },
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV || "production"),
    },
    server: {
      port: 5173,
      open: true,
    },
    preview: {
      port: 5173,
    },
    base: "/", // keep root for Cloudflare Pages (change if deploying under subpath)
  };
});
