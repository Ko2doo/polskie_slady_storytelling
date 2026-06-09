import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

import nodePath from 'node:path';
import { readFileSync } from 'node:fs';

function pathsResolver(input: string) {
  return nodePath.resolve(process.cwd(), input);
}

// Read package.json file
const pkg = JSON.parse(readFileSync(pathsResolver('package.json'), 'utf8'));

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_NAME__: JSON.stringify(pkg.appName),
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  base: '',
  plugins: [svelte()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      } as Record<string, unknown>,
    },
  },
  build: {
    minify: true,
    copyPublicDir: true,
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    reportCompressedSize: true,
    rollupOptions: {
      watch: {
        clearScreen: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': pathsResolver('src'),
    },
  },
});
