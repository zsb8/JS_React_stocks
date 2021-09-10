import React from "react";
const Test = () => {
  //这个类用计时器来自动刷新时间
  class C extends React.Component {
    constructor() {
      super();
      this.state = { date: new Date() };
    }
    //这个函数就是用setState来设置给新的时间
    myTick() {
      this.setState({ date: new Date() });
    }
    //当页面加载后，开始计时，每1秒钟就更新一次时间，这样才能自动刷新
    componentDidMount() {
      this.myTtimerId1111 = setInterval(() => this.myTick(), 2000);
    }
    componentWillUnmount() {
      cleanInterval(this.myTtimerId1111); //当组件被从DOM中清除后，触发计时器清零
    }
    render() {
      return (
        <>
          <div> 用到state来传递时间参数</div>
          <div>{this.state.date.toLocaleTimeString()}</div>
        </>
      );
    }
  }

  return (
    <>
      <div>111111111111111</div>
      <div>
        <C />
      </div>
    </>
  );
};
export default Test;
