const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//webpack的配置文件遵循着CommonJS规范
module.exports = {
    entry: './src/main.js',
    output: {
        //path.resolve():解析当前相对路径的绝对路径
        // path: path.resolve('./dist'),
        // path: path.resolve('__dirname,./dist'),
        //path.join():路径拼接
        path: path.join(__dirname, '..', './dist'),
        // filename: "bundle.js"
        //##2.多入口无法对应一个固定的出口，所以修改filename为[name]变量
        filename: "[name].js"
    },
    //开启监视模式，此时执行webpack指令进行打包会监视文件变化自动打包
    //watch: true
    plugins: [
        /**
         * 1.devServer时根据模板在express项目根目录下生成html文件（类似于devServer生成内存中的bundle.js）
         * 2.devServer时自动引入bundle.js
         * 3.打包时自动生成index.html
         */
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
        }),
        /**
         * 该插件在npm run build时自动清除dist目录后重新生成，非常方便
         */
        new CleanWebpackPlugin(),
        /**
         * 该插件将不需要webpack打包的静态资源复制到打包后的文件夹下
         */
        new CopyWebpackPlugin([{
            from: path.join(__dirname, '..', 'assets'),
            to: 'assets'
        }]),
        /**
         * 这是一个webpack的内置插件，用于给打包的JS文件加上版权注释信息
         */
        new Webpack.BannerPlugin('乏滴狠'),
        /**
         * 将库自动加载到每个模块
         * 自动加载 jquery，我们可以将两个变量都指向对应的 node 模块
         */
        new Webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery'
        }),
        /**
         * 用于将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个css文件，支持按需加载css和sourceMap
         * 该插件只能在webpack4中使用
         */
        new MiniCssExtractPlugin({
            filename: '[name].css'
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
                // use: ['style-loader', 'css-loader']
                //postcss-loader：自动添加css前缀
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                // use: ['style-loader', 'css-loader', 'less-loader']
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.s(a|c)ss$/,
                // use: ['style-loader', 'css-loader', 'sass-loader']
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: "url-loader",      //url-loader封装了file-loader，所以使用url-loader时需要安装file-loader
                    options: {
                        limit: 5 * 1024,        //limit表示如果图片大于5kb，就以路径形式展示，小于的话就用base64格式展示
                        outputPath: 'images',
                        name: '[name]-[hash:4].[ext]',
                        esModule: false
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
                        name: '[hash:4].[ext]',
                        esModule: false
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
            },
            //html-withimg-loader和file-loader(url-loader)产生了冲突，同时使用两种loader，需要在file-loader(url-loader)的options中添加一条配置项esModule: false。参考链接https://www.cnblogs.com/webSong/p/12118595.html
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'          //使html中的图片参与到webpack打包中，使用时，只需要在html中正常引用图片即可，webpack会找到对应的资源进行打包，并修改html中的引用路径
            },
            /**
             * 通过expose-loader进行全局变量的注入
             * 为了解决一些插件不支持commonJs引入的问题（如:bootstrap.js，它只允许jQuery暴露为全局变量才可用）
             */
            {
                //用于解析jQuery模块的绝对路径
                test: require.resolve('jquery'),
                use: {
                    loader: 'expose-loader',
                    options: {
                        exposes: ['$', 'jQuery']  //将 jQuery 暴露至全局并称为 $或jQuery
                    }
                }
            }
        ]
    },
}