const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

//webpack的配置文件遵循着CommonJS规范
module.exports = {
    entry: './src/main.js',
    /*entry: {
        main: './src/main.js',
        other: './src/other.js'
    },*/
    output: {
        //path.resolve():解析当前相对路径的绝对路径
        // path: path.resolve('./dist'),
        // path: path.resolve('__dirname,./dist'),
        //path.join():路径拼接
        path: path.join(__dirname, '..', './dist'),
        // filename: "bundle.js"
        //##2.多入口无法对应一个固定的出口，所以修改filename为[name]变量
        filename: "[name].[hash:6].bundle.js"   //placehold修改生成的文件名，合理利用浏览器缓存更新修改过的代码npm
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
        // new CleanWebpackPlugin(),
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
        }),
        /**
         * 使用IgnorePlugin插件来忽略掉moment模块的locale目录
         * 参数1：表示要忽略的资源路径
         * 参数2：要忽略的资源上下文（所在哪个目录）
         * 两个参数都是正则对象
         */
        new Webpack.IgnorePlugin(/\.\/locale$/, /moment$/),
        /**
         * 让项目手动引入动态链接库(Dll)
         */
        new Webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dist/manifest.json')
        }),
        /**
         * 配置插件自动添加script标签到HTML中
         */
        new AddAssetHtmlWebpackPlugin({
            filepath:path.resolve(__dirname,'../dist/vue_dll.js')   //
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
                exclude: /node_modules/,
                include: path.join(__dirname, '../src')
            },
            //html-withimg-loader和file-loader(url-loader)产生了冲突，同时使用两种loader，需要在file-loader(url-loader)的options中添加一条配置项esModule: false。参考链接https://www.cnblogs.com/webSong/p/12118595.html
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'          //使html中的图片参与到webpack打包中，使用时，只需要在html中正常引用图片即可，webpack会找到对应的资源进行打包，并修改html中的引用路径
            },
        ],
        noParse: /jquery|bootstrap/    //阻止webpack浪费精力去解析这些明知道没有依赖的库
    },
    optimization: {
        /**
         * Webpack v4以上使用内置插件SplitChunksPlugin抽取公共代码
         */
        splitChunks: {
            chunks: 'initial',  //默认值为 async 表示只会对异步加载的模块进行代码分割 ,可选值 还有 all 和 initial ,(发现如果有es6动态导入的代码[import()]，并且配置了filename的话设置为all就会打包报错，需要设置为initial)
            minSize: 30000,     //模块最少大于30kb才拆分
            maxSize: 0,     //如果超出了maxSize，会进一步进行拆分
            minChunks: 1,       //模块最少引用一次才会被拆分
            maxAsyncRequests: 5,        //异步加载时同时发送的请求数量最大不能超过5，超过5的部分不拆分
            maxInitialRequests: 3,      //页面初始化时同时发送的请求数量最大不能超过3，超过3的部分不拆分
            automaticNameDelimiter: '~',        //默认的连接符
            name: true,         //拆分的chunk名,设为true表示根据模块名和CacheGroups的key来自动生成，使用上面连接符连接
            cacheGroups: { // 缓存组配置,上面配置读取完成后进行拆分,如果需要把多个模块拆分到一个文件,就需要缓存,所以命名为缓存组
                vendors: { // 自定义缓存组名------为了打包第三方模块
                    test: /[\\/]node_modules[\\/]/, // 检查node_modules目录,只要模块在该目录下就使用上面配置拆分到这个组
                    priority: -10, // 权重-10,决定了哪个组优先匹配,例如node_modules下有个模块要拆分,同时满足vendors和default组,此时就会分到vendors组,因为-10 > -20
                    filename: 'vendors.js'  //配置了就不会按照 automaticNameDelimiter 的规则命名
                },
                default: { // 默认缓存组名----一般用于自己写的模块
                    minChunks: 2, // 最少引用两次才会被拆分
                    priority: -20, // 权重-20
                    reuseExistingChunk: true, // 如果主入口中引入了两个模块,其中一个正好也引用了后一个,就会直接复用,无需引用两次
                    filename: 'noom.js'  //配置了就不会按照 automaticNameDelimiter 的规则命名
                }
            }
        }
    }
}