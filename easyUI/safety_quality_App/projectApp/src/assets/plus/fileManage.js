var back = null;
function filePlusReady(url){
	plus.runtime.openFile( url, {}, function ( e ) {
		plus.nativeUI.alert( "无法打开此文件："+e.message );
	});
}

export const openFile = function(url, callback){
	back = callback;
	if(window.plus){
		filePlusReady(url);
	}else{
		document.addEventListener('plusready', filePlusReady(url), false);
	}
}