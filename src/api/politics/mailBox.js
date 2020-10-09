import request from '@/utils/request'
export default {
  dict(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        '01': [
          { 'key': '01', 'value': '军长信箱' },
          { 'key': '02', 'value': '师长信箱' },
          { 'key': '03', 'value': '旅长信箱' },
          { 'key': '04', 'value': '团长信箱' }
        ],
        '02': [
          { 'key': '01', 'value': '咨询' },
          { 'key': '02', 'value': '投诉' },
          { 'key': '03', 'value': '建议' },
          { 'key': '04', 'value': '其它' }
        ],
        '03': [
          { 'key': '01', 'value': '201团' },
          { 'key': '02', 'value': '201团一营' },
          { 'key': '03', 'value': '201团二营' },
          { 'key': '04', 'value': '201团一营一排' },
          { 'key': '05', 'value': '201团一营二排' },
          { 'key': '06', 'value': '201团二营一排' }
        ],
        '04': [
          { 'key': '01', 'value': '待处理' },
          { 'key': '02', 'value': '处理中' },
          { 'key': '03', 'value': '已处理' }
        ],
        '05': [
          { 'key': '01', 'value': '使用中' },
          { 'key': '02', 'value': '停用' }
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
          { 'id': 'a', 'a': '201910125', 'b': '01', 'c': '王志强', 'd': '道路清理', 'e': '01', 'f': '2019-07-11 16:15:39', 'g': '', 'h': '', 'i': '03',
            'j': '一号食堂后门垃圾堆放，天气炎热，建议每天都清理',
            'x': '', 'y': '', 'z': '' },
          { 'id': 'b', 'a': '201910126', 'b': '03', 'c': '刘闵', 'd': '新人早练', 'e': '01', 'f': '2019-07-09 09:54:11', 'g': '', 'h': '', 'i': '06',
            'j': '建议早上提前一个小时进行晨跑',
            'x': '', 'y': '', 'z': '' },
          { 'id': 'c', 'a': '201910127', 'b': '04', 'c': '杨洋', 'd': '伙食改善', 'e': '02', 'f': '2019-07-05 10:22:07', 'g': '', 'h': '', 'i': '04',
            'j': '新兵训练辛苦，建议每天多个肉菜',
            'x': '', 'y': '', 'z': '' },
          { 'id': 'd', 'a': '201910128', 'b': '02', 'c': '朱慈济', 'd': '机房设备老化', 'e': '03', 'f': '2019-06-21 14:57:03', 'g': '2019-06-23 11:30:11', 'h': '先统计电脑性能，再做决定', 'i': '05',
            'j': '机房不少电脑老化，不能运行',
            'x': '', 'y': '', 'z': '' },
          { 'id': 'e', 'a': '201910129', 'b': '01', 'c': '王辉军', 'd': '野外拉练', 'e': '03', 'f': '2019-05-09 18:54:13', 'g': '2019-05-15 15:01:18', 'h': '6月初开始出去拉练', 'i': '02',
            'j': '新兵训练两个月了，是时候进行野外拉练了',
            'x': '', 'y': '', 'z': '' }
        ],
        'totalElements': 5
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
          { 'id': 'a', 'a': '团长信箱', 'b': '张志强', 'c': '01', 'd': '2019-07-11 16:15:39' },
          { 'id': 'b', 'a': '师长信箱', 'b': '王军民', 'c': '01', 'd': '2019-07-09 09:54:11' },
          { 'id': 'c', 'a': '旅长信箱', 'b': '李武', 'c': '02', 'd': '2019-07-05 10:22:07' },
          { 'id': 'd', 'a': '军长信箱', 'b': '马致', 'c': '01', 'd': '2019-06-21 14:57:03' },
          { 'id': 'e', 'a': '营长信箱', 'b': '李辉', 'c': '01', 'd': '2019-05-09 18:54:13' }
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
