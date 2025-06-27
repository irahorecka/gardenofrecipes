import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  assetsInclude: ["**/*.md"],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
});
