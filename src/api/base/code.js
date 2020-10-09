import request from '@/utils/request'
import { moduleurl } from './main'
export const tableList = () => {
  return request({
    url: `/${moduleurl}/generator/table`,
    method: 'get'
  })
}

export const cloumnList = (tableName) => {
  return request({
    url: `/${moduleurl}/generator/column/` + tableName,
    method: 'get'
  })
}

export const generate = (tableNames, javaPackage) => {
  return request({
    url: `/${moduleurl}/generator/generate`,
    method: 'get',
    params: { tableNames, javaPackage }
  })
}

