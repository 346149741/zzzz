/** When your routing table is too long, you can split it into small modules**/
/* eslint-disable */
const doorRouter = [{
    path: 'register',
    name: 'carRegister',
    component: () => import('@/views/door/car/register/index'),
    meta: {
      title: '固定车辆注册',
      icon: 'user'
    },
    auth: 'door:register'
  },
  {
    path: 'nonMotor',
    name: 'nonMotor',
    component: () => import('@/views/door/car/nonMotor/index'),
    meta: {
      title: '非机动车管理',
      icon: 'user'
    },
    auth: 'door:nonMotor'
  },
  {
    path: 'temporary',
    name: 'temporary',
    component: () => import('@/views/door/car/temporary/index'),
    meta: {
      title: '临时车辆登记',
      icon: 'user'
    },
    auth: 'door:temporary'
  },
  {
    path: 'controlVehicle',
    name: 'controlVehicle',
    component: () => import('@/views/door/car/controlVehicle/index'),
    meta: {
      title: '布控车辆管理',
      icon: 'user'
    },
    auth: 'door:controlVehicle'
  },
  {
    path: 'peerRecord',
    name: 'peerRecord',
    component: () => import('@/views/door/car/peerRecord/index'),
    meta: {
      title: '车辆通行记录',
      icon: 'user'
    },
    auth: 'door:peerRecord'
  },
  {
    path: 'gateControl',
    name: 'gateControl',
    component: () => import('@/views/door/car/gateControl/index'),
    meta: {
      title: '车辆道闸控制',
      icon: 'user'
    },
    auth: 'door:gateControl'
  },
  {
    path: 'monitor',
    name: 'monitor',
    component: () => import('@/views/door/car/monitor/index'),
    meta: {
      title: '车辆实时监控',
      icon: 'user'
    },
    auth: 'door:monitor'
  },
  {
    path: 'alarmRecord',
    name: 'alarmRecord',
    component: () => import('@/views/door/car/alarmRecord/index'),
    meta: {
      title: '车辆报警记录',
      icon: 'user'
    },
    auth: 'door:alarmRecord'
  },
  {
    path: 'appointment',
    name: 'appointment',
    component: () => import('@/views/door/people/appointment/index'),
    meta: {
      title: '访客预约',
      icon: 'user'
    },
    auth: 'door:appointment'
  },
  {
    path: 'peopleRegister',
    name: 'peopleRegister',
    component: () => import('@/views/door/people/peopleRegister/index'),
    meta: {
      title: '访客登记',
      icon: 'user'
    },
    auth: 'door:peopleRegister'
  },
  {
    path: 'approval',
    name: 'approval',
    component: () => import('@/views/door/people/approval/index'),
    meta: {
      title: '访客通行审批',
      icon: 'user'
    },
    auth: 'door:approval'
  },
  {
    path: 'peopleCurrentRecord',
    name: 'peopleCurrentRecord',
    component: () => import('@/views/door/people/peopleCurrentRecord/index'),
    meta: {
      title: '人员通行记录',
      icon: 'user'
    },
    auth: 'door:peopleCurrentRecord'
  },
  {
    path: 'peopleCurrentWarning',
    name: 'peopleCurrentWarning',
    component: () => import('@/views/door/people/peopleCurrentWarning/index'),
    meta: {
      title: '人员通行告警',
      icon: 'user'
    },
    auth: 'door:peopleCurrentWarning'
  },
  {
    path: 'doorMonitor',
    name: 'doorMonitor',
    component: () => import('@/views/door/people/doorMonitor/index'),
    meta: {
      title: '门禁监控',
      icon: 'user'
    },
    auth: 'door:doorMonitor'
  },
  {
    path: 'remoteControl',
    name: 'remoteControl',
    component: () => import('@/views/door/people/remoteControl/index'),
    meta: {
      title: '门禁远程控制',
      icon: 'user'
    },
    auth: 'door:remoteControl'
  },
]

export default doorRouter
