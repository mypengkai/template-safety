import { xhrrequest } from '@/api/request.js'
const properties = require('@/api/properties.js')
const urls = {
	check: properties.pgyAddress + '/apiv2/app/check'      // 蒲公英api地址
}
var callback = null;
/**
 * 检查是否有更新
 */
function versionready() {
	let buildVersion = plus.runtime.version;           // 客户端版本号
	let platform = plus.os.name;                     // 操作系统名称
	if (platform.toLowerCase() == 'android') {
		xhrrequest("POST", urls.check
			+ '?_api_key=' + properties.pgyKeys.apiKey                    // 蒲公英api key
			+ '&appKey=' + properties.pgyKeys.androidAppKey               // appkey
			+ '&buildVersion=' + buildVersion, {},
			(res) => {
				
				if (res.data.buildHaveNewVersion && res.data.buildVersion != buildVersion) {
					plus.nativeUI.confirm("发现新版本" + res.data.buildVersion + "，是否立即更新", function (i) {
						if (0 == i.index) {
							let dtask = plus.downloader.createDownload(res.data.downloadURL, {}, function (d, status) {
								if (status == 200) { // 下载成功
									var path = d.filename;
									plus.runtime.install(path);  // 安装下载的apk文件
								} else {//下载失败
									console.log("下载失败: " + status);
								}
							});
							dtask.start();     // 启动线程
							this.$store.commit('changeUpdateTip', false)
						} else {
							//取消
							this.$store.commit('changeUpdateTip', false)
						}
					}, "版本更新提醒", ["立即更新", "取 消"]);
				} else {
					if (callback) {
						callback()
					}
				}
			})
	} else if (platform.toLowerCase() == 'ios') {
		xhrrequest("POST", urls.check
			+ '?_api_key=' + properties.pgyKeys.apiKey
			+ '&appKey=' + properties.pgyKeys.iosAppKey
			+ '&buildVersion=' + buildVersion, {},
			(res) => {
				if (res.data.buildHaveNewVersion && res.data.buildVersion != buildVersion) {
					plus.nativeUI.confirm("发现新版本" + res.data.buildVersion + "，是否立即更新", function (i) {
						if (0 == i.index) {
							plus.runtime.openURL(res.data.downloadURL);
							this.$store.commit('changeUpdateTip', false)
						} else {
							//取消
							this.$store.commit('changeUpdateTip', false)
						}
					}, "版本更新提醒", ["立即更新", "取 消"]);
				} else {
					if (callback) {
						callback()
					}
				}
			})
	}
}
export const checkVersion = (cb) => {
	callback = cb
	if (window.plus) {
		versionready();
	} else {
		document.addEventListener('plusready', versionready, false);
	}
}
