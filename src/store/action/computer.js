// 该文件专门生成action对象
import * as type from "../action-types"
import store from "../index"

const add = (data) => ({type: type.INCREAMENT, data})

const addAsync = (data) => {
     return () => {
         //可以理解为这里调用接口获取数据后再同步调用
         setTimeout(() => {
            //let res = "res"
            store.dispatch(add(data))
         },2000)
     }
}

export default {
    add,
    addAsync 
}