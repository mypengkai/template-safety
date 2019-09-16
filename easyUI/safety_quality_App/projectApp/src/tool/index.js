import Vue from 'vue'
const tool = { 
  }
 tool.dateToOb = (curDate = new Date()) => {
    const year = curDate.getFullYear()
    const month = (curDate.getMonth() + 1) > 9 ? `${curDate.getMonth() + 1}` : `0${curDate.getMonth() + 1}`
    const day = curDate.getDate() > 9 ? curDate.getDate() : `0${curDate.getDate()}`
    const hour = curDate.getHours() > 9 ? curDate.getHours() : `0${curDate.getHours()}`
    const min = curDate.getMinutes() > 9 ? curDate.getMinutes() : `0${curDate.getMinutes()}`
    const sec = curDate.getSeconds() > 9 ? curDate.getSeconds() : `0${curDate.getSeconds()}`
    return `${month}月${day}日`
}
//获取UUID
tool.uuid=()=>{
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
//判断字符串是否为空
tool.isEmptyStr = function (str) {
    if ((undefined === str) || (str === null) || (str === '') || (str.trim().length === 0)) {
      return true
    } else {
      return false
    }
  }
  //清空store里面的参数
// 防抖
tool._debounce = function(fn, delay) {

  var delay = delay || 200;
  var timer;
  return function () {
      var th = this;
      var args = arguments;
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(function () {
          timer = null;
          fn.apply(th, args);
      }, delay);
  };
}

// 节流
tool._throttle = function(fn, interval) {
  var last;
  var timer;
  var interval = interval || 200;
  return function () {
      var th = this;
      var args = arguments;
      var now = +new Date();
      if (last && now - last < interval) {
          clearTimeout(timer);
          timer = setTimeout(function () {
              last = now;
              fn.apply(th, args);
          }, interval);
      } else {
          last = now;
          fn.apply(th, args);
      }
  }
}

Vue.prototype.$tool = tool
export default  tool 