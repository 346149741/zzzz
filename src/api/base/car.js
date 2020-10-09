import request from '@/utils/request'
import { moduleurl } from './main'
export default {
  all() {
    return request({
      url: `/${moduleurl}/carBreak-info`,
      method: 'get'
    })
  },
  page(data) {
    return request({
      url: `/${moduleurl}/carBreak-info/page`,
      method: 'post',
      data: data
    })
  },
  create(data) {
    return request({
      url: `/${moduleurl}/carBreak-info`,
      method: 'post',
      data: data
    })
  },
  update(data) {
    return request({
      url: `/${moduleurl}/carBreak-info`,
      method: 'put',
      data: data
    })
  },
  del(id) {
    return request({
      url: `/${moduleurl}/carBreak-info/` + id,
      method: 'delete'
    })
  },
  detail(id) {
    return request({
      url: `/${moduleurl}/carBreak-info/` + id,
      method: 'get'
    })
  }
}
