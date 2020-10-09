import request from '@/utils/request'
import { moduleurl } from './main'
export const page = (listQuery) => {
  return request({
    url: `/${moduleurl}/map/page`,
    method: 'post',
    data: listQuery
  })
}
export const create = (data) => {
  return request({
    url: `/${moduleurl}/map`,
    method: 'post',
    data: data
  })
}
export const update = (form) => {
  return request({
    url: `/${moduleurl}/map`,
    method: 'put',
    data: form
  })
}
export const view = (mapId) => {
  return request({
    url: `/${moduleurl}/map/view/` + mapId,
    method: 'get'
  })
}

export const del = (id) => {
  return request({
    url: `/${moduleurl}/map/` + id,
    method: 'delete'
  })
}

export const checkProNo = (params) => {
  return request({
    url: `/${moduleurl}/map/check/no`,
    method: 'get',
    params
  })
}

export const genCode = () => {
  return request({
    url: `/${moduleurl}/map/gen/no`,
    method: 'get'
  })
}

