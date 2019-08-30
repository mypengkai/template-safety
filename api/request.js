import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
//import { Toast } from 'vue-ydui/dist/lib.rem/dialog';
//Vue.prototype.fileURL = 'http://192.168.1.134:8080/SafetyQualityPatrol/img/server/'
//axios.defaults.baseURL = 'http://192.168.1.134:8080/SafetyQuality/rest' // 徐浩  

Vue.prototype.fileURL = 'http://192.168.10.42:8080/CATDPS/img/server/'
// Vue.prototype.fileURL = 'http://192.168.1.110:8080/CATDPS/img/server/'
axios.defaults.baseURL = 'http://192.168.10.42:8080/CATDPS/rest' // 任健'
//axios.defaults.baseURL = 'http://192.168.1.110:8080/CATDPS/rest' // 任健'
//axios.defaults.baseURL = 'http://192.168.1.134:8080/SafetyQuality/rest' // 徐浩'
//axios.defaults.baseURL = 'http://192.168.1.102:8080/SafetyQuality/rest' // 徐浩'
Vue.prototype.axios = axios
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

//查看安全检查列表详情
export const CheckSelfListDetail = (data) => {
	return axios.post(`/NewSafetyPatrolController/searchOne`, data).then(res => res.data)
}

//获登录token
export const getToken = (params) => {
	return axios.get(`/tokens?username=${params.username}&password=${params.password}`).then(res => res.data)
}
//自主检查列表查询
export const safetySelfList = (params) => {
	return axios.post("/NewSafetyPatrolController/searchList", params).then(res => res.data)
}
//（文件上传）
export const safetyAddResult = (params) => {
	return axios.post("/safetyPatrol/pictureUpload", params).then(res => res.data)
}
//自检新增安全检查
export const addSafety = (params) => {
	return axios.post("/NewSafetyPatrolController/add", params).then(res => res.data)
}
//安全隐患条目
export const getDanger = () => {
	return axios.get(`/Sq_jc_HiddenDangerController/getListTree1`).then(res => res.data)
}
//获取通知人人列表
export const Person = (data) => {
	return axios.get(`/main/user?offset=${data.offset}&limit=${data.limit}`).then(res => res.data)
}
//获取联系人列表
export const getPerson = (data) => {
	return axios.get(`/main/getUserByDepart?offset=${data.offset}&limit=${data.limit}`).then(res => res.data)
}
//整改列表
export const rectifyList = (data) => {
	return axios.post(`/SafetyRectification/list`, data).then(res => res.data)
}
// 自检整改单下发
export const DownCheck = (data) => {
	return axios.post(`/SafetyRectification/appointRectification`, data).then(res => res.data)
}
//自检隐患整改(明细)
export const selfCheck=(data)=>{
	return axios.post(`/SafetyRectification/details`,data).then(res=>res.data)
}
//整改复核结果提交
export const submitResult=(data)=>{
	return axios.post(`/SafetyRectification/Reply`,data).then(res=>res.data)
}
// 获取用户信息
export const getUserobj = () => {
	return axios.get("/main/getUserMessage", { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => res.data)
}
//整改列表查询
export const getZGlist = (params)=>{
	return axios.post("/SafetyRectification/list",params).then(res=>res.data)
}
//统计隐患整改
export const getNum = (params)=>{
	return axios.post("/CountController/searchRectification",params).then(res=>res.data)
}
//统计隐患数
export const getYinhuan= (params)=>{
	return axios.post("/CountController/searchHidden",params).then(res=>res.data)
}
// 隐患等级数
export const getHiddens=(params)=>{
	return axios.post("/CountController/searchhdGrade",params).then(res=>res.data) 
}