import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Web_Portfolio/",
  server: {
    port: 5173,
  },
});
