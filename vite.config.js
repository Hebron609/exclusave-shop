import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [vue(), tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        shop: path.resolve(__dirname, "shop.html"),
        addProduct: path.resolve(__dirname, "add-product.html"),
        productList: path.resolve(__dirname, "products.html"),
        collections: path.resolve(__dirname, "collections.html"),
        support: path.resolve(__dirname, "support.html"),
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
