import request from '@/utils/request'
export default {
  dict(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        '01': [
          { 'key': '01', 'value': '多选题' },
          { 'key': '02', 'value': '单选题' },
          { 'key': '03', 'value': '判断题' }
        ],
        '02': [
          { 'key': 1, 'value': '一级' },
          { 'key': 2, 'value': '二级' },
          { 'key': 3, 'value': '三级' },
          { 'key': 4, 'value': '四级' },
          { 'key': 5, 'value': '五级' }
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
          { 'id': 'a', 'a': '地理知识', 'b': '01', 'c': '以下哪些地方属于四川', 'd': [{'content': '重庆市'},{'content': '张家界'},{'content': '成都'},{'content': '绵阳'}], 'e': '5', 'f': 5, 'g': ['C','D'], 'time': '2019-01-06' },
          { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '选择中国最大的淡水湖', 'd': [{'content': '鄱阳湖'},{'content': '洞庭湖'},{'content': '太湖'},{'content': '呼伦湖'}], 'e': '5', 'f': 2, 'g': ['A'], 'time': '2019-04-16' },
          { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '黄河源头在西藏？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 3, 'g': ['B'], 'time': '2019-03-18' },
          { 'id': 'd', 'a': '野外生存', 'b': '02', 'c': '沙漠里哪种行为是可行的？', 'd': [{'content': '天热可以穿短袖'},{'content': '温差大毒虫多，注意保暖和安全防范'},{'content': '天气凉爽，晚上不盖被子'},{'content': '带上充足的水'}], 'e': '5', 'f': 5, 'g': ['B','D'], 'time': '2019-11-06' },
          { 'id': 'e', 'a': '野外生存', 'b': '03', 'c': '海水可以直接喝？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 1, 'g': ['B'], 'time': '2019-07-01' }
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
