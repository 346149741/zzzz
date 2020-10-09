import request from '@/utils/request'
import { doorurl } from '../base/main'
export default {
  recordpage(data) {
    return request({
      url: `/${doorurl}/person-pass-record/page`,
      method: 'post',
      data: data
    })
  },
  getrecord(id) {
    return request({
      url: `/${doorurl}/person-pass-record/`+id,
      method: 'get',
    })
  },
  warningpage(data) {
    return request({
      url: `/${doorurl}/person-pass-record-alarm/page`,
      method: 'post',
      data: data
    })
  },
  getwarning(id) {
    return request({
      url: `/${doorurl}/person-pass-record-alarm/`+id,
      method: 'get',
    })
  },
}