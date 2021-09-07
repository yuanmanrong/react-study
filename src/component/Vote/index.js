import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class Vote extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      support: 0,
      unsupport: 0,
    };
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
    let { support, unsupport } = this.state;
    let rate =
      support + unsupport == 0
        ? "0%"
        : ((support / (support + unsupport)) * 100).toFixed(2) + "%";
    return (
      <div>
        <h3>{title}</h3>
        <div>支持人数：{support}</div>
        <button onClick={this.support}>支持</button>
        <div>反对人数：{unsupport}</div>
        <button onClick={this.unsupport}>反对</button>
        <div>支持率：{rate}</div>
      </div>
    );
  }
}
