/** When your routing table is too long, you can split it into small modules**/
/* eslint-disable */
const UAVCounterRouter = [
  {
    path: 'register',
    name: 'register',
    component: () => import('@/views/UAVCounter/register.vue'),
    meta: {
      title: '设备注册',
      icon: 'user'
    },
    auth: 'uavProtect:ProtectTask'
  }, {
    path: 'armed',
    name: 'armed',
    component: () => import('@/views/UAVCounter/Armed.vue'),
    meta: {
      title: '设备布放',
      icon: 'user'
    },
    auth: 'uavProtect:ProtectMonitor'
  },{
    path: 'current',
    name: 'current',
    component: () => import('@/views/UAVCounter/current.vue'),
    meta: {
      title: '实时警情',
      icon: 'user'
    },
    auth: 'uavProtect:ProtectMonitor'
  },
  {
    path: 'warn',
    name: 'warn',
    component: () => import('@/views/UAVCounter/record.vue'),
    meta: {
      title: '警情记录',
      icon: 'user'
    },
    auth: 'uavProtect:ProtectWarn'
  }
]

export default UAVCounterRouter
