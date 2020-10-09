import request from '@/utils/request'
export default {
  dict(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        '01': [
          { 'key': '01', 'value': '草稿' },
          { 'key': '02', 'value': '待审批' },
          { 'key': '03', 'value': '通过审批' },
          { 'key': '04', 'value': '被驳回' }
        ],
        '02': [
          { 'key': '01', 'value': '公告通知' },
          { 'key': '02', 'value': '到期报废' }
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
  equipment() {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': [
        { 'id': 'a', 'a': '防弹衣', 'b': '600', 'c': '01', 'd': '2015-01-06', 'e': '9', 'f': '01', 'g': '1营，2营，3营', 'h': '2015-2019年储备使用', 'i': '/upload/legend/20200805/txm.png', 'j': '01' },
        { 'id': 'b', 'a': '棉被', 'b': '600', 'c': '02', 'd': '2015-06-23', 'e': '3', 'f': '02', 'g': '1营，2营，3营', 'h': '注意远离火源', 'i': '/upload/legend/20200805/txm.png', 'j': '03' },
        { 'id': 'c', 'a': '95式步枪', 'b': '300', 'c': '03', 'd': '2019-05-15', 'e': '2', 'f': '02', 'g': '日常训练及执勤', 'h': '', 'i': '/upload/legend/20200805/txm.png', 'j': '01' },
        { 'id': 'd', 'a': '头盔', 'b': '300', 'c': '02', 'd': '2015-11-11', 'e': '3', 'f': '01', 'g': '日常训练及执勤', 'h': '防弹', 'i': '/upload/legend/20200805/txm.png', 'j': '04' },
        { 'id': 'e', 'a': '战术背包', 'b': '195', 'c': '04', 'd': '2019-12-06', 'e': '3', 'f': '01', 'g': '1营2连', 'h': '最大承重50公斤', 'i': '/upload/legend/20200805/txm.png', 'j': '02' }
      ]
    }
  },
  people() {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': [
        { 'id': 'a', 'a': '杨梅', 'b': '女', 'c': '01', 'd': '2015-01-06' },
        { 'id': 'b', 'a': '胡惟一', 'b': '男', 'c': '02', 'd': '2015-06-23' },
        { 'id': 'c', 'a': '李雪', 'b': '女', 'c': '03', 'd': '2019-05-15' },
        { 'id': 'd', 'a': '万强', 'b': '男', 'c': '02', 'd': '2015-11-11' },
        { 'id': 'e', 'a': '张立', 'b': '男', 'c': '04', 'd': '2019-12-06' }
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
          { 'id': 'a', 'a': '杨梅', 'b': '01', 'c': '2015-01-06,2015-06-15', 'd': '年度装备更新', 'e': '张立', 'f': '02', 'g': '',
            children: [
              { 'id': 'a', 'a': '防弹衣', 'b': '50' },
              { 'id': 'c', 'a': '95式步枪', 'b': '50' },
              { 'id': 'd', 'a': '头盔', 'b': '50' }
            ]
          },
          { 'id': 'b', 'a': '胡惟一', 'b': '01', 'c': '2019-06-23,2019-11-11', 'd': '野外拉练', 'e': '张立', 'f': '01', 'g': '',
            children: [
              { 'id': 'b', 'a': '棉被', 'b': '60' },
              { 'id': 'e', 'a': '战术背包', 'b': '60' },
              { 'id': 'd', 'a': '头盔', 'b': '60' }
            ]
          },
          { 'id': 'c', 'a': '李雪', 'b': '01', 'c': '2019-05-15,2019-12-31', 'd': '训练使用', 'e': '张立', 'f': '04', 'g': '尚未通过体能训练考核，还不能使用步枪',
            children: [
              { 'id': 'c', 'a': '95式步枪', 'b': '20' },
              { 'id': 'd', 'a': '头盔', 'b': '20' }
            ]
          },
          { 'id': 'd', 'a': '万强', 'b': '02', 'c': '2018-05-15,2018-05-31', 'd': '年度装备更新', 'e': '张立', 'f': '03', 'g': '',
            children: [
              { 'id': 'a', 'a': '防弹衣', 'b': '100' },
              { 'id': 'c', 'a': '95式步枪', 'b': '100' },
              { 'id': 'd', 'a': '头盔', 'b': '100' }
            ]
          },
          { 'id': 'e', 'a': '杨梅', 'b': '03', 'c': '2019-05-15,2019-11-11', 'd': '年度装备更新', 'e': '张立', 'f': '01', 'g': '',
            children: [
              { 'id': 'a', 'a': '防弹衣', 'b': '40' },
              { 'id': 'c', 'a': '95式步枪', 'b': '40' },
              { 'id': 'd', 'a': '头盔', 'b': '40' },
              { 'id': 'b', 'a': '棉被', 'b': '40' }
            ]
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
