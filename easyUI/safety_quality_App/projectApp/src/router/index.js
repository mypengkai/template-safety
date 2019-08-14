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
import safetyzgxf from "@/views/safety/safetyzgxf"
// 新增自主检查
import safetySelfAdd from "@/views/safety/safetySelfAdd"
//整改
import safetySelfYhzg from "@/views/safety/safetySelfYhzg"
//复核
import safetySelfZgfh from "@/views/safety/safetySelfZgfh"
//过程查看
import safetySelfDetail from "@/views/safety/safetySelfDetail"
// 整改明细页面
import safetyDetailSee from "@/views/safety/safetyDetailSee"
//隐患
import danger from "@/views/common/danger"
//整改人
import rectify from "@/views/common/rectify"
// 抄送人
import setCopy from "@/views/common/setCopy"
//自检筛选
import filter from "@/views/common/filter"
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
      //组织机构
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
      path: '/safetySelfCheck',
      name: 'safetySelfCheck',
      component: safetySelfCheck
    },
    //自主整改下发
    {
      path: '/safetyzgxf',
      name: 'safetyzgxf',
      component: safetyzgxf
    },
    // 新增自主检查
    {
      path: '/safetySelfAdd',
      name: 'safetySelfAdd',
      component: safetySelfAdd
    },
    // 整改页面
    {
      path: '/safetySelfYhzg',
      name: 'safetySelfYhzg',
      component: safetySelfYhzg
    },
    // 复核页面
    {
      path: '/safetySelfZgfh',
      name: 'safetySelfZgfh',
      component: safetySelfZgfh
    },
    //过程查看
    {
      path: '/safetySelfDetail',
      name: 'safetySelfDetail',
      component: safetySelfDetail
    },
    // 整改明细页面
    {
      path: '/safetyDetailSee',
      name: "safetyDetailSee",
      component: safetyDetailSee
    },
    //隐患条目页面
    {
      path: "/danger",
      name: "danger",
      component: danger
    },
    //整改人
    {
      path: '/rectify',
      name: "rectify",
      component: rectify
    },
    //抄送人
    {
      path: "/setCopy",
      name: 'setCopy',
      component: setCopy
    },
    //自检筛选
    {
      path: '/filter',
      name: "filter",
      component: filter
    }
  ]
})

export default router