import request from '@/utils/request'
import { doorurl, moduleurl } from '../base/main'
export default {
  upload(file) {
    return request({
      url: `/${moduleurl}/file/upload/head`,
      method: 'post',
      data: file,
      withCredentials: true // 表示跨域请求时是否需要使用凭证
    })
  },
  page(data) {
    return request({
      url: `/${doorurl}/deploy-car/page`,
      method: 'post',
      data: data
    })
  },
  create(data) {
    return request({
      url: `/${doorurl}/deploy-car`,
      method: 'post',
      data: data
    })
  },
  update(data) {
    return request({
      url: `/${doorurl}/deploy-car`,
      method: 'put',
      data: data
    })
  },
  del(id) {
    return request({
      url: `/${doorurl}/deploy-car/${id}`,
      method: 'delete'
    })
  },
  detail(id) {
    return request({
      url: `/${doorurl}/deploy-car/${id}`,
      method: 'get'
    })
  }
}
