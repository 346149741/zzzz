import request from '@/utils/request'
import { moduleurl } from './main'
export const page = (listQuery) => {
  return request({
    url: `/${moduleurl}/map/release/page`,
    method: 'post',
    data: listQuery
  })
}
export const all = () => {
  return request({
    url: `/${moduleurl}/map/release`,
    method: 'get'
  })
}
export const view = (mapId) => {
  return request({
    url: `/${moduleurl}/map/release/view/` + mapId,
    method: 'get'
  })
}

export const releaseInfo = (date, mapId, displayType) => {
  return request({
    url: `/${moduleurl}/map/release/info`,
    method: 'get',
    params: { date, mapId, displayType }
  })
}

export const create = (data) => {
  return request({
    url: `/${moduleurl}/map`,
    method: 'post',
    data: data
  })
}

export const update = (mapBlocks, mapId) => {
  return request({
    url: `/${moduleurl}/map/release/release`,
    method: 'POST',
    data: mapBlocks,
    params: {
      mapId: mapId
    }
  })
}

export const delRelease = (id) => {
  return request({
    url: `/${moduleurl}/map/release/` + id,
    method: 'delete'
  })
}

export const del = (id) => {
  return request({
    url: `/${moduleurl}/map/` + id,
    method: 'delete'
  })
}

export const checkCode = (params) => {
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

