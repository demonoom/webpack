const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base')
const Webpack = require('webpack')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

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
    ],
    optimization: {
        minimizer: [
            /**
             * 使用css-minimizer-webpack-plugin插件来完成css压缩
             */
            new CssMinimizerPlugin(),
            /**
             * 由于配置css压缩时会覆盖掉webpack默认的优化配置，导致JS代码无法压缩，所以还需要手动把JS代码压缩插件导入进来
             */
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })]
    }
})