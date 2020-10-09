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
          { 'key': '04', 'value': '被驳回' },
          { 'key': '05', 'value': '维修完成' }
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
        { 'id': 'a', 'a': '步枪', 'b': '2015-01-06', 'c': '9', 'd': '01', 'e': '1营，2营，3营', 'f': '/upload/legend/20200805/txm.png', 'g': '2015-2019年储备使用' },
        { 'id': 'b', 'a': 'E76-96卡车', 'b': '2015-06-23', 'c': '6', 'd': '02', 'e': '1营，2营，3营', 'f': '/upload/legend/20200805/txm.png', 'g': '物资运输' },
        { 'id': 'c', 'a': '汽车', 'b': '2019-05-15', 'c': '9', 'd': '02', 'e': '日常训练及执勤', 'f': '/upload/legend/20200805/txm.png', 'g': '领导专用' },
        { 'id': 'd', 'a': '工程车', 'b': '2015-11-11', 'c': '3', 'd': '01', 'e': '日常训练及执勤', 'f': '/upload/legend/20200805/txm.png', 'g': '防弹' }
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
        { 'id': 'e', 'a': '张立', 'b': '男', 'c': '04', 'd': '2019-12-06' },
        { 'id': 'e', 'a': '李萧然', 'b': '男', 'c': '04', 'd': '2019-12-06' }
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
          { 'id': 'a', 'a': '杨梅', 'b': '01', 'c': '步枪', 'd': '/upload/legend/20200805/txm.png', 'e': '2019-05-15', 'f': '子弹卡壳', 'g': '2019-06-06,2019-06-15', 'h': '张立', 'i': '02', 'j': '', 'k': '', 'l': '李萧然'
          },
          { 'id': 'b', 'a': '胡惟一', 'b': '01', 'c': 'E76-96卡车', 'd': '/upload/legend/20200805/txm.png', 'e': '2019-06-15', 'f': '左前轮车胎漏气', 'g': '2019-06-23,2019-06-28', 'h': '张立', 'i': '01', 'j': '', 'k': '被钉子扎了，已经补好了', 'l': '李萧然'
          },
          { 'id': 'c', 'a': '李雪', 'b': '01', 'c': 'E76-97卡车', 'd': '/upload/legend/20200805/txm.png', 'e': '2019-07-14', 'f': '漏机油', 'g': '2019-07-15,2019-07-16', 'h': '张立', 'i': '04', 'j': '误报', 'k': '', 'l': '李萧然'
          },
          { 'id': 'd', 'a': '万强', 'b': '02', 'c': '汽车', 'd': '/upload/legend/20200805/txm.png', 'e': '2019-07-01', 'f': '油箱漏油', 'g': '2019-07-15,2019-07-31', 'h': '张立', 'i': '03', 'j': '', 'k': '', 'l': '李萧然'
          },
          { 'id': 'e', 'a': '杨梅', 'b': '03', 'c': '工程车', 'd': '/upload/legend/20200805/txm.png', 'e': '2019-06-28', 'f': '大灯不亮', 'g': '2019-06-15,2019-06-12', 'h': '张立', 'i': '05', 'j': '', 'k': '电线撕裂，已修好', 'l': '李萧然'
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
