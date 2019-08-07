import router from '../../router'

export const goback = function(hide){
	router.go(-1)
}

// 处理点击事件
var openw=null,waiting=null;
/**
 * 打开新窗口
 * @param {URIString} id : 要打开页面url
 * @param {boolean} wa : 是否显示等待框
 * @param {boolean} ns : 是否不自动显示
 * @param {JSON} ws : Webview窗口属性
 */
export const openView = function(id,wa,ns,ws){
	if(openw){//避免多次打开同一个页面
		return null;
	}
	if(window.plus){
		wa&&(waiting=plus.nativeUI.showWaiting());
		ws=ws||{};
		ws.scrollIndicator||(ws.scrollIndicator='none');
		ws.scalable||(ws.scalable=false);
		var pre='';//'http://192.168.1.178:8080/h5/';
		openw=plus.webview.create(pre+id,id,ws);
		ns||openw.addEventListener('loaded',function(){//页面加载完成后才显示
//		setTimeout(function(){//延后显示可避免低端机上动画时白屏
			openw.show(as);
			waiting&&waiting.close();
			waiting=null;
//		},200);
		},false);
		openw.addEventListener('close',function(){//页面关闭后可再次打开
			openw=null;
		},false);
		return openw;
	}
	return null;
};

// H5 plus事件处理
function plusReady(){
	// 隐藏滚动条
	let ws = plus.webview.currentWebview();
	ws.setStyle({scrollIndicator:'none'});
	//ws.show();
	// Android处理返回键
	plus.key.addEventListener('backbutton',function(){
		var currentRoute = router.currentRoute;
		console.log(currentRoute.path)
		if(currentRoute.path === '' || currentRoute.path === '/' || currentRoute.path === '/tab'){
			('iOS'==plus.os.name)?plus.nativeUI.confirm('确认退出？', function(e){
				if(e.index>0){
					plus.runtime.quit();
				}
			}, 'HelloH5', ['取消','确定']):(confirm('确认退出？')&&plus.runtime.quit());
		}else{
			goback()
		}
	},false);
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener('plusready',plusReady,false);
}
