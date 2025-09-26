// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // This tells Vite: "If you see 'LoginPage', look for LoginPage.jsx, LoginPage.js, etc."
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
});