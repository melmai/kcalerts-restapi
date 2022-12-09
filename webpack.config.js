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
};
