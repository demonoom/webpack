const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base')
const Webpack = require('webpack')

//webpack的配置文件遵循着CommonJS规范
module.exports = merge(baseConfig, {
    mode: 'development',
    //开启监视模式，此时执行webpack指令进行打包会监视文件变化自动打包
    //watch: true
    devServer: {
        open: true,               //编译结束打开浏览器
        port: 3000,               //express服务端口号
        compress: true,           //express服务器gzip压缩
        hot: true,                //热模块更替（HMR），老版本还需要装插件，新版不需要
        // contentBase: './src'   //服务器根目录
        proxy: {                  //将所有ajax请求发送给devServer服务器，再由devServer服务器做一次转发，发送给数据接口服务器
            // 当前端请求 /api 地址时，会将请求转发到
            // http://localhost:9999/api
            // 举例：客户端现在请求的是 /api/getUserInfo
            // 此时会将请求转发到：http://localhost:9999/api/getUserInfo
            '/api': 'http://localhost:9999',
            '/serve': {   //重写
                target: 'http://localhost:9999',
                //转发请求时不会携带 /serve
                // 举例：客户端现在请求的是 /serve/getMoney
                //此时会将请求转发到：http://localhost:9999/getMoney
                pathRewrite: {
                    '^/serve': ''
                }
            },
        }
        //题外话：node服务器中增加CORS的方法只需要安装cors包，在开启服务器之前app.use(cors())即可
    },
    /**
     * 开发环境：cheap-module-eval-source-map
     * 生产环境：none (不使用source map)
     * 使用cheap模式可以大幅提高source map生成的效率
     * 使用module可支持babel这种预编译工具，映射转换前的代码
     * 使用eval方式可大幅提高持续构建效率
     * 使用eval-source-map模式可以减少网络请求
     */
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        /**
         * 借助内置插件DefinePlugin来定义环境变量
         */
        new Webpack.DefinePlugin({
            IS_DEV: 'true',
            test: '1+1',        //DefinePlugin会解析定义的环境变量表达式，当成js表达式执行  这里会解析为2
            test2: '"noom"'     //DefinePlugin会解析定义的环境变量表达式，当成js表达式执行  这里会解析为字符串
        })
    ]
})