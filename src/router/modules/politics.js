/* eslint-disable */
const politicsRouter= [
  {
    path: 'addPartyMembers',
    name: 'addPartyMembers',
    component: () => import('@/views/politics/organizationWork/addPartyMembers'),
    meta: {
      title: '发展党员',
      icon: 'user'
    },
    auth: 'politics:addPartyMembers'
  },
  {
    path: 'addPartyMembersPlan',
    name: 'addPartyMembersPlan',
    component: () => import('@/views/politics/organizationWork/addPartyMembersPlan'),
    meta: {
      title: '发展党员计划',
      icon: 'user'
    },
    auth: 'politics:addPartyMembersPlan'
  },
  {
    path: 'adminPartyMembers',
    name: 'adminPartyMembers',
    component: () => import('@/views/politics/organizationWork/adminPartyMembers'),
    meta: {
      title: '党员管理',
      icon: 'user'
    },
    auth: 'politics:adminPartyMembers'
  },
  {
    path: 'completeInformation',
    name: 'completeInformation',
    component: () => import('@/views/politics/organizationWork/completeInformation'),
    meta: {
      title: '组织健全信息',
      icon: 'user'
    },
    auth: 'politics:completeInformation'
  },
  {
    path: 'laGouBangDai',
    name: 'laGouBangDai',
    component: () => import('@/views/politics/organizationWork/laGouBangDai'),
    meta: {
      title: '挂钩帮带',
      icon: 'user'
    },
    auth: 'politics:laGouBangDai'
  },
  {
    path: 'problemFeedback',
    name: 'problemFeedback',
    component: () => import('@/views/politics/organizationWork/problemFeedback'),
    meta: {
      title: '问题反馈',
      icon: 'user'
    },
    auth: 'politics:problemFeedback'
  },
  {
    path: 'minutesMeeting',
    name: 'minutesMeeting',
    component: () => import('@/views/politics/organizationWork/minutesMeeting'),
    meta: {
      title: '会议记录',
      icon: 'user'
    },
    auth: 'politics:minutesMeeting'
  },
  {
    path: 'dangMoneyInformation',
    name: 'dangMoneyInformation',
    component: () => import('@/views/politics/organizationWork/dangMoneyInformation'),
    meta: {
      title: '党费信息',
      icon: 'user'
    },
    auth: 'politics:dangMoneyInformation'
  },
  {
    path: 'tuanMoneyInformation',
    name: 'tuanMoneyInformation',
    component: () => import('@/views/politics/organizationWork/tuanMoneyInformation'),
    meta: {
      title: '团费信息',
      icon: 'user'
    },
    auth: 'politics:tuanMoneyInformation'
  },
  {
    path: 'talentDevelop',
    name: 'talentDevelop',
    component: () => import('@/views/politics/talentPool/talentDevelop/index.vue'),
    meta: {
      title: '人才培养',
      icon: 'user'
    },
    auth: 'talentPool:develop'
  }, {
    path: 'talentFile',
    name: 'talentFile',
    component: () => import('@/views/politics/talentPool/talentFile/index.vue'),
    meta: {
      title: '人才档案',
      icon: 'user'
    },
    auth: 'talentPool:talentFile'
  }, {
    path: 'trainModel',
    name: 'trainModel',
    component: () => import('@/views/politics/talentPool/trainModel/index.vue'),
    meta: {
      title: '训练标兵',
      icon: 'user'
    },
    auth: 'talentPool:trainModel'
  }, {
    path: 'politicsStatistic',
    name: 'politicsStatistic',
    component: () => import('@/views/politics/statistic/index.vue'),
    meta: {
      title: '政工态势',
      icon: 'user'
    },
    auth: 'politics:politicsStatistic'
  }, {
    path: 'situation',
    name: 'situation',
    component: () => import('@/views/politics/defend/situation/index.vue'),
    meta: {
      title: '民情社情',
      icon: 'user'
    },
    auth: 'politics:situation'
  }, {
    path: 'analysis',
    name: 'analysis',
    component: () => import('@/views/politics/defend/analysis/index.vue'),
    meta: {
      title: '案例分析',
      icon: 'user'
    },
    auth: 'politics:analysis'
  }, {
    path: 'personnel',
    name: 'personnel',
    component: () => import('@/views/politics/defend/personnel/index.vue'),
    meta: {
      title: '重点人员',
      icon: 'user'
    },
    auth: 'politics:personnel'
  }, {
    path: 'internet',
    name: 'internet',
    component: () => import('@/views/politics/defend/internet/index.vue'),
    meta: {
      title: '互联网备案',
      icon: 'user'
    },
    auth: 'politics:internet'
  }, {
    path: 'review',
    name: 'review',
    component: () => import('@/views/politics/defend/review/index.vue'),
    meta: {
      title: '人员政审',
      icon: 'user'
    },
    auth: 'politics:review'
  }, {
    path: 'publish',
    name: 'publish',
    component: () => import('@/views/politics/mailbox/publish/index.vue'),
    meta: {
      title: '意见发表',
      icon: 'user'
    },
    auth: 'politics:publish'
  }, {
    path: 'receive',
    name: 'receive',
    component: () => import('@/views/politics/mailbox/receive/index.vue'),
    meta: {
      title: '意见接收',
      icon: 'user'
    },
    auth: 'politics:receive'
  }, {
    path: 'manage',
    name: 'manage',
    component: () => import('@/views/politics/mailbox/manage/index.vue'),
    meta: {
      title: '意见箱管理',
      icon: 'user'
    },
    auth: 'politics:manage'
  },
  {
    path: 'adminCultureThing',
    name: 'adminCultureThing',
    component: () => import('@/views/politics/propagandaWork/adminCultureThing'),
    meta: {
      title: '文化装备信息管理',
      icon: 'user'
    },
    auth: 'politics:adminCultureThing'
  },
  {
    path: 'adminCulturePeople',
    name: 'adminCulturePeople',
    component: () => import('@/views/politics/propagandaWork/adminCulturePeople'),
    meta: {
      title: '文化骨干信息管理',
      icon: 'user'
    },
    auth: 'politics:adminCulturePeople'
  },
  {
    path: 'electronicLargeScreen',
    name: 'electronicLargeScreen',
    component: () => import('@/views/politics/propagandaWork/electronicLargeScreen'),
    meta: {
      title: '电子橱窗',
      icon: 'user'
    },
    auth: 'politics:electronicLargeScreen'
  },
  {
    path: 'canteenBroadcast',
    name: 'canteenBroadcast',
    component: () => import('@/views/politics/propagandaWork/canteenBroadcast'),
    meta: {
      title: '饭堂广播',
      icon: 'user'
    },
    auth: 'politics:canteenBroadcast'
  },
  {
    path: 'onlineMusic',
    name: 'onlineMusic',
    component: () => import('@/views/politics/propagandaWork/onlineMusic'),
    meta: {
      title: '在线音乐',
      icon: 'user'
    },
    auth: 'politics:onlineMusic'
  },
  {
    path: 'watchTv',
    name: 'watchTv',
    component: () => import('@/views/politics/propagandaWork/watchTv'),
    meta: {
      title: '影视欣赏',
      icon: 'user'
    },
    auth: 'politics:watchTv'
  },
  {
    path: 'networkTv',
    name: 'networkTv',
    component: () => import('@/views/politics/propagandaWork/networkTv'),
    meta: {
      title: '网络电视',
      icon: 'user'
    },
    auth: 'politics:networkTv'
  },
  {
    path: 'psychologicalNews',
    name: 'psychologicalNews',
    component: () => import('@/views/politics/propagandaWork/psychologicalNews'),
    meta: {
      title: '心理资讯',
      icon: 'user'
    },
    auth: 'politics:psychologicalNews'
  },
  {
    path: 'videoZone',
    name: 'videoZone',
    component: () => import('@/views/politics/propagandaWork/videoZone'),
    meta: {
      title: '视频专区',
      icon: 'user'
    },
    auth: 'politics:videoZone'
  },
  {
    path: 'counsellingRoom',
    name: 'counsellingRoom',
    component: () => import('@/views/politics/propagandaWork/counsellingRoom'),
    meta: {
      title: '心理咨询室',
      icon: 'user'
    },
    auth: 'politics:counsellingRoom'
  },
  {
    path: 'theoreticalLearning',
    name: 'theoreticalLearning',
    component: () => import('@/views/politics/propagandaWork/theoreticalLearning'),
    meta: {
      title: '理论学习',
      icon: 'user'
    },
    auth: 'politics:theoreticalLearning'
  },
  {
    path: 'communication',
    name: 'communication',
    component: () => import('@/views/politics/propagandaWork/communication'),
    meta: {
      title: '交流互动',
      icon: 'user'
    },
    auth: 'politics:communication'
  },
  {
    path: 'myCollection',
    name: 'myCollection',
    component: () => import('@/views/politics/propagandaWork/myCollection'),
    meta: {
      title: '我的收藏',
      icon: 'user'
    },
    auth: 'politics:myCollection'
  },
  {
    path: 'educationPlan',
    name: 'educationPlan',
    component: () => import('@/views/politics/propagandaWork/educationPlan'),
    meta: {
      title: '教育计划管理',
      icon: 'user'
    },
    auth: 'politics:educationPlan'
  },
  {
    path: 'educationTest',
    name: 'educationTest',
    component: () => import('@/views/politics/propagandaWork/educationTest'),
    meta: {
      title: '教育考核',
      icon: 'user'
    },
    auth: 'politics:educationTest'
  },
  {
    path: 'onlineClass',
    name: 'onlineClass',
    component: () => import('@/views/politics/propagandaWork/onlineClass'),
    meta: {
      title: '网络授课',
      icon: 'user'
    },
    auth: 'politics:onlineClass'
  },
  {
    path: 'videodetils',
    name: 'videodetils',
    component: () => import('@/views/politics/propagandaWork/videodetils'),
    meta: {
      title: '网络授课',
      icon: 'user'
    },
    auth: 'politics:videodetils'
  }
]

