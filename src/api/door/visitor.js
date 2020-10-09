import request from '@/utils/request'
import { doorurl } from '../base/main'
export default {
  yuyuepage(data) {
    return request({
      url: `/${doorurl}/appointment/page`,
      method: 'post',
      data: data
    })
  },
  addyuyue(data) {
    return request({
      url: `/${doorurl}/appointment/save`,
      method: 'post',
      data: data
    })
  },
  putyuyue(data) {
    return request({
      url: `/${doorurl}/appointment`,
      method: 'put',
      data: data
    })
  },
  getyuyue(id) {
    return request({
      url: `/${doorurl}/appointment/detail/`+id,
      method: 'get',
    })
  },
  delyuyue(id) {
    return request({
      url: `/${doorurl}/appointment/backout/`+id,
      method: 'get',
    })
  },
  guestpage(data) {
    return request({
      url: `/${doorurl}/visitorform/page`,
      method: 'post',
      data: data
    })
  },
  addguest(data) {
    return request({
      url: `/${doorurl}/visitorform/save`,
      method: 'post',
      data: data
    })
  },
  putguest(data) {
    return request({
      url: `/${doorurl}/visitorform`,
      method: 'put',
      data: data
    })
  },
  getguest(id) {
    return request({
      url: `/${doorurl}/appointment/detail/`+id,
      method: 'get',
    })
  },
  delguest(id) {
    return request({
      url: `/${doorurl}/appointment/backout/`+id,
      method: 'get',
    })
  },
}