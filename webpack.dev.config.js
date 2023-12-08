const path = require("path");

module.exports = {
  entry: {
    banner: "./src/js/home-alert-banner.js",
    list: "./src/js/alerts-list.js",
    route: "./src/js/alerts-route.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/[name].js",
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 9000,
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
    open: {
      target: ["/index.html", "/2.html"],
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          // {
          //   loader: "postcss-loader", // Run post css actions
          //   options: {
          //     plugins: function () {
          //       // post css plugins, can be exported to postcss.config.js
          //       return [require("precss"), require("autoprefixer")];
          //     },
          //   },
          // },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
    ],
  },
};
