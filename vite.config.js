import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.7, 0.9], speed: 3 },
      svgo: {
        plugins: [
          { name: "removeViewBox", active: false },
          { name: "removeEmptyAttrs", active: false },
        ],
      },
      webp: { quality: 85 },
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        shop: path.resolve(__dirname, "shop.html"),
        addProduct: path.resolve(__dirname, "add-product.html"),
        productList: path.resolve(__dirname, "products.html"),
        collections: path.resolve(__dirname, "collections.html"),
        support: path.resolve(__dirname, "support.html"),
        promo: path.resolve(__dirname, "promo.html"),
        exclusiveServices: path.resolve(__dirname, "exclusive-services.html"),
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
