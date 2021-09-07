/*
 * @Author: Yuan Man Rong
 * @Date: 2021-09-06 16:08:42
 * @LastEditors: Yuan Man Rong
 * @LastEditTime: 2021-09-07 17:58:07
 */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import action from "../../store/action";

export default class Vote extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    let { n, m } = props.store.getState().vote;
    this.state = {
      n,
      m,
    };
  }
  componentDidMount() {
    this.props.store.subscribe(() => {
      let { n, m } = this.props.store.getState().vote;
      this.setState({
        n,
        m,
      });
    });
  }
  support = () => {
    let { support } = this.state;
    support += 1;
    this.setState({
      support,
    });
  };
  unsupport = () => {
    let { unsupport } = this.state;
    unsupport += 1;
    this.setState({
      unsupport,
    });
  };
  render() {
    const { title = "默认投票" } = this.props;
    let { n, m } = this.state;
    let rate = n + m == 0 ? "0%" : ((n / (n + m)) * 100).toFixed(2) + "%";
    return (
      <div>
        <h3>{title}</h3>
        <div>支持人数：{n}</div>
        <button
          onClick={() => {
            this.props.store.dispatch(action.vote.support());
          }}
        >
          支持
        </button>
        <div>反对人数：{m}</div>
        <button
          onClick={() => {
            this.props.store.dispatch(action.vote.unsupport());
          }}
        >
          反对
        </button>
        <div>支持率：{rate}</div>
      </div>
    );
  }
}
