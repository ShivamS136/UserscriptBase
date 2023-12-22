import { defineConfig } from 'vite';
import monkey, { util } from 'vite-plugin-monkey';
import AutoImport from 'unplugin-auto-import/vite';

import { getArtefactUrl } from '../../utils/configUtils';

const fileMeta = {
  srcFileName: 'src/english/english.ts',
  buildFileName: 'userscripts/english/english.user.js',
  artifactFileName: 'userscripts/english/english.user.js',
  artifactMetaFileName: 'userscripts/english/english.meta.js',
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
        author: 'Shivam Sharma',
        description: 'Test Description for English Script',
        name: 'TestEnglish',
        version: '0.0.2',
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
});
