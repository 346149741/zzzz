import request from '@/utils/request'
import axios from 'axios'
import { moduleurl } from './main'
export function tree(clientId) {
  return request({
    url: `/${moduleurl}/authority/tree/all/` + clientId,
    method: 'get'
  })
}

export function getAuthorityTree(clientId, type) {
  return request({
    url: `/${moduleurl}/authority/tree/` + clientId + '/' + type,
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: `/${moduleurl}/authority/` + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: `/${moduleurl}/authority`,
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: `/${moduleurl}/authority`,
    method: 'put',
    data: data
  })
}

export function validCode(params) {
  return request({
    url: `/${moduleurl}/authority/check/code`,
    method: 'get',
    params
  })
}

export function del(id) {
  return request({
    url: `/${moduleurl}/authority/` + id,
    method: 'delete'
  })
}

export function enable(id) {
  return request({
    url: `/${moduleurl}/authority/enable/` + id,
    method: 'put'
  })
}
// 读取iconfont
export function readExtendIcons() {
  return new Promise((resolve, reject) => {
    axios.get(process.env.VUE_APP_PROJECT_BASE + 'static/iconfont/font_1252008_n8mwmq749pl/iconfont.css').then((res) => {
      const iconCss = res.data
      const reg = /(.icon.*)\:before/g // 筛选.icon开头:before结尾的字符串
      let resultS = null; const icons = []
      while ((resultS = reg.exec(iconCss)) != null) {
        icons.push('iconfont ' + resultS[1].replace('.', ''))
      }
      resolve(icons)
    })
  })
}

// 默认配置好的图标
const elementIcons = ['platform-eleme', 'eleme', 'delete-solid', 'delete', 's-tools', 'setting', 'user-solid', 'user', 'phone', 'phone-outline', 'more', 'more-outline', 'star-on', 'star-off', 's-goods', 'goods', 'warning', 'warning-outline', 'question', 'info', 'remove', 'circle-plus', 'success', 'error', 'zoom-in', 'zoom-out', 'remove-outline', 'circle-plus-outline', 'circle-check', 'circle-close', 's-help', 'help', 'minus', 'plus', 'check', 'close', 'picture', 'picture-outline', 'picture-outline-round', 'upload', 'upload2', 'download', 'camera-solid', 'camera', 'video-camera-solid', 'video-camera', 'message-solid', 'bell', 's-cooperation', 's-order', 's-platform', 's-fold', 's-unfold', 's-operation', 's-promotion', 's-home', 's-release', 's-ticket', 's-management', 's-open', 's-shop', 's-marketing', 's-flag', 's-comment', 's-finance', 's-claim', 's-custom', 's-opportunity', 's-data', 's-check', 's-grid', 'menu', 'share', 'd-caret', 'caret-left', 'caret-right', 'caret-bottom', 'caret-top', 'bottom-left', 'bottom-right', 'back', 'right', 'bottom', 'top', 'top-left', 'top-right', 'arrow-left', 'arrow-right', 'arrow-down', 'arrow-up', 'd-arrow-left', 'd-arrow-right', 'video-pause', 'video-play', 'refresh', 'refresh-right', 'refresh-left', 'finished', 'sort', 'sort-up', 'sort-down', 'rank', 'loading', 'view', 'c-scale-to-original', 'date', 'edit', 'edit-outline', 'folder', 'folder-opened', 'folder-add', 'folder-remove', 'folder-delete', 'folder-checked', 'tickets', 'document-remove', 'document-delete', 'document-copy', 'document-checked', 'document', 'document-add', 'printer', 'paperclip', 'takeaway-box', 'search', 'monitor', 'attract', 'mobile', 'scissors', 'umbrella', 'headset', 'brush', 'mouse', 'coordinate', 'magic-stick', 'reading', 'data-line', 'data-board', 'pie-chart', 'data-analysis', 'collection-tag', 'film', 'suitcase', 'suitcase-1', 'receiving', 'collection', 'files', 'notebook-1', 'notebook-2', 'toilet-paper', 'office-building', 'school', 'table-lamp', 'house', 'no-smoking', 'smoking', 'shopping-cart-full', 'shopping-cart-1', 'shopping-cart-2', 'shopping-bag-1', 'shopping-bag-2', 'sold-out', 'sell', 'present', 'box', 'bank-card', 'money', 'coin', 'wallet', 'discount', 'price-tag', 'news', 'guide', 'male', 'female', 'thumb', 'cpu', 'link', 'connection', 'open', 'turn-off', 'set-up', 'chat-round', 'chat-line-round', 'chat-square', 'chat-dot-round', 'chat-dot-square', 'chat-line-square', 'message', 'postcard', 'position', 'turn-off-microphone', 'microphone', 'close-notification', 'bangzhu', 'time', 'odometer', 'crop', 'aim', 'switch-button', 'full-screen', 'copy-document', 'mic', 'stopwatch', 'medal-1', 'medal', 'trophy', 'trophy-1', 'first-aid-kit', 'discover', 'place', 'location', 'location-outline', 'location-information', 'add-location', 'delete-location', 'map-location', 'alarm-clock', 'timer', 'watch-1', 'watch', 'lock', 'unlock', 'key', 'service', 'mobile-phone', 'bicycle', 'truck', 'ship', 'basketball', 'football', 'soccer', 'baseball', 'wind-power', 'light-rain', 'lightning', 'heavy-rain', 'sunrise', 'sunrise-1', 'sunset', 'sunny', 'cloudy', 'partly-cloudy', 'cloudy-and-sunny', 'moon', 'moon-night', 'dish', 'dish-1', 'food', 'chicken', 'fork-spoon', 'knife-fork', 'burger', 'tableware', 'sugar', 'dessert', 'ice-cream', 'hot-water', 'water-cup', 'coffee-cup', 'cold-drink', 'goblet', 'goblet-full', 'goblet-square', 'goblet-square-full', 'refrigerator', 'grape', 'watermelon', 'cherry', 'apple', 'pear', 'orange', 'coffee', 'ice-tea', 'ice-drink', 'milk-tea', 'potato-strips', 'lollipop', 'ice-cream-square', 'ice-cream-round']
export function readElementIcons() {
  return new Promise(resolve => {
    const res = elementIcons.map((item) => { return 'el-icon-' + item })
    resolve(res)
  })
}
