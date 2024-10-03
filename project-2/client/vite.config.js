import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../server/public",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/dogs": {
        target: "http://localhost:3001",
      },
      "/dogs/": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dogs\//, "/dogs/"), // For /dogs/:id
      },
    },
  },
});
