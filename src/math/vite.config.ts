import { defineConfig } from 'vite';
import monkey, { util } from 'vite-plugin-monkey';
import AutoImport from 'unplugin-auto-import/vite';

import { getArtefactUrl } from '../../utils/configUtils';

const fileMeta = {
  srcFileName: 'src/math/math.ts',
  buildFileName: 'userscripts/math/math.user.js',
  artifactFileName: 'userscripts/math/math.user.js',
  artifactMetaFileName: 'userscripts/math/math.meta.js',
};

// https://vitejs.dev/config/
// https://github.com/lisonge/vite-plugin-monkey#config
export default defineConfig({
  plugins: [
    AutoImport({
      imports: [util.unimportPreset],
    }),
    monkey({
      entry: fileMeta.srcFileName,
      userscript: {
        author: 'Shivam',
        description: 'Test Description for Math Scripts',
        name: 'TestMath',
        version: '0.0.1',
        downloadURL: getArtefactUrl(fileMeta.artifactFileName),
        updateURL: getArtefactUrl(fileMeta.artifactMetaFileName),
        match: ['https://www.google.com/*'],
      },
      build: {
        fileName: fileMeta.buildFileName,
        metaFileName: true,
      },
    }),
  ],
  build: {
    minify: false,
    target: 'modules',
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
});
