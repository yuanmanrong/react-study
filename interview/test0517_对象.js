
/* Object学习 */
// 静态方法
// Object.defineProperty()
// Object.create() 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
// Object.keys() 返回一个包含所有给定对象自身可枚举属性名称的数组。
// Object.getPrototypeOf()返回指定对象的原型对象。
// Object.getOwnPropertySymbols() 返回一个数组，它包含了指定对象自身所有的符号属性。

// 实例方法
// propertyIsEnumerable() 方法返回一个布尔值，表示指定的属性是否可枚举。
// Object.prototype.toString() 方法返回相应的字符串类型   可以检测类型
// Object.prototype.valueOf() 返回指定对象的原始值
// 在有数值运算符时会隐士调用，默认去调用valueOf,如果返回的不是简单类型会调用toString， 如果重写
// 数组和函数自身没有valueOf,会通过原型链去调用
// 对象到字符串 对象到数字的优先调用
let a1 = {}
let b = [1,2,3]
// console.log(a1.toString()); // '[object Object]'
// console.log(b.toString()); // '1,2,3'

// a==1&&a==2&&a==3 为 true
class A {
    constructor(num){
        this.num = num
    }
    // valueOf() {
    //     return this.num ++ 
    // }
    // toString() {
    //     return this.num ++ 
    // }
}
/* let a = new A(1)
if(a == 1 && a == 2){ // 严格比较不行，运算使会隐式调用，所以重写该方法即可
    console.log(11111)
}
let test = {}
let value =1
// 全等(===)：严格等于不会进行隐式转换，这里使用 Object.defineProperty 数据劫持的方法来实现
Object.defineProperty(global, "testa", {
    get() {
        return value++;
    }
})
if(testa === 1 && testa === 2){ 
    console.log(12222)
}
 */
// 用 JS 实现一个无限累加的函数 add 
function  add(a) {
    function sum(b) {
        a = b ? a +b : a
        return sum
    }
    
    sum.toString = function (params) {
        return a
    }

    return sum
}
//console.log("res---",add(1)(2)(3));// 6

// 柯里化实现多参累加 (网上写法是先将传进来的参数进行连接，然后最后在tostring累加)
function  add(...args) {
    console.log(arguments,"arguments1")
    let total = eval(Array.from(arguments).join("+"))
    let temp = null
   function sum(...temp) {
    console.log(arguments,"arguments2")
    temp = eval(Array.from(arguments).join("+"))
     total = total + temp
     return sum  
   }
   sum.toString = function(params) {
       return total
   }
   return sum
}
//console.log("res2----",add(2)(2)(3,5)(1,2,3)); // 18

// 原型和原型链
let arr = [1,2,3]
//console.log(arr.__proto__.push === arr.push); //true
//console.log(arr.__proto__.push === Array.prototype.push); //true

// object.create(newObj) 方法创建一个新对象，使用【现有的对象】来提供新创建的对象的__proto__ 如果参数是个null,那么就是个新对象也不继承任何方法
let Person = {
    name: "ymr",
    sex: "female"
}
let p1 = Object.create(Person) // p1.__proto__ == Person

// new和字面量定义对象 指向内置对象Object.prototype

// new都做了什么， 创建一个空对象并指向类的prototype、去执行一下constructor、判断结果类型并返回
function _mynew(obj, ...args) {
    const newObj = Object.create(obj.prototype)
    const res = obj.call(newObj, args)
    return typeof res === "object" ? res : newObj;
}


// 手写instaceof
const myInstance = (left, right) => {
    if(Object(left) !== left) return false
    if(right.prototype == undefined) return false
    left = left.__proto__
    while( left!== null) {
        if (left === right.prototype) {
            return true
        }
        left = left.__proto__
    }
    return false
}

const myInstanceof = (left, right) => {
    // 基本数据类型都返回false
    if (typeof left !== 'object' || left === null) return false;
    let proto = Object.getPrototypeOf(left);
    while (true) {
      if (proto === null) return false;
      console.log(right.prototype,"proto----")
      if (proto === right.prototype) return true;
      proto = Object.getPrototypeOf(proto);
    }
}
//console.log(myInstance([1],Object))

// 继承 (见0519)
// es6的Class继承原理
