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
    case TYPE.VOTE_SUPPORT:
      state = { ...state, n: state.n + 1 };
      break;
    case TYPE.VOTE_UNSUPPORT:
      state = { ...state, m: state.m + 1 };
      break;
    default:
      break;
  }
  return state;
}
