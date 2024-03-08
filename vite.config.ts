import { resolve } from 'path';
import { defineConfig } from 'vite';



export default defineConfig({
  build: {
    lib: {
      name: 'Langkama',
      formats: ['umd'],
      fileName: 'langkama',
      entry: resolve(__dirname, 'src/main.ts')
    },
    minify: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: () => `langkama.cjs`
      }
    }
  }
});