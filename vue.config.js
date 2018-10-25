// vue.config.js
/**
 * 如何配置webpack： https://cli.vuejs.org/guide/webpack.html
 * webpack Config: https://cli.vuejs.org/config/#vue-config-js
 * chainWebpack语法：https://github.com/mozilla-neutrino/webpack-chain
 *
 */
module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://t.yunjiglobal.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
