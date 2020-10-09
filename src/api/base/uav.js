import request from '@/utils/request'
import { moduleurl } from './main'
export default {
  page(data) {
    return request({
      url: `/${moduleurl}/uav-info/page`,
      method: 'post',
      data: data
    })
  },

  create(data) {
    return request({
      url: `/${moduleurl}/uav-info`,
      method: 'post',
      data: data
    })
  },

  update(data) {
    return request({
      url: `/${moduleurl}/uav-info`,
      method: 'put',
      data: data
    })
  },

  del(id) {
    return request({
      url: `/${moduleurl}/uav-info/` + id,
      method: 'delete'
    })
  },

  detail(id) {
    return request({
      url: `/${moduleurl}/uav-info/` + id,
      method: 'get'
    })
  },

  getAll() {
    return request({
      url: `/${moduleurl}/uav-info`,
      method: 'get'
    })
  },

  checkuser(id) {
    return request({
      url: `/${moduleurl}/uav-info/uav-certificate/status/` + id,
      method: 'get'
    })
  },

  liveInfo(data) {
    return request({
      url: `/${moduleurl}/uav-info/query/room-info`,
      method: 'post',
      data: data
    })
  },

  liveUpdate(data) {
    return request({
      url: `/${moduleurl}/uav-info/update/room-info`,
      method: 'post',
      data: data
    })
  },

  liveStart(data) {
    return request({
      url: `/${moduleurl}/uav-info/save/room`,
      method: 'post',
      data: data
    })
  },

  liveClose(data) {
    return request({
      url: `/${moduleurl}/uav-info/delete/room`,
      method: 'post',
      data: data
    })
  }

}

