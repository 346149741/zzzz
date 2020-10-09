import Global from '@/store/global_variable.js'
import NewMap from '@/components/OLMap/core/MapCore'
import _ from 'lodash'

export function init(id, cfg) {
  const newMap = new NewMap(id, cfg)
  Global.map2d = newMap
  Global.map3d = null
  newMap.bindLeftClickFuc(leftClickFuc)

  rightClickFuc()
}

// 绑定地图左键事件
function leftClickFuc(event) {
  // // 清除非一直显示的overlay
  Global.map2d.newMap.getOverlays().getArray().forEach(item => {
    if (!item.get('always')) item.setPosition(undefined)
  })

  const feas = Global.map2d.newMap.getFeaturesAtPixel(event.pixel)
  if (feas === null || feas.length === 0) return
  // 多个元素的话取最上层的那个
  let feature = feas[0]
  // 对聚合图层进行特殊处理
  if (feature.get('features')) {
    feature = feature.get('features')[0]
  }
  const eventsName = feature.get('eventsName')
  if (!_.isEmpty(eventsName)) {
    if (_.has(eventsName, 'l')) {
      feature.dispatchEvent({
        type: eventsName.l,
        event: event
      })
    }
  }
}

function rightClickFuc() {
  // 右键 调用地图overlay
  Global.map2d.newMap.getViewport().oncontextmenu = (e) => {
    e.preventDefault()
    const pixel = Global.map2d.newMap.getEventPixel(e)
    Global.map2d.newMap.forEachFeatureAtPixel(pixel, (feature) => {
      const eventsName = feature.get('eventsName')
      if (!_.isEmpty(eventsName)) {
        if (_.has(eventsName, 'r')) {
          feature.dispatchEvent({
            type: eventsName.r,
            event: event
          })
        }
      }
    })
  }
}
