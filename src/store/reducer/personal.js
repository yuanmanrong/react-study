/*
 * @Author: Yuan Man Rong
 * @Date: 2021-09-07 15:45:45
 * @LastEditors: Yuan Man Rong
 * @LastEditTime: 2021-09-07 16:03:28
 */

//vote的reducer,reducer接收state和action两个参数
import * as TYPE from "../action-types";

export default function vote(
  state = {
    n: 0,
    m: 0,
  },
  action
) {
  switch (action.type) {
    case TYPE.PERSONAL_NAME:
      state = { ...state, n: state.n + 1 };
      break;
    case TYPE.PERSONAL_AGE:
      state = { ...state, m: state.m + 1 };
      break;
    default:
      break;
  }
  return state;
}
