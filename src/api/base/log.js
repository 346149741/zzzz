import request from '@/utils/request'
import { moduleurl } from './main'
export function page(data) {
  return request({
    url: `/${moduleurl}/log/page`,
    method: 'post',
    data: data
  })
}
