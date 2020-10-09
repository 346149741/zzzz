/** When your routing table is too long, you can split it into small modules**/
/* eslint-disable */
const patrolRouter = [{
    path: 'pointManage',
    name: 'pointManage',
    component: () => import('@/views/patrol/pointManage/index'),
    meta: {
      title: '巡更点管理',
      icon: 'user'
    },
    auth: 'patrol:pointManage'
  }, {
    path: 'objManage',
    name: 'objManage',
    component: () => import('@/views/patrol/objManage/index'),
    meta: {
      title: '巡更项目管理',
      icon: 'user'
    },
    auth: 'patrol:objManage'
  },
  {
    path: 'team',
    name: 'team',
    component: () => import('@/views/patrol/team/index'),
    meta: {
      title: '巡更班组',
      icon: 'user'
    },
    auth: 'patrol:team'
  },
  {
    path: 'patrolTime',
    name: 'patrolTime',
    component: () => import('@/views/patrol/patrolTime/index'),
    meta: {
      title: '巡更时段',
      icon: 'user'
    },
    auth: 'patrol:patrolTime'
  }, {
    path: 'patrolRoute',
    name: 'patrolRoute',
    component: () => import('@/views/patrol/patrolRoute/index'),
    meta: {
      title: '巡更路线',
      icon: 'user'
    },
    auth: 'patrol:patrolRoute'
  },
  {
    path: 'patrolPlan',
    name: 'patrolPlan',
    component: () => import('@/views/patrol/patrolPlan/index'),
    meta: {
      title: '巡更计划',
      icon: 'user'
    },
    auth: 'patrol:patrolPlan'
  },
  {
    path: 'patrolRecord',
    name: 'patrolRecord',
    component: () => import('@/views/patrol/patrolRecord/index'),
    meta: {
      title: '巡更记录',
      icon: 'user'
    },
    auth: 'patrol:patrolRecord'
  }
]

export default patrolRouter
