const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//webpack的配置文件遵循着CommonJS规范
module.exports = {
    entry: './src/main.js',
    output: {
        //path.resolve():解析当前相对路径的绝对路径
        // path: path.resolve('./dist'),
        // path: path.resolve('__dirname,./dist'),
        //path.join():路径拼接
        path: path.join(__dirname, './dist'),
        filename: "bundle.js"
    },
    mode: 'development',
    //开启监视模式，此时执行webpack指令进行打包会监视文件变化自动打包
    //watch: true
    devServer: {
        open: true,               //编译结束打开浏览器
        port: 3000,               //express服务端口号
        compress: true,           //express服务器gzip压缩
        hot: true,                 //热模块更替（HMR），老版本还需要装插件，新版不需要
        // contentBase: './src'     //服务器根目录
    },
    plugins: [
        /**
         * 1.devServer时根据模板在express项目根目录下生成html文件（类似于devServer生成内存中的bundle.js）
         * 2.devServer时自动引入bundle.js
         * 3.打包时自动生成index.html
         */
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                //webpack读取loader时 是从右到左的读取， 会将css文件先交给最右侧的loader来处理
                //loader的执行顺序是从右到左以管道的方式链式调用
                //css-loader：解析css文件
                //style-loader：将解析出来的结果 放到html中，使其生效
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.s(a|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: "url-loader",      //url-loader封装了file-loader，所以使用url-loader时需要安装file-loader
                    options: {
                        limit: 5 * 1024,        //limit表示如果图片大于5kb，就以路径形式展示，小于的话就用base64格式展示
                        outputPath: 'images',
                        name: '[name]-[hash:4].[ext]'
                    }
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg)$/,
                // use: 'file-loader'
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: '字体',
                        name: '[hash:4].[ext]'
                    }
                }
            }
        ]
    }
}