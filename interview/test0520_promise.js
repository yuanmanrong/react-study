// Promise知识
// 1.传递一个执行器，执行器会立即执行
// 2.在resolve和reject更改状态
// 3.三种状态 fulfilled成功 rejected失败 pending等待 从等待变成两种状态



// 4. then方法是支持链式调用的===》添加多个处理函数
const PENDDING = "pending"
const FULFILLED = "fullfilled"
const REJECTED = "rejected"

class MyPromise {
    constructor(executor){
        // 捕获执行器错误
        try {
           executor(this.resolve, this.reject) // 立即执行  
        } catch(e) {
           this.reject(e)
        }
    }
    status = PENDDING // 状态
    value = undefined // 成功之后的值
    reason = undefined // 失败的原因
    successCb = []
    failCb = []

    resolve = (value) => { // 要用箭头函数，不然this会找不到
      if(this.status !== PENDDING)return;
      this.status = FULFILLED
      this.value = value
      this.successCb.forEach(fn => fn(this.value))
    }
    reject = (reason) => {
        if(this.status !== PENDDING)return;
        this.status = REJECTED
        this.reason = reason
        this.failCb.forEach(fn => fn(this.value))
    }
    // 链式调用，返回promise
    then(successCb, failCb){
      let promise1 = new MyPromise((resolve, reject) => {
        if(this.status === FULFILLED) {
            try{
               setTimeout(() => {
                const res = successCb(this.value) // 上一次的执行结果，是下一次的value值
                res instanceof MyPromise ? res.then(resolve, reject)  : resolve(res)
               }
               )
               
            } catch(e) {
            console.log(2,e)
              reject(e)
            }   
          } else if (this.status === REJECTED) {
            const res = failCb(this.value) // 上一次的执行结果，是下一次的value值
            setTimeout(reject(res))
          } else { // 这里是处理异步的情况，这时候状态是fullfilled，两个结果的回调还没有执行，所以then的回调也不会执行，这时候先把回调保存起来

                this.successCb.push(() => {
                    setTimeout(() => {
                        successCb
                    })
                })
                this.failCb.push(() => {
                    setTimeout(() => {
                        failCb
                    })
                })
       
          }
      })   
      return promise1
    }
}

// 等待所有都完成，有失败则失败
Promise.myAll = function(arr){ 
    return new Promise((resolve, reject) => {
        let arrRes = [];
        let index = 0;
        
        for(let i=0; i<arr.length; i++){
           Promise.resolve(arr[i]).then((res) => {
                arrRes[i] = res
                index ++
                if(index === arr.length){
                    resolve(arrRes)
                }
            }).catch((err) => {
                reject(err)
            })
        }
    })
}

// 采用第一个的成功或失败的值
Promise.myRace = function(arr){
    return new Promise((resolve, reject) => {
        for(let i=0; i< arr.length; i++) {
            Promise.resolve(arr[i]).then((value) => {
                 resolve(value)      
            },(reason) => {reject(reason)})
        }
    })
}
let promise1 = new Promise((resolve, reject) => {
    //resolve(1)
    //throw new Error("出错了")
})
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve(2)
  },2000)
})
let promise3= new Promise((resolve, reject) => {
  resolve(3)
})
let promiseArr = [ promise2, promise1,promise3,"4"]
// Promise.myAll(promiseArr).then((res) => {
//   console.log("resarr----", res)
// })

// 有并行限制的promise调度器问题
//JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个

class Scheduler{
    constructor(maxTask = 2){
       this.maxTask = maxTask
       this.queue = [] 
       this.runTask = 0
    }

    add (promiseCreater) {
        // 传进来的是个函数，这个函数返回的是个Promise
       this.queue.push(promiseCreater)
    }

    start () {
       for(let i = 0; i<this.maxTask; i++){
          this.request()
       }
    }

    request () {
       if(!this.queue || !this.queue.length || this.runTask >= this.maxTask)return;
       this.runTask++;
       this.queue.shift()().then(() => {
           this.runTask--;
           this.request()
       })
    }
}

   
const timeout = time => new Promise(resolve => {
    setTimeout(resolve, time);
  })
    
const scheduler = new Scheduler();
const addTask = (time,order) => {
  scheduler.add(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
            resolve(order)
        }, time)
      }).then((res) => {
            console.log(res)
      })
  })
}

addTask(1000, '1');
addTask(300, '2');
addTask(600, '3');
addTask(600, '4');

// scheduler.start()

// 假设一个业务，分多个步骤，且每个步骤都是异步的，而且依赖上个步骤的执行结果。
// async 函数的实现原理，Generator 函数不会自动执行，所以就是将 Generator 函数和自动执行器，包装在一个函数里。
// async返回一个Promise对象，await是会等待promise的处理结果，会阻塞后面的代码
// 手动实现 async/await
function fn(num){
    return new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve(num)
       }, 1000)
    })
}

function* gen(){
    let res1 = yield fn(1)  // 返回了它的值
    console.log("res1--",res1)
    let res2 = yield fn(2)
    console.log("res2---",res2)
    return res2
}
// let gen1 = gen()
// let res1 = gen1.next()
// let res2 = gen1.next()
// let res3 = gen1.next()

