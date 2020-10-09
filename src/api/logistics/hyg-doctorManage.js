import request from '@/utils/request'
export default {
  dict(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        '01': [
          { 'key': '01', 'value': '普通内科' },
          { 'key': '02', 'value': '眼科' },
          { 'key': '03', 'value': '心胸外科' },
          { 'key': '04', 'value': '肾脏外科' },
          { 'key': '05', 'value': '神经外科' },
          { 'key': '06', 'value': '神经内科' },
          { 'key': '07', 'value': '肛肠科' }
        ],
        '02': [
          { 'key': '01', 'value': '男' },
          { 'key': '02', 'value': '女' }
        ],
        '03': [
          { 'key': '01', 'value': '院长' },
          { 'key': '02', 'value': '副院长' },
          { 'key': '03', 'value': '教授' },
          { 'key': '04', 'value': '副教授' },
          { 'key': '05', 'value': '医生' }
        ],
        '04': [
          { 'key': '01', 'value': '博士' },
          { 'key': '02', 'value': '硕士' },
          { 'key': '03', 'value': '本科' },
          { 'key': '04', 'value': '专科' }
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
          { 'id': 'a', 'a': '03', 'b': '张勇', 'c': '01', 'd': '03', 'e': '郑州大学', 'f': '01', 'g': '20', 'h': '15823010210', 'i': '从事呼吸内科临床、教学及科研工作20余年' },
          { 'id': 'b', 'a': '02', 'b': '宋雪勤', 'c': '02', 'd': '04', 'e': '中国医科大学', 'f': '02', 'g': '10', 'h': '15865472258', 'i': '从对呼吸系统急危重症包括重症哮喘、肺源性心...' },
          { 'id': 'c', 'a': '04', 'b': '王其华', 'c': '01', 'd': '04', 'e': '山西医科大学', 'f': '03', 'g': '8', 'h': '15833851476', 'i': '慢性支气管炎、肺气肿、肺心病、肺部感染、...' },
          { 'id': 'd', 'a': '04', 'b': '张静', 'c': '02', 'd': '04', 'e': '福建医科大学', 'f': '01', 'g': '5', 'h': '158299541258', 'i': '专攻呼吸道传染病' },
          { 'id': 'e', 'a': '05', 'b': '李民', 'c': '01', 'd': '05', 'e': '新乡医学院', 'f': '04', 'g': '3', 'h': '15833647795', 'i': '从事呼吸内科临床工作' }
        ],
        'totalElements': 5
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
