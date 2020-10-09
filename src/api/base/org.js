import request from '@/utils/request'
import { moduleurl } from './main'
export const getOrgListByPage = (listQuery) => {
  return request({
    url: `/${moduleurl}/organization/page`,
    method: 'post',
    data: listQuery
  })
}

export const query = (name, type) => {
  return request({
    url: `/${moduleurl}/organization/query`,
    method: 'get',
    params: {
      name,
      type
    }
  })
}

export const orgTree = (type) => {
  return request({
    url: `/${moduleurl}/organization/tree`,
    method: 'get',
    params:{
      type
    }
  })
}

export const createOrgItem = (form) => {
  return request({
    url: `/${moduleurl}/organization`,
    method: 'post',
    data: form
  })
}
export const updateOrgItem = (form) => {
  return request({
    url: `/${moduleurl}/organization`,
    method: 'put',
    data: form
  })
}
export const deleteOrgItem = (id) => {
  return request({
    url: `/${moduleurl}/organization/` + id,
    method: 'delete'
  })
}

export const validCode = (code, id) => {
  return request({
    url: `/${moduleurl}/organization/check/code`,
    method: 'get',
    params: { code, id }
  })
}

export const genCode = () => {
  return request({
    url: `/${moduleurl}/organization/gen/code`,
    method: 'get'
  })
}

export const findByType = (type) => {
  return request({
    url: `/${moduleurl}/organization/type/` + type,
    method: 'get'
  })
}

export const getAllOrg = (type) => {
  return request({
    url: `/${moduleurl}/organization`,
    method: 'get'
  })
}

export const getOrgType = () => {
  return request({
    url: `/${moduleurl}/organization/org-type`,
    method: 'get'
  })
}
