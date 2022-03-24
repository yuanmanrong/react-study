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
import store from "./store";

function App() {
  return (
    <div>
      {/* 给容器组件单独传递store，但是比较麻烦 store={store}  使用Provider */}
       <Computer></Computer>
    </div>
  );
}

export default App;
