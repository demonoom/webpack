console.log('我是Index.js');

import $ from 'jquery'    // node_modules/jquery/package.json > main   （导入到当前模块的作用域中）

$('body').css('backgroundColor', 'green')

console.log($);
console.log(window.$);      //模块化的引用，是在模块的闭包空间中加载jquery，并不会在全局作用域上

import {getUserInfo, getMoney} from "./api/http";

getUserInfo().then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
})

console.log(IS_DEV, test, test2)

getMoney().then(((res) => {
    console.log(res);
}), (err) => {
    console.log(err);
})

import str from './hot_module'

console.log(str);

if (module.hot) {
    /**
     * module是模块作用域的一个对象
     * accept加入之后hot_module被修改了网页也不会整体刷新了
     */
    module.hot.accept('./hot_module', function () {
        //当hot_module模块内容更新时触发
        console.log('hot_module被更新了！')

        //import / export 语法必须在顶级作用域中使用，无法在子级作用域中使用
        // import str from './hot_module'

        var hot_module = require('./hot_module')
        console.log(hot_module);
    })
}


/*
production模式打包自带优化
    tree shaking：用于打包时移除JavaScript中的未引用的代码，它依赖于ES6模块中的import和export的静态结构特性
                  开发时引入一个模块后，如果只使用其中一个功能，上线打包时只会把用到的功能打包进bundle，其他没用到的功能都不会打包进来，可以实现最基础的优化

    scope hoisting：作用是将模块之间的关系进行结果推测，可以让webpack打包出来的代码文件更小、运行的更快
                    实现原理：分析出模块之间的依赖关系。尽可能的把打散的模块合并到一个函数中去，源码必须采用ES6模块化语句
                    其实是使用了webpack自带插件 new webpack.optimize.ModuleConcatenationPlugin()

    代码压缩：所有代码使用UglifyJsPlugin插件进行压缩、混淆
 */
// let math = require('./math')
// console.log(math);
// console.log(math.add(1, 2));

import {add} from './math'

let a = 1 + 1 + 1 - 2
let b = 2 + 0
console.log(add(a, b));

/*
import 一定要在顶级作用域
if(xxx ===yyy) {
    import {add} from './math'
} else {
    import {minus} from './math'
}
*/

/*
动态导入   可以在if判断时进行导入
require()
*/

import {constant_a, constant_b, constant_c} from './constant'

console.log(constant_a + constant_b + constant_c);
