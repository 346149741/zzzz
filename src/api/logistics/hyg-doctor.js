import request from '@/utils/request'
export default {
  dict(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        '01': [
          { 'key': '01', 'value': '一号仓库' },
          { 'key': '02', 'value': '二号仓库' },
          { 'key': '03', 'value': '三号仓库' },
          { 'key': '04', 'value': '四号仓库' }
        ],
        '02': [
          { 'key': '01', 'value': '优品' },
          { 'key': '02', 'value': '良品' },
          { 'key': '03', 'value': '下品' }
        ],
        '03': [
          { 'key': '01', 'value': '201团' },
          { 'key': '02', 'value': '201团一营' },
          { 'key': '03', 'value': '201团二营' },
          { 'key': '04', 'value': '201团一营一排' },
          { 'key': '05', 'value': '201团一营二排' },
          { 'key': '06', 'value': '201团二营一排' }
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
          { 'id': 'a', 'title': '内科', 'content': [
            { 'id': 'a-1', 'a': '呼吸内科', 'b': '/upload/hygiene/a-1.png' },
            { 'id': 'a-2', 'a': '普通内科', 'b': '/upload/hygiene/a-2.png' },
            { 'id': 'a-3', 'a': '感染传染科', 'b': '/upload/hygiene/a-3.png' },
            { 'id': 'a-4', 'a': '内分泌科', 'b': '/upload/hygiene/a-4.png' },
            { 'id': 'a-5', 'a': '心血管内科', 'b': '/upload/hygiene/a-5.png' },
            { 'id': 'a-6', 'a': '神经内科', 'b': '/upload/hygiene/a-6.png' },
            { 'id': 'a-7', 'a': '肾脏内科', 'b': '/upload/hygiene/a-7.png' },
            { 'id': 'a-8', 'a': '风湿免疫科', 'b': '/upload/hygiene/a-8.png' },
            { 'id': 'a-9', 'a': '血液科', 'b': '/upload/hygiene/a-9.png' }
          ]
          },
          { 'id': 'a', 'title': '外科', 'content': [
            { 'id': 'b-1', 'a': '神经外科', 'b': '/upload/hygiene/b-1.png' },
            { 'id': 'b-2', 'a': '心胸外科', 'b': '/upload/hygiene/b-2.png' },
            { 'id': 'b-3', 'a': '肝胆脾胰外科', 'b': '/upload/hygiene/b-3.png' },
            { 'id': 'b-4', 'a': '甲状腺乳腺外科', 'b': '/upload/hygiene/b-4.png' },
            { 'id': 'b-5', 'a': '普外科', 'b': '/upload/hygiene/b-5.png' }
          ]
          },
          { 'id': 'a', 'title': '其他', 'content': [
            { 'id': 'c-1', 'a': '眼科', 'b': '/upload/hygiene/c-1.png' },
            { 'id': 'c-2', 'a': '全科', 'b': '/upload/hygiene/c-2.png' },
            { 'id': 'c-3', 'a': '精神心理科', 'b': '/upload/hygiene/c-3.png' },
            { 'id': 'c-4', 'a': '肿瘤科', 'b': '/upload/hygiene/c-4.png' },
            { 'id': 'c-5', 'a': '影像检验科', 'b': '/upload/hygiene/c-5.png' },
            { 'id': 'c-6', 'a': '疼痛科', 'b': '/upload/hygiene/c-6.png' },
            { 'id': 'c-7', 'a': '药剂科', 'b': '/upload/hygiene/c-7.png' },
            { 'id': 'c-8', 'a': '疫苗科', 'b': '/upload/hygiene/c-8.png' }
          ]
          }
        ],
        'totalElements': 10
      }
    }
  },
  page1(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        'content': [
          { 'id': 'a', 'a': '张勇', 'b': '上午', 'c': '预约', 'd': '已满', 'e': '预约', 'f': '预约', 'g': '预约', 'h': '预约', 'i': '预约', 'x': '国家级知名专家', 'y': '从事呼吸内科临床、教学及科研工作20余年' },
          { 'id': 'a', 'a': '张勇', 'b': '下午', 'c': '预约', 'd': '预约', 'e': '预约', 'f': '预约', 'g': '预约', 'h': '预约', 'i': '预约', 'x': '国家级知名专家', 'y': '从事呼吸内科临床、教学及科研工作20余年' },
          { 'id': 'a', 'a': '宋雪勤', 'b': '上午', 'c': '已满', 'd': '预约', 'e': '预约', 'f': '预约', 'g': '预约', 'h': '预约', 'i': '预约', 'x': '教授', 'y': '从对呼吸系统急危重症包括重症哮喘、肺源性心...' },
          { 'id': 'a', 'a': '宋雪勤', 'b': '下午', 'c': '预约', 'd': '预约', 'e': '预约', 'f': '已满', 'g': '预约', 'h': '预约', 'i': '预约', 'x': '教授', 'y': '从对呼吸系统急危重症包括重症哮喘、肺源性心...' },
          { 'id': 'a', 'a': '王其华', 'b': '上午', 'c': '预约', 'd': '预约', 'e': '已满', 'f': '预约', 'g': '预约', 'h': '预约', 'i': '预约', 'x': '副教授', 'y': '慢性支气管炎、肺气肿、肺心病、肺部感染、...' },
          { 'id': 'a', 'a': '王其华', 'b': '下午', 'c': '预约', 'd': '预约', 'e': '预约', 'f': '预约', 'g': '预约', 'h': '预约', 'i': '预约', 'x': '副教授', 'y': '慢性支气管炎、肺气肿、肺心病、肺部感染、...' },
          { 'id': 'a', 'a': '张静', 'b': '上午', 'c': '预约', 'd': '已满', 'e': '预约', 'f': '预约', 'g': '预约', 'h': '预约', 'i': '预约', 'x': '副教授', 'y': '专攻呼吸道传染病' },
          { 'id': 'a', 'a': '张静', 'b': '下午', 'c': '预约', 'd': '预约', 'e': '已满', 'f': '预约', 'g': '预约', 'h': '预约', 'i': '预约', 'x': '副教授', 'y': '专攻呼吸道传染病' }
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
