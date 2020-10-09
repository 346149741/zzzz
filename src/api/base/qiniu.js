import request from '@/utils/request'
import { moduleurl } from './main'
export function getToken() {
  return request({
    url: `/${moduleurl}/qiniu/upload/token`, // 假地址 自行替换
    method: 'get'
  })
}
