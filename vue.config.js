const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

module.exports = {
  // 打包路径设置相对路径
  publicPath: './',
  // 前端代理
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://1.123.44.43:8003/precision-medicine-knowledge-base',
  //       changeOrigin: true
  //     },
  //     '/login': {
  //       target: 'http://1.123.66.43:8003/precision-medicine-knowledge-base',
  //       changeOrigin: true
  //     }
  //   }
  // },
  configureWebpack: () => ({
    // 禁止生成 .map文件
    devtool: false
  }),
  chainWebpack: config => {
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(path.resolve('src/assets/icons'))

    if (process.env.NODE_ENV === 'production') {
      // #region 图片压缩
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('img-loader')
        .loader('img-loader').options({
          plugins: [
            require('imagemin-jpegtran')(),
            require('imagemin-pngquant')({
              quality: [0.75, 0.85]
            })
          ]
        })

      // #region 启用GZip压缩 需要后端支持
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(args => { })

      // #region 忽略生成环境打包的文件 使用CDN引入依赖，减少打包体积
      // 注意后面的名称对应的是npm包名称

      var externals = {
        vue: 'Vue',
        // axios: 'axios',
        'vuetify': 'Vuetify',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        nprogress: 'NProgress'
      }
      config.externals(externals)
      const cdn = {
        css: [
          // vuetify css
          'https://cdn.bootcss.com/vuetify/2.0.11/vuetify.min.css',
          'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
        ],
        js: [
          // vue
          'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
          // vue-router
          'https://cdn.bootcss.com/vue-router/3.0.6/vue-router.min.js',
          // vuex
          'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
          // axios
          // 'https://cdn.bootcss.com/axios/0.18.1/axios.min.js',
          // vuetify js
          'https://cdn.bootcss.com/vuetify/2.0.11/vuetify.min.js',
          // nprogress
          'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js'
        ]
      }
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })

      // #region 分析打包体积

      // if (process.env.IS_ANALYZE) {
      //   config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
      //     {
      //       analyzerMode: 'static'
      //     }
      //   ])
      // }
    }
  }
}
