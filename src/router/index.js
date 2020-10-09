import Vue from 'vue'
import Router from 'vue-router'
/* eslint-disable */
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
import baseRouter from './modules/base'
import patrolRouter from './modules/patrol'
import trainingRouter from './modules/training'
import vehicleMentRouter from './modules/vehicleMent'
import onlineTrainingRouter from './modules/onlineTraining'
import doorRouter from './modules/door'
import perimeterRouter from './modules/perimeter'
import protectRouter from './modules/protect'
import logisticsRouter from './modules/logistics'
import trainRouter from './modules/train'
import politicsRouter from './modules/politics'
import campManageRouter from './modules/campManage'
import examRouter from './modules/exam'
import UAVCounter from './modules/UAVCounter.js'
import IotRouter from './modules/iot.js'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/common/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/common/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/common/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/common/error-page/401'),
    hidden: true
  },
  {
    path: '/base',
    component: Layout,
    redirect: '',
    children: baseRouter
  },
  {
    path: '/patrol',
    component: Layout,
    redirect: '',
    children: patrolRouter
  },
  {
    path: '/training',
    component: Layout,
    redirect: '',
    children: trainingRouter
  },
  {
    path: '/vehicleMent',
    component: Layout,
    redirect: '',
    children: vehicleMentRouter
  },
  {
    path: '/onlineTraining',
    component: Layout,
    redirect: '',
    children: onlineTrainingRouter
  },
  {
    path: '/door',
    component: Layout,
    redirect: '',
    children: doorRouter
  },
  {
    path: '/perimeter',
    component: Layout,
    redirect: '',
    children: perimeterRouter
  },
  {
    path: '/protect',
    component: Layout,
    redirect: '',
    children: protectRouter
  },
  {
    path: '/logistics',
    component: Layout,
    redirect: '',
    children: logisticsRouter
  },
  {
    path: '/train',
    component: Layout,
    redirect: '',
    children: trainRouter
  },
  {
    path: '/politics',
    component: Layout,
    redirect: '',
    children: politicsRouter
  },
  {
    path: '/campManage',
    component: Layout,
    redirect: '',
    children: campManageRouter
  },
  {
    path: '/training',
    component: Layout,
    redirect: '',
    children: examRouter
  },
  {
    path: '/uav',
    component: Layout,
    redirect: '',
    children: UAVCounter
  },
  {
    path: '/IOT',
    component: Layout,
    redirect: '',
    children: IotRouter
  },
  {
    path: '/',
    component: Layout,
    redirect: '',
    children: [{
      path: 'campDynamics',
      component: () => import('@/views/campDynamics/index'),
      name: 'campDynamics',
      meta: {
        title: '营区动态',
        icon: 'dashboard',
        noCache: true,
        affix: true
      }
    }]
  }
  /*{
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/common/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: true,
        affix: true
      }
    }]
  }*/
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
