import request from '@/utils/request'
import qs from 'qs'
import {
  aroundurl
} from '@/api/base/main'
export default {
  all() {
    return request({
      url: `/${aroundurl}/perimeterDevice`,
      method: 'get'
    })
  },
  page(data) {
    return request({
      url: `/${aroundurl}/perimeterDevice/page`,
      method: 'post',
      data: data
    })
  },
  create(data) {
    return request({
      url: `/${aroundurl}//perimeterDevice`,
      method: 'post',
      data: data
    })
  },
  update(data) {
    return request({
      url: `/${aroundurl}/perimeterDevice`,
      method: 'put',
      data: data
    })
  },
  del(id) {
    return request({
      url: `/${aroundurl}/perimeterDevice/` + id,
      method: 'delete'
    })
  },
  detail(id) {
    return request({
      url: `/${aroundurl}/perimeterDevice/` + id,
      method: 'get'
    })
  },
  batchStart(ids) {
    return request({
      url: `/${aroundurl}/perimeterDevice/bathActive`,
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
  batchEnd(ids) {
    return request({
      url: `/${aroundurl}/perimeterDevice/bathForbidden`,
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
  }
}
