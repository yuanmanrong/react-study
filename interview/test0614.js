// js循环机制： 因为js是单线程执行  会有同步任务队列和异步任务队列 宏任务 微任务

/* 
检查是否有重复的点
*/
function isValid(arr) {
    if (arr.length === 1 || arr.length === 0) return true
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i][1] > arr[i + 1][0]) {
            return false
        }
    }
    return true
}

let arr = [[1, 3], [2, 3], [10, 20]]
/* 
https://blog.csdn.net/Web_J/article/details/115486883
实现一个retryFetch(api, times)
*/

function myFn() {
    return new Promise((resolve, reject) => {
        resolve("1234")
    })
}

function retryFetch(api, times, myFn) {
    return new Promise((resolve, reject) => {
        function attempt() {
            myFn().then(resolve).catch(err => {
                console.log(times, "失败");
                if (times === 0) {
                    reject(err)
                } else {
                    times--
                    attempt()
                }
            })
        }
        attempt()
    })
}

retryFetch("localhost/next", 2, myFn).then((res) => {
    console.log('res--', res);
})

let obj = {
    name: "ymr",
    sex: 0
}


function star(height) {
    let content = 2 * height - 1

    for (let i = 0; i < height; i++) {
        let cur = 2 * i - 1
        let rest = Math.floor((content - cur) / 2)
        let rest1 = content - rest
        let str = ""
        while (rest > 0) {
            str += " "
            rest--
        }
        while (cur > 0) {
            str += "*"
            cur--
        }
        while (rest1 > 0) {
            str += " "
            rest1--
        }
        console.log(str)
    }
}

function changeStar(char) {
    let arr = Array.from(char)

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "*") {
            arr.splice(i, 1)
            arr.unshift("*")
        }
    }

    return arr.join("")
}

// 非递归实现数组扁平化
function flatten(arr) {
    let stack = [...arr]
    let res = []
    while (stack.length) {
        let item = stack.pop()
        if (Array.isArray(item)) {
            stack.push(...item)
        } else {
            res.shift()
        }
    }
    return res
}

let sort = [3, 5, 1, 2, 8, 7]

// 快排
function quickSort(arr, left, right) {
    if (left > right) {
        return arr
    }
    let l = left,
        r = right,
        base = arr[l]

    while (l < r) {
        while (l < r && arr[r] >= base) r--
        swap(arr, l, r)
        while (l < r && arr[l] <= base) l++
        swap(arr, l, r)
    }
    arr[l] = base
    quickSort(arr, left, l - 1)
    quickSort(arr, l + 1, right)
    return arr
}
function swap(arr, l, r) {
    let temp = arr[l]
    arr[l] = arr[r]
    arr[r] = temp
}