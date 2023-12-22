import { defineConfig } from 'vite';
import monkey, { util } from 'vite-plugin-monkey';
import AutoImport from 'unplugin-auto-import/vite';

import { getArtefactUrl } from '../../utils/configUtils';

const fileMeta = {
  srcFileName: 'src/libCheck/libCheck.js',
  buildFileName: 'userscripts/libCheck/libCheck.user.js',
  artifactFileName: 'userscripts/libCheck/libCheck.user.js',
  artifactMetaFileName: 'userscripts/libCheck/libCheck.meta.js',
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
        description: 'Test Description for testing library functionality',
        name: 'TestLibCheck',
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
});
