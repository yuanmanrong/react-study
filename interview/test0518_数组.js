// 数组的方法 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
//es6数组新增方法：entries at find(接收回调函数，返回第一个为true的) flat from(类数组转换要有length属性) of(一组数值转换为数组) includes
// foreach() 、map()、filter()、reduce() 、 some()、every()
//已有常用方法：
// concat 合并多个数组返回新数组

// entries 返回迭代对象  for...of迭代器
const arrEntrie = [12,2,3]
//console.log(arrEntrie.entries().next()) // done 和 value(包括索引和值）

// fill() 填充不包括终止索引 改变原数组
// findIndex 返回满足的第一个的索引
// find 返回第一个满足的值
// every 返回布尔值 接收回调 全满足或空数组为true   some跟它相反
// filter() 返回一个【新数组】里面是满足回调函数条件的元素
// 手写实现some
function mySome(arr, cb) {
   if(!Array.isArray(arr))return false;
   for (let i = 0; i < arr.length; i++) {
       if(cb(arr[i], i, arr)){
           return true
       }
   }
   return false
}
const arrSome = [1,2,3,4,5]
const fnSome = (item, index, arr) => {
     return item < 10
}
//console.log(mySome(arrSome, fnSome), "some----")
const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];
function fliterTest(arr, params) {
    return arr.filter((item, index) => {
       return item.toLowerCase().indexOf(params) > -1
    })
}
// console.log(fliterTest(fruits, "ap"), "filter----")




/* 数组扁平化 */
// 递归
// flat() 可以通过以上方法手写 该方法会去掉空项
const arr1 = [1,1, [2, [3, [4, 5]]], 6];// => [1, 2, 3, 4, 5, 6]

//reduce()实现数组扁平化
function flatten(arr, depth) {
   return arr.reduce((pre,cur) => {
     return pre.concat(Array.isArray(cur) && depth !==0 ? flatten(cur, depth - 1) : cur)
   }, [])
}

// flat方法手写实现
function flatten2(arr = [], depth = 1) {
    const res = [];
    (function flat(arr, depth) {
       arr.forEach((item,index) => { // 使用forEach是因为遍历会自动跳过空元素
           if(Array.isArray(item) && (depth > 0 || depth === "infinity")){
               flat(item, depth === "infinity" ? depth : depth - 1)
           }else{
               res.push(item)
           }
       })
    })(arr, depth)
    return res
 }

// 无递归数组扁平化，使用堆栈
// 注意：深度的控制比较低效，因为需要检查每一个值的深度
function flattenStack(arr) {
    const stack = [...arr]
    const res = []
    while(stack.length > 0) {
       const cur = stack.pop()
       if (Array.isArray(cur)) {
         stack.push(...cur) // 关键点
       } else {
           res.push(cur)
       }
    }
    return res.reverse()
}
//console.log(flattenStack(arr1),'22222---')

// flatMap是flat和map两种方法的组合 返回新数组  可用concat和reduce代替但是不建议
let arrMap = ["it's Sunny in", "", "California"];
console.log(arrMap.flatMap((item,index) => {
    return item.split(" ")
}), "flatMap-----")

// forEach() 1.它无法跳出循环只能抛出异常 2.会跳过空元素 3.如果要终止可以先过滤再使用 4.如果元素被删了会跳过 5.回调里不要使用异步
// 使用forEach完成对象复制器 ===》待完成


// form(arr，fn) 返回一个新数组,fn是可在新数组上做一些操作
// 数组去重合并
function combine(...args) {
    const arrRes = [].concat.call([],...args)
    return Array.from(new Set(arrRes))
}
let combineArr = [1,2,3]
let combineArr2 = [6,1,2,3,4]
console.log(combine(combineArr,combineArr2),"combine---")

// includes(param, fromindex) 是通用方法不止数组可以用 返回布尔值 是否包含某元素
// join() 如果一个元素为 undefined 或 null，它会被转换为空字符串
// 会改变数组===》 pop()返回元素， push()返回新长度 shift()返回该元素的值 unshift()返回长度 splice()返回被删除的元素(从哪个位置，删几个，加啥)
// slice() 返回新数组 左闭右开 concat()返回新函数


// ["1", "2", "3"].map(parseInt)问题
// parseInt (0.0000005) === 5 为 true 数字太小的时候会使用科学计数法然后截断
// parseInt(string,radix) 第一个参数会转换成string类型 默认值不是10，要看开头是 0X 或者 0吗
// radix为undefined 0或没指定时要看字符串的开头   radix在2-36之外都返回NAN 或者string参数的第一个非空格值不能正确转换
// parseInt会去掉前后空格，中间的会被当做截断符 转换bigInt会丢失精度，


// reduce实现数组去重、 按顺序执行Promise、 实现管道、 实现map