import router from '../../router'
import { messagePush } from './push.js'

document.addEventListener("plusready", function () {
  plus.runtime.setBadgeNumber(0);
  plus.push.setAutoNotification(true);
  // 监听点击消息事件
  plus.push.addEventListener("click", function (msg) {
    /*
   根据需要填写 2
       */
    router.push({
      path: '/schedule'
    })

  }, false);
  // 监听在线消息事件 1
  plus.push.addEventListener("receive", function (msg) {
    //ios 推送循环处理
    var u = navigator.userAgent
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    if (isiOS) {
      switch (msg.payload) {
        case "localMSG": break;
        default: messagePush('create', msg.content, "localMSG", msg.payload.type, function () {

        });
      }

    } else {
      messagePush('create', msg.content, msg.payload, msg.payload.type, function () {
      });
    }


  }, false);
}, false);
//第三方启动app 3
// 程序从后台被第三方程序调用并传入新意图事件。 此时程序将切换到前台运行，若应用需要处理新意图的事件行为，
// 可通过注册事件监听器来监听“newintent”事件，此事件需要在plusready事件后通过document进行注册。
document.addEventListener("newintent", function () {
  // alert("三方启动")
  openWebviewFromOthers();
});
// document.addEventListener("newintent", function() {});

/** 消息跳转 ***/
function messageHerf(msg) {
  /*根据需要填写*/
  // var payload=JSON.parse(msg.payload);
  // alert("触发了")
  router.push({
    path: '/schedule'
    // query: {
    //   processId: payload,
    //   checkState: '1',
    //   tabState: 'receive',
    //   checkType: '1'
    // }
  })
}


/**  第三方应用启动app  4***/
function openWebviewFromOthers() {
  var args = plus.runtime.arguments;
  // alert("内容"+JSON.stringify(args))
  if (args) {
    // alert("111"+JSON.stringify(args))
    // messageHerf(args);
    router.push({
      path: '/schedule'
    })
  }
}
