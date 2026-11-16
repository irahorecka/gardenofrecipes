import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { seo } from "./seo/plugin.js";

export default defineConfig({
  base: "/",
  plugins: [react(), seo()],
  assetsInclude: ["**/*.md"],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
});
