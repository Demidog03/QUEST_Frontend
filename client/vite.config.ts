// https://vitejs.dev/config/
/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      styles: "/src/styles",
      assets: "/src/assets",
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "styles/mixins"; @import "styles/variables";`,
      },
    },
  },
})
