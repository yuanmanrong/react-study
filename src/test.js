class Test {
  constructor(a) {
    this.a = a;
    this.b = "hi";
  }
  click() {
    console.log(1);
  }
  //私有方法
  static move() {
    console.log(2);
  }
}
Test.prototype.c = "c"; //添加共有属性
Test.d = "d"; //添加私有属性

let t = new Test();
console.log(Test, t);
