import request from '@/utils/request'
import { moduleurl } from './main'
export const page = (listQuery) => {
  return request({
    url: `/${moduleurl}/layer/page`,
    method: 'post',
    data: listQuery
  })
}
export const tree = () => {
  return request({
    url: `/${moduleurl}/layer/tree`,
    method: 'get'
  })
}

export const createTree = (data) => {
  return request({
    url: `/${moduleurl}/layer/group`,
    method: 'post',
    data
  })
}

export const findItemTree = (code) => {
  return request({
    url: `/${moduleurl}/layer/code/` + code,
    method: 'get'
  })
}

export const updateItem = (data) => {
  return request({
    url: `/${moduleurl}/layer/group`,
    method: 'put',
    data
  })
}

export const create = (data) => {
  return request({
    url: `/${moduleurl}/layer`,
    method: 'post',
    data
  })
}
export const update = (form) => {
  return request({
    url: `/${moduleurl}/layer`,
    method: 'put',
    data: form
  })
}

export const view = (mapId) => {
  return request({
    url: `/${moduleurl}/layer/view/` + mapId,
    method: 'get'
  })
}

export const delTree = (code) => {
  return request({
    url: `/${moduleurl}/layer/group/` + code,
    method: 'delete'
  })
}

export const del = (id) => {
  return request({
    url: `/${moduleurl}/layer/` + id,
    method: 'delete'
  })
}

export const checkCode = (code, id = '') => {
  return request({
    url: `/${moduleurl}/layer/check/code`,
    method: 'get',
    params: { code: code, id: id }
  })
}

export const genCode = (pcode = '') => {
  return request({
    url: `/${moduleurl}/layer/gen/code`,
    method: 'get',
    params: {
      pcode
    }
  })
}

export const genLyrCode = (pcode = '') => {
  return request({
    url: `/${moduleurl}/layer/gen/layer/code`,
    method: 'get',
    params: {
      pcode
    }
  })
}

export const genLyrSort = (pcode = '') => {
  return request({
    url: `/${moduleurl}/layer/gen/sort/` + pcode,
    method: 'get'
  })
}

export const genTCSort = () => {
  return request({
    url: `/${moduleurl}/layer/gen/group/sort`,
    method: 'get'
  })
}

export const upload = (file) => {
  return request({
    url: `/${moduleurl}/file/upload/head`,
    method: 'post',
    data: file,
    withCredentials: true // 表示跨域请求时是否需要使用凭证
  })
}

export const server = () => {
  return request({
    url: `/${moduleurl}/layer/service`,
    method: 'get'
  })
}
