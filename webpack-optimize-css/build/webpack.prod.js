const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base')
const Webpack = require('webpack')

//webpack的配置文件遵循着CommonJS规范
module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        /**
         * 借助内置插件DefinePlugin来定义环境变量
         */
        new Webpack.DefinePlugin({
            IS_DEV: 'false'
        })
    ]
})