import request from '@/utils/request'
import { moduleurl } from './main'
export default {
  page(data) {
    return request({
      url: `/${moduleurl}/door-forbid/page`,
      method: 'post',
      data: data
    })
  },
  create(data) {
    return request({
      url: `/${moduleurl}/door-forbid`,
      method: 'post',
      data: data
    })
  },
  update(data) {
    return request({
      url: `/${moduleurl}/door-forbid`,
      method: 'put',
      data: data
    })
  },
  del(id) {
    return request({
      url: `/${moduleurl}/door-forbid/` + id,
      method: 'delete'
    })
  },
  detail(id) {
    return request({
      url: `/${moduleurl}/door-forbid/` + id,
      method: 'get'
    })
  }
}
