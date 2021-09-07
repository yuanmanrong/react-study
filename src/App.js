//import Dialog from "./component/Dialog/Dialog.js";
//import Dialog from "ymr/Dialog/Dialog";
import Vote from "../src/component/Vote";
import Life from "../src/component/LifeCycle";

import { createStore } from "redux";

let state = {
  n: 1,
  m: 2,
};
let reducer = (state, action) => {}; //修改状态

let store = createStore(reducer); //创建容器需要把reducer传递进来，这里登记了所有状态更改的信息。

function App() {
  return (
    <div>
      <Vote title="流心蛋黄月饼yyds"></Vote>
      <Life></Life>
    </div>
  );
}

export default App;
