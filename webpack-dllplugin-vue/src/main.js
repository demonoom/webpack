//静态导入
// import $ from 'jquery'

// import 'bootstrap'

//需求：当用户点击按钮时，添加一个div
/*$(function () {
    $('#btn').click(function () {
        $('<div></div>').html('我是main').appendTo('body')
    })
})*/

/*window.onload = function () {
    document.getElementById('btn').onclick = function () {
        //当用户点击按钮时才会执行
        $('<div></div>').html('我是main').appendTo('body')
    }
}*/

//import和export必须写在顶级作用域中，否则会报错，因为是静态导入
// let a = 1
// if(a==1) {
//     import $ from 'jquery'
// }

//import()    import的动态导入    import('jquery')  其实返回的就是一个promise对象
// function getComponent() {
//     return import('jquery').then(({default: $}) => {
//         //执行resolve时就表示jQuery导入完成了
//         return $('<div></div>').html('main')
//     })
// }
//
// getComponent().then(item => {
//     item.appendTo('body')
// })


/*window.onload = function () {
    document.getElementById('btn').onclick = function () {
        //当用户点击按钮时才会执行
        // $('<div></div>').html('我是main').appendTo('body')
        getComponent().then(item => {
            item.appendTo('body')
        })
    }
}

//动态导入
function getComponent() {
    return import('jquery').then(({default: $}) => $('<div></div>').html('main'))
}*/

/*import a from './a'

console.log(a);

import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-CN')
console.log(moment().subtract(6, 'days').calendar());*/

//import vue from 'vue'  //runtime-only 的 vue 包  需要用render函数结合vue文件进行渲染
import Vue from 'vue/dist/vue'  //完整版的vuejs
import VueRouter from "vue-router";

Vue.use(VueRouter)

const homeComponent = {
    template: '<h2>我是home</h2>>'
}

const newsComponent = {
    template: '<h2>我是news</h2>>'
}

const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: homeComponent
        },
        {
            path: '/news',
            component: newsComponent
        },
    ]
})

new Vue({
    el: '#app',
    data: {
        msg: 'helloworld'
    },
    router
})


