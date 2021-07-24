const path = require('path')

module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      stylus: {
        import: [
          path.resolve(__dirname, './src/styles/variables.styl'),
          path.resolve(__dirname, './src/styles/mixins.styl'),
        ],
      },
    },
  },

  publicPath: process.env.NODE_ENV === 'production'
  ? '/PomodoroVUEJS/' // Thay tên repository của các bạn vào đây nhé
  : '/'
}