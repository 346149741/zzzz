import request from '@/utils/request'
import { doorurl } from '../base/main'
export default {
  page(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        'content': [
          { 'id': 'a', 'a': '长沙市星沙大道', 'b': '超速', 'c': '2019-05-09 19:16:58', 'd': '湘AB14J3', 'e': '80', 'f': '小汽车', 'g': '白色', 'h': '李明辉', 'i': '1', 'j': '', 'k': '2019-05-09' },
          { 'id': 'b', 'a': '长沙市青年大街', 'b': '超速', 'c': '2019-05-09 15:18:35', 'd': '湘AD54G1', 'e': '76', 'f': '小汽车', 'g': '白色', 'h': '钱家鹏', 'i': '1', 'j': '', 'k': '2019-05-09' },
          { 'id': 'c', 'a': '长沙市吾悦广场', 'b': '超速', 'c': '2019-05-09 13:09:24', 'd': '湘A45H9g', 'e': '75', 'f': '小汽车', 'g': '黑色', 'h': '彭铁林', 'i': '1', 'j': '', 'k': '2019-05-09' },
          { 'id': 'd', 'a': '长沙市星沙大道', 'b': '违停', 'c': '2019-05-09 09:03:51', 'd': '湘A38Y67', 'e': '0', 'f': '小汽车', 'g': '黑色', 'h': '张杨', 'i': '2', 'j': '', 'k': '2019-05-09' },
          { 'id': 'e', 'a': '长沙市星沙大道', 'b': '违停', 'c': '2019-05-09 09:01:14', 'd': '湘AN2M64', 'e': '0', 'f': '小汽车', 'g': '银色', 'h': '朱晓明', 'i': '2', 'j': '', 'k': '2019-05-09' }
        ],
        'totalElements': 10
      }
    }
  },
  create(data) {
    return request({
      url: `/${doorurl}/vehicle-traffic`,
      method: 'post',
      data: data
    })
  },
  update(data) {
    return request({
      url: `/${doorurl}/vehicle-traffic`,
      method: 'put',
      data: data
    })
  },
  del(id) {
    return request({
      url: `/${doorurl}/vehicle-traffic/${id}`,
      method: 'delete'
    })
  },
  detail(id) {
    return request({
      url: `/${doorurl}/vehicle-traffic/${id}`,
      method: 'get'
    })
  }
}
