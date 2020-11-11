//CommonJS规范 在浏览器中不支持
// var a = require('./a')

//ES6的导入导出语法规范
import a from './a'

//引入css
import './css/index.css'
import './css/b.css'

//引入less
import './less/index.less'

//引入scss
import './scss/index.scss'

//引入bootstrap的css文件
import 'bootstrap/dist/css/bootstrap.css'

console.log(a);
console.log('AirPods Pro');
console.log('------------召回AirPods Pro');
console.log('AirPods Pro 换新');
console.log('还送了一套耳塞!');

setTimeout(function () {
    //如果是function 内部this直接指向window
    console.log('没用箭头函数，一秒后我执行了');
}, 1000)

setTimeout(() => {
    //箭头函数不会改变this指向 还是指向setTimeout所处上下文
    console.log('我是用了箭头函数的setTimeout');
}, 1000)

//ES6提供了class关键字 是原型的语法糖
class Person {
    constructor(name) {
        this.name = name
    }
}

let p = new Person('小黑')

console.log(p);

class Dog {
    //创建Dog对象时默认的name为大黄
    name = '大黄'
    static color = 'yellow'    //添加静态属性   Dog.color = 'yellow'
}

let d = new Dog()

console.dir(d)
console.dir(Dog)

/**
 * 如果需要使用 generator，无法直接使用babel进行转换，因为会将 generator 转换为一个 regeneratorRuntime，
 * 然后使用mark和wrap来实现 generator
 * 但由于babel没有内置 regeneratorRuntime，所以无法直接使用
 * 需要安装插件 npm install --save-dev @babel/plugin-transform-runtime
 * 同时还需要安装运行依赖 npm install --save @babel/runtime
 * @returns {IterableIterator<number>}
 */
function* fn() {
    yield 1
    yield 2
    return 3
}

let newFn = fn()
console.log(newFn.next());   //1
console.log(newFn.next());   //2
console.log(newFn.next());   //3
console.log(newFn.next());   //undefined

// import '@babel/polyfill'

let str = '123'
//js是一门动态语言，在代码执行时可以随时为对象添加属性或方法
//babel在看到对象调用方法时默认不会进行转换
//includes这样的新方法，默认不会转换
console.log(str.includes('2'));
