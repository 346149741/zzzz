/** When your routing table is too long, you can split it into small modules**/
/* eslint-disable */
const vehicleMentRouter = [{
    path: 'driverMent',
    name: 'driverMent',
    component: () => import('@/views/vehicleMent/driverMent/index'),
    meta: {
      title: '驾驶员管理',
      icon: 'user'
    },
    auth: 'patrol:driverMent'
  },
  {
    path: 'carMent',
    name: 'carMent',
    component: () => import('@/views/vehicleMent/carMent/index'),
    meta: {
      title: '车辆管理',
      icon: 'user'
    },
    auth: 'patrol:carMent'
  },
  {
    path: 'beidouMent',
    name: 'beidouMent',
    component: () => import('@/views/vehicleMent/beidouMent/index'),
    meta: {
      title: '北斗卡管理',
      icon: 'user'
    },
    auth: 'patrol:beidouMent'
  },
  {
    path: 'dispatchMent',
    name: 'dispatchMent',
    component: () => import('@/views/vehicleMent/dispatchMent/index'),
    meta: {
      title: '派车管理',
      icon: 'user'
    },
    auth: 'patrol:dispatchMent'
  },
  {
    path: 'carApplication',
    name: 'carApplication',
    component: () => import('@/views/vehicleMent/carApplication/index'),
    meta: {
      title: '用车申请',
      icon: 'user'
    },
    auth: 'patrol:carApplication'
  },
  {
    path: 'vehicleApproval',
    name: 'vehicleApproval',
    component: () => import('@/views/vehicleMent/vehicleApproval/index'),
    meta: {
      title: '审批管理',
      icon: 'user'
    },
    auth: 'patrol:vehicleApproval'
  }, {
    path: 'accidentMent',
    name: 'accidentMent',
    component: () => import('@/views/vehicleMent/accidentMent/index'),
    meta: {
      title: '事故管理',
      icon: 'user'
    },
    auth: 'patrol:accidentMent'
  },{
    path: 'carService',
    name: 'carService',
    component: () => import('@/views/vehicleMent/carService/index'),
    meta: {
      title: '维修管理',
      icon: 'user'
    },
    auth: 'patrol:carService'
  },
  {
    path: 'repairApplic',
    name: 'repairApplic',
    component: () => import('@/views/vehicleMent/repairApplic/index'),
    meta: {
      title: '维修车辆申请',
      icon: 'user'
    },
    auth: 'patrol:repairApplic'
  },{
    path: 'repairCarsp',
    name: 'repairCarsp',
    component: () => import('@/views/vehicleMent/repairCarsp/index'),
    meta: {
      title: '维修车辆审批',
      icon: 'user'
    },
    auth: 'patrol:repairCarsp'
  },
  {
    path: 'electricFence',
    name: 'electricFence',
    component: () => import('@/views/vehicleMent/electricFence/index'),
    meta: {
      title: '车辆电子围栏',
      icon: 'user'
    },
    auth: 'patrol:electricFence'
  },
  {
    path: 'fenceBind',
    name: 'fenceBind',
    component: () => import('@/views/vehicleMent/fenceBind/index'),
    meta: {
      title: '栏车绑定',
      icon: 'user'
    },
    auth: 'patrol:fenceBind'
  },
  {
    path: 'nianjianMent',
    name: 'nianjianMent',
    component: () => import('@/views/vehicleMent/nianjianMent/index'),
    meta: {
      title: '车辆年检管理',
      icon: 'user'
    },
    auth: 'patrol:nianjianMent'
  },
  {
    path: 'violationMent',
    name: 'violationMent',
    component: () => import('@/views/vehicleMent/violationMent/index'),
    meta: {
      title: '违章车辆管理',
      icon: 'user'
    },
    auth: 'patrol:violationMent'
  },
    {
    path: 'historyRecord',
    name: 'historyRecord',
    component: () => import('@/views/vehicleMent/historyRecord/index'),
    meta: {
      title: '历史记录',
      icon: 'user'
    },
    auth: 'patrol:historyRecord'
  },
  {
    path: 'regionalCar',
    name: 'regionalCar',
    component: () => import('@/views/vehicleMent/locationMon/index'),
    meta: {
      title: '违章车辆管理',
      icon: 'user'
    },
    auth: 'patrol:regionalCar'
  },
  {
    path: 'locationMon',
    name: 'locationMon',
    component: () => import('@/views/vehicleMent/locationMon/index'),
    meta: {
      title: '定位监控',
      icon: 'user'
    },
    auth: 'patrol:locationMon'
  },
  {
    path: 'reportStat',
    name: 'reportStat',
    component: () => import('@/views/vehicleMent/reportStat/index'),
    meta: {
      title: '报表统计',
      icon: 'user'
    },
    auth: 'patrol:reportStat'
  },
  {
    path: 'campSta',
    name: 'campSta',
    component: () => import('@/views/vehicleMent/statistic/index'),
    meta: {
      title: '营区态势',
      icon: 'user'
    },
    auth: 'vehicleMent:campSta'
  }
]

export default vehicleMentRouter
