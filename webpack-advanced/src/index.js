console.log('我是Index.js');

import $ from 'jquery'    // node_modules/jquery/package.json > main

$('body').css('backgroundColor', 'green')

console.log($);
console.log(window.$);      //模块化的引用，是在模块的闭包空间中加载jquery，并不会在全局作用域上

import {getUserInfo, getMoney} from "./api/http";

getUserInfo().then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
})

getMoney().then(((res) => {
    console.log(res);
}), (err) => {
    console.log(err);
})

import str from './hot_module'

console.log(str);

if(module.hot) {
    /**
     * module是模块作用域的一个对象
     * accept加入之后hot_module被修改了网页也不会整体刷新了
     */
    module.hot.accept('./hot_module', function () {
        //当hot_module模块内容更新时触发
        console.log('hot_module被更新了！')

        //import/export 语法必须在顶级作用域中使用，无法在子级作用域中使用
        // import str from './hot_module'

        var hot_module = require('./hot_module')
        console.log(hot_module);
    })
}