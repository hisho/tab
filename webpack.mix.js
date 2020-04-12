const mix = require('laravel-mix'); //laravel-mix本体
const CopyWebpackPlugin = require('copy-webpack-plugin'); //ディレクトリをコピーする

const dist_path = `docs/`;
/*
  |--------------------------------------------------------------------------
  | Mix Asset Management
  |--------------------------------------------------------------------------
  |
  | Mix provides a clean, fluent API for defining some Webpack build steps
  | for your Laravel application. By default, we are compiling the Sass
  | file for the application as well as bundling up all the JS files.
  |
 */

mix.webpackConfig({
  module: {
    rules: [{
      test: /\.scss$/,
      loader: `import-glob-loader`
    }]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        force: true,
        from: 'src/index.html',
        to: 'docs'
      }
    ])
  ]
});

mix.ts('src/@js/main.ts', `${dist_path}assets/js`);

mix.sass('src/@scss/common.scss', `${dist_path}assets/css`)
  .options({
    processCssUrls: false, postCss: [
      require('autoprefixer')({grid: 'autoplace'}),
    ],
  });

mix.sourceMaps();

mix.webpackConfig({
  devtool: 'inline-source-map'
});

mix.disableNotifications();

mix.browserSync({
  server: `docs`,
  proxy: false,
  files: [
    `docs/index.html`,
    `docs/**/*.js`,
    `docs/**/*.css`
  ]
});