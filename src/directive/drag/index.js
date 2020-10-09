import drag from './drag'

const install = function(Vue) {
  Vue.directive('drag', function(el) {
    // 获取当前元素
    const dragBox = el
    dragBox.onmousedown = e => {
      // 算出鼠标相对元素的位置
      const disX = e.clientX - dragBox.offsetLeft
      const disY = e.clientY - dragBox.offsetTop
      document.onmousemove = e => {
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        const left = e.clientX - disX
        const top = e.clientY - disY
        // 移动当前元素
        dragBox.style.left = left + 'px'
        dragBox.style.top = top + 'px'
      }
      document.onmouseup = e => {
        // 鼠标弹起来的时候不再移动
        document.onmousemove = null
        // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
        document.onmouseup = null
      }
    }
  })
}

if (window.Vue) {
  window['drag'] = drag
  Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag
