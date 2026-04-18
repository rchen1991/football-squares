import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL_BASE_PATH || '/football-squares/',
  plugins: [react()],
  server: {
    port: 3000,
  }
});
