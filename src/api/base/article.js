import request from '@/utils/request'
import { moduleurl } from './main'
export function fetchList(query) {
  return request({
    url: `/${moduleurl}/article/list`,
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: `/${moduleurl}/article/detail`,
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: `/${moduleurl}/article/pv`,
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: `/${moduleurl}/article/create`,
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: `/${moduleurl}/article/update`,
    method: 'post',
    data
  })
}
