import type { Plugin } from "vite";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Isolated native-wrapper build. The Vercel web app keeps using vite.config.ts
 * (port 8080, grokPwaPlugin, vercel nitro preset). This config ships a static
 * SPA shell for Tauri / Capacitor without those preview contracts.
 */
function nativeDefinePlugin(): Plugin {
  return {
    name: "native-define",
    config() {
      return {
        define: {
          "import.meta.env.VITE_NATIVE": JSON.stringify("true"),
        },
      };
    },
  };
}

export default defineConfig({
  resolve: { tsconfigPaths: true },
  build: {
    outDir: "dist/native",
    emptyOutDir: true,
  },
  plugins: [
    nativeDefinePlugin(),
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          enabled: true,
          crawlLinks: true,
          outputPath: "/index.html",
        },
      },
    }),
    viteReact(),
  ],
});
