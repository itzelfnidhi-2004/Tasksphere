import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: ["taskflow-manager-production-d54c.up.railway.app"],
  },
  preview: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: ["taskflow-manager-production-d54c.up.railway.app"],
  },
});