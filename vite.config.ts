import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';



export default defineConfig({
  plugins: [dts({ copyDtsFiles: true })],
  build: {
    lib: {
      name: 'Langkama',
      // formats: ['umd'],
      fileName: 'langkama',
      entry: resolve(__dirname, 'src/main.ts')
    },
    minify: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // entryFileNames: () => `langkama.cjs`
      }
    }
  }
});