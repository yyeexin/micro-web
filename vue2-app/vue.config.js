const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: "http://localhost:6002",
  transpileDependencies: true,
  devServer: {
    port: 6002,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      libraryTarget: "umd",
      library: "vue2-app",
    },
  },
});
