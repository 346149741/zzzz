import request from '@/utils/request'
export default {
  dict(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        '01': [
          { 'key': '01', 'value': '一连' },
          { 'key': '02', 'value': '二连' },
          { 'key': '03', 'value': '三连' },
          { 'key': '04', 'value': '四连' }
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
          { 'id': 'a', 'a': '李思源', 'b': 'lsy008', 'c': '01', 'd': '男', 'e': '2019年春试', 'f': '三级', 'g': [
              {'id': 'a', 'a': 'zsgpz-201906152315', 'b': '李德华', 'c': '50', 'd': '优秀', 'e': '25'},
              {'id': 'a', 'a': 'zsgpz-201906152316', 'b': '王巴金', 'c': '30', 'd': '不及格', 'e': '29'},
              {'id': 'a', 'a': 'zsgpz-lsy008', 'b': '李思源', 'c': '40', 'd': '及格', 'e': '29'}
            ], 'time': '2019-01-06', 'h': '李俊军', 'i': '55', 'j': '40', 'k': '地理试卷', 'l': '30' },
          { 'id': 'b', 'a': '王慈', 'b': 'lsy009', 'c': '01', 'd': '男', 'e': '2019年春试', 'f': '三级', 'g': [
              {'id': 'a', 'a': 'zsgpz-201906152315', 'b': '古加仑', 'c': '80', 'd': '良', 'e': '40'},
              {'id': 'a', 'a': 'zsgpz-201906152316', 'b': '张促', 'c': '70', 'd': '及格', 'e': '45'},
              {'id': 'a', 'a': 'zsgpz-lsy008', 'b': '王慈', 'c': '64', 'd': '及格', 'e': '39'}
            ], 'time': '2019-04-16', 'h': '李俊军', 'i': '100', 'j': '64', 'k': '军规军纪试卷', 'l': '45'  },
          { 'id': 'b', 'a': '杨格', 'b': 'lsy012', 'c': '02', 'd': '男', 'e': '2019年夏试', 'f': '二级', 'g': [
              {'id': 'a', 'a': 'zsgpz-201906152315', 'b': '古加仑', 'c': '80', 'd': '良', 'e': '40'},
              {'id': 'a', 'a': 'zsgpz-201906152316', 'b': '张促', 'c': '70', 'd': '及格', 'e': '45'},
              {'id': 'a', 'a': 'zsgpz-lsy008', 'b': '杨格', 'c': '34', 'd': '不及格', 'e': '41'}
            ], 'time': '2019-04-16', 'h': '李俊军', 'i': '100', 'j': '34', 'k': '军规军纪试卷', 'l': '45'  }
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
