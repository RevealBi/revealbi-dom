/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/dom',

  plugins: [
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist/packages/dom',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      // Global variable name for the IIFE (script-tag / CDN) build: `window.RevealDom`.
      name: 'RevealDom',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : format === 'iife' ? 'iife.js' : 'js'}`,
      // es -> bundlers/NPM, cjs -> Node require, iife -> browser <script> global.
      // Dropped UMD: redundant with the dedicated es + cjs builds, and IIFE matches
      // what reveal-sdk itself ships (global `Reveal`).
      formats: ['es', 'cjs', 'iife'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
      output: {
        preserveModules: false, // Important for bundler compatibility
      }
    },
  },

  test: {
    watch: false,
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest/packages/dom',
    },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/dom',
      provider: 'v8',
    },
  },
});
