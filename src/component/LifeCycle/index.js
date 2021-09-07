import React from "react";
import ReactDOM from "react-dom";

export default class Life extends React.Component {
  constructor() {
    super();
    console.log("constructor");
    this.myRef = React.createRef();
    this.state = { n: 1 };
  }

  componentWillMount() {
    console.log("componentWillMount", this.state.n, this.myRef);
  }
  componentDidMount() {
    console.log("componentDidMount", this.state.n, this.myRef);
    setTimeout(() => {
      this.setState({
        n: this.state.n + 1,
      });
    }, 3000);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      nextProps,
      nextState,
      "shouldComponentUpdate",
      this.state.n,
      this.myRef
    );
    return true; //true是允许，false是不允许
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate", this.state.n, this.myRef);
  }
  componentDidUpdate() {
    console.log("componentDidUpdate", this.state.n, this.myRef);
  }
  componentWillReceiveProps() {
    console.log("componentWillReceiveProps", this.state.n, this.myRef);
  }
  //   componentDidUnmount() {
  //     console.log("componentDidUnmount", this.state.n, this.refs.testRef);
  //   }

  render() {
    console.log("render");
    return <div ref={this.myRef}>这是一个组件生命周期的test</div>;
  }
}
