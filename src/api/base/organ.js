import request from '@/utils/request'
import { moduleurl } from './main'
export function getOrgTree() {
  return request({
    url: `/${moduleurl}/institution/tree`,
    method: 'get'
  })
}
export function getAllOrg() {
  return request({
    url: `/${moduleurl}/institution`,
    method: 'get'
  })
}

export function orgCreate(data) {
  return request({
    url: `/${moduleurl}/institution`,
    method: 'post',
    data: data
  })
}

export function orgEdit(data) {
  return request({
    url: `/${moduleurl}/institution`,
    method: 'put',
    data: data
  })
}

export function orgDelete(id) {
  return request({
    url: `/${moduleurl}/institution/` + id,
    method: 'delete'
  })
}

export function getOrgById(id) {
  return request({
    url: `/${moduleurl}/institution/` + id,
    method: 'get'
  })
}
