var back=null

function onPlusRead(){
  console.log("plus.runtime.launcher: "+plus.runtime.launcher);
  var args= plus.runtime.arguments;
  if(args){
    // 处理args参数，如打开新页面等
    back(args)
  }else{
    back
  }
}

export const loadThreeApp = function(callback){
  back = callback;
  if(window.plus){
    onPlusRead();
  }else{
    document.addEventListener('plusready', onPlusRead, false);
    // 处理从后台恢复
    document.addEventListener('newintent',onPlusRead, false);
  }
}
