import NewMap from '@/components/OLMap/core/MapCore.js'
import VecLayer from '../../../../components/OLMap/core/VecLayer'
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
import {
  Stroke,
  Style,
  Text,
  Fill,
  Icon
} from 'ol/style.js'
// import { transform } from 'ol/proj'
import Draw from 'ol/interaction/Draw.js'
import VectorSource from 'ol/source/Vector'
import Select from 'ol/interaction/Select'

export default class MapRegionCls {
  constructor(opts) {
    this.map = new NewMap(opts.id, opts)
    this.map.bindSimpleClickFuc()
    this.lyr = new VecLayer()
    this.lyr.setStyle(new Style({
      stroke: new Stroke({
        color: '#13BFCB',
        width: 2,
        lineDash: [6, 12]
      }),
      fill: new Fill({
        color: 'rgba(28, 147, 153, 0.2)'
      })
    }))
    this.map.addLayerToMap(this.lyr.lyr)
    this.drawObj = null
    this.selectObj = null
    this.addSelectedFuc()
  }

  initFeatures(arr, detailCallback) {
    this.selectObj && this.selectObj.getFeatures().clear()
    const res = []
    arr.forEach((item) => {
      if (item.areaLocation && item.areaLocation.constructor.name === 'String') {
        item.areaLocation = JSON.parse(item.areaLocation)
      }
      const geom = new Polygon([item.areaLocation])
      geom.transform('EPSG:4326', 'EPSG:3857')
      const fea = new Feature({
        geometry: geom,
        info: item
      })

      fea.set('eventsName', {
        l: 'showDetailInfo'
      })
      // 轨迹节点具体事件
      fea.on('showDetailInfo', e => {
        detailCallback && detailCallback(e)
      })
      res.push(fea)
    })
    this.lyr.addFeatures(res)
  }

  addSelectedFuc() {
    this.selectObj = new Select({
      style: new Style({
        stroke: new Stroke({
          color: '#F9B320',
          width: 2,
          lineDash: [6, 12]
        }),
        fill: new Fill({
          color: 'rgba(249, 179, 32, 0.1)'
        })
      })
    })
    this.map.addInteraction(this.selectObj)
  }

  addDrawItem(callback) {
    if (this.drawObj === null) {
      this.drawObj = new Draw({
        source: new VectorSource(),
        type: 'Polygon'
      })
      this.drawObj.on('drawend', (e) => {
        this._removeInteraction()
        callback && callback(e)
      })
    }
    this._removeInteraction()
    this.map.addInteraction(this.drawObj)
  }

  _removeInteraction() {
    this.map.removeInteraction(this.drawObj)
  }

  zoomToId(id) {
    const fea = this.lyr.getFeature((item) => {
      return id === item.get('info').id
    })
    fea && this.map.fit(fea.getGeometry())
    this.selectObj.getFeatures().clear()
    this.selectObj.getFeatures().push(fea)
  }
}
