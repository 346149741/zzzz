import request from '@/utils/request'
import { moduleurl } from './main'
export const floorpage = (listQuery) => {
  return request({
    url: `/${moduleurl}/towerinfo/page`,
    method: 'post',
    data: listQuery
  })
}
export const floorsave = (listQuery) => {
  return request({
    url: `/${moduleurl}/towerinfo`,
    method: 'post',
    data: listQuery
  })
}
export const floorput = (listQuery) => {
  return request({
    url: `/${moduleurl}/towerinfo`,
    method: 'put',
    data: listQuery
  })
}
export const floorget = (id) => {
  return request({
    url: `/${moduleurl}/towerinfo/` + id,
    method: 'get'
  })
}
export const floordel = (id) => {
  return request({
    url: `/${moduleurl}/towerinfo/` + id,
    method: 'delete'
  })
}
export const floorAll = (id) => {
  return request({
    url: `/${moduleurl}/towerinfo`,
    method: 'get'
  })
}
//
export const registertree = () => {
  return request({
    url: `/${moduleurl}/areainfo/tree`,
    method: 'get'
  })
}
export const registerdel = (id) => {
  return request({
    url: `/${moduleurl}/areainfo/` + id,
    method: 'delete'
  })
}
export const registerget = (id) => {
  return request({
    url: `/${moduleurl}/areainfo/` + id,
    method: 'get'
  })
}
export const registersave = (listQuery) => {
  return request({
    url: `/${moduleurl}/areainfo`,
    method: 'post',
    data: listQuery
  })
}
export const registerput = (listQuery) => {
  return request({
    url: `/${moduleurl}/areainfo`,
    method: 'put',
    data: listQuery
  })
}
