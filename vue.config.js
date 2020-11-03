/* eslint-disable @typescript-eslint/no-var-requires */
// this allows memory used for webpack to be configurable
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ejs = require('ejs');

// https://forum.vuejs.org/t/prevent-vue-cli-from-generating-html-files/39354
const pages = {
  "js/inject": {
    // entry for the page
    entry: "src/main.ts",
    // the source template
    // template: 'public/index.html',
    // output as dist/index.html
    // filename: 'index.html',
    // when using title option,
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: "Title",
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    // chunks: ['chunk-vendors', 'chunk-common', 'index']
  },
  background: {
    entry: "src/backend/index.ts",

    // filename: 'background.html',
  },
  "popup/popup": {
    // entry for the page
    entry: "src/popup/popup.ts",
    outputDir: "popup",
    // the source template
    template: "public/index.html",
    // output as dist/index.html
    filename: "popup/popup.html",
    // when using title option,
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: "Title",
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    // chunks: ['chunk-vendors', 'chunk-common', 'index']
  },
  "tab/tab": {
    // entry for the page
    entry: "src/tab/tab.ts",
    // the source template
    template: "src/tab/tab.html",
    // output as dist/index.html
    filename: "tab/tab.html",
    // when using title option,
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: "git-kanban-enhanced-extension - Options",
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    // chunks: ['chunk-vendors', 'chunk-common', 'index']
  },
};

// function transformHtml(content) {
//   return ejs.render(content.toString(), {
//     ...process.env,
//   });
// }

// vue.config.js
module.exports = {
  pages: pages,
  configureWebpack: (config) => {
    config.mode =
      process.env.NODE_ENV === "cProduction"
        ? "production"
        : process.env.NODE_ENV;

    // https://stackoverflow.com/questions/48851677/how-to-direct-vue-cli-to-put-built-project-files-in-different-directories
    // config.output.path = path.join(__dirname, './dist');

    // config.entry = {
    //   // 'background': './background.js',
    //   background: './src/backend/index.ts',
    //   'popup/popup': './src/popup/popup.ts',
    //   // 'js/popup': './js/popup.js',
    //   // 'options/options': './options/options.js',
    //   'tab/tab': './src/tab/tab.ts',
    //   'js/inject': './src/main.ts',
    // };

    // ['./src/tab/tab.ts']
    // config.output.publicPath = '../assets/static/';
    // config.output.publicPath = '';
    // publicPath: '/app/',
    config.output.filename = "[name].js";

    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
    // });

    // get a reference to the existing ForkTsCheckerWebpackPlugin
    const existingForkTsChecker = config.plugins.filter(
      (p) => p instanceof ForkTsCheckerWebpackPlugin
    )[0];

    // remove the existing ForkTsCheckerWebpackPlugin
    // so that we can replace it with our modified version
    config.plugins = config.plugins.filter(
      (p) => !(p instanceof ForkTsCheckerWebpackPlugin)
    );

    // copy the options from the original ForkTsCheckerWebpackPlugin
    // instance and add the memoryLimit property
    const forkTsCheckerOptions = existingForkTsChecker.options;
    forkTsCheckerOptions.memoryLimit = 3080;

    config.plugins.push(new ForkTsCheckerWebpackPlugin(forkTsCheckerOptions));

    const plugins = [
      // new MiniCssExtractPlugin({
      //   filename: '[name].css',
      // }),
      new CopyWebpackPlugin([
        { from: "src/icons", to: "icons", ignore: ["icon.xcf"] },
        { from: "src/css", to: "css" },
        // { from: 'src/tab/tab.html', to: 'tab/tab.html', transform: transformHtml },

        // { from: 'src/popup/popup.html', to: 'popup/popup.html', transform: transformHtml },
        {
          from: "src/manifest.json",
          to: "manifest.json",
          transform: (content) => {
            const jsonContent = JSON.parse(content);
            // jsonContent.version = version;

            if (config.mode === "development") {
              jsonContent["content_security_policy"] =
                "script-src 'self' 'unsafe-eval'; object-src 'self'";
            }

            return JSON.stringify(jsonContent, null, 2);
          },
        },
      ]),
    ];
    config.plugins = config.plugins.concat(plugins);
  },
  // css: {
  //   requireModuleExtension: false,
  //   loaderOptions: {
  //     css: {
  //       // Note: the following config format is different between Vue CLI v4 and v3
  //       // For Vue CLI v3 users, please refer to css-loader v1 documentations
  //       // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
  //       modules: {
  //         localIdentName: '[name]',
  //       },
  //       localsConvention: 'camelCaseOnly',
  //     },
  //   },
  // },
  filenameHashing: false,
  // publicPath: '',
  // publicPath: '/app/',
  runtimeCompiler: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    const excluded = ["tab/tab", "popup/popup"];
    Object.keys(pages).forEach((page) => {
      console.log(page);
      if (excluded.indexOf(page) == -1) {
        config.plugins.delete(`html-${page}`);
        config.plugins.delete(`preload-${page}`);
        config.plugins.delete(`prefetch-${page}`);
      }
    });
    // config.plugins.delete(`html`);
    // config.plugins.delete(`preload`);
    // config.plugins.delete(`prefetch`);
    // config.optimization.delete('splitChunks');
  },
  // configureWebpack: {
  //   devtool: 'source-map'
  // }
};
