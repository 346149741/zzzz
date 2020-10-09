import request from '@/utils/request'
import { uavpatrolurl } from '../base/main'

export function page(data) {
  return request({
    url: `/${uavpatrolurl}/task/page`,
    method: 'post',
    data
  })
}

export function getById(id) {
  return request({
    url: `/${uavpatrolurl}/task`,
    method: 'get',
    params: { id }
  })
}

export function del(id) {
  return request({
    url: `/${uavpatrolurl}/task`,
    method: 'get',
    params: { id }
  })
}
