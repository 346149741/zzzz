import request from '@/utils/request'
import qs from 'qs'
import { moduleurl } from './main'
export function dictTypePage(data) {
  return request({
    url: `/${moduleurl}/dict/type/page`,
    method: 'post',
    data: data
  })
}

export function dictTypeCreate(data) {
  return request({
    url: `/${moduleurl}/dict/type`,
    method: 'post',
    data: data
  })
}

export function dictTypeUpdate(data) {
  return request({
    url: `/${moduleurl}/dict/type`,
    method: 'put',
    data: data
  })
}

export function dictTypeDel(id) {
  return request({
    url: `/${moduleurl}/dict/type/` + id,
    method: 'delete'
  })
}

export function checkDictTypeCode(id, code) {
  return request({
    url: `/${moduleurl}/dict/type/check/code`,
    method: 'get',
    params: { id, code }
  })
}

export function findDictItemList(code) {
  return request({
    url: `/${moduleurl}/dict/item/type/` + code,
    method: 'get'
  })
}

export function dictItemCreate(data) {
  return request({
    url: `/${moduleurl}/dict/item`,
    method: 'post',
    data: data
  })
}

export function dictItemUpdate(data) {
  return request({
    url: `/${moduleurl}/dict/item`,
    method: 'put',
    data: data
  })
}

export function dictItemDel(id) {
  return request({
    url: `/${moduleurl}/dict/item/` + id,
    method: 'delete'
  })
}

export function dictItemSort(ids) {
  return request({
    url: `/${moduleurl}/dict/item/sort`,
    method: 'put',
    params: { 'ids': ids },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}

export function dictItemEnable(id) {
  return request({
    url: `/${moduleurl}/dict/item/enable/` + id,
    method: 'put'
  })
}

export function checkDictItemCode(code, itemId, typeCode) {
  return request({
    url: `/${moduleurl}/dict/item/check/code`,
    method: 'get',
    params: { typeCode, itemId, code }
  })
}
