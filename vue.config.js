// 引入等比适配插件
const px2rem = require('postcss-px2rem')
// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16

})
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    outputDir: 'tbu',
    // 使用等比适配插件
    lintOnSave: true,
    css: {
        loaderOptions: {
        postcss: {
            plugins: [
                postcss
            ]
        }
        }
    },
    devServer: {
        proxy: {
            '/':{
                target:`http://localhost:76`,
                changeOrigin:true,
                pathRewrite:{
                    '/':''
                }
            }
        }
    }
}