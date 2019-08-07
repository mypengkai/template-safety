/*
  消息推送
 */
var back = null;

/**
 * 消息推送的入口
 * @param type
 */
function messagePushReady(type, content, payload, title){
  if(type==='create'){
    plus.push.createMessage(content, payload,{
      title: title,
      icon: '../img/shtoone80.png'
    });
    back
  }else if(type==='remove'){
    plus.push.remove(title,content,payload,undefined)
  }else if(type==='click'){
    plus.push.addEventListener('click', back, true)
  }else if(type==='getClientId'){
    setTimeout(function(){
      var clientInfo=plus.push.getClientInfo();
      var pushInfo={};
      pushInfo.clientid=clientInfo.clientid;
      var imei=plus.device.imei;
      if(imei==="" || imei===null || imei===undefined){
        imei='';
      }else if(imei.length>1){
        imei=imei.split(",")[0];
      }
      pushInfo.imei=imei;
      var imsi=plus.device.imsi;
      if(imei===null || imei.length===0){
        imsi='';
      }else{
        imsi=imsi[0];
      }
      pushInfo.imsi=imsi;
      pushInfo.model=plus.device.model;
      pushInfo.vendor=plus.device.vendor;
      var uuid=plus.device.uuid;
      if(uuid==="" || uuid===null || uuid===undefined){
        uuid='';
      }else if(uuid.length>1){
        uuid=uuid.split(",")[0];
      }
      var u = navigator.userAgent, app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isAndroid){
        pushInfo.phoneType='Android';
      }else if(isiOS){
        pushInfo.phoneType='IOS';
      }else{
        pushInfo.phoneType='';
      }
      pushInfo.uuid=uuid;
      
      back(pushInfo)
    },2000)
  }
}


export const messagePush = function(type, content, payload, title, callback){
  back = callback;
  if(window.plus){
    messagePushReady(type, content, payload, title);
  }else{
    document.addEventListener('plusready', messagePushReady(type, content, payload, title), false);
  }
}
