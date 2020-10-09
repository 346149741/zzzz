import request from '@/utils/request'
import { doorurl } from '../base/main'
export default {
  upload(file) {
    return request({
      url: '/file/upload/door',
      method: 'post',
      data: file,
      withCredentials: true // 表示跨域请求时是否需要使用凭证
    })
  },
  page(data) {
    return request({
      url: `/${doorurl}/car/page`,
      method: 'post',
      data: data
    })
  },
  create(data) {
    return request({
      url: `/${doorurl}/car`,
      method: 'post',
      data: data
    })
  },
  update(data) {
    return request({
      url: `/${doorurl}/car`,
      method: 'put',
      data: data
    })
  },
  del(id) {
    return request({
      url: `/${doorurl}/car/${id}`,
      method: 'delete'
    })
  },
  detail(id) {
    return request({
      url: `/${doorurl}/car/${id}`,
      method: 'get'
    })
  }
}
