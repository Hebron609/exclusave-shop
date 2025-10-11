import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // <-- you need this import

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // now this works
    },
  },

  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        shop: "shop.html",
        collections: "collections.html",
      },
    },
  },
});
