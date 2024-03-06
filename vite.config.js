import { resolve } from 'path';
import { defineConfig } from 'vite';



export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'Langkama',
      fileName: 'langkama',
    },
    minify: true,
    emptyOutDir: true,
  }
});