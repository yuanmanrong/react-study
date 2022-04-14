let h = null;
let f = [1, false]
let e = {type: "socus"}
let k:void = undefined
let l: unknown = 4
if(typeof l === "number") {
    let m = l * 2
}

/* 
* 重载练习  
*/
type Reservation = {
    ways: number
    bestChoice: string
}
// 重载函数练习 签名函数,重载的签名最好具体一些，最好不要使用any
type Reserve = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation
}
let reserve: Reserve = (from, to, destination?: string) => {
    if (to instanceof Date && destination !== undefined) {
        console.log(from, to, destination, "这是往返的路程")
    } else{ 
        console.log(from, to, destination, "这是一个单程")
    }
    return {
        ways: 3,
        bestChoice: "从这里出发"
    }
}
let res = reserve(new Date(), new Date(), "beijing")

// 使用重载调用签名实现createElement
type CreateElement = {
    // (tag: "a"): HTMLAnchorElement
    // (tag: "canvas"): HTMLCanvasElement
    // (tag: "table"): HTMLTableElement
    (tag: string): HTMLElement // 兜底
 }
// ????????为啥校验不通过呢？？？？？？
 let createMyElement: CreateElement = (tag: string) => {
     console.log("createelemt")
     return document.body.appendChild(document.createElement(tag));
 }

let tag = createMyElement("a")


/* 
* 泛型练习  
*/
// filter使用一个泛型参数，ts自己去推导
type Item = {
    name: string
}
type Filter = {
    <T>(array: T[], f: (item: Item) => boolean): T[]
}
let filter: Filter = (arr, fn) => {
   fn({name: "ymr"})
   return arr
}
filter([1,'2',3],(item) => {
    console.log(item)
    return true
})

//模拟数组map方法泛型
type MapArr = {
    <T, U>(arr: T[],fn:(item: T, index: number) => U): U[]
}
let map: MapArr = (arr, fn) => {
    let res: any[] = []
    arr.forEach((item,index) => {
        let resTemp =  fn(item,index)
        res.push(resTemp)
     })
     return res
}
let resArr = map(["1","2","3"],(item, index) => {
    return Number(item)
})
console.log(resArr,"resArr------")


/* 
* 乱七八糟练习  
*/
/* function add(a: number, b: number): number {
   return a + b
}

let res = add(2, 3);
console.log(res,"2131111111");

// 这是一个removecomments的测试
let a :unknown = 30
let b = 20 === a

const people = {
    name: "ymr",
    age: 33
}

people.age = 26

console.log(people);


if(typeof a === "number") {
    let c = a + 2
}else if(typeof a === "string") {
    let d = a + 2
} 
let testAny =  {};
// 不知道this是谁，需要手动指定
function hhh (this: Window) {
    alert(this)
} */