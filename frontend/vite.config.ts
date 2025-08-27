import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Load .env files based on the current mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    root: './src', // source directory
    build: {
      outDir: resolve(__dirname, 'dist'), // must match pages_build_output_dir
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, 'src/main.tsx'), // entry point
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        // proxy API calls to backend Worker during local dev
        '/users': {
          target: env.VITE_API_URL || 'http://127.0.0.1:8787',
          changeOrigin: true,
          secure: false,
        },
        '/songs': {
          target: env.VITE_API_URL || 'http://127.0.0.1:8787',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    define: {
      // expose the backend API URL to frontend code
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
  };
});
