//这个webpack的配置文件就是用来打包vue全家桶的

//DllPlugin
const webpack = require('webpack')

const path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        vue: [
            'vue/dist/vue.js',  //如果不写全  默认采用vue.esm.js
            'vue-router'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name]_dll.js",
        library: '[name]_dll'   //最终会在全局暴露出一个vue_dll的对象
    },
    plugins: [
        new webpack.DllPlugin({
            name: "[name]_dll",
            path: path.resolve(__dirname, '../dist/manifest.json')    //指定manifest.json的路径   清单文件，告诉程序该怎么用
        })
    ]
}