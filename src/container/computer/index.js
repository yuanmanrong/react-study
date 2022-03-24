// 使用react-redux的connect去串联 组件 和 数据状态
import {bindActionCreators} from 'redux';
import { connect } from "react-redux"
import Computer from "../../component/Computer/Computer"
import action from "../../store/action"

function mapStoreToProps (state) {
   return {
       count: state.computer
   }
}

function mapDispatchToProps (dispatch) {
   return {
    add: (value) => {dispatch(action.computer.add(value))}
    // actions: bindActionCreators(action.computer, dispatch)
   }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Computer)