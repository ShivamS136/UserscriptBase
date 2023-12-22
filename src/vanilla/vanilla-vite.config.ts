import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import fs from 'node:fs/promises';

const src = process.env.VANILLA_SRC ? process.env.VANILLA_SRC.trim() : '';
if (src === '') {
  throw new Error(
    'Source file path is not defined. Set environment variable VANILLA_SRC to provide the same.',
  );
}

let customUserScript = '';
try {
  const fileText = await fs.readFile(src, 'utf-8');
  customUserScript = fileText.match(/\/\/ ==UserScript==[\s\S]*\/\/ ==\/UserScript==/)?.[0] || ``;
} catch (err) {
  throw new Error(`Unable to read Source file on path="${src}".\n${err}`);
}

// https://vitejs.dev/config/
// https://github.com/lisonge/vite-plugin-monkey#config
export default defineConfig({
  plugins: [
    monkey({
      entry: src,
      format: {
        generate() {
          return customUserScript;
        },
      },
      build: {
        fileName: src.split('/').at(-1),
        metaFileName: true,
      },
    }),
  ],
  build: {
    minify: false,
  },
});
