var dtask = null;
var back = null;
function downloadPlusReady(url){
	/* if ( dtask ) {
		return;
	} */
    var options = {method:"GET"};
	dtask = plus.downloader.createDownload( url, options );
    dtask.addEventListener( "statechanged", function(task,status){
    	if(!dtask){return;}
    	switch(task.state) {
    		case 1: // 开始
    			back( false ,"开始下载...", task );
				break;
    		case 2: // 已连接到服务器
    			back( false, "链接到服务器...", task );
				break;
    		case 3:	// 已接收到数据
    			back( false, '下载中：' + task.downloadedSize+'/'+task.totalSize, task );
				break;
    		case 4:	// 下载完成
    			back( true, "下载完成：" + task.totalSize+'/'+task.totalSize, task );
				break;
    	}
    } );
    dtask.start();
}

export const cancelDownloadTask = function(){
	if(dtask)
		dtask.abort();
	dtask = null;
	console.log( "取消下载任务！" );
}

export const createDownload = function(url, callback){
	back = callback;
	if(window.plus){
		downloadPlusReady(url);
	}else{
		document.addEventListener('plusready', downloadPlusReady(url), false);
	}
}


