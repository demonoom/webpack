//这个webpack的配置文件就是用来打包vue全家桶的

const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: "production",
    entry: {
        vue: [
            'vue/dist/vue.js',      //  如果不写全 默认采用的vue.esm.js
            'vue-router'
        ]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name]_dll.js',
        library: '[name]_dll'       //最终会在全局暴露出一个vue_dll的对象
    },
    plugins: [
        /**
         * webpack内置插件，在打包好的动态链接库中生成一个清单文件manifest，告诉项目动态链接库中包含哪些东西
         */
        new webpack.DllPlugin({
            name: '[name]_dll',
            //指定manifest.json的路径
            path: path.join(__dirname, '../dist/manifest.json')
        })
    ]
}