// 计算组件中的reducer
import * as typeConstant from "../action-types"

const initState = 0;
export default function computer(preState = initState ,action){
     const { type, data } = action;
     switch(type){
         case typeConstant.INCREAMENT:
         return preState + Number(data);
         case typeConstant.DECREMRNT:
         return preState - data;
         default:
        return preState
     }
}