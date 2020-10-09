/** When your routing table is too long, you can split it into small modules**/
/* eslint-disable */
const trainingRouter = [{
    path: 'trainingVenue',
    name: 'trainingVenue',
    component: () => import('@/views/training/trainingVenue/index'),
    meta: {
      title: '训练场地',
      icon: 'user'
    },
    auth: 'patrol:trainingVenue'
  },
  {
    path: 'trainingEquipment',
    name: 'trainingEquipment',
    component: () => import('@/views/training/trainingEquipment/index'),
    meta: {
      title: '训练装备',
      icon: 'user'
    },
    auth: 'patrol:trainingEquipment'
  },
  {
    path: 'trainingQc',
    name: 'trainingQc',
    component: () => import('@/views/training/trainingQc/index'),
    meta: {
      title: '训练器材',
      icon: 'user'
    },
    auth: 'patrol:trainingQc'
  }, 
  {
    path: 'trainingJc',
    name: 'trainingJc',
    component: () => import('@/views/training/trainingJc/index'),
    meta: {
      title: '训练教材',
      icon: 'user'
    },
    auth: 'patrol:trainingJc'
  },
  {
    path: 'trainingCoach',
    name: 'trainingCoach',
    component: () => import('@/views/training/trainingCoach/index'),
    meta: {
      title: '训练教材',
      icon: 'user'
    },
    auth: 'patrol:trainingCoach'
  },
  {
    path: 'resourceMent',
    name: 'resourceMent',
    component: () => import('@/views/training/resourceMent/index'),
    meta: {
      title: '资源综合管理',
      icon: 'user'
    },
    auth: 'patrol:resourceMent'
  }
]

export default trainingRouter
