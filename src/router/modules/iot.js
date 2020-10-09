/** When your routing table is too long, you can split it into small modules**/
/* eslint-disable */
const doorRouter = [
  {
    path: 'environment',
    component: () => import('@/views/IOT/environment/index'),
    name: 'environment',
    auth: 'IOT:environment',
    meta: {
      title: '环境监测',
      icon: 'dashboard',
    }
  },
  {
    path: 'irrigation',
    component: () => import('@/views/IOT/irrigation/index'),
    name: 'irrigation',
    auth: 'IOT:irrigation',
    meta: {
      title: '智慧灌溉',
      icon: 'dashboard',
    }
  }
]

export default doorRouter
