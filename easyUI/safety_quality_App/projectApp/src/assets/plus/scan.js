
var waiting = null;
var ws=null,wo=null;
var scan=null,domready=true;
var back = null;
var firstLoad = true;
// H5 plus事件处理
function plusReady1(){
	if(!window.plus||!domready){
		return;
	}
	// 获取窗口对象
	//ws=plus.webview.currentWebview();
	//wo=ws.opener();
	// 开始扫描
	//ws.addEventListener('loaded', function(){
		scan=new plus.barcode.Barcode('bcid');
	    scan.onmarked=onmarked;
	    scan.start({conserve:true,filename:'_doc/barcode/'});
	//}, false);
	// 显示页面并关闭等待框
	//ws.show('pop-in');
	//ws.reload()
    waiting.close();
}

// 二维码扫描成功
function onmarked(type, result, file){
    switch(type){
    	case plus.barcode.QR:
			type = 'QR';
			break;
    	case plus.barcode.EAN13:
			type = 'EAN13';
			break;
    	case plus.barcode.EAN8:
			type = 'EAN8';
			break;
    	default:
			type = '其它'+type;
			break;
    }
    result = result.replace(/\r\n/g, '');
    scaned(type, result, file);
}

function scaned(t, r, f){
	var d = new Date();
	if(r.indexOf('http://')==0  || r.indexOf('https://')==0){
		plus.nativeUI.confirm(r, function(i){
			if(i.index == 0){
				plus.runtime.openURL(r);
			}
		}, '', ['打开', '取消']);
	} else{
		if(back)
			back(r)
		//plus.nativeUI.alert("扫描结果：" + t + "，" + r);
	}
}

export const closeScan = function(){
	if(scan)
		scan.close();
}

export const openScan = function(callback){
	waiting = plus.nativeUI.showWaiting();
	back = callback;
	if(window.plus){
		plusReady1();
	}else{
		document.addEventListener('plusready', plusReady1, false);
	}
	// 监听DOMContentLoaded事件
	/* document.addEventListener('DOMContentLoaded', function(){
		domready=true;
		plusReady1();
	}, false) */
}

// 从相册中选择二维码图片
export const scanPicture = function(){
    plus.gallery.pick(function(path){
	    plus.barcode.scan(path,onmarked,function(error){
			plus.nativeUI.alert('无法识别此图片');
		});
    }, function(err){
        console.log('Failed: '+err.message);
    });
}