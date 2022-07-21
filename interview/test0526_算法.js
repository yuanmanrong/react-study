// 常考算法练习
// 112二叉树的路径总和
// 222完全二叉树节点个数
// 415字符串相加
// 704二分查找
// 版本号排序
// 104
// 144
// 543
// 515 层序遍历 ok

/* 两数之和
 *
*/
function add(arr, target){
   let tempObj = {}
   for (let i =0; i< arr.length; i++) {
     let curNum = arr[i]
     let restNum = target - curNum;
     if(tempObj[restNum] === undefined) {
        tempObj[curNum] = i
     }else{
         return [i, tempObj[restNum]]
     }
   }
}
// 使用map方法
function add1(arr, target){
   const map = new Map()
   for(let i =0; i<0; i++){
       const temp = target - arr[i]
       if(map.has(temp)){
           return [map.get(temp), i]
       }else{
          map.set(arr[i], i)
       }
   }
}
let arr = [2,11,15,7,22]
//console.log(add(arr, 9));

/* 无重复子串最长子串之暴力解法*/
function maxStrLen(str){
    let lk = 0 // 指针
    let ans = 0 // 长度记录
    let tempStr = "";
    let resArr = []
    let len = str.length;
    for(let i = lk; i < len; i++){
        // 没有该字符串
       if(tempStr.indexOf(str[i]) === -1) {
        ans +=1
        if(i === len - 1 && tempStr === "") {
            resArr.push(ans)
        }
        tempStr += str[i]
       } else { // 有的话重置参数
         resArr.push(ans)
         ans = 0
         tempStr = ""
         i = lk
         lk +=1
       }
    }
    return resArr
}
/* 滑动窗口解法 妙啊~~~ */
function maxStrLen1(str){
    let set = new Set()
    let i = 0; // 字符串
    let j = 0; // 指针
    let maxLen = 0;
    for(let i = 0; i < str.length; i ++) {
       if(!set.has(str[i])){
          set.add(s[i])
          maxLen = Math.max(maxLen, set.size)
       }else{
           // 有的话，就要从头开始删除 并循环检查
          while(set.has(str[i])){
            set.delete(str[j])
            j++
          }
          set.add(s[i])
       }
    }
    return maxLen
}
let str = "abcabcbb"
// console.log(maxStrLen(str));

/* 最长回文子串 */
/* 字符串长度小于2，直接返回
*  变量：起始位置start 和最大长度maxlength 左边字符是否等于右边字符，更新起始位置和最大长度
*/
function maxStr(str){
    if(str.length < 2)return str
    let start = 0;
    let maxLen = 1;
    function helpFind(left, right){
      while(left >= 0 && right < str.length && str[left] === str[right]){
          if(right - left + 1 > maxLen){
            start = left
            maxLen = right - left + 1
          }
         left --
         right ++
      }
    }
    for(let i =0; i < str.length; i++){
        helpFind(i, i+1)
        helpFind(i-1, i+1)
    }
    return str.substring(start, start + maxLen)
}

/* 合并两个有序数组*/
function mergeArr(arr1, arr2){
    if(!Array.isArray(arr1) || !Array.isArray(arr2))return
    if(arr1.length === 0) return arr2
    if(arr2.length === 0) return arr1
    let indexArr1 = 0;
    let indexArr2 = 0;
    let res = []
    // 循环两个数组的长度
    for(let i = 0; i < arr1.length + arr2.length; i++){
       // 判断循环跳出条件
       if (indexArr1 === arr1.length && indexArr2 === arr2.length) break
       if (indexArr1 === arr1.length && indexArr2 < arr2.length) {
            res.push(...arr2.slice(indexArr2))
            break
        }
       if (indexArr2 === arr2.length && indexArr1 < arr1.length) {
        res.push(...arr1.slice(indexArr1))
        break
       }
       // arr1加指针
       if (arr1[indexArr1] < arr2[indexArr2]) {
           res.push(arr1[indexArr1])
           indexArr1 ++
       }
       // arr2加指针
       if (arr1[indexArr1] > arr2[indexArr2]) {
        res.push(arr2[indexArr2])
        indexArr2 ++
       }
       // 一起加指针
       if (arr1[indexArr1] === arr2[indexArr2]) {
        res.push(arr2[indexArr2])
        res.push(arr1[indexArr1])
        indexArr1 ++
        indexArr2 ++
       }
    }
    return res
}

let arr1 = [1,2,3,4,5,6,25,34,78]
let arr2 = [2,5,7,12,34,99,11111]

let res = mergeArr(arr1, arr2)
// console.log("----merge", res)

/* 输入：
删除排序链表中的
head = [1,1,2,3,3]，输出：[1,2,3]。 
*/
function delRepeat(arr){
    if (!Array.isArray(arr)) return;
    for (let i = 0; i < arr.length; i++) {
       if(arr[i + 1] && arr[i] === arr[i + 1]) {
         arr.splice(i + 1, 1)
         i-- 
       }
    }
    
    return [...arr]
}
let head = [1,1,2,3,3];
// console.log(Array.from(new Set(head)))

/* 最长有效括号
* Input: "(()"
* Output: 2
* Input: ")()())"
* Output: 4 
*/
function isValid(){

}

// 两数之和 写一下构造链表
function listNode(val, next){
      this.val = val === undefined ? 0 : val
      this.next = next === undefined ? null : next
}

let arrList1 = [1,2,6]
let arrList2 = [1,2,6]

function list(arr){
    let l1 = []
    let i = 0
    while(i < arr.length){
       l1.push(new listNode(arr[i]))
       i ++
    }
    l1.forEach((item, index) => {
        item.next = index + 1 < l1.length ? l1[index + 1] : null
    })
    return l1.length > 0 ? l1[0] : null
}

console.log(list(arrList1));
let l1 = list(arrList1)
let l2 = list(arrList2)

function addTwoNumbers(l1, l2){
      let dumpy = new listNode(); // 头部指针
      let cur = dumpy;
      let carry = 0;
 
      while(l1 !== null || l2 !== null){
          let sum = 0
          if(l1 !== null){
             sum += l1.val
             l1 = l1.next
          }
          if(l2 !== null){
            sum += l2.val
            l2 = l2.next
         }
         // 处理sum
         sum += carry
         carry = Math.floor(sum / 10) 
         cur.next = new listNode(sum % 10)
         cur = cur.next // 注意要移动指针！！！！！
      }
      if(carry > 0){
          cur.next = new listNode(carry)
      }
      return dumpy
}

let addnumbers = addTwoNumbers(l1, l2)
console.log(addnumbers, "----addnumbbers");

Promise.resolve().then(() => {
    return new Promise(resolve =>{
        setTimeout(() => {
            console.log(1)
            resolve(2)
        },1000)
    })
}).then((res) => {
    return new Promise(resolve =>{
        setTimeout(() => {
            console.log(res)
            resolve(3)
        },1000)
    })
}).then((res) => {
    return new Promise(resolve =>{
        setTimeout(() => {
            console.log(res)
        },1000)
    })
})
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

function light(type,time){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            type()
            resolve()
        },time)
    })
}

function start(){
   Promise.resolve().then(() => {
       return light(red,3000)
   }).then(() => {
      return light(yellow,2000)
   }).then(() => {
    return light(green,3000)
   }).then(() => {
       console.log("---一轮执行完了")
   })
}
