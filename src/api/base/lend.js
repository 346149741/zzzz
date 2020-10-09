import request from '@/utils/request'
import { moduleurl } from './main'
export default {
  upload(file) {
    return request({
      url: `/${moduleurl}/file/upload/legend`,
      method: 'post',
      data: file,
      withCredentials: true // 表示跨域请求时是否需要使用凭证
    })
  },

  add(data) {
    return request({
      url: `/${moduleurl}/bblegend`,
      method: 'post',
      data: data
    })
  },

  update(data) {
    return request({
      url: `/${moduleurl}/bblegend`,
      method: 'put',
      data: data
    })
  },

  groupList(group) {
    return request({
      url: `/${moduleurl}/bblegend/group/` + group,
      method: 'get'
    })
  },

  delete(id) {
    return request({
      url: `/${moduleurl}/bblegend/` + id,
      method: 'delete'
    })
  },

  deleteType(data) {
    return request({
      url: `/${moduleurl}/bblegend/del-type`,
      method: 'post',
      data: data
    })
  },

  sort(id1, id2) {
    return request({
      url: `/${moduleurl}/bblegend/swap-sort/` + id1 + '/' + id2,
      method: 'get'
    })
  }
}
