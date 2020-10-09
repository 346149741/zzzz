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
        ],
        '02': [
          { 'key': '01', 'value': '未开始' },
          { 'key': '02', 'value': '进行中' },
          { 'key': '03', 'value': '已结束' }
        ],
        '03': [
          { 'key': '01', 'value': '未发布' },
          { 'key': '02', 'value': '已发布' }
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
        { 'id': 'a', 'a': '地理常识对抗', 'b': '地理模拟试卷-01', 'c': 100, 'd': '李思源', 'e': '2019-11-28', 'f': '2019-06-01', 'g': 30,
          'content': [
            { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '黄河源头在西藏？', 'd': [{'content': '是'},{'content': '否'}], 'e': '', 'f': [] },
            { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '秦岭淮河是中国气候分割线？', 'd': [{'content': '是'},{'content': '否'}], 'e': '', 'f': [] },
            { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '选择中国最大的淡水湖', 'd': [{'content': '鄱阳湖'},{'content': '洞庭湖'},{'content': '太湖'},{'content': '呼伦湖'}], 'e': '', 'f': [] },
            { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '黄河入海口是什么海', 'd': [{'content': '渤海'},{'content': '黄海'},{'content': '东海'},{'content': '南海'}], 'e': '', 'f': [] },
            { 'id': 'a', 'a': '地理知识', 'b': '01', 'c': '以下哪些地方属于四川', 'd': [{'content': '重庆市'},{'content': '张家界'},{'content': '成都'},{'content': '绵阳'}], 'e': '', 'f': [] }
          ]
        },
        { 'id': 'b', 'a': '野外生存知识对抗', 'b': '野外理论知识试卷-02', 'c': 100, 'd': '王金玉', 'e': '2019-11-28', 'f': '2019-08-10', 'g': 45,
          'content': [
            { 'id': 'e', 'a': '野外生存', 'b': '03', 'c': '海水可以直接喝？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 1, 'g': ['B'], 'time': '2019-07-01' },
            { 'id': 'e', 'a': '野外生存', 'b': '03', 'c': '长期补补充维生素会得坏血病？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 1, 'g': ['A'], 'time': '2019-07-01' },
            { 'id': 'd', 'a': '野外生存', 'b': '02', 'c': '沙漠里哪种行为是可行的？', 'd': [{'content': '天热可以穿短袖'},{'content': '温差大毒虫多，注意保暖和安全防范'},{'content': '天气凉爽，晚上不盖被子'},{'content': '带上充足的水'}], 'e': '5', 'f': 5, 'g': ['B','D'], 'time': '2019-11-06' }
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
          { 'id': 'a', 'a': '地理常识对抗', 'b': '2019-06-01至2019-12-01', 'c': 30, 'd': 'a', 'e': '100', 'f': [
              { 'id': 'c', 'a': '李雪', 'b': '女', 'c': 'xfs-01', 'd': '2019-05-15' },
              { 'id': 'd', 'a': '万强', 'b': '男', 'c': 'xfs-02', 'd': '2015-11-11' },
              { 'id': 'e', 'a': '张立', 'b': '男', 'c': 'xfs-03', 'd': '2019-12-06' },
              { 'id': 'e', 'a': '李萧然', 'b': '男', 'c': 'xfs-04', 'd': '2019-12-06' }
            ], 'g': [
              { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '黄河源头在西藏？', 'd': [{'content': '是'},{'content': '否'}], 'e': '', 'f': [] },
              { 'id': 'c', 'a': '地理知识', 'b': '03', 'c': '秦岭淮河是中国气候分割线？', 'd': [{'content': '是'},{'content': '否'}], 'e': '', 'f': [] },
              { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '选择中国最大的淡水湖', 'd': [{'content': '鄱阳湖'},{'content': '洞庭湖'},{'content': '太湖'},{'content': '呼伦湖'}], 'e': '', 'f': [] },
              { 'id': 'b', 'a': '地理知识', 'b': '02', 'c': '黄河入海口是什么海', 'd': [{'content': '渤海'},{'content': '黄海'},{'content': '东海'},{'content': '南海'}], 'e': '', 'f': [] },
              { 'id': 'a', 'a': '地理知识', 'b': '01', 'c': '以下哪些地方属于四川', 'd': [{'content': '重庆市'},{'content': '张家界'},{'content': '成都'},{'content': '绵阳'}], 'e': '', 'f': [] }
            ], 'h': '60', 'i': '01', 'j': '01'
          },
          { 'id': 'b', 'a': '野外生存知识对抗', 'b': '2019-04-01至2019-05-01', 'c': 20, 'd': 'b', 'e': '100', 'f': [
              { 'id': 'a', 'a': '杨梅', 'b': '女', 'c': 'xfs-01', 'd': '2015-01-06' },
              { 'id': 'b', 'a': '胡惟一', 'b': '男', 'c': 'xfs-03', 'd': '2015-06-23' },
              { 'id': 'e', 'a': '张立', 'b': '男', 'c': 'xfs-04', 'd': '2019-12-06' },
              { 'id': 'e', 'a': '李萧然', 'b': '男', 'c': 'xfs-05', 'd': '2019-12-06' }
            ], 'g': [
              { 'id': 'e', 'a': '野外生存', 'b': '03', 'c': '海水可以直接喝？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 1, 'g': ['B'], 'time': '2019-07-01' },
              { 'id': 'e', 'a': '野外生存', 'b': '03', 'c': '长期补补充维生素会得坏血病？', 'd': [{'content': '是'},{'content': '否'}], 'e': '2', 'f': 1, 'g': ['A'], 'time': '2019-07-01' },
              { 'id': 'd', 'a': '野外生存', 'b': '02', 'c': '沙漠里哪种行为是可行的？', 'd': [{'content': '天热可以穿短袖'},{'content': '温差大毒虫多，注意保暖和安全防范'},{'content': '天气凉爽，晚上不盖被子'},{'content': '带上充足的水'}], 'e': '5', 'f': 5, 'g': ['B','D'], 'time': '2019-11-06' }
            ], 'h': '80', 'i': '03', 'j': '02'
          }
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
