/** When your routing table is too long, you can split it into small modules**/
/* eslint-disable */
const doorRouter = [
  {
    path: 'information',
    name: 'equipmentInformation',
    component: () => import('@/views/logistics/equipment/information/index'),
    meta: {
      title: '装备信息',
      icon: 'user'
    },
    auth: 'logistics:information'
  },
  {
    path: 'deployment',
    name: 'equipmentDeployment',
    component: () => import('@/views/logistics/equipment/deployment/index'),
    meta: {
      title: '装备调配',
      icon: 'user'
    },
    auth: 'logistics:deployment'
  },
  {
    path: 'usage',
    name: 'equipmentUsage',
    component: () => import('@/views/logistics/equipment/usage/index'),
    meta: {
      title: '装备动用',
      icon: 'user'
    },
    auth: 'logistics:usage'
  },
  {
    path: 'maintain',
    name: 'equipmentMaintain',
    component: () => import('@/views/logistics/equipment/maintain/index'),
    meta: {
      title: '装备保养',
      icon: 'user'
    },
    auth: 'logistics:maintain'
  },
  {
    path: 'repair',
    name: 'equipmentRepair',
    component: () => import('@/views/logistics/equipment/repair/index'),
    meta: {
      title: '装备维修',
      icon: 'user'
    },
    auth: 'logistics:repair'
  },
  {
    path: 'technical',
    name: 'equipmentTechnical',
    component: () => import('@/views/logistics/equipment/technical/index'),
    meta: {
      title: '装备技术力量',
      icon: 'user'
    },
    auth: 'logistics:technical'
  }
]

const FinanceRouter = [
  {
    path: 'personalpays',
    name: 'personalpays',
    component: () => import('@/views/logistics/financial/personalpays'),
    meta: {
      title: '个人工资',
      icon: 'user'
    },
    auth: 'logistics:personalpays'
  }, {
    path: 'house',
    name: 'house',
    component: () => import('@/views/logistics/financial/house'),
    meta: {
      title: '住房资金管理',
      icon: 'user'
    },
    auth: 'logistics:house'
  }, {
    path: 'pays',
    name: 'pays',
    component: () => import('@/views/logistics/financial/pays'),
    meta: {
      title: '工资管理',
      icon: 'user'
    },
    auth: 'logistics:pays'
  }
]

const BarracksRouter = [
  {
    path: 'barracks/landfile',
    name: 'barracksLandfile',
    component: () => import('@/views/logistics/barracks/landfile'),
    meta: {
      title: '土地档案',
      icon: 'user'
    },
    auth: 'logistics:personalpays'
  },
  {
    path: 'barracks/files',
    name: 'barracks/files',
    component: () => import('@/views/logistics/barracks/files'),
    meta: {
      title: '营房档案',
      icon: 'user'
    },
    auth: 'logistics:house'
  },
  {
    path: 'barracks/supplies',
    name: 'barracks/supplies',
    component: () => import('@/views/logistics/barracks/supplies'),
    meta: {
      title: '营房物资',
      icon: 'user'
    },
    auth: 'logistics:pays'
  }
]

const BeLoadedRouter = [
  {
    path: 'beloaded/type',
    name: 'beloaded/type',
    component: () => import('@/views/logistics/quartermaster/beloaded/type'),
    meta: {
      title: '被装类型管理',
      icon: 'user'
    },
    auth: 'logistics:personalpays'
  },
  {
    path: 'beloaded/personal',
    name: 'beloaded/personal',
    component: () => import('@/views/logistics/quartermaster/beloaded/deliver/personal.vue'),
    meta: {
      title: '被装申领',
      icon: 'user'
    },
    auth: 'logistics:personalpays'
  },
  {
    path: 'beloaded/statistics',
    name: 'beloaded/statistics',
    component: () => import('@/views/logistics/quartermaster/beloaded/deliver/statistics.vue'),
    meta: {

      title: '被装统计',
      icon: 'user'
    },
    auth: 'logistics:personalpays'
  },
  {
    path: 'beloaded/public',
    name: 'beloaded/public',
    component: () => import('@/views/logistics/quartermaster/beloaded/deliver/public.vue'),
    meta: {

      title: '公用物资管理',
      icon: 'user'
    },
    auth: 'logistics:personalpays'
  },
  {
    path: 'logisticsStatic',
    name: 'logisticsStatic',
    component: () => import('@/views/logistics/statistic/index'),
    meta: {
      title: ' 保障态势',
      icon: 'user'
    },
    auth: 'logistics:logisticsStatic'
  }
]

