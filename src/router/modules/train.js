/* eslint-disable */
export default [{
    path: 'informationFrontier',
    name: 'informationFrontier',
    component: () => import('@/views/train/dynamic/informationFrontier/index'),
    meta: {
      title: '信息前沿',
      icon: 'user'
    },
    auth: 'train:informationFrontier'
  },
  {
    path: 'innovate',
    name: 'innovate',
    component: () => import('@/views/train/dynamic/innovate/index'),
    meta: {
      title: '战法创新',
      icon: 'user'
    },
    auth: 'train:innovate'
  },
  {
    path: 'experiment',
    name: 'experiment',
    component: () => import('@/views/train/dynamic/experiment/index'),
    meta: {
      title: '效能实验',
      icon: 'user'
    },
    auth: 'train:experiment'
  },
  {
    path: 'activities',
    name: 'activities',
    component: () => import('@/views/train/dynamic/activities/index'),
    meta: {
      title: '训练活动',
      icon: 'user'
    },
    auth: 'train:activities'
  },
  {
    path: 'importantSpeech',
    name: 'importantSpeech',
    component: () => import('@/views/train/dynamic/importantSpeech/index'),
    meta: {
      title: '重要讲话',
      icon: 'user'
    },
    auth: 'train:importantSpeech'
  },
  {
    path: 'importantActivities',
    name: 'importantActivities',
    component: () => import('@/views/train/dynamic/importantActivities/index'),
    meta: {
      title: '重大训练活动',
      icon: 'user'
    },
    auth: 'train:importantActivities'
  },
  {
    path: 'bestSoldiers',
    name: 'bestSoldiers',
    component: () => import('@/views/train/dynamic/bestSoldiers/index'),
    meta: {
      title: '训练标兵',
      icon: 'user'
    },
    auth: 'train:bestSoldiers'
  },
  {
    path: 'inspectionReport',
    name: 'inspectionReport',
    component: () => import('@/views/train/dynamic/inspectionReport/index'),
    meta: {
      title: '检查通报',
      icon: 'user'
    },
    auth: 'train:inspectionReport'
  },
  {
    path: 'rainingReport',
    name: 'rainingReport',
    component: () => import('@/views/train/dynamic/rainingReport/index'),
    meta: {
      title: '训练情况报告',
      icon: 'user'
    },
    auth: 'train:rainingReport'
  },
  {
    path: 'trainPlan',
    name: 'trainPlan',
    component: () => import('@/views/train/trainManage/trainPlan/index.vue'),
    meta: {
      title: '训练计划',
      icon: 'user'
    },
    auth: 'train:trainPlan'
  }, {
    path: 'regisStatistic',
    name: 'regisStatistic',
    component: () => import('@/views/train/trainManage/regisStatistic/index.vue'),
    meta: {
      title: '登记统计 ',
      icon: 'user'
    },
    auth: 'train:regisStatistic'
  }, {
    path: 'supervision',
    name: 'supervision',
    component: () => import('@/views/train/trainManage/supervision/index.vue'),
    meta: {
      title: '训练监督',
      icon: 'user'
    },
    auth: 'train:supervision'
  }, {
    path: 'trainCheck',
    name: 'trainCheck',
    component: () => import('@/views/train/trainManage/trainCheck/index.vue'),
    meta: {
      title: '训练考核',
      icon: 'user'
    },
    auth: 'train:trainCheck'
  }, {
    path: 'scoreEvaluate',
    name: 'scoreEvaluate',
    component: () => import('@/views/train/trainManage/scoreEvaluate/index.vue'),
    meta: {
      title: '成绩评估',
      icon: 'user'
    },
    auth: 'train:scoreEvaluate'
  }, {
    path: 'personnelDevelop',
    name: 'personnelDevelop',
    component: () => import('@/views/train/trainManage/personnelDevelop/index.vue'),
    meta: {
      title: '人才培养',
      icon: 'user'
    },
    auth: 'train:personnelDevelop'
  }
]
