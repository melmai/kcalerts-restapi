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
    ],
  },
};
