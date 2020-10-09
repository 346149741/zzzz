import request from '@/utils/request'
import { moduleurl } from './main'
export function configTree() {
  return request({
    url: `/${moduleurl}/project/tree`,
    method: 'get'
  })
}

export function page(data) {
  return request({
    url: `/${moduleurl}/config/info/page`,
    method: 'post',
    data: data
  })
}

export function init(data) {
  return request({
    url: `/${moduleurl}/config/info/add`,
    method: 'post',
    params: data
  })
}

export function create(data) {
  return request({
    url: `/${moduleurl}/config/item`,
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: `/${moduleurl}/config/info`,
    method: 'put',
    data: data
  })
}

export function del(id) {
  return request({
    url: `/${moduleurl}/config/item/` + id,
    method: 'delete'
  })
}

export function checkCode(id, code) {
  return request({
    url: `/${moduleurl}/config/item/check/code`,
    method: 'get',
    params: { id, code }
  })
}
