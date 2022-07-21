// 深度优先算法（dfs） 和 广度优先算法（bfs）

// 需要根节点 根节点的子孩子 保存结果的变量
// https://juejin.cn/post/7098698020685873189
function parseArrToTree(arr){
     // 数组，根节点，结果， 每个数组暂存的
     let res = [];
     let combination = [];
     let root = arr.filter((item) => item.id === 1)[0] // 取出根节点
     dfs1(arr, root, combination, res)
     return res
}

function dfs1(arr, root, combination, res){
    // 该节点没有子节点，则存入结果
    if(!root.children){
        let _combination = JSON.parse(JSON.stringify(combination))
        _combination.unshift(1)
        res.push(_combination)
        return
    }
   let children = root.children;
   // 循环节点的子孩子，取每个的根节点进行同样的操作
   for(let i = 0; i < children.length; i ++) {
       let _root = arr.filter((item) => item.id === children[i])[0];
       combination.push(children[i])
       dfs1(arr, _root, combination, res)
       combination.pop() // 返回父节点
   }
}

const list = [
    { id: 6 },
    { id: 2, children: [5] },
    { id: 13 },
    { id: 5, children: [10, 11] },
    { id: 1, children: [2, 3, 4] },
    { id: 10 },
    { id: 8, children: [13] },
    { id: 4, children: [8, 9] },
    { id: 9 },
    { id: 3, children: [6, 7] },
    { id: 11, children: [14] },
    { id: 14 },
    { id: 7, children: [12] },
    { id: 12 }
  ];
  //console.log(parseArrToTree(list));
  //parseTree(list)

  /* 岛屿数量 leetcode 695 */
  function numsIsland(grid){
    let count = 0

    // 沉默小岛 越界返回，遇到1则变1，遇到0返回
    function dfs(row, col){
        if(row < 0 || row >= grid.length || col < 0 || col >= (grid[row].length) || (grid[row][col] === 0)){
            return
        }
        // 向四周递归
        grid[row][col] = 0
        dfs(row - 1, col)
        dfs(row + 1, col)
        dfs(row, col - 1)
        dfs(row, col + 1)
    }

      for(let i = 0; i < grid.length; i++){
         for(let j = 0; j < grid[i].length; j++){
             if(grid[i][j] === 1){
                count ++
                dfs(i,j)
             }
         }
      }
      return count
  }

let grid =[[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]] //为什么预期结果是4呢？？？？？

console.log(numsIsland(grid));

// 二分搜索 关键点： 左右中三个值
function binarySearch(arr,target){
    let left = 0;
    let right = arr.length - 1; //4
    let mid = Math.floor(left + (right - left) / 2); 
    while (left <= right) { // 0 4
        if(arr[mid] === target) {
            return mid
        }
        if(arr[mid] > target) { 
            right = mid - 1  //3 0
            mid =  Math.floor(left + (right - left) / 2);
        }
        if(arr[mid] < target) {
         left = mid + 1
         mid =  Math.floor(left + (right - left) / 2);
        }
    }
    return -1
 }
 
 let binaryArr = [1,2,3,4,5]
 console.log(binarySearch(binaryArr, 2));

 // lodash get的实现
// var object = { 'a': { 'b': { 'c': 3 } }};  
// _.get(object, 'a.b.c');  
// // => 3  
// _.get(object, ['a', 'b', 'c']);  
// // => 3  
// _.get(object, 'a.e.c', 'default');  
// // => 'default'

function get(obj, param, def = "default"){
    let  arr = param;
    let  res;
   
    if (typeof param === "string") {
        arr = param.replace(/\[/g,".").replace(/\]/g,"").split(".")
    }
 
    while (arr.length > 0) {
       let key = arr.shift()
       if (obj[key]) {
          res = obj[key]
       } else {
           return def
       }
       obj = res
    }
    return res
}

var object = { 'a': [{ 'b': { 'c': 3 } }] };
console.log(get(object, 'a[0].b.c'))
