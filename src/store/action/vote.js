/*
 * @Author: Yuan Man Rong
 * @Date: 2021-09-07 17:11:46
 * @LastEditors: Yuan Man Rong
 * @LastEditTime: 2021-09-07 17:20:17
 */

import * as TYPE from "../action-types";

/* 每个版块单独的action-creator，把dispatch派发时的action
进一步封装 */

let vote = {
  support() {
    return {
      type: TYPE.VOTE_SUPPORT,
    };
  },
  unsupport() {
    return {
      type: TYPE.VOTE_UNSUPPORT,
    };
  },
};
export default vote;
