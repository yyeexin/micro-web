const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "http://localhost:6003",
  transpileDependencies: true,
  devServer: {
    port: 6003,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      libraryTarget: "umd",
      library: "vue3-app",
    },
  },
});
