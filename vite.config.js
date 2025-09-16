import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  // ✅ VERY IMPORTANT: fallback for React Router
  preview: {
    port: 4173,
  },
});
