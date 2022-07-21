// 面经准备
//原生实现trim


function myTrim(str) {
    return str.replace(/^\s+|\s+$/, "")
}

function timer(t) {
    let time = t;
    let timer1 = setInterval(function () {
        if (time === 0) {
            console.log("弹窗提示-----")
            clearInterval(timer1)
            return
        }
        let now = getTime()
        console.log(time, now)
        time--
    }, 1000)
}
function getTime() {
    let date = new Date()
    let mins = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
    let sec = date.getSeconds() <= 9 ? `0${date.getSeconds()}` : date.getSeconds()

    return mins + ":" + sec
}


// u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner')
class U {
    constructor() {
        this.promise = Promise.resolve();
    }

    console(val) {
        this.promise = this.promise.then(() => {
            console.log(val);
        });
        return this;
    }

    setTimeout(wait) {
        this.promise = this.promise.then(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                }, wait);
            });
        })
        return this;
    }
}
let u = new U()
//u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner')
function myReduce(arr, cb, initval) {
    let pre, cur;
    arr.forEach((ele, i) => {
        if (i === 0) {
            if (initval !== undefined) {
                pre = initval
            } else {
                pre = arr[0]
            }
        }
        cur = initval !== undefined ? arr[i] : arr[i + 1] ? arr[i + 1] : null
        pre = cb(pre, cur, i, arr)
    });
    return pre
}

let res = myReduce([1, 2, 3], (pre, cur) => {
    return pre + cur
}, 0)
console.log(res);