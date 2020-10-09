import request from '@/utils/request'
export default {
  dict(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        '01': [
          { 'key': '01', 'value': '地理知识' },
          { 'key': '02', 'value': '野外生存' }
        ]
      }
    }
  },
  page(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        'content': [
          { 'id': 'a', 'a': '地理考试', 'b': '02版地理试卷', 'c': '李思源', 'd': '2019-05-21', 'e': '2019-05-28', 'f': '60', 'g': [
              {'id': 'a', 'a': 'zsgpz-201906152315', 'b': '李德华', 'c': '50', 'd': '优秀', 'e': '25'},
              {'id': 'a', 'a': 'zsgpz-201906152316', 'b': '王巴金', 'c': '30', 'd': '不及格', 'e': '29'}
            ]
          },
          { 'id': 'b', 'a': '野外生存考试', 'b': '野外理论知识试卷', 'c': '王金玉', 'd': '2019-08-01', 'e': '2019-08-05', 'f': '100', 'g': [
              {'id': 'a', 'a': 'zsgpz-201906152315', 'b': '古加仑', 'c': '80', 'd': '良', 'e': '40'},
              {'id': 'a', 'a': 'zsgpz-201906152316', 'b': '张促', 'c': '70', 'd': '及格', 'e': '45'}
            ] }
        ],
        'totalElements': 10
      }
    }
  },
  create(data) {
    return request({
      url: `/vue-element-admin/door/create`,
      method: 'post',
      data: data
    })
  },
  update(data) {
    return request({
      url: `/vue-element-admin/door/update`,
      method: 'put',
      data: data
    })
  },
  del(id) {
    return request({
      url: `/vue-element-admin/door/delete`,
      method: 'delete'
    })
  },
  detail(id) {
    return request({
      url: `/vue-element-admin/door/detail`,
      method: 'get'
    })
  },
  upload(id) {
    return request({
      url: `/vue-element-admin/door/detail`,
      method: 'get'
    })
  }
}
