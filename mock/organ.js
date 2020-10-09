const Mock = require('mockjs')
const List3 = []
const count3 = 2

for (let i = 0; i < count3; i++) {
  List3.push(Mock.mock({
    id: '@increment',
    pid: i + '',
    name: '@cword(3)',
    name1: '@cword(3)',
    name2: '@cword(3)',
    name3: '@city'
  }))
}

const List2 = []
const count2 = 3

for (let i = 0; i < count2; i++) {
  List2.push(Mock.mock({
    id: i + '',
    pid: 'a',
    children: List3,
    name: '@cword(3)',
    name1: '@cword(3)',
    name2: '@cword(3)',
    name3: '@city'
  }))
}

const List = []
const count = 1

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: 'a',
    pid: '',
    children: List2,
    name: '@cword(3)',
    name1: '@cword(3)',
    name2: '@cword(3)',
    name3: '@city'
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/organ/treeData',
    type: 'get',
    response: config => {
      return {
        code: 200,
        message: '操作成功！',
        success: true,
        data: List
      }
    }
  }
]
