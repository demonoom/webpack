const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Webpack = require('webpack')

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
    mode: 'production',
    //开启监视模式，此时执行webpack指令进行打包会监视文件变化自动打包
    //watch: true
    /**
     * devServer的配置 会在内存中生成一个打包好的bundle.js 专供开发时使用
     */
    devServer: {
        open: true,               //编译结束打开浏览器
        port: 3000,               //express服务端口号
        compress: true,           //express服务器gzip压缩
        hot: true,                 //热模块更替（HMR），老版本还需要装插件，新版不需要
        // contentBase: './src'     //服务器根目录  使用HtmlWebpackPlugin不需要此配置
    },
    plugins: [
        /**
         * 1.devServer时根据模板在express项目根目录下生成html文件（类似于devServer生成内存中的bundle.js）
         * 2.devServer时在内存中生成的html也会自动引入内存中的bundle.js
         * 3.打包时自动生成index.html
         */
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        /**
         * 该插件在npm run build时自动清除dist目录后重新生成，非常方便
         */
        new CleanWebpackPlugin(),
        /**
         * 该插件将不需要webpack打包的 静态资源 复制到打包后的文件夹下
         */
        new CopyWebpackPlugin([{
            from: path.resolve('assets'),
            to: 'assets'
        }]),
        /**
         * 这是一个webpack的内置插件，用于给打包的JS文件加上版权注释信息
         */
        new Webpack.BannerPlugin('乏滴狠')
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
                        outputPath: 'images',       //打包输出目录
                        name: '[name]-[hash:4].[ext]'    //打包输出文件名称
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
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",     //webpack需要用到babel-loader将Js代码转换，如何转换需要用到babel核心功能（@babel/core），还需要预设（@babel/preset）,env预设支持大部分语法
                    /*options: {
                        presets: ['@babel/env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime'
                        ]
                    }*/
                },
                exclude: /node_modules/
            }
        ]
    },
    /**
     * source map  源码映射工具  否则可能打开的是babel转化后的代码，行数无法与源码进行对应
     * 开发环境：cheap-module-eval-source-map
     * 生产环境：none (不使用source map)
     * 使用cheap模式可以大幅提高source map生成的效率
     * 使用module可支持babel这种预编译工具，映射转换前的代码
     * 使用eval方式可大幅提高持续构建效率
     * 使用eval-source-map模式可以减少网络请求
     */
    devtool: 'cheap-module-eval-source-map'
}