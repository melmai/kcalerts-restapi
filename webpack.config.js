const path = require("path");

module.exports = {
  entry: {
    // metroalertbanner: "./src/js/home-alert-banner.js",
    kcalertslist: "./src/js/alerts-list.js",
    kcalertsroute: "./src/js/alerts-route.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/[name].js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 9000,
    open: {
      target: ["/index.html", "/route.html"],
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader", // inject CSS to page
          },
          {
            loader: "css-loader", // translates CSS into CommonJS modules
          },
          {
            loader: "postcss-loader", // Run post css actions
            options: {
              plugins: function () {
                // post css plugins, can be exported to postcss.config.js
                return [require("precss"), require("autoprefixer")];
              },
            },
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
    ],
  },
};
