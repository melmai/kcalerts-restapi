const path = require("path");

module.exports = {
  entry: {
    home: "./src/js/home.js",
    alerts: "./src/js/alerts.js",
    route: "./src/js/route.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/[name].js",
    publicPath: "/",
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "dist"),
      },
      {
        directory: path.join(__dirname, "img"),
      },
      {
        directory: path.join(__dirname, "json"),
      },
    ],
    port: 9000,
    open: {
      target: ["/index.html", "route.html"],
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
        test: /\.sass$/,
        use: ["sass-loader"],
      },
    ],
  },
};
