import NewMap from '@/components/OLMap/core/MapCore'
import VecLayer from '@/components/OLMap/core/VecLayer'
import {
  Point
} from 'ol/geom'
import Feature from 'ol/Feature'
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
import {
  PatrolPoint_Com
} from '@/components/PopupComponents'
import _ from 'lodash'

import {
  parseShexianRender
} from './shexian.js'

// import './flashPoint.css'
var newMap = '' // 地图容器
var lyrObj // 巡更图层
var routeLayer // 路径标注图层
var resultLayer // 巡更结果图层
export function init(id, cfg) {
  newMap = new NewMap(id, cfg)
  newMap.bindLeftClickFuc(leftClickFuc)
  newMap.newMap.getView().setCenter(transform([111.60015111856459, 29.062032886860337], 'EPSG:4326', 'EPSG:3857'))
  newMap.newMap.getView().setZoom(17)
  // 初始化巡更图层
  lyrObj = new VecLayer()
  newMap.addLayerToMap(lyrObj.lyr)

  // 初始化路径标注图层
  routeLayer = new VecLayer()
  newMap.addLayerToMap(routeLayer.lyr)

  // 巡更结果图层
  resultLayer = new VecLayer()
  newMap.addLayerToMap(resultLayer.lyr)

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
        operation: false // 控制是否显示操作按钮
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
}

// 绑定地图左键事件
function leftClickFuc(event) {
  // // 清除非一直显示的overlay
  newMap.newMap.getOverlays().getArray().forEach(item => {
    if (!item.get('always')) item.setPosition(undefined)
  })
  const feas = newMap.newMap.getFeaturesAtPixel(event.pixel)
  if (feas === null || feas.length === 0) return
  // 取标注下的要素
  let feature
  if (feas.length > 1) {
    feature = feas[1]
  } else {
    feature = feas[0]
  }

  // 对聚合图层进行特殊处理
  if (feature.get('features')) {
    feature = feature.get('features')[0]
  }
  // 已有数据弹框，新绘制点不在此处弹框
  if (feature.get('info')) {
    // 参数：1)弹框开启状态 2）编辑或新增，编辑为true，新增为false  3)要素的属性值
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

// 定位至经纬度
export function ZoomToCenter(lng, lat) {
  newMap.flyTo(transform([lng, lat], 'EPSG:4326', 'EPSG:3857'))
}
// 存储路径并添加至地图中
export function saveRoute(pointRouteData) {
  // 清空所有已存在标注
  routeLayer.lyr.getSource().clear()

  pointRouteData.forEach((item, index) => {
    var coords = transform([item.longitude, item.latitude], 'EPSG:4326', 'EPSG:3857')
    var iconFeature = new Feature({
      geometry: new Point(coords),
      info: item
    })
    iconFeature.setStyle(getRouteStyle(item.num))
    routeLayer.addFeature(iconFeature)
  })

  routeLayer.lyr.getSource().refresh()

  // 添加射线图
  function sortRule(a, b) {
    return a.num - b.num
  }
  parseShexianRender(newMap.newMap, pointRouteData.sort(sortRule))
}

function getRouteStyle(num) {
  return new Style({
    text: new Text({
      text: num.toString(),
      font: 'normal 14px Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif',
      fill: new Fill({
        color: '#fff'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 0
      }),
      padding: [5, 5, 5, 5],
      offsetY: -18,
      offsetX: 11
    }),
    image: new Icon({
      src: require('@/assets/watchPoint/circle.png'),
      offset: [-2, -5],
      scale: 0.75,
      offsetOrigin: 'top-right',
      size: [100, 100]
    })
  })
}

// 巡更点异常信息unusual、未按顺序巡更unorder、漏检点leakDetection、巡更点到达延迟delay
export function addResultData(type, Data) {
  // 清空所有已存在标注
  resultLayer.lyr.getSource().clear()

  Data.forEach((item, index) => {
    var coords = transform([item.longitude, item.latitude], 'EPSG:4326', 'EPSG:3857')
    var iconFeature = new Feature({
      geometry: new Point(coords),
      info: item
    })
    iconFeature.setStyle(getResultStyle(type, item))
    resultLayer.addFeature(iconFeature)
  })

  resultLayer.lyr.getSource().refresh()
}

function getResultStyle(type, item) {
  // 未按顺序巡更带标注，其余不带标注
  if (type === 'unorder') {
    return new Style({
      text: new Text({
        text: item[type].toString(),
        font: 'normal 14px Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif',
        fill: new Fill({
          color: '#fff'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 0
        }),
        padding: [5, 5, 5, 5],
        offsetY: -12,
        offsetX: 27
      }),
      image: new Icon({
        src: require('@/assets/watchPoint/circleBlue.png'),
        offset: [20, -18],
        scale: 0.75,
        offsetOrigin: 'bottom-right',
        size: [100, 100]
      })
    })
  } else {
    return new Style({
      image: new Icon({
        src: getIconByType(type, item),
        offset: [-8, -26],
        scale: 0.75,
        offsetOrigin: 'bottom-right',
        size: [100, 100]
      })
    })
  }
}
// 巡更点异常信息unusual、未按顺序巡更unorder、漏检点leakDetection、巡更点到达延迟delay
function getIconByType(type, item) {
  var imgurl = ''
  switch (type) {
    case 'unusual':
      if (item[type] === '是') {
        imgurl = require('@/assets/watchPoint/错误.png')
      } else {
        imgurl = require('@/assets/watchPoint/正常.png')
      }
      break
    case 'leakDetection':
      if (item[type] === '是') {
        imgurl = require('@/assets/watchPoint/错误.png')
      } else {
        imgurl = require('@/assets/watchPoint/正常.png')
      }
      break
    case 'delay':
      if (item[type] === '是') {
        imgurl = require('@/assets/watchPoint/延迟.png')
      } else {
        imgurl = require('@/assets/watchPoint/正常.png')
      }
      break
    default:
      imgurl = require('@/assets/watchPoint/正常.png')
      break
  }
  return imgurl
}
