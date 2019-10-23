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
//安全自主巡检页面
import safetyMenu from "@/views/safety/safetyMenu"
//安全计划巡检页面
import safetyPlanMenu from "@/views/safety/safetyPlanMenu"
//安全自主检查
import safetySelfCheck from "@/views/safety/safetySelfCheck"
//整改列表
import safetySelfZG from "@/views/safety/safetySelfZG"
//复核列表
import safetySelfFH from "@/views/safety/safetySelfFH"
//自检整改单下发
import safetyzgxf from "@/views/safety/safetyzgxf"
//计划整改单下发
import safetyjhxf from "@/views/safety/safetyjhxf"
// 新增自主检查
import safetySelfAdd from "@/views/safety/safetySelfAdd"
// 新增计划检查
import safetyPlanAdd from "@/views/safety/safetyPlanAdd"
//整改
import safetySelfYhzg from "@/views/safety/safetySelfYhzg"
//计划整改
import safetySelfJHzg from "@/views/safety/safetySelfJHzg"
//复核
import safetySelfZgfh from "@/views/safety/safetySelfZgfh"
//计划复核
import safetySelfJhfh from "@/views/safety/safetySelfJhfh"
//过程查看
import safetySelfDetail from "@/views/safety/safetySelfDetail"
// 整改明细页面
import safetyDetailSee from "@/views/safety/safetyDetailSee"
// 计划整改明细页面
import safetyDetailSeeJH from "@/views/safety/safetyDetailSeeJH"
//隐患
import danger from "@/views/common/danger"
//自检筛选
import filter from "@/views/common/filter"
//自检筛选
import Planfilter from "@/views/common/Planfilter"
//联系人列表
import CheckPerson from "@/views/common/CheckPerson"
//联系人列表
import notifier from "@/views/common/notifier"
//最终查看列表
import safetyDoneList from "@/views/safety/safetyDoneList"
//安全计划列表
import safetyList from "@/views/safety/safetyList"
//新增安全计划列表
import addPlan from "@/views/safety/addPlan"
// 分部分项
import branch from "@/views/safety/branch"
// 通知人列表
import ZGren from "@/views/common/ZGren"
// 巡检性质
import CheckXz from "@/views/safety/CheckXz"
// 隐患条目
import CheckItem from "@/views/safety/CheckItem"
// 计划详情
import PlanDetail from "@/views/safety/PlanDetail"
// 
Vue.use(Router)
const router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
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
          path: '/contacts',
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
    {
      path: "/safetyMenu",
      name: "safetyMenu",
      component: safetyMenu
    },
    {
      path: "/safetyPlanMenu",
      name: 'safetyPlanMenu',
      component: safetyPlanMenu
    },
    // 安全自主检查列表
    {
      path: '/safetySelfCheck',
      name: 'safetySelfCheck',
      component: safetySelfCheck
    },
    // 安全计划检查列表
    {
      path: '/safetyPlanAdd',
      name: 'safetyPlanAdd',
      component: safetyPlanAdd
    },
    //整改列表
    {
      path: '/safetySelfZG',
      name: 'safetySelfZG',
      component: safetySelfZG
    },
    //复核列表
    {
      path: '/safetySelfFH',
      name: 'safetySelfFH',
      component: safetySelfFH
    },
    //自主整改下发
    {
      path: '/safetyzgxf',
      name: 'safetyzgxf',
      component: safetyzgxf,
      meta: {
        keepAlive: true
      }
    },
    //计划整改下发
    {
      path: '/safetyjhxf',
      name: 'safetyjhxf',
      component: safetyjhxf,
      meta: {
        keepAlive: true
      }
    },
    // 新增自主检查
    {
      path: '/safetySelfAdd',
      name: 'safetySelfAdd',
      component: safetySelfAdd
    },
    // 下发整改页面
    {
      path: '/safetySelfYhzg',
      name: 'safetySelfYhzg',
      component: safetySelfYhzg
    },
    {
      path: '/safetySelfJHzg',
      name: 'safetySelfJHzg',
      component: safetySelfJHzg
    },
    // 下发复核页面
    {
      path: '/safetySelfZgfh',
      name: 'safetySelfZgfh',
      component: safetySelfZgfh
    },
    // 下发计划复核页面
    {
      path: '/safetySelfJhfh',
      name: 'safetySelfJhfh',
      component: safetySelfJhfh
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
    {
      path: '/safetyDetailSeeJH',
      name: 'safetyDetailSeeJH',
      component: safetyDetailSeeJH
    },
    //隐患条目页面
    {
      path: "/danger",
      name: "danger",
      component: danger
    },
    //自检筛选
    {
      path: '/filter',
      name: "filter",
      component: filter
    },
    //计检筛选
    {
      path: '/Planfilter',
      name: "Planfilter",
      component: Planfilter
    },
    //联系人页面
    {
      path: '/CheckPerson',
      name: "CheckPerson",
      component: CheckPerson
    },
    //通知人页面
    {
      path: '/notifier',
      name: "notifier",
      component: notifier
    },
    //整改最终查看列表
    {
      path: '/safetyDoneList',
      name: "safetyDoneList",
      component: safetyDoneList
    },
    //安全计划列表
    {
      path: '/safetyList',
      name: 'safetyList',
      component: safetyList
    },
    //新增安全计划
    {
      path: '/addPlan',
      name: 'addPlan',
      component: addPlan
    },

    // 整改人列表
    {
      path: '/ZGren',
      name: 'ZGren',
      component: ZGren
    },
    {
      path: '/branch',
      name: 'branch',
      component: branch
    },
    {
      path: '/CheckXz',
      name: 'CheckXz',
      component: CheckXz
    },
    {
      path: '/CheckItem',
      name: 'CheckItem',
      component: CheckItem
    },
    {
      path: '/PlanDetail',
      name: 'PlanDetail',
      component: PlanDetail
    }

  ]
})

export default router
