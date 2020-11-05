const path = require('path')

//webpack的配置文件遵循着CommonJS规范
module.exports = {
    entry: './src/main.js',
    output: {
        //path.resolve():解析当前相对路径的绝对路径
        // path: path.resolve('./dist'),
        // path: path.resolve('__dirname,./dist'),
        //path.join():路径拼接
        path: path.join(__dirname,'./dist'),
        filename: "bundle.js"
    },
    mode:'development'
}