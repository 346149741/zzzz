import request from '@/utils/request'
import { moduleurl } from './main'
export default {
  page(data) {
    return request({
      url: `/${moduleurl}/familymember/page`,
      method: 'post',
      data: data
    })
  },

  create(data) {
    return request({
      url: `/${moduleurl}/familymember`,
      method: 'post',
      data: data
    })
  },

  update(data) {
    return request({
      url: `/${moduleurl}/familymember`,
      method: 'put',
      data: data
    })
  },

  del(id) {
    return request({
      url: `/${moduleurl}/familymember/` + id,
      method: 'delete'
    })
  },

  detail(id) {
    return request({
      url: `/${moduleurl}/familymember/` + id,
      method: 'get'
    })
  },

  getAll() {
    return request({
      url: `/${moduleurl}/familymember`,
      method: 'get'
    })
  },

  upload(file) {
    return request({
      url: `/${moduleurl}/file/upload/head`,
      method: 'post',
      data: file,
      withCredentials: true // 表示跨域请求时是否需要使用凭证
    })
  }
}

