import { resolve } from 'path';
import { defineConfig } from 'vite';

import pkg from './package.json';
import dts from 'vite-plugin-dts';



export default defineConfig({
  plugins: [dts({ copyDtsFiles: true })],
  define: {
    __CONFIG__: {
      version: pkg.version
    }
  },
  build: {
    lib: {
      name: 'Langkama',
      fileName: pkg.name,
      entry: resolve(__dirname, 'src/main.ts')
    },
    minify: true,
    emptyOutDir: true
  }
});