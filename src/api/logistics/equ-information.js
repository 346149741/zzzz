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
          { 'id': 'a', 'a': '防弹衣', 'b': '600', 'c': '01', 'd': '2015-01-06', 'e': '9', 'f': '01', 'g': '1营，2营，3营', 'h': '2015-2019年储备使用', 'i': '/upload/legend/20200805/txm.png', 'j': '01' },
          { 'id': 'b', 'a': '棉被', 'b': '600', 'c': '02', 'd': '2015-06-23', 'e': '3', 'f': '02', 'g': '1营，2营，3营', 'h': '注意远离火源', 'i': '/upload/legend/20200805/txm.png', 'j': '03' },
          { 'id': 'c', 'a': '95式步枪', 'b': '300', 'c': '03', 'd': '2019-05-15', 'e': '2', 'f': '02', 'g': '日常训练及执勤', 'h': '', 'i': '/upload/legend/20200805/txm.png', 'j': '01' },
          { 'id': 'd', 'a': '头盔', 'b': '300', 'c': '02', 'd': '2015-11-11', 'e': '3', 'f': '01', 'g': '日常训练及执勤', 'h': '防弹', 'i': '/upload/legend/20200805/txm.png', 'j': '04' },
          { 'id': 'e', 'a': '战术背包', 'b': '195', 'c': '04', 'd': '2019-12-06', 'e': '3', 'f': '01', 'g': '1营2连', 'h': '最大承重50公斤', 'i': '/upload/legend/20200805/txm.png', 'j': '02' }
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
