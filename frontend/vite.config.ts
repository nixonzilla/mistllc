import { defineConfig } from "vite";
import react from "@vitejs/plugin-";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8787", // backend server
        changeOrigin: true,
        secure: false
      }
    }
  }
});
