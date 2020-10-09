import request from '@/utils/request'
import qs from 'qs'
import {
  aroundurl
} from '@/api/base/main'
export default {
  all() {
    return request({
      url: `/${aroundurl}/defenceArea`,
      method: 'get'
    })
  },
  page(data) {
    return request({
      url: `/${aroundurl}/defenceArea/page`,
      method: 'post',
      data: data
    })
  },
  create(data) {
    return request({
      url: `/${aroundurl}/defenceArea`,
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
  del(id) {
    return request({
      url: `/${aroundurl}/defenceArea/` + id,
      method: 'delete'
    })
  },
  detail(id) {
    return request({
      url: `/${aroundurl}/defenceArea/` + id,
      method: 'get'
    })
  },
  // 批量布防/单条布防
  bathDeployment(ids) {
    return request({
      url: `/${aroundurl}/defenceArea/bathDeployment`,
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
  // 批量禁用/单条禁用
  bathWithdraw(ids) {
    return request({
      url: `/${aroundurl}/defenceArea/bathWithdraw`,
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
  // 旁路
  bypass(id) {
    return request({
      url: `/${aroundurl}/defenceArea/bypass`,
      method: 'post',
      params: {
        'id': id
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          indices: false
        })
      }
    })
  },
  // 取消旁路
  cancelBypass(id) {
    return request({
      url: `/${aroundurl}/defenceArea/cancelBypass`,
      method: 'post',
      params: {
        'id': id
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          indices: false
        })
      }
    })
  }
}
