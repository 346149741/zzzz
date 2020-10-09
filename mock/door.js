const Mock = require('mockjs')

const List = []
const count = 10

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: 'a',
    a: '@ctitle(3, 5)',
    b: '@ctitle(3, 6)',
    c: '@ctitle(3, 6)',
    d: '@ctitle(3, 6)',
    e: '@ctitle(3, 6)',
    f: '@ctitle(3, 6)',
    g: '@ctitle(3, 6)',
    h: '@ctitle(3, 6)',
    i: '@ctitle(3, 6)',
    j: '@ctitle(3, 6)',
    k: '@ctitle(3, 6)',
    l: '@ctitle(3, 6)',
    m: '@ctitle(3, 6)',
    n: '@ctitle(3, 6)',
    time: '@date("yyyy-MM-dd")'
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/door/list',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: '操作成功！',
        success: true,
        data: {
          content: List,
          totalElements: count
        }
      }
    }
  },
  {
    url: '/vue-element-admin/areainfo/tree',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: '操作成功！',
        success: true,
        data: [
          {
            'areaLocation': [
              [
                [
                  100.7501220703125,
                  33.32134852669881
                ],
                [
                  100.2777099609375,
                  32.37996146435729
                ],
                [
                  101.832275390625,
                  31.93351676190369
                ],
                [
                  102.183837890625,
                  33.224903086263964
                ],
                [
                  100.7501220703125,
                  33.32134852669881
                ]
              ]
            ],
            'areaName': '第607师',
            'areaType': '1',
            'areaTypeName': '111',
            'id': '402880ae74287f050174287f401c0006',
            'pid': '',
            'children': [
              {
                'areaLocation': [
                  [
                    [
                      101.217041015625,
                      32.78265637602964
                    ],
                    [
                      101.392822265625,
                      32.60698915452777
                    ],
                    [
                      101.7828369140625,
                      32.76418137510082
                    ],
                    [
                      101.62353515625,
                      33.054716488042736
                    ],
                    [
                      101.217041015625,
                      32.78265637602964
                    ]
                  ]
                ],
                'areaName': 'A区域',
                'areaType': '1',
                'areaTypeName': '111',
                'id': '402880ae74287f050174287f401c000622',
                'pid': '402880ae74287f050174287f401c0006'
              }
            ]
          }
        ]
      }
    }
  },
  {
    url: '/vue-element-admin/dict/test',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: '操作成功！',
        success: true,
        data: [
          { 'key': '1', 'value': '类型1' },
          { 'key': '2', 'value': '类型2' },
          { 'key': '3', 'value': '类型3' }
        ]
      }
    }
  },
  {
    url: '/vue-element-admin/door/create',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: '操作成功！',
        success: true
      }
    }
  },
  {
    url: '/vue-element-admin/door/update',
    type: 'put',
    response: config => {
      return {
        code: 200,
        message: '操作成功！',
        success: true
      }
    }
  },
  {
    url: '/vue-element-admin/door/detail',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: '操作成功！',
        success: true,
        data: List[0]
      }
    }
  },
  {
    url: '/vue-element-admin/door/delete',
    type: 'delete',
    response: config => {
      return {
        code: 200,
        message: '操作成功！',
        success: true
      }
    }
  }
]
