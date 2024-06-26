import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      exclude: ["./src/api/**/*"],
    }),
  ],
  build: {
    outDir: ".output/public",
  },

});
