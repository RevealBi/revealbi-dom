const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/samples/sandbox'),
  },
  devServer: {
    port: 4200,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [
    new NxAppWebpackPlugin({
      tsConfig: './tsconfig.app.json',
      compiler: 'swc',
      main: './src/main.ts',
      index: './src/index.html',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.css'],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
    // NxAppWebpackPlugin overwrites config.ignoreWarnings, so append ours after it.
    // reveal-sdk ships `//# sourceMappingURL=` comments without the matching .map
    // files; source-map-loader logs a harmless "Failed to parse source map" for each.
    // Silence just those so they don't flood the console or block the dev-server overlay.
    {
      apply(compiler) {
        // Entries must be functions here: webpack normalizes RegExp -> fn during
        // options processing, which already ran by the time this plugin applies.
        compiler.options.ignoreWarnings = [
          ...(compiler.options.ignoreWarnings ?? []),
          (warning) => /Failed to parse source map/.test(warning.message),
        ];
      },
    },
  ],
};
