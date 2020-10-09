import request from '@/utils/request'

export default {
  page(data) {
    return request({
      url: '/video-device/page',
      method: 'post',
      data: data
    })
  },

  create(data) {
    return request({
      url: '/video-device',
      method: 'post',
      data: data
    })
  },

  update(data) {
    return request({
      url: '/video-device',
      method: 'put',
      data: data
    })
  },

  del(id) {
    return request({
      url: '/video-device/' + id,
      method: 'delete'
    })
  },

  detail(id) {
    return request({
      url: '/video-device/' + id,
      method: 'get'
    })
  },

  getAll() {
    return request({
      url: '/video-device',
      method: 'get'
    })
  }
}

