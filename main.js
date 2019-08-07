// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import qs from 'qs'

import '@/tool'
import '@/style/index.less'
import '@/assets/icon/iconfont.css'
import YDUI from 'vue-ydui' /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css'
import 'vue-ydui/dist/ydui.flexible.js'
import VueHtml5Plus from 'vue-html5plus'
// import vueztree from 'vue-ztree-2.0/dist/vue-ztree-2.0.umd.min.js'
// import 'vue-ztree-2.0/dist/vue-ztree-2.0.css'
// 路由白屏(处理兼容)
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
import 'jquery'
import 'ztree'
import 'ztree/css/metroStyle/metroStyle.css'
import VueScroller from 'vue-scroller'
//处理app推送消息和跳转
import './assets/plus/handlePush'
// 图片预览插件
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
import store from './store'
// 时间格式
import moment from 'moment'
Vue.use(VueScroller)
Vue.use(YDUI);
Vue.use(VueHtml5Plus);

// Vue.use(vueztree)
Vue.config.productionTip = false
//路由 拦截
// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem("token")
//   if (token) {
//     next()
//   }
//   else if (to.path != "/login") {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

// 时间全局过滤
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)
})


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
