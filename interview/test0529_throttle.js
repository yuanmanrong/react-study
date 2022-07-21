 // 项目梳理
 // 前端截图 canvas
 // taro2.0
 // react

 function debounce(fn, delay = 300){
    let timer = null
    return function(...args){
        if(timer)clearTimeout(timer)
        timer = setTimeout(()=>{
            // fn.apply(this,[...args])
            fn(...args)
        },delay)
    }
 }

 function throttle(fn, delay){
     let start = 0
     return function(){
         let now = Date.now()
         if(now - start >= dealy){
             fn.apply(this)
             start = now
         }
     }
 }

 function test(n1,n2,n3){
     console.log(n1+n2+n3,this)
 }
 


 let length = 5

 function fn() {
     console.log(this.length)
 }
  

const obj = {
  a: 1,
  fn: () => {
    return this.a
  }
}

// const a = 2
// const fn = obj.fn

//console.log( obj.fn() ) // undefined 
// // 箭头函数不绑定this, 指向window，而const声明的变量不会挂载在window上
//console.log( fn() ) // undefined 普通函数调用的时候this指向window
// console.log( obj.fn.call(null) ) // undefined .call对箭头函数不起作用 ===第一种情况


// 归并排序

function mergeSort(arr){
    if(arr.length <= 1) return arr

    let mid = Math.floor(arr.length / 2)
    let left = arr.slice(0,mid)
    let right = arr.slice(mid)

    left = mergeSort(left)
    right = mergeSort(right)
    
    return merge(left,right)
}

function merge(left, right){
    let result = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }

    return result.concat(left, right)
}

let arr = [49,38,65,97,76,13,27]
console.log(mergeSort(arr))
// 快排
function fastSort(arr, left, right){
     if(left > right)return
     let l = left
         r = right
         base = arr[l]
    
    while (l < r){
        while(l < r && base <= arr[r]) r--
        swap
        while(l < r && base >= arr[l]) l++
        swap
    }
    arr[l] = base
    fastSort(arr, left, l - 1)
    fastSort(arr, l + 1, right)
    return arr
}

// 堆排
function heapSort(){
    
}

