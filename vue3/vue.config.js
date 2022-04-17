const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 6003,
  },
  configureWebpack: {
    output: {
      libraryTarget: "umd",
      library: "vue3",
    },
  },
});
