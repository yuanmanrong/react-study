// string和arr都有的方法：concat includes indexOf lastIndexOf slice
// String对象的方法

// charAt()返回字符串中的指定字符   charCodeAt()返回Unicode值
// startWith endsWith()方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。

// match() 方法检索返回一个字符串匹配正则表达式的结果。 如果参数不传正则则返回[""] 如果正则没g则返回第一个匹配到的
// search() 接受正则表达 有则返回索引，没有则返回-1
// matchAll() 俩方法的使用场景是？？？包含所有匹配正则表达式的结果及分组捕获组的迭代器

// padEnd(字符串长度，填充内容) 从末尾填充字符串  padStart()从头开始填充
// repeat() 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。
// trim() trimEnd trimStart

// substring(idxstart,idxend) 负数和NAN都会变成0
// slice(idxstart,idxend)  支持负数 从末尾开始

//-----------------分割线----------------*******************************************-----------------------

// Function对象的方法 call apply bind  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/name
// 都是改变this指向的，一般就是谁调用就指向谁  然后现在this指向第一个传进来的参数  apply的参数是接受数组的

function A(name) {
    this.name = name
    this.hobby = function() {
        return "my name is " + this.name
    }
}

const p1 = new A("ymr")
console.log(p1.hobby.call({name: "osh"}))

Function.prototype.myCall = function (obj,...args) {
    obj = obj || window
    console.log(this,"this---")
    let _this = this // 此时的this是hobby函数，也就是.call之前的东西
    obj.fn = _this // 给传进来的ob也加上这个函数
    let res = obj.fn(...args)  // 执行这个函数
    delete obj.fn // 执行完删掉新加的属性
    return res
}

Function.prototype.myApply = function (obj = window, args = []) {
    let _this = this // 此时的this是hobby函数，也就是.call之前的东西
    obj.fn = _this // 给传进来的ob也加上这个函数
    let res = obj.fn(...args)  // 执行这个函数
    delete obj.fn // 执行完删掉新加的属性
    return res
}

// 前面的处理是一样的 区别就是返回一个函数
Function.prototype.myBind = function (obj = window, ...args) {
    obj.fn = this
    return function (...inner) {
        let res = obj.fn(...args,...inner)
        delete obj.fn
        return res
    }
}

// console.log(p1.hobby.myApply({name: "osh"}))
console.log(p1.hobby.myBind({name: "osh"})(),"mybind")


/* js继承：1.原型链继承 2.构造函数继承 3.组合继承 4.寄生组合继承*/

// 父函数
function Parent(){
    test = "1"
    this.name = "ymr"
    this.hobby = function(){
        return this.hobby
    }
} 
Parent.prototype.run = function(){
    return this.name + this.hobby
}

function Son() {

}
// 原型链继承，如果是引用类型 实例都会变化
Son.prototype = new Parent()
let son = new Son() // 相当于获得父元素上的原型属性和方法
console.log(son)

// 构造函数继承 只能继承私有属性和方法 不继承原型链的
// function C(...args){
//     Parent.call(this,...args)
// }

// 组合继承  缺点：相当于new了两次
function C(...args){
    Parent.call(this,...args)
}
//C.prototype = new Parent()
console.log(new C())
// 寄生组合继承
C.prototype = Object.create(Parent.prototype) // 拷贝了一份

// class继承原理
function Fu(name){
    this.name = name
    this.arr = [1,2,3]
}
Fu.prototype.getName = function(){
   return this.name
}

function Stu(name, age){
    Fu.call(this,name)
    this.age = age
}
Stu.prototype = Object.create(Fu.prototype)

let stu1 = new Stu("ymr",12)
let stu2 = new Stu("ymr1",13)
stu1.arr.pop()
console.log("stu----",stu1, stu2)


// 防抖： n秒内重复点击会重新计时
function decounce(fn, delay){
    let timer = null 
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this,...args)
        }, delay);
    }
  
}


// 节流： n秒内只会执行一次
function throttle(fn, delay){
    let flag = true
    return function(){
        const _this = this; // 获取匿名函数的this，谁调用的就是谁
        if(!flag)return
        setTimeout(function(){
            fn.apply(_this) // 将谁调用的绑定给谁
            // fn()
            flag = false
        },delay)
    }

}
function test(){
    console.log(11111,this)
}
let b={} 
// 一般的话直接调用的话匿名函数里的this指向的是window，然后现在如果是赋值给对象那就this就是对象了，所以要修改一下
b.throttleFuncB = throttle(test,1000)
console.log(b.throttleFuncB(),"11");


