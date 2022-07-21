//https://juejin.cn/post/6844904198958497806
// 它是一个原始类型，不是对象， 不能new一个唯一的记号，不会被覆盖，即时两个声明是一样的也不相等
// 需要通过Object.getOwnPropertySymbols()方法获取symbol类型的属性名
// 可以转换成布尔值和字符串 不能运算 不可枚举可以作为私有属性
// symbol.for()先查询没有在注册  symbol.key()返回一个已登记的 Symbol 类型值的key。未登记的 Symbol 值，返回undefined。
// Symbol类型在实际开发中的应用、可手动实现一个简单的Symbol
//https://blog.csdn.net/qq_34629352/article/details/106222027?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-1-106222027-null-null.pc_agg_new_rank&utm_term=%E6%89%8B%E5%86%99%E4%B8%80%E4%B8%AASymbol&spm=1000.2123.3001.4430


// 深拷贝
const deepClone = (obj) => {
     if(obj === null || typeof obj !== "object")return obj
     if(obj instanceof Date) return new Date(obj)

     let objKeys = Object.keys(obj)
     let symbols = Object.getOwnPropertySymbols(obj) // 处理Symbol类型
     let res = new obj.constructor();
     [...symbols,...objKeys].forEach(item => {
         res[item] = deepClone(obj[item])
     });
     return res
}

let obj = {
    a: 1,
    [Symbol("1")]: 1,
    b : {name: "ymr",test: {a1: 1,b1:"2"}},
    c: [1,2,3,5]
}

let res1 = deepClone(obj)
// console.log(res1, res1 === obj)


// 观察者模式 一个一对多的关系 目标对象有获取数据的方法 和观察者收集目标对象并且通知
class Subject {
    constructor(name){
       this.name = name
    }
    update(data){
       console.log(data, `通知${this.name}数据更新`)
    }
}

class Watcher {
    constructor(){
        this.list = []
    }
    
    subjectList(person){
        this.list.push(person)
    }
    notify(data){
        this.list.forEach((item) => {
            item.update(data)
        })
    }
}

let p1 = new Subject("小明")
let p2 = new Subject("小红")

let watcher = new Watcher()
watcher.subjectList(p1)
watcher.subjectList(p2)

watcher.notify("这是最新数据哈")

// 事件的发布订阅模式 通过一个中间的代理
class PubSub{
    constructor(){
        this.events = {}
    }
    subscribe(type, cb){
        if(!this.events[type]){
            this.events[type] = []
        }
        this.events[type].push(cb)
    }
    publish(type, data){
        if(this.events[type]){
            this.events[type].forEach(item => {
                item(data)
            })
        }
    }
    unSubscribe(type,cb){
        console.log(this.events[type].indexOf(cb))
        if(this.events[type].indexOf(cb) > -1){
            this.events[type].splice(this.events[type].indexOf(cb),1) 
        }
    }
}

let pubSub = new PubSub()
function fn1(data){
    console.log("我是用户1，我拿到直播的数据了",data)
}
function fn2(data){
    console.log("我是用户1，我拿到直播的数据了",data)
}

pubSub.subscribe("live", fn1)
pubSub.subscribe("live", fn2)
pubSub.unSubscribe("live", fn2)

pubSub.subscribe("news",(data) => {
    console.log("今天的新闻是：---",data)
})

pubSub.publish("news","今日海淀区无新增")
pubSub.publish("live","欢迎来到直播间啊~~~~")

