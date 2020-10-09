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
  testPlan() {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': [
        { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '黄河源头在西藏？', 'd': [{'content': '是'},{'content': '否'}], 'e': '', 'f': [] },
        { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '秦岭淮河是中国气候分割线？', 'd': [{'content': '是'},{'content': '否'}], 'e': '', 'f': [] },
        { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '选择中国最大的淡水湖', 'd': [{'content': '鄱阳湖'},{'content': '洞庭湖'},{'content': '太湖'},{'content': '呼伦湖'}], 'e': '', 'f': [] },
        { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '黄河入海口是什么海', 'd': [{'content': '渤海'},{'content': '黄海'},{'content': '东海'},{'content': '南海'}], 'e': '', 'f': [] },
        { 'id': 'a', 'a': '地理知识', 'b': '01', 'c': '以下哪些地方属于四川', 'd': [{'content': '重庆市'},{'content': '张家界'},{'content': '成都'},{'content': '绵阳'}], 'e': '', 'f': [] }
      ]
    }
  },
  page(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        'content': [
          { 'id': 'a', 'a': '地理常识对抗', 'b': '李思源', 'c': '2019-05-01', 'd': '2019-06-01', 'e': 100, 'f': 90, 'g': '训练对地理知识的掌握' },
          { 'id': 'b', 'a': '野外生存知识对抗', 'b': '王金玉', 'c': '2019-09-01', 'd': '2019-12-10', 'e': 120, 'f': 104, 'g': '野外生存知识很重要'},
          { 'id': 'c', 'a': '军规', 'b': '胡军猛', 'c': '2019-01-28', 'd': '2019-06-01', 'e': 120, 'f': 120, 'g': '每个军人必须掌握'}
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
