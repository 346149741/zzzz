import NewMap from '@/components/OLMap/core/MapCore.js'
import VecLayer from '@/components/OLMap/core/VecLayer'
import Feature from 'ol/Feature'
import {
  Point
} from 'ol/geom'
import Overlay from 'ol/Overlay'
import {
  Stroke,
  Style,
  Fill,
  Icon,
  Text
} from 'ol/style.js'
import {
  transform
} from 'ol/proj'
import axios from 'axios'
import GeoJSON from 'ol/format/GeoJSON'
export default class MapCon {
  constructor(opts) {
    this.map = new NewMap(opts.id, opts)
    debugger
    // this.map.newMap.getView().setCenter(transform([111.60085111856459, 29.062032886860337], 'EPSG:4326', 'EPSG:3857'))
    this.map.newMap.getView().setZoom(9)
    // 常德市边界
    this.lyr = new VecLayer()
    // 大气点位值
    this.environment = new VecLayer()
    this.lyr.setStyle(feature => {
      return new Style({
        stroke: new Stroke({
          color: '#13BFCB',
          width: 2
          // lineDash: [6, 12]
        })
        // fill: new Fill({
        //   color: 'rgba(227,172,41, 0.6)'
        // })
      })
    })
    this.map.addLayerToMap(this.lyr.lyr)
    this.map.addLayerToMap(this.environment.lyr)
  }
  addCityRegion() {
    // 获取常德市geojson
    axios.get('./static/region/cdCity.json').then(response => {
      const fea = new GeoJSON().readFeatures(response.data, {
        featureProjection: 'EPSG:3857'
      })
      this.lyr.addFeatures(fea)
    })
  }
  addEnvironmentPoint(data, type) {
    // 清空所有已存在标注
    this.environment.lyr.getSource().clear()

    data.forEach((item, index) => {
      var coords = transform([item.lon, item.lat], 'EPSG:4326', 'EPSG:3857')
      var iconFeature = new Feature({
        geometry: new Point(coords),
        info: item
      })
      iconFeature.setStyle(this.getImgStyle(item.num, type))
      this.environment.addFeature(iconFeature)

      // 第一种样式
      if (item.num > 200) {
        var ele = document.createElement('div')
        ele.className = 'css_animation'
        var point_overlay2 = new Overlay({
          element: ele,
          positioning: 'center-center'
        })
        this.map.newMap.addOverlay(point_overlay2)
        point_overlay2.setPosition([110, 30])
        point_overlay2.setPosition(transform([item.lon, item.lat], 'EPSG:4326', 'EPSG:3857'))
      }
    })

    this.environment.lyr.getSource().refresh()
  }

  getImgStyle(num, type) {
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
        offsetY: -22,
        offsetX: 0
      }),
      image: new Icon({
        src: this.getImgByNum(num, type),
        offset: [-29, -15],
        size: [100, 100]
      })
    })
  }
  getImgByNum(num, type) {
    if (type === 'AQI') {
      if (num > 0 && num <= 50) {
        // 优
        return require('@/assets/network/1.png')
      } else if (num > 51 && num <= 100) {
        // 良
        return require('@/assets/network/2.png')
      } else if (num > 101 && num <= 150) {
        // 轻度污染
        return require('@/assets/network/3.png')
      } else if (num > 151 && num <= 200) {
        // 中度污染
        return require('@/assets/network/4.png')
      } else if (num > 201 && num <= 300) {
        // 重度污染
        return require('@/assets/network/5.png')
      } else if (num > 300) {
        // 严重污染
        return require('@/assets/network/6.png')
      }
    }
  }
  zoomToId(id) {
    const fea = this.lyr.getFeature((item) => {
      return id === item.get('info').id
    })
    fea && this.map.fit(fea.getGeometry())
  }
}
