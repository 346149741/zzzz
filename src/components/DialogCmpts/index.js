const c = {}

export function createPop(a, id) {
  const flag = initPop(a, id)
  if (flag) {
    document.getElementById(id).appendChild(a.$el)
  }
}

export function initPop(a, id) {
  let flag = true
  if (document.getElementById(id)) {
    if (a.$data.id === c[id].$data.id) {
      // 同一个物件重复点击
      flag = false
    } else {
      // 加载新物件信息
      document.getElementById(id).innerHTML = ''
      flag = true
    }
  } else {
    // 加载父节点
    const container = document.getElementById('global_dialog')
    // 弹窗子节点
    const info = document.createElement('div')
    info.setAttribute('id', id)
    container.appendChild(info)
    flag = true
  }
  c[id] = a
  return flag
}

export function destroyPop(id) {
  c[id].$data.id = ''
  document.getElementById(id).innerHTML = ''
}
