import request from '@/utils/request'
import { moduleurl } from './main'
export function searchUser(name) {
  return request({
    url: `/${moduleurl}/search/user`,
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: `/${moduleurl}/transaction/list`,
    method: 'get',
    params: query
  })
}
