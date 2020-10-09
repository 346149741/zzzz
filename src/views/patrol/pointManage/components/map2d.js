import NewMap from '@/components/OLMap/core/MapCore'
import VecLayer from '@/components/OLMap/core/VecLayer'
import MapMesure from '@/components/OLMap/core/MapMesure'
import CoordsTransform from '@/components/OLMap/utils/coordsTransform'
import _ from 'lodash'
import {
  PatrolPoint_Com
} from '@/components/PopupComponents'
import {
  Point
} from 'ol/geom'
import Feature from 'ol/Feature'
import {
  delPatrolObj
} from '@/api/base/patro-pointManage'
import {
  Stroke,
  Style,
  Text,
  Fill,
  Icon
} from 'ol/style.js'
import {
  transform
} from 'ol/proj'
// import Overlay from 'ol/Overlay'

// import './flashPoint.css'
var newMap = '' // 地图容器
var dialogEl = {} // 地图弹窗
var lyrObj // 巡更图层
export function init(id, cfg, mapDialog) {
  newMap = new NewMap(id, cfg)
  dialogEl = mapDialog
  newMap.bindLeftClickFuc(leftClickFuc)
  newMap.newMap.getView().setCenter(transform([111.60085111856459, 29.062032886860337], 'EPSG:4326', 'EPSG:3857'))
  newMap.newMap.getView().setZoom(17)
  // 初始化巡更图层
  lyrObj = new VecLayer()
  newMap.addLayerToMap(lyrObj.lyr)

  initLayerStyle()
}
// 初始化图层样式
function initLayerStyle() {
  // 巡更图层样式
  var style = new Style({
    text: new Text({
      font: 'normal 12px Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif',
      fill: new Fill({
        color: '#e6a23c'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 4
      }),
      padding: [10, 10, 10, 10],
      offsetY: 22
    }),
    image: new Icon({
      src: require('@/assets/watchPoint/巡更点.png')
    })
  })
  var lyrSty = (feature, resolution) => {
    // var level = feature.get('info') ? feature.get('info').grade : '关键'
    style.getText().setText(feature.get('info') ? feature.get('info').pointName : '')
    const value = style.getImage().getScale()
    const SCALE = 0.75
    if (value !== SCALE) {
      style.getImage().setScale(SCALE)
    }
    return [style]
  }
  lyrObj.lyr.setStyle(lyrSty)
}
// 初始化巡更点
export function addData(PointData) {
  lyrObj.lyr.getSource().clear()
  // 经纬度转投影
  PointData.forEach((item, index) => {
    var coords = transform([item.longitude, item.latitude], 'EPSG:4326', 'EPSG:3857')
    var iconFeature = new Feature({
      geometry: new Point(coords),
      info: item
    })
    iconFeature.setId(item.id)
    iconFeature.set('eventsName', {
      l: 'showDetailInfo'
    })
    // 具体事件
    iconFeature.on('showDetailInfo', e => {
      const info = e.target.get('info')
      const detailComp = new PatrolPoint_Com({
        info,
        handleDisplay: dialogEl.lookbleDialog, // 查看
        handleEdit: dialogEl.visibleDialog, // 编辑
        handleDelete: removeFeature,
        operation: true // 控制是否显示操作按钮
      })
      e.event.map._overlay.setElement(detailComp.$el)
      let coords = e.event.coordinate
      if (e.target.getGeometry().getType() === 'Point') {
        coords = e.target.getGeometry().getCoordinates()
      }
      e.event.map._overlay.setPosition(coords)
    })
    lyrObj.addFeature(iconFeature)
  })
  // 预警点位测试
  // var ele = document.createElement('div')
  // ele.className = 'css_animation'
  // var point_overlay2 = new Overlay({
  //   element: ele,
  //   positioning: 'center-center'
  // })
  // newMap.newMap.addOverlay(point_overlay2)
  // point_overlay2.setPosition(transform(
  //   [111.591552, 29.069271], 'EPSG:4326', 'EPSG:3857'))
}
// 根据级别设置符号
function getImage(level) {
  switch (level) {
    case '关键':
      return new Icon({
        src: require('@/assets/watchPoint/关键.png')
      })
    case '重要':
      return new Icon({
        src: require('@/assets/watchPoint/重要.png')
      })
    case '一般':
      return new Icon({
        src: require('@/assets/watchPoint/一般.png')
      })
    default:
      return new Icon({
        src: require('@/assets/watchPoint/关键.png')
      })
  }
}

