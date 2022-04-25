const { merge } = require("webpack-merge");
const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "development",
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true, // When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.
  },
});