const cadreRouter=[
  {
    path: 'cadre/baseInfo',
    name: 'cadre/baseInfo',
    component: () => import('@/views/politics/cadre/baseInfo'),
    meta: {
      title: '干部基本信息',
      icon: 'user'
    },
    auth: 'politics:addPartyMembers'
  },
  {
    path: 'cadre/vacation',
    name: 'cadre/vacation',
    component: () => import('@/views/politics/cadre/vacation'),
    meta: {
      title: '干部休假',
      icon: 'user'
    },
    auth: 'politics:addPartyMembers'
  },
  {
    path: 'cadre/promotion',
    name: 'cadre/promotion',
    component: () => import('@/views/politics/cadre/promotion'),
    meta: {
      title: '晋职晋衔管理',
      icon: 'user'
    },
    auth: 'politics:addPartyMembers'
  },
  {
    path: 'cadre/changejob',
    name: 'cadre/changejob',
    component: () => import('@/views/politics/cadre/changejob'),
    meta: {
      title: '复转退管理',
      icon: 'user'
    },
    auth: 'politics:addPartyMembers'
  },
  {
    path: 'cadre/study',
    name: 'cadre/study',
    component: () => import('@/views/politics/cadre/study'),
    meta: {
      title: '外学管理',
      icon: 'user'
    },
    auth: 'politics:addPartyMembers'
  },
]

export default politicsRouter.concat(cadreRouter)