const QuartermasterRouter=[
  {
    path: 'foods/menu/show',
    name: 'foods/menu/show',
    component: () => import('@/views/logistics/quartermaster/foods/menu/show.vue'),
    meta: {
      title: '每周食谱公布',
      icon: 'user'
    },
    auth: 'logistics:pays'
  },{
    path: 'foods/menu/add',
    name: 'quartermaster/beloaded/personal',
    component: () => import('@/views/logistics/quartermaster/foods/menu/add.vue'),
    meta: {
      title: '食谱编辑',
      icon: 'user'
    },
    auth: 'logistics:pays'
  },{
    path: 'foods/expenses/details',
    name: 'foods/expenses/details',
    component: () => import('@/views/logistics/quartermaster/foods/expenses/details.vue'),
    meta: {
      title: '伙食开支明细',
      icon: 'user'
    },
    auth: 'logistics:pays'
  },{
    path: 'foods/expenses/statistics',
    name: 'foods/expenses/statistics',
    component: () => import('@/views/logistics/quartermaster/foods/expenses/statistics.vue'),
    meta: {
      title: '伙食开支统计',
      icon: 'user'
    },
    auth: 'logistics:pays'
  },{
    path: 'foods/extralist/show',
    name: 'foods/extralist/show',
    component: () => import('@/views/logistics/quartermaster/foods/extralist/show.vue'),
    meta: {
      title: '副食品采购公布',
      icon: 'user'
    },
    auth: 'logistics:pays'
  },{
    path: 'foods/extralist/add',
    name: 'foods/extralist/add',
    component: () => import('@/views/logistics/quartermaster/foods/extralist/add'),
    meta: {
      title: '副食品采购管理',
      icon: 'user'
    },
    auth: 'logistics:pays'
  },
]

const ProjectManageRouter=[
  {
    path: 'projects/priceRelease',
    name: 'projects/priceRelease',
    component: () => import('@/views/logistics/projectMng/priceRelease'),
    meta: {
      title: '信息价发布',
      icon: 'user'
    },
    auth: 'logistics:pays'
  },
  {
    path: 'projects/drawingPaper',
    name: 'projects/drawingPaper',
    component: () => import('@/views/logistics/projectMng/engineRoom/drawingPaper.vue'),
    meta: {
      title: '机房图纸',
      icon: 'user'
    },
    auth: 'logistics:pays'
  },{
    path: 'projects/shelf',
    name: 'projects/shelf',
    component: () => import('@/views/logistics/projectMng/engineRoom/shelf.vue'),
    meta: {
      title: '机架',
      icon: 'user'
    },
    auth: 'logistics:pays'
  },{
    path: 'projects/equipment',
    name: 'projects/equipment',
    component: () => import('@/views/logistics/projectMng/engineRoom/equipment.vue'),
    meta: {
      title: '设备',
      icon: 'user'
    },
    auth: 'logistics:pays'
  },{
    path: 'projects/supervisionLog',
    name: 'projects/supervisionLog',
    component: () => import('@/views/logistics/projectMng/supervisionLog'),
    meta: {
      title: '监理日志',
      icon: 'user'
    },
    auth: 'logistics:pays'
  },

]

const hygieneManageRouter=[
  {
    path: 'archives',
    name: 'archives',
    component: () => import('@/views/logistics/hygiene/education/archives/index'),
    meta: {
      title: '健康档案',
      icon: 'user'
    },
    auth: 'logistics:archives'
  },
  {
    path: 'prevention',
    name: 'prevention',
    component: () => import('@/views/logistics/hygiene/education/prevention/index'),
    meta: {
      title: '季节性常见病预防',
      icon: 'user'
    },
    auth: 'logistics:prevention'
  },
  {
    path: 'health',
    name: 'health',
    component: () => import('@/views/logistics/hygiene/education/health/index'),
    meta: {
      title: '养生保健',
      icon: 'user'
    },
    auth: 'logistics:health'
  },
  {
    path: 'psychic',
    name: 'psychic',
    component: () => import('@/views/logistics/hygiene/education/psychic/index'),
    meta: {
      title: '心里小常识',
      icon: 'user'
    },
    auth: 'logistics:psychic'
  },
  {
    path: 'disability',
    name: 'disability',
    component: () => import('@/views/logistics/hygiene/disability/index'),
    meta: {
      title: '伤残病人员管理',
      icon: 'user'
    },
    auth: 'logistics:disability'
  },
  {
    path: 'disabilitySta',
    name: 'disabilitySta',
    component: () => import('@/views/logistics/hygiene/disability/detail'),
    meta: {
      title: '伤残病人员统计',
      icon: 'user'
    },
    auth: 'logistics:disabilitySta'
  },
  {
    path: 'doctor',
    name: 'doctor',
    component: () => import('@/views/logistics/hygiene/medical/doctor/index'),
    meta: {
      title: '在线就诊',
      icon: 'user'
    },
    auth: 'logistics:doctor'
  },
  {
    path: 'green',
    name: 'green',
    component: () => import('@/views/logistics/hygiene/medical/green/index'),
    meta: {
      title: '绿色通道',
      icon: 'user'
    },
    auth: 'logistics:green'
  },
  {
    path: 'doctorManage',
    name: 'doctorManage',
    component: () => import('@/views/logistics/hygiene/medical/doctorManage/index'),
    meta: {
      title: '医生管理',
      icon: 'user'
    },
    auth: 'logistics:doctorManage'
  }

]

export default doorRouter.concat(FinanceRouter, BarracksRouter, BeLoadedRouter,QuartermasterRouter,ProjectManageRouter,hygieneManageRouter)
