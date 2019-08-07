let back = null;

// 拍照
function getImage() {
	let cmr = plus.camera.getCamera();
	cmr.captureImage(function (p) {
		let fileName = p.substring(p.lastIndexOf('/') + 1, p.length);
		//先压缩图片
		compressImage(p, fileName, (res) => {
			plus.io.resolveLocalFileSystemURL(res, function (entry) {
				entry.file(function (file) {
					let reader = new plus.io.FileReader();
					reader.onloadend = function (e) {
						let blob = dataURLtoBlob(e.target.result);
						let newfile = new File([blob], file.name);
						let path = 'file://' + plus.io.convertLocalFileSystemURL(entry.toLocalURL())
						if (back) {
							back('1', newfile, path)
						}
					}
					reader.readAsDataURL(file);

				})
			}, function (e) {
				console.log('读取拍照文件错误：' + e.message);
			});
		})
	}, function (e) {
		console.log('失败：' + e.message);
		if (back) {
			back('0', '取消拍照')
		}
	}, { filename: '_doc/camera/', index: 1 });
}

//从相册选择图片
function getSelectImage(mediaNum) {
	let cmr = plus.gallery.pick(path => {
		for (let p of path.files) {
			let fileName = p.substring(p.lastIndexOf('/') + 1, p.length);
			//先压缩图片
			compressImage(p, fileName, (res) => {
				plus.io.resolveLocalFileSystemURL(res, function (entry) {
					entry.file(function (file) {
						let reader = new plus.io.FileReader();
						reader.onloadend = function (e) {
							let blob = dataURLtoBlob(e.target.result);
							let newfile = new File([blob], file.name);

							let path = 'file://' + plus.io.convertLocalFileSystemURL(entry.toLocalURL())
							if (back) {
								back('1', newfile, path)
							}
						}
						reader.readAsDataURL(file);

					})
				}, function (e) {
					console.log('读取拍照文件错误：' + e.message);
				});
			})
		}
	}, e => {
		console.log('取消选择图片')
		if (back) {
			back('0', '取消选择相册')
		}
	}, {
		filter: "image", multiple: true, maximum: mediaNum, system: false, onmaxed: function () {
			console.log('最多只能选择' + mediaNum + '张图片')
		}
		})
}
// 录像
function getVideo() {
	var cmr = plus.camera.getCamera();
	var svr = cmr.supportedVideoResolutions[0];
	cmr.startVideoCapture(function (p) {
		plus.io.resolveLocalFileSystemURL(p, function (entry) {
			entry.file(function (file) {
				var reader = new plus.io.FileReader();
				reader.onloadend = function (e) {
					var blob = dataURLtoBlob(e.target.result);
					let newfile = new File([blob], file.name);
					let path = 'file://' + plus.io.convertLocalFileSystemURL(entry.toLocalURL())
					if (back) {
						back('1', newfile, path)
					}
				}
				reader.readAsDataURL(file);
			})
		}, function (e) {
			console.log('读取录像文件错误：' + e.message);
		});
	}, function (e) {
		console.log('失败：' + e.message);
		if (back) {
			back('0', '取消录像')
		}
	}, { filename: '_doc/camera/', index: 1, videoMaximumDuration: 60, resolution: svr });
}

function cameraPlusReady(type, mediaNum) {
	// 获取摄像头目录对象
	plus.io.resolveLocalFileSystemURL('_doc/', function (entry) {
		entry.getDirectory('camera', { create: true }, function (dir) {
			if (type === 'video') {
				getVideo()
			} else if (type === 'img') {
				getImage()
			} else if (type === 'selectImg') {
				getSelectImage(mediaNum)
			}
		}, function (e) {
			console.log('Get directory "camera" failed: ' + e.message);
		});
	}, function (e) {
		console.log('Resolve "_doc/" failed: ' + e.message);
	});
}

export const openCamera = function (type, mediaNum, callback) {
	back = callback;
	if (window.plus) {
		cameraPlusReady(type, mediaNum);
	} else {
		document.addEventListener('plusready', cameraPlusReady(type), false);
	}
}

//转换为BLOB对象
function dataURLtoBlob(dataurl) {
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
}

//压缩图片
function compressImage(src, fileName, cb) {
	plus.zip.compressImage({
		src: src,
		dst: "_doc/" + fileName,
		quality: 20,
		overwrite: true
	},
		function (event) {
			let target = event.target; // 压缩转换后的图片url路径，以"file://"开头
			cb(target)
		}, function (error) {
			cb(src)
			console.log("Compress error!");
		});
}