function asyncAwait(genFun){
    return function(){
       // 生成指针对象
       const gen = genFun.apply(this, arguments)
       return new Promise((resolve, reject) => {
           // key有next和throw两种取值
           function step(key, arg) {
               console.log("args--",arg)
               let res ;
               try {
                res = gen[key](arg)
                console.log(res, "执行gen---")
               } catch(e) {
                   reject(e)
               }

              const { value, done } = res
              if (done) {
                 resolve(value)
              } else {
                  return Promise.resolve(value).then((val)=>step("next", val),(err) =>step("throw", err))
              }
           }
           step("next") //第一次执行
       })
    }
} 

// asyncAwait(gen)().then((res => {
//     console.log("结果---",res);
// }))

var urls = [
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
    "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png",
  ];
function loadImg(url){
    return new Promise((resolve,reject) => {
        let img = new Image();
        img.onload = function(){
            resolve(img)
        }
        img.onerror = function(){
            reject("图片加载失败")
        }
        img.src = url
    })
}

// 限制异步加载的个数
function taskLoad(urls = [], num = 3, loadImg){
     return new Promise((resolve)=>{
        let runTask = 0
        let res =[]
        let total = urls.length
        
        function pushTask(){
           for(let i = 0; i < num; i++){
              run(urls.shift())
           }
        }
   
        function run(url){
               runTask ++
               console.log(runTask);
               loadImg(url).then((img) => {
                   console.log("图片加载完成");
                   res.push(img)
                   runTask --
                   if(runTask < num && urls.length > 0){
                       run(urls.shift())
                   } 
                   if(res.length === total){
                       resolve(res)
                   }
               })
            
           //  run()
        }
        pushTask()
     })
}
// taskLoad(urls,3, loadImg).then(res =>{
//     console.log(res,"------");
// })

Promise.myAll1 = function(arr){
  let res = []
  let flag = 0
  return new Promise((resolve, reject) =>{
      for(let i = 0;i< arr.length;i++){
          Promise.resolve(arr[i]).then((data) => {
              flag++
              res[i] = data
              if(flag === arr.length){
                   resolve(res)
              }
          }).catch((err) => {
              console.log(err);
          })
      }
  })
}

//u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner')
class u{
    constructor(){
        this.promise = Promise.resolve()
    }
    console(info){
        this.promise = this.promise.then(() => {
            console.log(info)
        })
        return this
    }
    setTimeout(time){
        this.promise = this.promise.then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            },time)
          }) 
        })
        return this
    }
}

// fn([['a', 'b'], ['n', 'm'], ['0', '1']]) => ['an0', 'am0', 'an1', 'am1', 'bn0', 'bm0', 'bn1', 'bm0']

const permute = (arr = [['a', 'b'], ['n', 'm'], ['0', '1']]) => {
     let res = []
     let ans = []
     dfs(arr,0)
     function dfs(arr, depth){
        if(arr.length === depth){
            res.push(ans.slice().join(""))
            return
        }
        for(let i = 0; i < arr[depth].length; i++){
                ans.push(arr[depth][i])
                dfs(arr, depth+1)
                ans.pop()
        }
     }
     return res
}
console.log(permute([['a', 'b'], ['n', 'm'], ['0', '1']]));

//[2, 10, 2,3, 4, 5, 11, 10, 11, 20]
function setArea(arr1){
    let arr = [...new Set(arr1)]
    arr.sort((a,b) => a-b)
    let resArr = []
    let tempArr = [arr[0]]
    let step = 0
    for(let i = 1;i < arr.length; i++){
        if(tempArr[step] + 1 === arr[i]){
         console.log(tempArr)
          tempArr.push(arr[i])
          step ++
        } else {
            resArr.push(tempArr)
            tempArr = [arr[i]]
            step = 0
        }
    }
    if(tempArr.length > 0){
        resArr.push(tempArr)
    }

    return resArr
}
console.log(setArea([2, 10, 2,3, 4, 5, 11, 10, 11, 20]))
function formatSetTime(setTime) {
    const timeArr = setTime.sort(function(a, b) {
        return a - b;  // 从小到大排序
    });
    const length = timeArr.length;
    let res = [[timeArr[0]]]; // 默认放入第一个，及只返回一个设置时间时
    let resIndex = 0; // res数组的index
    let min = timeArr[0];
    let step = 1; // 差值
    let setTimeArr=[]; // 函数最终返回结果
  
    // 处理返回多个设置时间的情况
    if (length > 1) {
        for (let i = 1; i < timeArr.length; i++) {
            // 如果是连续增加的，则归为一组
            if( Number(min) + step === Number(timeArr[i]) ) {
                res[resIndex].push(timeArr[i]);
                step++;
            }else{  // 若不连续增加了，将当前元素放入新的一组中
                res.push([]);
                resIndex++;
                res[resIndex].push(timeArr[i]);
                min = timeArr[i];  // 初始化最小值
                step = 1;   // 初始化step
            }
        }
    }
   
    // 分好组后，拼接每一组的元素最大值最小值
    for (let i = 0; i < res.length; i++) {
        let len = res[i].length; 
        let min = res[i][0];
        let max = len > 1 ? res[i][len -1] : null;  // 若每组元素只有一个，则无最大值
  
        max ? setTimeArr.push(`${min}-${max}`) : setTimeArr.push(min);
    }
  
    return setTimeArr;
}
console.log(formatSetTime([2, 10, 3, 4, 5, 11, 20]))
