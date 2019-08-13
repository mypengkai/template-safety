import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
//import { Toast } from 'vue-ydui/dist/lib.rem/dialog';
// Vue.prototype.fileURL = 'http://114.55.94.198:8084/SafetyQualityPatrol/img/server/'
// axios.defaults.baseURL = 'http://114.55.94.198:8084/SafetyQualityPatrol/rest' // 线上  
Vue.prototype.fileURL = 'http://192.168.10.42:8080/CATDPS/img/server/'
axios.defaults.baseURL = 'http://192.168.10.42:8080/CATDPS/rest' // 任健'
// Vue.prototype.axios = axios
// // 请求拦截
// // axios.defaults.headers.get['content-type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(config => {
	let token = localStorage.getItem("token")
	if (token) {
		config.headers['X-AUTH-TOKEN'] = token
	}
	if (config.method === 'get') {
		config.data = {
			unused: 0
		} // 这个是关键点，加入这行就可以了
		config.params = {
			...config.params
		}
	}
	return config;
}, error => {
	return Promise.reject(error);
});
//  响应拦截
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	const data = response.data;
	if (data) {
		// token 过期  跳转到登录页
		if (data.success == -3) {
			router.push({ path: '/login' });
			localStorage.removeItem('token');
		}
	}

	return response;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});
// //可用于跨域请求
export const xhrrequest = (method, url, params, callback) => {
	var xhr = null;
	xhr = new plus.net.XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function () {
		switch (xhr.readyState) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				//xhr请求已完成
				if (xhr.status == 200) {
					callback(xhr.response);
				} else {
					console.log("xhr请求失败：" + xhr.status);
				}
				break;
			default:
				break;
		}
	}
	xhr.open(method ? method : "GET", url);
	xhr.send(JSON.stringify(params));
}
//获登录token
export const getToken = (params) => {
	return axios.get(`/tokens?username=${params.username}&password=${params.password}`).then(res => res.data)
}
//自主检查列表查询
export const safetySelfList = (params) => {
	return axios.post("/NewSafetyPatrolController/searchList", params).then(res => res.data)
}
//自检新增
export const addSafety = (params) => {
	return axios.post("/NewSafetyPatrolController/add", params).then(res => res.data)
}
