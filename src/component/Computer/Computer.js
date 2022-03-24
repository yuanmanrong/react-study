import React from "react";
import ReactDom from "react-dom";
import store from "../../store/index"
import action from "../../store/action"
import {bindActionCreators} from 'redux';
import { connect } from "react-redux"

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

class Computer extends React.Component {
    constructor(){
       super()
       this.state = {
         
       }
    }
    // 加法
    handleAdd = () => {
       const value = this.selectNumber.value;
       console.log(this.props);
    //  this.props.actions.add(value)
       this.props.add(value)
    // store.dispatch(action.computer.add(value))
    }

    handleAddAsync = () => {
        // const value = store.getState().computer
        // store.dispatch(action.computer.addAsync(value))
    }
    render() {
        return(
            <div>
                <div>当前求和值为：{this.props.count}</div>
                 <select ref = { e => this.selectNumber = e}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <button onClick={e => this.handleAdd(e)}  type="button" >+</button>
                <button type="button">-</button>
                <button type="button">求和为奇数再加</button>
                <button onClick={e => this.handleAddAsync(e)} type="button">异步加</button>
            </div>
        )
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Computer)