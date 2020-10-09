import store from '@/store'
import * as Methods2d from './map2d'
import * as Methods3d from './map3d'
import Global from '@/store/global_variable.js'

export function initMap(id, cfg) {
  const mapName = store.getters.currentMap
  // 清空该dom元素
  id.innerHTML = ''
  if (mapName === 'map2d') {
    Methods2d.init(id, cfg)
  } else {
    Methods3d.init(id, cfg)
  }
}

export function home() {
  const mapName = store.getters.currentMap
  if (mapName === 'map2d') {
    // Methods2d.init(id, cfg)
  } else {
    Methods3d.home()
  }
}

export function initData() {
  const mapName = store.getters.currentMap
  if (mapName === 'map2d') {
    // Methods2d.init(id, cfg)
  } else {
    Methods3d.initData()
  }
}

export function addMouseWheelLngLat(el) {
  const mapName = store.getters.currentMap
  if (mapName === 'map2d') {
    Global.map2d.addMouseWheelLngLat(el)
  } else {
    Global.map3d.addMouseWheelLngLat(el)
  }
}
