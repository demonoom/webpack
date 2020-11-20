/*import $ from 'jquery'

$(function () {
    $('<div></div>').html('我是main').appendTo('body')
})*/

//import和export必须写在顶级作用域中，否则会报错，因为是静态导入
// let a = 1
// if(a==1) {
//     import $ from 'jquery'
// }

//import()    import的动态导入    import('jquery')  其实返回的就是一个promise对象
function getComponent() {
    return import('jquery').then(({default: $}) => {
        //执行resolve时就表示jQuery导入完成了
        return $('<div></div>').html('main')
    })
}

getComponent().then(item => {
    item.appendTo('body')
})
