/*
 * @Author: Yuan Man Rong
 * @Date: 2021-09-07 15:15:37
 * @LastEditors: Yuan Man Rong
 * @LastEditTime: 2021-09-07 16:29:48
 */

/* 
把每一个模块单独设定的reducer的函数最后合并成为总的reducer
为了保证每个模块的状态信息不会冲突，redux会进行分开管理
*/
import { combineReducers } from "redux";
import vote from "./vote";
import personal from "./personal";

let reducer = combineReducers({
  vote,
  personal,
});

export default reducer;
