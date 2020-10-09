import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import '@/styles/base.scss'
import '../public/static/iconfont/font_1252008_n8mwmq749pl/iconfont.css'

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

// 水波纹指令
import vueWaves from './directive/waves/waves'
Vue.use(vueWaves)

// 图片放大
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Viewer.setDefaults({
  Options: { 'zIndex': 9999, 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
Vue.use(Viewer)

// 添加lodash
import _ from 'lodash'
Vue.prototype.$_ = _

// 添加Moment
import moment from 'moment'
Vue.prototype.$moment = moment

// 树状表格
import XEUtil from 'xe-utils'
Vue.prototype.XEUtil = XEUtil
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.use(VXETable)

import Cookies from 'js-cookie'
Vue.use(Element, {
  // size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// 权限控制
import permission from './directive/permission'
Vue.use(permission)
// 全局拖动
import drag from './directive/drag'
Vue.use(drag)
// register global utility filters.
// 全局fliter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 引用mock
/* import { mockXHR } from '../mock'
mockXHR()*/

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
