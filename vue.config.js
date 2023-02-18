const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.104.61.32:4000/adminapi'
      }
    }
  },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // 创建一个新的规则，用于处理 element-plus 2 的错误
    config.module
      .rule('element-plus-2')
      .test(/\.mjs$/)
      // https://webpack.docschina.org/configuration/module/#ruletype
      .type('javascript/auto')
      .include.add(/node_modules/)
      .end()
  }
}