/** When your routing table is too long, you can split it into small modules**/
/* eslint-disable */
const protectRouter = [
  {
    path: 'task',
    name: 'task',
    component: () => import('@/views/protect/task'),
    meta: {
      title: '巡防任务',
      icon: 'user'
    },
    auth: 'uavProtect:ProtectTask'
  },{
    path: 'task/detail',
    name: 'ProtectTaskDetail',
    component: () => import('@/views/protect/task/taskDetail'),
    meta: {
      title: '任务详情',
      icon: 'user'
    },
    auth: 'uavProtect:ProtectTask'
  }, {
    path: 'monitor',
    name: 'monitor',
    component: () => import('@/views/protect/monitor'),
    meta: {
      title: '任务监控',
      icon: 'user'
    },
    auth: 'uavProtect:ProtectMonitor'
  },
  {
    path: 'warn',
    name: 'warn',
    component: () => import('@/views/protect/warn'),
    meta: {
      title: '巡防预警',
      icon: 'user'
    },
    auth: 'uavProtect:ProtectWarn'
  }
]

export default protectRouter
