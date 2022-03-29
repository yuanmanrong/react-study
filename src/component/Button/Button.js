//render渲染的时候，如果type是自古想换就创建元素标签，如果是函数（其实就是函数式组件）或者类，就执行函数，并且把复用该函数组件时传的值通过props传给函数组件。
//在执行函数组件时，按照原来的形式进行渲染
import React from "react"; // 要使用createElement()方法
import PropTypes from "prop-types";

export default class YmrButton extends React.Component {
  static propTypes = {
    type: PropTypes.string,
  };
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      list: "abc"
    }
  }

  render() {
    return <div className="mask">
      {this.state.list.map(() => {
        return <button>hahha</button>
      })

      }
    </div>;
  }
}
