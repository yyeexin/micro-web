const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  resolve: {
    // 请注意，以下这样使用resolve.extensions会覆盖默认数组，这就意味着webpack将不再尝试使用默认扩展来解析模块。然而你可以使用 '...' 访问默认拓展名：
    extensions: [".ts", ".tsx", "..."],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
};
