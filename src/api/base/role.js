import request from '@/utils/request'
import { moduleurl } from './main'
export function client() {
  return request({
    url: `/${moduleurl}/client`,
    method: 'get'
  })
}

export function page(data) {
  return request({
    url: `/${moduleurl}/role/page`,
    method: 'post',
    data: data
  })
}

export function allRole() {
  return request({
    url: `/${moduleurl}/role`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: `/${moduleurl}/role`,
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: `/${moduleurl}/role`,
    method: 'put',
    data: data
  })
}

export function del(id) {
  return request({
    url: `/${moduleurl}/role/` + id,
    method: 'delete'
  })
}

export function list(id) {
  return request({
    url: `/${moduleurl}/role/user/` + id,
    method: 'get'
  })
}

export function enable(id) {
  return request({
    url: `/${moduleurl}/role/enable/` + id,
    method: 'put'
  })
}

export function getAuthorityTree(clientId) {
  return request({
    url: `/${moduleurl}/authority/tree/` + clientId,
    method: 'get'
  })
}

export function getRolePermission(id) {
  return request({
    url: `/${moduleurl}/role/authority/` + id,
    method: 'get'
  })
}
