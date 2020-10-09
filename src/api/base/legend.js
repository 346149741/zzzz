import request from '@/utils/request'
import { moduleurl } from './main'
export function legend() {
  return request({
    url: `/${moduleurl}/legend`,
    method: 'get'
  })
}
