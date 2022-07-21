// react框架原理知识

// 1.虚拟DOM渲染机制
/* 
  通过babel-preset-react-app将jsx转换成React.creatElement(tag,props,React.creatElement())  返回对象虚拟dom
  然后在通过render函数将返回的这个虚拟dom转换成真是dom
  如果内容更改了，会生成新的虚拟dom和之前的进行比较，得到patch,将patch应用到真实dom上
  在diff算法比较上：tree component element
  react是函数式组件思想，数据更改后会自顶向下全量diff，而vue则是组件响应，代理可以局部订阅
*/

// 2.react-router原理和实现 路由懒加载
/* 
  navlink switch route redirect
  withRouter可以让一般组件具有路由组件的api
  BrowserRouter原理是还是使用h5的history API  HashRouter使用的是url的哈希值
*/
//伪代码实现hashRouter   其实就是监听hashchange事件
document.addEventListener("hashchange",() => {
    changePage()
})

function changePage(){
    let hash = location.hash
    // 去更改视图
}

//伪代码实现historyRouter  其实就是h5新特性history的pushState和replaceState
/* 
  使用a标签，阻止它的默认跳转
  同时通过h5的新特性来改变路径显示
  popstate监听更新页面数据
 */
  document.addEventListener("click",(e) => {
    const path = e.target.href
    if(e.target.tagName === "a"){
        e.preventDefault() // 阻止默认事件
        changePath(path) // 改变路径
    }
})
// 浏览器的一些事件或者back() go才会触发
window.addEventListener("popstate", (e) => {
    const data = this.getPathData(e.state.path)
    this.appendData(data)
})
function changePath(path){
     window.history.pushState({path:path},null,path)
}

// react-router的browserRouter实现
/* 
  版本16.3提出的react.createContext 实现跨组件通信 let {Consumer, Provider} = React.createContext()
 */
// BrowserRouter将当前的路径往下传并监听popstate事件 Link：改变路由刷新视图  Route 跟path对比，是否要渲染
// hashRouter同理


// reacthook 基础知识和原理
/* 
 基础知识
 hooks：在react中以use开头，可以不需要用class的方式完成组件的状态管理，声明周期等
 react只在函数组件中调用，不在循环嵌套中使用
 useState useEffect useContext
*/

//组件1
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });


  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
//组件2
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}

function useDecounce(fn, time){
    
}
/* 
  原理：
 */