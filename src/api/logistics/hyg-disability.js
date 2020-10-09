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
          { 'id': 'a', 'a': '王子仪', 'b': '男', 'c': '180cm', 'd': '80kg', 'e': '410225199003125223', 'f': '19900312', 'g': '河南省郑州市管城区', 'h': '河南省郑州市管城区', 'i': '0120-5263222', 'j': '18265321042',
            'k': '政治部', 'l': '三单元二楼101', 'm': '汉', 'n': '本科', 'o': '未婚', 'p': 'A型', 'q': '无', 'r': '无', 's': '无', 't': '一级伤残' },
          { 'id': 'b', 'a': '王虎', 'b': '男', 'c': '187cm', 'd': '75kg', 'e': '410225199106172578', 'f': '19910617', 'g': '河南省郑州市惠济区', 'h': '河南省郑州市惠济区', 'i': '0120-5263472', 'j': '182614752684',
            'k': '武装部', 'l': '三单元二楼102', 'm': '汉', 'n': '本科', 'o': '未婚', 'p': 'B型', 'q': '无', 'r': '无', 's': '无', 't': '九级伤残' },
          { 'id': 'c', 'a': '李子民', 'b': '男', 'c': '182cm', 'd': '81kg', 'e': '410225198911111285', 'f': '19891111', 'g': '湖南省长沙市长沙县', 'h': '湖南省长沙市长沙县', 'i': '0120-5263257', 'j': '18235841125',
            'k': '武装部', 'l': '三单元二楼102', 'm': '汉', 'n': '本科', 'o': '已婚', 'p': 'AB型', 'q': '无', 'r': '无', 's': '无', 't': '六级伤残' },
          { 'id': 'd', 'a': '彭家乐', 'b': '男', 'c': '178cm', 'd': '85kg', 'e': '410225199301232247', 'f': '19930123', 'g': '湖南省常德市武陵县', 'h': '湖南省常德市武陵县', 'i': '0120-5263224', 'j': '18225874563',
            'k': '武装部', 'l': '三单元二楼102', 'm': '回族', 'n': '本科', 'o': '未婚', 'p': 'O型', 'q': '无', 'r': '无', 's': '无', 't': '三级伤残' },
          { 'id': 'e', 'a': '余小波', 'b': '女', 'c': '170cm', 'd': '60kg', 'e': '410225199405232485', 'f': '19940523', 'g': '湖南省长沙市长沙县', 'h': '湖南省长沙市长沙县', 'i': '0120-5263014', 'j': '18295844891',
            'k': '医疗卫生部', 'l': '四单元二楼303', 'm': '汉', 'n': '本科', 'o': '未婚', 'p': 'A型', 'q': '无', 'r': '无', 's': '无', 't': '一级伤残' }
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
