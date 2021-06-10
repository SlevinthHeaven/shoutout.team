
module.exports = {
  outputDir: `dist/${process.env.VUE_APP_BUILD_FILE_ENV}`,
  devServer: {
    port: 8080,
    https: false
  }
}
