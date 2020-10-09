import request from '@/utils/request'
import { moduleurl } from './main'
export const page = (listQuery) => {
  return request({
    url: `/${moduleurl}/event/page`,
    method: 'post',
    data: listQuery
  })
}
export const getMessage = (id) => {
  return request({
    url: `/${moduleurl}/event/` + id,
    method: 'get'
  })
}
export const getMessages = (id) => {
  return request({
    url: `/${moduleurl}/event/detail/` + id,
    method: 'get'
  })
}
export function update(data) {
  return request({
    url: `/${moduleurl}/event/handle`,
    method: 'put',
    data: data
  })
}
