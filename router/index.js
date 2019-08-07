import Vue from 'vue'
import Router from 'vue-router'

//登录
import login from '@/views/login/index'
//首页
import home from "@/views/home/index"
import dashboard from "@/views/home/dashboard/index"
//组织机构
import contacts from '@/views/home/contacts/index'
//我（个人信息）
import information from '@/views/home/information/index'
//消息
import schedule from "@/views/home/schedule/index"
//安全主页
import safetyMenu from "@/views/safety/safetyMenu"
//安全自主检查
import safetySelfCheck from "@/views/safety/safetySelfCheck"
Vue.use(Router)
const router = new Router({
  routes: [
    //登录页
    {
      path: '/login',
      name: "login",
      component: login
    },
    //主页
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: home,
      children: [{
        path: 'dashboard',
        name: 'dashboard',
        component: dashboard
      },
      //联系人
      {
        path: 'contacts',
        name: 'contacts',
        component: contacts
      },
      //我(信息)
      {
        path: 'information',
        name: 'information',
        component: information
      },
      //消息
      {
        path: 'schedule',
        name: 'schedule',
        component: schedule
      }
      ]
    },
    //安全主页
    {
      path:'/safetyMenu',
      name:'safetyMenu',
      component:safetyMenu
    },

    {
      path:'/safetySelfCheck',
      name:'safetySelfCheck',
      component:safetySelfCheck
    }
  ]
})

export default router