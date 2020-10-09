import request from '@/utils/request'
import { moduleurl } from './main'
export default {
  getOrgDeptTree() {
    return request({
      url: `/${moduleurl}/dept/tree`,
      method: 'get'
    })
  },
  getDeptTree(orgId) {
    return request({
      url: `/${moduleurl}/dept/tree/${orgId}`,
      method: 'get'
    })
  },
  query(orgId, nameOrPinyin) {
    return request({
      url: `/${moduleurl}/dept/query`,
      method: 'get',
      params: {
        orgId,
        nameOrPinyin
      }
    })
  },
  getDeptList(listQuery) {
    return request({
      url: `/${moduleurl}/dept/page`,
      method: 'post',
      data: listQuery
    })
  },
  genCode(orgId) {
    return request({
      url: `/${moduleurl}/dept/gen/code/` + orgId,
      method: 'get'
    })
  },
  checkCode(code, id) {
    return request({
      url: `/${moduleurl}/dept/check/code`,
      method: 'get',
      params: { code, id }
    })
  },
  save(data) {
    return request({
      url: `/${moduleurl}/dept`,
      method: 'post',
      data
    })
  },
  updateItem(data) {
    return request({
      url: `/${moduleurl}/dept`,
      method: 'put',
      data
    })
  },
  delete(id) {
    return request({
      url: `/${moduleurl}/dept/` + id,
      method: 'delete'
    })
  },
  getAll() {
    return request({
      url: `/${moduleurl}/dept`,
      method: 'get'
    })
  }
}
