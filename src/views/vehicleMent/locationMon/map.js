import NewMap from '@/components/OLMap/core/MapCore.js'
import VecLayer from '@/components/OLMap/core/VecLayer'
import Feature from 'ol/Feature'
import {
  Point,
  LineString,
  Polygon
} from 'ol/geom'

import _ from 'lodash'

import {
  Stroke,
  Style,
  Fill,
  Icon,
  Text
} from 'ol/style.js'
import {
  CarPoint_Com
} from '@/components/PopupComponents'
import {
  transform
} from 'ol/proj'
export default class MapCon {
  constructor(opts) {
    this.map = new NewMap(opts.id, opts)
    this.map.newMap.getView().setCenter(transform([111.60085111856459, 29.062032886860337], 'EPSG:4326', 'EPSG:3857'))
    this.map.newMap.getView().setZoom(17)
    this.map.bindLeftClickFuc(this.leftClickFuc)

    // 区域
    this.areaLayer = new VecLayer()
    this.map.addLayerToMap(this.areaLayer.lyr)
    this.areaLayer.setStyle(feature => {
      return new Style({
        stroke: new Stroke({
          color: '#13BFCB',
          width: 2,
          lineDash: [6, 12]
        }),
        fill: new Fill({
          color: 'rgba(28, 147, 153, 0.2)'
        })
      })
    })
    // 点位值
    this.carLayer = new VecLayer()
    this.map.addLayerToMap(this.carLayer.lyr)
    // 轨迹线
    this.lineLayer = new VecLayer()
    this.map.addLayerToMap(this.lineLayer.lyr)
    this.lineLayer.setStyle(feature => {
      return new Style({
        stroke: new Stroke({
          color: '#13BFCB',
          width: 4
        })

      })
    })

    var me = this
    // 点位样式
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
      })
    })
    var lyrSty = (feature, resolution) => {
      // var level = feature.get('info') ? feature.get('info').grade : '关键'
      debugger
      style.setImage(new Icon({
        src: me.getImgByNum(feature.get('info').type),
        offset: [-29, -15],
        size: [100, 100]
      }))
      style.getText().setText(feature.get('info') ? feature.get('info').text : '')
      const value = style.getImage().getScale()
      const SCALE = 0.75
      if (value !== SCALE) {
        style.getImage().setScale(SCALE)
      }
      return [style]
    }
    this.carLayer.lyr.setStyle(lyrSty)
    // 轨迹线样式
  }
  addcarLayerPoint(data) {
    // 清空所有已存在标注
    this.carLayer.lyr.getSource().clear()
    this.lineLayer.lyr.getSource().clear()
    this.areaLayer.lyr.getSource().clear()
    data.forEach((item, index) => {
      var coords = transform([item.lon, item.lat], 'EPSG:4326', 'EPSG:3857')
      var iconFeature = new Feature({
        geometry: new Point(coords),
        info: item
      })
      iconFeature.set('eventsName', {
        l: 'showDetailInfo'
      })
      // 具体事件
      iconFeature.on('showDetailInfo', e => {
        const info = e.target.get('info')
        const detailComp = new CarPoint_Com({
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
      this.carLayer.addFeature(iconFeature)
    })
    this.carLayer.lyr.getSource().refresh()
  }
  // 实时跟踪和历史轨迹
  realTimeTracking(data, lineData) {
    this.carLayer.lyr.getSource().clear()
    this.lineLayer.lyr.getSource().clear()
    this.areaLayer.lyr.getSource().clear()
    var coords = transform([data[0].lon, data[0].lat], 'EPSG:4326', 'EPSG:3857')
    var iconFeature = new Feature({
      geometry: new Point(coords),
      info: data[0]
    })
    iconFeature.set('eventsName', {
      l: 'showDetailInfo'
    })
    // 具体事件
    iconFeature.on('showDetailInfo', e => {
      const info = e.target.get('info')
      const detailComp = new CarPoint_Com({
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
    this.carLayer.addFeature(iconFeature)

    // 添加轨迹线
    const geom = new LineString(JSON.parse(lineData))
    geom.transform('EPSG:4326', 'EPSG:3857')
    const fea = new Feature({
      geometry: geom
    })
    this.lineLayer.addFeature(fea)
  }
  addArea(polygon) {
    this.lineLayer.lyr.getSource().clear()
    this.areaLayer.lyr.getSource().clear()
    const geom = new Polygon([JSON.parse(polygon)])
    geom.transform('EPSG:4326', 'EPSG:3857')
    const fea = new Feature({
      geometry: geom
    })
    this.areaLayer.addFeature(fea)
  }

  getImgByNum(type) {
    if (type === '告警') {
      // 告警
      return require('@/assets/car/red.png')
    } else if (type === '正常') {
      // 正常
      return require('@/assets/car/blue.png')
    } else if (type === '离线') {
      // 离线
      return require('@/assets/car/white.png')
    }
  }
  zoomToId(id) {
    const fea = this.lyr.getFeature((item) => {
      return id === item.get('info').id
    })
    fea && this.map.fit(fea.getGeometry())
  }
  // 绑定地图左键事件
  leftClickFuc(event) {
    // // 清除非一直显示的overlay
    event.map.getOverlays().getArray().forEach(item => {
      if (!item.get('always')) item.setPosition(undefined)
    })
    const feas = event.map.getFeaturesAtPixel(event.pixel)
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
}
