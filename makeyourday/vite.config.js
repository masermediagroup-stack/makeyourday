import { defineConfig } from "vite";

export default defineConfig({
  // Relative base helps asset URLs resolve when bundled inside the Tauri WebView.
  base: "./",
  server: {
    port: 5173,
    strictPort: true,
  },
});
