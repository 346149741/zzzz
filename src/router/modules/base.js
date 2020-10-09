/** When your routing table is too long, you can split it into small modules**/
/* eslint-disable */
const baseRouter = [
  {
    path: 'demo',
    name: 'demo',
    component: () => import('@/views/tool/build/index.vue'),
    meta: {
      title: '代码生成器',
      icon: 'user'
    },
    auth: 'base:organ'
  },{
    path: 'organ',
    name: 'organ',
    component: () => import('@/views/base/manage/organ/index'),
    meta: {
      title: '机构管理',
      icon: 'user'
    },
    auth: 'base:organ'
  },
  {
    path: 'employee',
    name: 'employee',
    component: () => import('@/views/base/manage/employee'),
    meta: {
      title: '人员管理',
      icon: 'user'
    },
    auth: 'base:employee'
  },
  {
    path: 'worker',
    name: 'worker',
    component: () => import('@/views/base/manage/worker'),
    meta: {
      title: '职工',
      icon: 'user'
    },
    auth: 'base:worker'
  },
  {
    path: 'user',
    name: 'user',
    component: () => import('@/views/base/manage/user/index'),
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    auth: 'base:user'
  },
  {
    path: 'role',
    name: 'role',
    component: () => import('@/views/base/manage/role/index'),
    meta: {
      title: '角色管理',
      icon: 'users'
    },
    auth: 'base:role'
  },
  {
    path: 'configuration',
    name: 'configuration',
    component: () => import('@/views/base/manage/configuration/index'),
    meta: {
      title: '配置管理',
      icon: 'set'
    },
    auth: 'base:configuration'
  },
  {
    path: 'config',
    name: 'config',
    component: () => import('@/views/base/manage/config-item/index'),
    meta: {
      title: '配置管理（业务）',
      icon: 'set'
    },
    auth: 'base:config'
  },
  {
    path: 'dict',
    name: 'dict',
    component: () => import('@/views/base/manage/dict/index'),
    meta: {
      title: '字典管理',
      icon: 'dictionary'
    },
    auth: 'base:dict'
  },
  {
    path: 'authority',
    name: 'authority',
    component: () => import('@/views/base/manage/menu/index'),
    meta: {
      title: '菜单管理',
      icon: 'menu'
    },
    auth: 'base:menu'
  },
  {
    path: 'job',
    name: 'job',
    component: () => import('@/views/base/manage/job/index'),
    meta: {
      title: '调度任务',
      icon: 'menu'
    },
    auth: 'base:job'
  },
  {
    path: 'code',
    name: 'code',
    component: () => import('@/views/base/manage/code/index'),
    meta: {
      title: '代码生成',
      icon: 'menu'
    }
  },
  {
    path: 'authorizeCars',
    name: 'authorizeCars',
    component: () => import('@/views/base/manage/authorizeCars/index'),
    meta: {
      title: '车辆分级权限',
      icon: 'menu'
    }
  },
  {
    path: 'authorizePeoples',
    name: 'authorizePeoples',
    component: () => import('@/views/base/manage/authorizePeoples/index'),
    meta: {
      title: '人员分级权限',
      icon: 'menu'
    }
  },
  {
    path: 'maintain',
    name: 'maintain',
    component: () => import('@/views/base/map/maintain/index'),
    meta: {
      title: '地图维护',
      icon: 'user'
    },
    auth: 'map:maintain'
  },
  {
    path: 'block',
    name: 'block',
    component: () => import('@/views/base/map/map-block/index'),
    meta: {
      title: '地图发布',
      icon: 'user'
    },
    auth: 'map:block'
  },
  {
    path: 'legendManager',
    name: 'legendManager',
    component: () => import('@/views/base/layer/legendManager/index'),
    meta: {
      title: '图例管理',
      icon: 'user'
    },
    auth: 'layer:legendManager'
  },
  {
    path: 'standard',
    name: 'standard',
    component: () => import('@/views/base/layer/standardLayer/index'),
    meta: {
      title: '标准图层管理',
      icon: 'user'
    },
    auth: 'layer:standard'
  },
  {
    path: 'camera',
    name: 'camera',
    component: () => import('@/views/base/equip/camera'),
    meta: {
      title: '摄像头注册',
      icon: 'user'
    },
    auth: 'equip:camera'
  },
  {
    path: 'uav',
    name: 'uav',
    component: () => import('@/views/base/equip/uav'),
    meta: {
      title: '无人机注册',
      icon: 'user'
    },
    auth: 'equip:uav'
  },
  {
    path: 'car',
    name: 'car',
    component: () => import('@/views/base/equip/car'),
    meta: {
      title: '车辆道闸注册',
      icon: 'user'
    },
    auth: 'equip:car'
  },
  {
    path: 'door',
    name: 'door',
    component: () => import('@/views/base/equip/door'),
    meta: {
      title: '门禁设备注册',
      icon: 'user'
    },
    auth: 'equip:door'
  },
  {
    path: 'authorizeCars',
    name: 'authorizeCars',
    component: () => import('@/views/base/manage/authorizeCars/index'),
    meta: {
      title: '车辆分级权限',
      icon: 'menu'
    }
  },
  {
    path: 'authorizePeoples',
    name: 'authorizePeoples',
    component: () => import('@/views/base/manage/authorizePeoples/index'),
    meta: {
      title: '人员分级权限',
      icon: 'menu'
    }
  },
  {
    path: 'regionRegister',
    name: 'regionRegister',
    component: () => import('@/views/base/manage/regionRegister/index'),
    meta: {
      title: '区域注册',
      icon: 'menu'
    }
  },
  {
    path: 'regionFloor',
    name: 'regionFloor',
    component: () => import('@/views/base/manage/regionFloor/index'),
    meta: {
      title: '楼宇注册',
      icon: 'menu'
    }
  },
  {
    path: 'icons',
    name: 'icons',
    component: () => import('@/views/base/manage/icons'),
    meta: {
      title: '图标选择',
      icon: 'icons'
    }
  },
  {
    path: 'family',
    name: 'family',
    component: () => import('@/views/base/manage/family'),
    meta: {
      title: '家属',
      icon: 'icons'
    }
  },
  {
    path: 'popUp',
    name: 'popUp',
    component: () => import('@/views/demo/popUp/index'),
    meta: {
      title: '弹窗demo',
      icon: 'user'
    },
    auth: 'demo:popUp'
  }
]

export default baseRouter
