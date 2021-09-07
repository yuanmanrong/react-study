//render渲染的时候，如果type是自古想换就创建元素标签，如果是函数（其实就是函数式组件）或者类，就执行函数，并且把复用该函数组件时传的值通过props传给函数组件。
//在执行函数组件时，按照原来的形式进行渲染
import React from "react"; // 要使用createElement()方法
import "./dialog.css";

export default function Dialog(props) {
  let {
    width = "400px",
    height = "400px",
    title = "这是默认标题",
    footer = "确定",
    children,
  } = props;

  return (
    <div className="mask">
      <div className="dialog" style={{ width, height }}>
        <header className="head">
          <span className="head_title">
            <span name="modal-title">{title}</span>
          </span>
          <span className="head_close">X</span>
        </header>
        <div className="body">
          {children ? React.Children.map(children, (item) => item) : null}
        </div>
        <footer className="footer">
          <button className="footer_yes">{footer}</button>
          <button className="footer_cancel">取消</button>
        </footer>
      </div>
    </div>
  );
}
