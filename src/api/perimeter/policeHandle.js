import request from '@/utils/request'
import qs from 'qs'
import {
  aroundurl
} from '@/api/base/main'
export default {
  all() {
    return request({
      url: `/${aroundurl}/defenceAlerts`,
      method: 'get'
    })
  },
  page(data) {
    return request({
      url: `/${aroundurl}/defenceAlerts/page`,
      method: 'post',
      data: data
    })
  },
  update(data) {
    return request({
      url: `/${aroundurl}/defenceArea`,
      method: 'put',
      data: data
    })
  },

  detail(id) {
    return request({
      url: `/${aroundurl}/defenceAlerts/` + id,
      method: 'get'
    })
  },
  // 批量禁用/单条禁用
  bathEliminate(ids) {
    return request({
      url: `/${aroundurl}/defenceAlerts/bathEliminate`,
      method: 'post',
      params: {
        'ids': ids
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          indices: false
        })
      }
    })
  },
  // 处理
  dispose(query) {
    return request({
      url: `/${aroundurl}/defenceAlerts/dispose`,
      method: 'post',
      params: query,
      paramsSerializer: params => {
        return qs.stringify(params, {
          indices: false
        })
      }
    })
  }

}
