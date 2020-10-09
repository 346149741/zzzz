import request from '@/utils/request'
import { moduleurl } from './main'
export default {
  page(listQuery) {
    return request({
      url: `/${moduleurl}/configuration/page`,
      method: 'post',
      data: listQuery
    })
  },
  validCode(code, id) {
    return request({
      url: `/${moduleurl}/configuration/valid/code`,
      method: 'get',
      params: { code, id }
    })
  },
  save(data) {
    return request({
      url: `/${moduleurl}/configuration`,
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url: `/${moduleurl}/configuration`,
      method: 'put',
      data
    })
  },
  delete(id) {
    return request({
      url: `/${moduleurl}/configuration/` + id,
      method: 'delete'
    })
  },
  getLogo() {
    return request({
      url: `/${moduleurl}/configuration/permit/codes`,
      method: 'post',
      data: ['login_logo', 'sys_name', 'sys_copyright', 'logo']
    })
  }
}
