/** When your routing table is too long, you can split it into small modules**/
/* eslint-disable */
const trainingRouter = [{
    path: 'questionBank',
    name: 'questionBank',
    component: () => import('@/views/training/exam/manage/questionBank/index'),
    meta: {
      title: '题库管理',
      icon: 'user'
    },
    auth: 'training:questionBank'
  },
  {
    path: 'testPaper',
    name: 'testPaper',
    component: () => import('@/views/training/exam/manage/testPaper/index'),
    meta: {
      title: '试卷管理',
      icon: 'user'
    },
    auth: 'training:testPaper'
  },
  {
    path: 'testPlan',
    name: 'testPlan',
    component: () => import('@/views/training/exam/manage/testPlan/index'),
    meta: {
      title: '考试安排',
      icon: 'user'
    },
    auth: 'training:testPlan'
  },
  {
    path: 'achievement',
    name: 'achievement',
    component: () => import('@/views/training/exam/manage/achievement/index'),
    meta: {
      title: '成绩管理',
      icon: 'user'
    },
    auth: 'training:achievement'
  },
  {
    path: 'online',
    name: 'online',
    component: () => import('@/views/training/exam/test/online/index'),
    meta: {
      title: '在线考试',
      icon: 'user'
    },
    auth: 'training:online'
  },
  {
    path: 'simulation',
    name: 'simulation',
    component: () => import('@/views/training/exam/test/simulation/index'),
    meta: {
      title: '模拟考试',
      icon: 'user'
    },
    auth: 'training:simulation'
  },
  {
    path: 'timeLimit',
    name: 'timeLimit',
    component: () => import('@/views/training/exam/combat/timeLimit/index'),
    meta: {
      title: '网上对抗',
      icon: 'user'
    },
    auth: 'training:timeLimit'
  },
  {
    path: 'matchStatistics',
    name: 'matchStatistics',
    component: () => import('@/views/training/exam/combat/matchStatistics/index'),
    meta: {
      title: '情况统计',
      icon: 'user'
    },
    auth: 'training:matchStatistics'
  },
  {
    path: 'competition',
    name: 'competition',
    component: () => import('@/views/training/exam/combat/competition/index'),
    meta: {
      title: '竞赛设置',
      icon: 'user'
    },
    auth: 'training:competition'
  },
  {
    path: 'unit',
    name: 'unit',
    component: () => import('@/views/training/exam/statistic/unit/index'),
    meta: {
      title: '单位统计分析',
      icon: 'user'
    },
    auth: 'training:unit'
  },
  {
    path: 'personal',
    name: 'personal',
    component: () => import('@/views/training/exam/statistic/personal/index'),
    meta: {
      title: '个人统计分析',
      icon: 'user'
    },
    auth: 'training:personal'
  },
  {
    path: 'annualCheck',
    name: 'annualCheck',
    component: () => import('@/views/training/exam/statistic/annualCheck/index'),
    meta: {
      title: '年度考核活动统计',
      icon: 'user'
    },
    auth: 'training:annualCheck'
  },
  {
    path: 'trainingStatistic',
    name: 'annualCheck',
    component: () => import('@/views/training/statistic/index'),
    meta: {
      title: '训练态势',
      icon: 'user'
    },
    auth: 'training:trainingStatistic'
  }
]

export default trainingRouter
