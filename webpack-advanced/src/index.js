console.log('我是Index.js');

import $ from 'jquery'    // node_modules/jquery/package.json > main

$('body').css('backgroundColor', 'green')

console.log($);
console.log(window.$);      //模块化的引用，是在模块的闭包空间中加载jquery，并不会在全局作用域上

import {getUserInfo} from "./api/http";

getUserInfo().then(() => {
}, (err) => {
    console.log(err);
})