/*
 * @Author: Yuan Man Rong
 * @Date: 2021-09-07 15:05:39
 * @LastEditors: Yuan Man Rong
 * @LastEditTime: 2021-09-07 17:46:36
 */

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

/* 创建store,把reducer导入进来 */
let store = createStore(reducer,applyMiddleware(thunk));

export default store;
