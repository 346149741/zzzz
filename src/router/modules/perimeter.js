/** When your routing table is too long, you can split it into small modules**/
/* eslint-disable */
const perimeterRouter = [{
  path: 'equipRegister',
  name: 'equipRegister',
  component: () => import('@/views/perimeter/equipRegister/index'),
  meta: {
    title: '设备注册',
    icon: 'user'
  },
  auth: 'perimeter:equipRegister'
}, {
  path: 'deployment',
  name: 'deployment',
  component: () => import('@/views/perimeter/deployment/index'),
  meta: {
    title: '防区部署',
    icon: 'user'
  },
  auth: 'perimeter:deployment'
}, {
  path: 'monitor',
  name: 'monitor',
  component: () => import('@/views/perimeter/monitor/index'),
  meta: {
    title: '周界监控',
    icon: 'user'
  },
  auth: 'perimeter:monitor'
}, {
  path: 'policeHandle',
  name: 'policeHandle',
  component: () => import('@/views/perimeter/policeHandle/index'),
  meta: {
    title: '警情处置',
    icon: 'user'
  },
  auth: 'perimeter:policeHandle'
}]

export default perimeterRouter
