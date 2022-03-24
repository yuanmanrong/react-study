import React from "react";

export default function TestHook() {
    // 语法： const [xxx, setxxx] = React.useState(initValue)
    const [count, setCount] = React.useState(0) 
    
    // 可以理解为生命周期的钩子，接受两个参数，数据传谁监测谁，否则全部监测
    React.useEffect(()=>{

    },[])

    function add () {
        // setxxx的两种写法：第一种 setxxx(newValue)
        // setCount(count+1)
        // setxxx的两种写法：第二种 setxxx(value => newValue)
        setCount(count => count + 1)
    }
   return (
       <div>
           <div>当前求和为：{count}</div>
           <button onClick={add}>加1</button>
       </div>
   )
}