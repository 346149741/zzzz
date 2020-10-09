import store from '@/store'
import {
  getCurrentMousePosition
} from './Latlng'
import _ from 'lodash'

var viewer
var objPopup = {}

export function init(_viewer) {
  viewer = _viewer

  const info = document.createElement('div')
  info.setAttribute('id', 'pupup-all-view')
  viewer._container.appendChild(info)
  //
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  // 单击事件
  handler.setInputAction(mousePickingClick2, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  // 阻止浏览器右键默认事件
  document.oncontextmenu = function () {
    return false
  }
  handler.setInputAction(contextmenuClick, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  // 移动事件
  viewer.scene.postRender.addEventListener(bind2scene)
}

// 鼠标点击事件
function mousePickingClick(event) {
  var position = event.position
  var pickedObject = viewer.scene.pick(position)
  if (pickedObject && Cesium.defined(pickedObject.id)) { // && viewer.scene.pickPositionSupported
    var entity = pickedObject.id
    if (!entity.popup) return

    var cartesian
    if (entity.billboard || entity.label || entity.point) {
      cartesian = pickedObject.primitive.position
    } else {
      cartesian = getCurrentMousePosition(viewer.scene, position)
    }
    show(entity, cartesian)
  } else {
    // 清除右键菜单
    store.dispatch('contentMenu/setCoords', {
      x: -150,
      y: -150
    })
    hide()
  }
}
// 鼠标点击事件
function mousePickingClick2(event) {
  var position = event.position
  var pickedObject = viewer.scene.pick(position)
  if (pickedObject && Cesium.defined(pickedObject.id)) { // && viewer.scene.pickPositionSupported
    // 测试桩使用primitive
    var primitive = pickedObject.primitive
    if (pickedObject.primitive.info) {
      if (!primitive.popup) return
      let cartesian
      if (pickedObject.primitive.type === 'point') {
        cartesian = pickedObject.primitive.position
      } else {
        cartesian = getCurrentMousePosition(viewer.scene, position)
      }
      show2(primitive, cartesian)
    } else {
      // 其他要素点击事件
      var entity = pickedObject.id.length > 0 ? (pickedObject.id)[0] : pickedObject.id
      if (!entity.popup) return

      let cartesian
      if (entity.billboard || entity.label || entity.point) {
        cartesian = pickedObject.primitive.position
      } else {
        cartesian = getCurrentMousePosition(viewer.scene, position)
      }
      show(entity, cartesian)
    }
  } else {
    // 清除右键菜单
    store.dispatch('contentMenu/setCoords', {
      x: -150,
      y: -150
    })
    hide()
  }
}

// 鼠标右击时间，弹出contextMenu
function contextmenuClick(event) {
  // 获取要素和坐标
  var position = event.position
  var pickedObject = viewer.scene.pick(position)
  if (pickedObject && Cesium.defined(pickedObject.id)) {
    // 静态标注有可右击标识
    if (pickedObject.id.info.rightFlag) {
      store.dispatch('contentMenu/setCoords', position)
      store.dispatch('contentMenu/setEvent', pickedObject.id)
    }
  }
}

export function show(entity, cartesian) {
  if (entity == null || entity.popup == null) return

  var eleId = 'popup-' + entity.id
  hide(eleId)

  // lodash深拷贝
  const cartesianDeepClone = _.cloneDeep(cartesian)

  let popup = null
  if (!entity.popup.feaMethods) {
    return
  }
  // eslint-disable-next-line new-cap
  popup = new entity.popup.feaMethods({
    info: entity.info,
    detailClick: entity.popup.detailClick
  })
  objPopup[eleId] = {
    popup: popup,
    cartesian: cartesianDeepClone
  }

  // 显示内容
  popup.$el.setAttribute('id', eleId)
  document.getElementById('pupup-all-view').appendChild(popup.$el)

  // 计算显示位置
  var result = updateViewPoint(eleId, cartesian, popup)
  if (!result) {
    hide(eleId)
    return
  }
}
export function show2(primitive, cartesian) {
  if (primitive == null || primitive.popup == null) return

  var eleId = 'popup-' + primitive.id
  hide(eleId)

  // lodash深拷贝
  const cartesianDeepClone = _.cloneDeep(cartesian)

  let popup = null
  if (!primitive.popup.feaMethods) {
    return
  }
  // eslint-disable-next-line new-cap
  popup = new primitive.popup.feaMethods({
    info: primitive.info,
    detailClick: primitive.popup.detailClick
  })
  objPopup[eleId] = {
    popup: popup,
    cartesian: cartesianDeepClone
  }

  // 显示内容
  popup.$el.setAttribute('id', eleId)
  document.getElementById('pupup-all-view').appendChild(popup.$el)

  // 计算显示位置
  var result = updateViewPoint(eleId, cartesian, popup)
  if (!result) {
    hide(eleId)
    return
  }
}
export function hide(eleId) {
  if (!_isOnly && eleId) {
    // todo 后续添加常显示的pop
    // $('#' + eleId).remove()
    // delete objPopup[eleId]
  } else {
    document.getElementById('pupup-all-view').innerHTML = ''
    objPopup = {}
  }
}

function updateViewPoint(eleId, cartesian, popup) {
  try {
    var point = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian)
    if (point == null) return false
    var viewPopDom = document.getElementById(eleId)
    var x = point.x - viewPopDom.offsetWidth / 2
    var y = point.y - viewPopDom.offsetHeight / 2
    if (popup && (typeof popup === 'object') && popup.anchor) {
      x += popup.anchor[0]
      y += popup.anchor[1]
    }
    viewPopDom.style.position = 'absolute'
    viewPopDom.style.left = `${x}px`
    viewPopDom.style.top = `${y}px`

    return true
  } catch {
    // 防止二三维切换导致气泡updateViewPoint方法报错offsetWidth找不到
    hide()
    return false
  }
}

function bind2scene() {
  for (var i in objPopup) {
    var item = objPopup[i]
    updateViewPoint(i, item.cartesian, item.popup)
  }
}

var _isOnly = true

function isOnly(value) {
  _isOnly = value
}