// 绑定地图左键事件
function leftClickFuc(event) {
  // // 清除非一直显示的overlay
  newMap.newMap.getOverlays().getArray().forEach(item => {
    if (!item.get('always')) item.setPosition(undefined)
  })
  const feas = newMap.newMap.getFeaturesAtPixel(event.pixel)
  if (feas === null || feas.length === 0) return
  // 多个元素的话取最上层的那个
  let feature = feas[0]
  // 对聚合图层进行特殊处理
  if (feature.get('features')) {
    feature = feature.get('features')[0]
  }
  // 已有数据弹框，新绘制点不在此处弹框
  if (feature.get('info')) {
    // 参数：1)弹框开启状态 2）编辑或新增，编辑为true，新增为false  3)要素的属性值
    // dialogEl.visibleDialog(true, true, feature.get('info'))
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
}

export function addMouseWheelLngLat(el) {
  newMap.addMouseWheelLngLat(el)
}

// 地图添加巡更点
export function currentItemAdd() {
  const drawObj = new MapMesure({
    lyr: lyrObj,
    type: 'Point',
    map: newMap
  })
  drawObj.bindEvents(drawedEvents)
}
// 画完地图回调函数，弹出添加框
function drawedEvents(res) {
  // 新增标识，完成提交后删除此标识
  res.feature.setId('addFeature')

  // 获取坐标
  // 默认天地图84坐标系
  var baseLayerType = 'tianditu'
  let coordSwitchFuc = CoordsTransform.unTransform
  switch (baseLayerType) {
    case 'google':
    case 'gaode':
      coordSwitchFuc = CoordsTransform.gcj02_wgs
      break
    case 'baidu':
      coordSwitchFuc = CoordsTransform.bd09_wgs
      break
  }
  const [lng, lat] = transform(res.feature.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326')
  const coor = coordSwitchFuc(lng, lat)
  dialogEl.visibleDialog(true, false, {
    longitude: coor[0],
    latitude: coor[1],
    id: 'addFeature'
  })
  newMap.removeInteraction(res.target)
}

export function removeFeature(id) {
  this.$confirm('确认删除所选记录？').then(() => {
    lyrObj.removeFeature(lyrObj.getFeatureById(id))

    // 清除地图点位
    newMap.newMap.getOverlays().getArray().forEach(item => {
      if (!item.get('always')) item.setPosition(undefined)
    })
    delPatrolObj(id).then((res) => {
      if (res.code == 200) {
        this.$notify.success({
          title: '成功',
          message: '操作成功!'
        })
      }
    })
  })

  // 删除数据
}
// 定位至经纬度
export function ZoomToCenter(lng, lat) {
  newMap.fit(new Point(transform([lng, lat], 'EPSG:4326', 'EPSG:3857')))
}
export function saveFeature(data, id) {
  // 保存完清除弹框，已获取最新数据
  newMap.newMap.getOverlays().getArray().forEach(item => {
    item.setPosition(undefined)
  })
  var feature = lyrObj.getFeatureById(id)
  feature.set('info', data)
  // 新增数据需修改地图要素的id
  if (id === 'addFeature') {
    feature.setId(data.id)
  }
  feature.set('eventsName', {
    l: 'showDetailInfo'
  })
  // 具体事件
  feature.on('showDetailInfo', e => {
    const info = e.target.get('info')
    const detailComp = new PatrolPoint_Com({
      info,
      handleDisplay: dialogEl.lookbleDialog, // 查看
      handleEdit: dialogEl.visibleDialog, // 编辑
      handleDelete: removeFeature,
      operation: true
    })
    e.event.map._overlay.setElement(detailComp.$el)
    let coords = e.event.coordinate
    if (e.target.getGeometry().getType() === 'Point') {
      coords = e.target.getGeometry().getCoordinates()
    }

    e.event.map._overlay.setPosition(coords)
  })
}
