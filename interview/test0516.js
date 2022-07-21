/* 
* 手写assign  特点： https://blog.csdn.net/qq_51315315/article/details/121334161
* 浅拷贝 只会拷贝源对象自身的且可枚举的属性（包括以 Symbol 为 key 的属性）到目标对象， 后覆盖前 不是对象会内部转化为对象
* enumerable 默认为不可枚举，直接赋值为可枚举
* Symbol
*/

//  https://zhuanlan.zhihu.com/p/369090305
function assign(target, ...args) {
    if(target == null){
        throw new TypeError('Cannot convert undefined or null to object');
    }
    const targetRes = Object(target); // 是引用对象会返回相同的引用地址
    for(let i = 0; i < args.length; i++){
        let sourceItem = args[i];
        // getOwnPropertySymbols返回key值为symbol属性的数组
        const resourceKeys = [...Object.keys(sourceItem), ...Object.getOwnPropertySymbols(sourceItem)] 
        for(const k of resourceKeys){
           if(sourceItem.propertyIsEnumerable(k)){ // 是否可枚举
            targetRes[k] = sourceItem[k];
           }
        }
    }
   
    return targetRes;
}

// arguments类数组转换成对象
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// ES2015
const args = Array.from(arguments);
const args = [...arguments];

// arguments: 传递给函数的参数的类数组对象 官网上的
function assign2(target, args) {
   if (target === null || taget === undefined) {
      throw new TypeError("Cannot convert undefined or null to object")
   }
   const tagetRes = Object(target);
   // 遍历参数
   for(let i = 1; i < arguments.length; i ++ ) {
       let curResource = arguments[i];
       if(curResource !== null || curResource !== undefined){
           // 取出参数对象是否是自身的属性
           for(let k of curResource) {
               if(Object.prototype.hasOwnProperty.call(curResource, k)){
                tagetRes[k] = curResource[k]
               }
           }
       }
       return tagetRes
   }
}

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
Object.defineProperty(Object, "assign",{
    value: assign,
    configurable: true,
    writable:true
})