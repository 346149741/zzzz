import request from '@/utils/request'
import { moduleurl } from './main'
export default {
  all() {
    return request({
      url: `/${moduleurl}/video-device`,
      method: 'get'
    })
  },
  page(data) {
    return request({
      url: `/${moduleurl}/video-device/page`,
      method: 'post',
      data: data
    })
  },

  create(data) {
    return request({
      url: `/${moduleurl}/video-device`,
      method: 'post',
      data: data
    })
  },

  update(data) {
    return request({
      url: `/${moduleurl}/video-device`,
      method: 'put',
      data: data
    })
  },

  del(id) {
    return request({
      url: `/${moduleurl}/video-device/` + id,
      method: 'delete'
    })
  },

  detail(id) {
    return request({
      url: `/${moduleurl}/video-device/` + id,
      method: 'get'
    })
  },

  getAll() {
    return request({
      url: `/${moduleurl}/video-device`,
      method: 'get'
    })
  }
}

