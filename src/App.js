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

import store from "./store";

function App() {
  return (
    <div>
      <Vote title="流心蛋黄月饼yyds" store={store}></Vote>
      <Life></Life>
    </div>
  );
}

export default App;
