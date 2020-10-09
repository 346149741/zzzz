/* eslint-disable */
export default [{
    path: 'broadcast',
    name: 'broadcast',
    component: () => import('@/views/campManage/publicInfo/broadcast/index.vue'),
    meta: {
      title: '数字广播管理',
      icon: 'user'
    },
    auth: 'publicInfo:broadcast'
  },
  {
    path: 'campInfoPub',
    name: 'campInfoPub',
    component: () => import('@/views/campManage/publicInfo/campInfoPub/index.vue'),
    meta: {
      title: '营区信息发布',
      icon: 'user'
    },
    auth: 'publicInfo:campInfoPub'
  }, {
    path: 'deviceManage',
    name: 'deviceManage',
    component: () => import('@/views/campManage/publicInfo/deviceManage/index.vue'),
    meta: {
      title: '终端设备管理',
      icon: 'user'
    },
    auth: 'publicInfo:deviceManage'
  }, {
    path: 'illegalHandling',
    name: 'illegalHandling',
    component: () => import('@/views/campManage/trafficControl/illegalHandling/index.vue'),
    meta: {
      title: '违章处理',
      icon: 'user'
    },
    auth: 'trafficControl:illegalHandling'
  }, {
    path: 'intelligentAnalysis',
    name: 'intelligentAnalysis',
    component: () => import('@/views/campManage/trafficControl/intelligentAnalysis/index.vue'),
    meta: {
      title: '智能分析',
      icon: 'user'
    },
    auth: 'trafficControl:intelligentAnalysis'
  }, {
    path: 'intelligentCapture',
    name: 'intelligentCapture',
    component: () => import('@/views/campManage/trafficControl/intelligentCapture/index.vue'),
    meta: {
      title: '智能抓拍',
      icon: 'user'
    },
    auth: 'trafficControl:intelligentCapture'
  }, {
    path: 'radarVelocimetry',
    name: 'radarVelocimetry',
    component: () => import('@/views/campManage/trafficControl/radarVelocimetry/index.vue'),
    meta: {
      title: '雷达测速',
      icon: 'user'
    },
    auth: 'trafficControl:radarVelocimetry'
  }
]
