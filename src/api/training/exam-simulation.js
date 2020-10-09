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
        { 'id': 'a', 'a': '地理模拟考试', 'b': '地理模拟试卷-01', 'c': 100, 'd': '李思源', 'e': '2019-11-28', 'f': '2019-06-01', 'g': 30,
          'content': [
            {'title': '判断题', 'content': [
                { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '黄河源头在西藏？', 'd': [{'content': '是'},{'content': '否'}], 'e': '', 'f': [] },
                { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '秦岭淮河是中国气候分割线？', 'd': [{'content': '是'},{'content': '否'}], 'e': '', 'f': [] }
              ]},
            {'title': '单选题', 'content': [

                { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '选择中国最大的淡水湖', 'd': [{'content': '鄱阳湖'},{'content': '洞庭湖'},{'content': '太湖'},{'content': '呼伦湖'}], 'e': '', 'f': [] },
                { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '黄河入海口是什么海', 'd': [{'content': '渤海'},{'content': '黄海'},{'content': '东海'},{'content': '南海'}], 'e': '', 'f': [] }
              ]},
            {'title': '多选题', 'content': [
                { 'id': 'a', 'a': '地理知识', 'b': '01', 'c': '以下哪些地方属于四川', 'd': [{'content': '重庆市'},{'content': '张家界'},{'content': '成都'},{'content': '绵阳'}], 'e': '', 'f': [] }
              ]}
          ]
        },
        { 'id': 'b', 'a': '野外生存模拟考试', 'b': '野外理论知识试卷-02', 'c': 100, 'd': '王金玉', 'e': '2019-11-28', 'f': '2019-08-10', 'g': 45,
          'content': [
            {'title': '判断题', 'content': [
                { 'id': 'e', 'a': '野外生存', 'b': '03', 'c': '海水可以直接喝？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 1, 'g': ['B'], 'time': '2019-07-01' },
                { 'id': 'e', 'a': '野外生存', 'b': '03', 'c': '长期补补充维生素会得坏血病？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 1, 'g': ['A'], 'time': '2019-07-01' }
              ]},
            {'title': '多选题', 'content': [
                { 'id': 'd', 'a': '野外生存', 'b': '02', 'c': '沙漠里哪种行为是可行的？', 'd': [{'content': '天热可以穿短袖'},{'content': '温差大毒虫多，注意保暖和安全防范'},{'content': '天气凉爽，晚上不盖被子'},{'content': '带上充足的水'}], 'e': '5', 'f': 5, 'g': ['B','D'], 'time': '2019-11-06' }
              ]}
          ]}
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
          { 'id': 'a', 'a': '地理知识试卷', 'b': '01', 'c': 30, 'd': '60', 'e': '40', 'f': 5, 'g':
              [
                {'title': '判断题', 'content': [
                  { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '黄河源头在西藏？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 3, 'g': ['B'], 'time': '2019-03-18' },
                  { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '秦岭淮河是中国气候分割线？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 3, 'g': ['A'], 'time': '2019-03-18' }
                ]},
                {'title': '单选题', 'content': [

                    { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '选择中国最大的淡水湖', 'd': [{'content': '鄱阳湖'},{'content': '洞庭湖'},{'content': '太湖'},{'content': '呼伦湖'}], 'e': '5', 'f': 2, 'g': ['A'], 'time': '2019-04-16' },
                    { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '黄河入海口是什么海', 'd': [{'content': '渤海'},{'content': '黄海'},{'content': '东海'},{'content': '南海'}], 'e': '5', 'f': 2, 'g': ['A'], 'time': '2019-04-16' }
                  ]},
                {'title': '多选题', 'content': [
                    { 'id': 'a', 'a': '地理知识', 'b': '01', 'c': '以下哪些地方属于四川', 'd': [{'content': '重庆市'},{'content': '张家界'},{'content': '成都'},{'content': '绵阳'}], 'e': '5', 'f': 5, 'g': ['C','D'], 'time': '2019-01-06' }
                  ]}
              ], 'time': '2019-01-06' },
          { 'id': 'b', 'a': '地理基础知识', 'b': '01', 'c': 20, 'd': '20', 'e': '15', 'f': 2, 'g':
              [
                {'title': '单选题', 'content': [

                    { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '选择中国最大的淡水湖', 'd': [{'content': '鄱阳湖'},{'content': '洞庭湖'},{'content': '太湖'},{'content': '呼伦湖'}], 'e': '5', 'f': 2, 'g': ['A'], 'time': '2019-04-16' },
                    { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '黄河入海口是什么海', 'd': [{'content': '渤海'},{'content': '黄海'},{'content': '东海'},{'content': '南海'}], 'e': '5', 'f': 2, 'g': ['A'], 'time': '2019-04-16' }
                  ]},
                {'title': '多选题', 'content': [
                    { 'id': 'a', 'a': '地理知识', 'b': '01', 'c': '以下哪些地方属于四川', 'd': [{'content': '重庆市'},{'content': '张家界'},{'content': '成都'},{'content': '绵阳'}], 'e': '5', 'f': 5, 'g': ['C','D'], 'time': '2019-01-06' }
                  ]},
                {'title': '判断题', 'content': [
                    { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '黄河源头在西藏？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 3, 'g': ['B'], 'time': '2019-03-18' },
                    { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '秦岭淮河是中国气候分割线？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 3, 'g': ['A'], 'time': '2019-03-18' }
                  ]},
              ], 'time': '2019-04-16' },
          { 'id': 'e', 'a': '野外生存试卷', 'b': '02', 'c': 45, 'd': '100', 'e': '60', 'f': 1, 'g':
              [
                {'title': '判断题', 'content': [
                    { 'id': 'e', 'a': '野外生存', 'b': '03', 'c': '海水可以直接喝？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 1, 'g': ['B'], 'time': '2019-07-01' },
                    { 'id': 'e', 'a': '野外生存', 'b': '03', 'c': '长期补补充维生素会得坏血病？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 1, 'g': ['A'], 'time': '2019-07-01' }
                  ]},
                {'title': '多选题', 'content': [
                    { 'id': 'd', 'a': '野外生存', 'b': '02', 'c': '沙漠里哪种行为是可行的？', 'd': [{'content': '天热可以穿短袖'},{'content': '温差大毒虫多，注意保暖和安全防范'},{'content': '天气凉爽，晚上不盖被子'},{'content': '带上充足的水'}], 'e': '5', 'f': 5, 'g': ['B','D'], 'time': '2019-11-06' }
                  ]}
              ], 'time': '2019-07-01' }
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
