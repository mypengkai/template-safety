// import {post} from '../../axios/ajax'
import axios from 'axios'

const post = (url, params,headers, callback) => {
	axios.post(url, qs.stringify(params), headers||{}).then((res) => {
		if(typeof callback === 'function' && res) {
      callback(res.data)
    }
	},(err) => {
		console.log(err);
	}).catch(this.handleError)
}
export const urls = {
  initClientId:  baseURL + '/igexinPush/initClientId'  //初始化clientId
}

/**
 * 服务器注册个推信息
 * @param params
 * @param callback
 */
// {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
export const initGetui = (params, callback) => { post(urls.initClientId, params, callback) }
