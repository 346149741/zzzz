/** When your routing table is too long, you can split it into small modules**/
/* eslint-disable */
const onlineTrainingRouter = [
  {
    path: 'selfLearning',
    name: 'selfLearning',
    component: () => import('@/views/onlineTraining/selfLearning/index'),
    meta: {
      title: '自主学习',
      icon: 'user'
    },
    auth: 'patrol:selfLearning'
  },
  {
    path: 'selfLearning/news',
    name: 'SelfLearningPoliticsNews',
    component: () => import('@/views/onlineTraining/selfLearning/PoliticsNews'),
    meta: {
      title: '政治要闻',
      icon: 'user'
    },
    auth: 'patrol:selfLearning'
  },
  {
    path: 'selfLearning/electronicnews',
    name: 'SelfLearningElectronicNews',
    component: () => import('@/views/onlineTraining/selfLearning/ElectronicNews'),
    meta: {
      title: '电子报刊',
      icon: 'user'
    },
    auth: 'patrol:selfLearning'
  }, {
    path: 'selfLearning/ebook',
    name: 'SelfLearningEBook',
    component: () => import('@/views/onlineTraining/selfLearning/EBook'),
    meta: {
      title: '图书',
      icon: 'user'
    },
    auth: 'patrol:selfLearning'
  }, {
    path: 'selfLearning/AcademicPapers',
    name: 'SelfLearningAcademicPapers',
    component: () => import('@/views/onlineTraining/selfLearning/AcademicPapers'),
    meta: {
      title: '学术论文',
      icon: 'user'
    },
    auth: 'patrol:selfLearning'
  }, {
    path: 'selfLearning/BroadcastNews',
    name: 'SelfLearningBroadcastNews',
    component: () => import('@/views/onlineTraining/selfLearning/BroadcastNews'),
    meta: {
      title: '新闻广播',
      icon: 'user'
    },
    auth: 'patrol:selfLearning'
  }, {
    path: 'selfLearning/MediaVoice',
    name: 'SelfLearningMediaVoice',
    component: () => import('@/views/onlineTraining/selfLearning/MediaNews'),
    meta: {
      title: '多媒体资源',
      icon: 'user'
    },
    auth: 'patrol:selfLearning'
  }, {
    path: 'selfLearning/MediaVoice/detail',
    name: 'SelfLearningMediaVoiceDetail',
    component: () => import('@/views/onlineTraining/selfLearning/MediaNews/detail.vue'),
    meta: {
      title: '视频播放',
      icon: 'user'
    },
    auth: 'patrol:selfLearning'
  }, {
    path: 'selfLearning/MusicVoice',
    name: 'SelfLearningMusicVoice',
    component: () => import('@/views/onlineTraining/selfLearning/MusicVoice'),
    meta: {
      title: '音乐之声',
      icon: 'user'
    },
    auth: 'patrol:selfLearning'
  },
  {
    path: 'onlineIntera',
    name: 'onlineIntera',
    component: () => import('@/views/onlineTraining/onlineIntera/index'),
    meta: {
      title: '网上答疑',
      icon: 'user'
    },
    auth: 'patrol:onlineIntera'
  }
]
const tastTrainingRouter = [
  {
    path: 'tasteTraining',
    name: 'tasteTraining',
    component: () => import('@/views/onlineTraining/tasteTraining/index'),
    meta: {
      title: '趣味训练',
      icon: 'user'
    },
    auth: 'patrol:tasteTraining'
  }, {
    path: 'tasteTraining/daily',
    name: 'tasteTrainingDaily',
    component: () => import('@/views/onlineTraining/tasteTraining/dailyAnswer'),
    meta: {
      title: '每日答题',
      icon: 'user'
    },
    auth: 'patrol:tasteTraining'
  }, {
    path: 'tasteTraining/week',
    name: 'tasteTrainingWeek',
    component: () => import('@/views/onlineTraining/tasteTraining/weekAnswer'),
    meta: {
      title: '每周答题',
      icon: 'user'
    },
    auth: 'patrol:tasteTraining'
  }, {
    path: 'tasteTraining/week/detail',
    name: 'tasteTrainingWeekDetail',
    component: () => import('@/views/onlineTraining/tasteTraining/weekAnswer/answer.vue'),
    meta: {
      title: '每周答题',
      icon: 'user'
    },
    auth: 'patrol:tasteTraining'
  },{
    path: 'tasteTraining/theme',
    name: 'tasteTrainingthemeAnswer',
    component: () => import('@/views/onlineTraining/tasteTraining/themeAnswer'),
    meta: {
      title: '专项答题',
      icon: 'user'
    },
    auth: 'patrol:tasteTraining'
  },{
    path: 'tasteTraining/theme/detail',
    name: 'tasteTrainingthemeAnswerDetail',
    component: () => import('@/views/onlineTraining/tasteTraining/themeAnswer/detail.vue'),
    meta: {
      title: '专项答题',
      icon: 'user'
    },
    auth: 'patrol:tasteTraining'
  },{
    path: 'qamanage',
    name: 'onlineTraining/qamanage',
    component: () => import('@/views/training/exam/manage/questionBank'),
    meta: {
      title: '题库管理',
      icon: 'user'
    },
    auth: 'patrol:tasteTraining'
  },
]
  // /
export default onlineTrainingRouter.concat(tastTrainingRouter)
