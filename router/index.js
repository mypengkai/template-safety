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
//安全自主检查
import safetySelfCheck from "@/views/safety/safetySelfCheck"
//自检整改单下发
import safetySelfzgxf from "@/views/safety/safetyzgxf"
// 新增自主检查
import safetySelfAdd from "@/views/safety/safetySelfAdd"
//整改
import safetySelfYhzg from "@/views/safety/safetySelfYhzg"
//复核
import safetySelfZgfh from "@/views/safety/safetySelfZgfh"
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
   
    // 安全自主检查列表
    {
      path:'/safetySelfCheck',
      name:'safetySelfCheck',
      component:safetySelfCheck
    },
    //自主整改下发
    {
      path:'/safetySelfzgxf',
      name:'safetySelfzgxf',
      component:safetySelfzgxf
    },
    // 新增自主检查
    {
      path:'/safetySelfAdd',
      name:'safetySelfAdd',
      component:safetySelfAdd
    },
    // 整改页面
    {
      path:'/safetySelfYhzg',
      name:'safetySelfYhzg',
      component:safetySelfYhzg
    },
    // 复核页面
    {
      path:'/safetySelfZgfh',
      name:'safetySelfZgfh',
      component:safetySelfZgfh
    }
  ]
})

export default router