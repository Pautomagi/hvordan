const path = require("path");
const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

module.exports = {
  stats: {
    entrypoints: false,
    children: false,
  },
  mode: "development",
  context: path.resolve(__dirname, "src"),
  devServer: {
    client: {
      overlay: true,
    },
  },
  entry: {
    main: "./js/main.js",
  },
  output: {
    publicPath: "/",
    path: path.join(__dirname, "./web"),
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: rules,
  },
  plugins: plugins,
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "all",
      minChunks: 3,
    },
  },
  watch: false,
};
