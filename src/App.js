/*
 * @Author: Yuan Man Rong
 * @Date: 2021-09-07 11:27:32
 * @LastEditors: Yuan Man Rong
 * @LastEditTime: 2021-09-07 17:41:19
 */
//import Dialog from "./component/Dialog/Dialog.js";
//import Dialog from "ymr/Dialog/Dialog";
import Vote from "../src/component/Vote";
import Life from "../src/component/LifeCycle";
// import Computer from "./container/computer/index";  // 使用react-rudex串联的引入路径，后续将该组件统一整合到普通组件中
import Computer from "./component/Computer/Computer"; // 普通组件的引入路径
import TestHook from "./component/TestHook";
import store from "./store";
import RouteTest from "./component/RouteContent";
import { Routes, Route, NavLink, useRoutes } from "react-router-dom";
import {routerList} from "../src/router"

function App() { 
  const element = useRoutes(routerList)
  return (
    <div>
       <NavLink to="/computer">计算器</NavLink>
       <NavLink to="/hook">reactHook测试</NavLink>
       {/* 给容器组件单独传递store，但是比较麻烦 store={store}  使用Provider */}
       {/* <Routes>
       </Routes> */}
       {/* <Computer></Computer>
       <TestHook></TestHook> */}
       {/* useRoutes是router6加的钩子，否则之前这里需要用Route占位，还有就是官方文档基本上都是用函数式声明组件 */}
       {element}
    </div>
  );
}

export default App;
