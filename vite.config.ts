import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  define: {
    'process': {env:{
      SITE_KEY: "6Ldc5M0lAAAAAEMvzUc3JlHltquCnp0r2opVodVO"
    }}
  },
  server: {
    port: 3003,
  },
});
