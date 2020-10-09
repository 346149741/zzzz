import NewMap from '@/components/OLMap/core/MapCore.js'
import VecLayer from '@/components/OLMap/core/VecLayer'
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
import {
  Stroke,
  Style,
  Fill
} from 'ol/style.js'
import {
  transform
} from 'ol/proj'

import Select from 'ol/interaction/Select'

export default class MapCon {
  constructor(opts) {
    this.map = new NewMap(opts.id, opts)
    debugger
    this.map.newMap.getView().setCenter(transform([111.60085111856459, 29.062032886860337], 'EPSG:4326', 'EPSG:3857'))
    this.map.newMap.getView().setZoom(19)
    this.lyr = new VecLayer()
    this.lyr.setStyle(feature => {
      return new Style({
        // stroke: new Stroke({
        //   color: '#13BFCB',
        //   width: 2,
        //   lineDash: [6, 12]
        // }),
        fill: this.getFillByName(feature.get('info').areaName)
      })
    })
    this.map.addLayerToMap(this.lyr.lyr)
    this.selectObj = null
    this.addSelectedFuc()
  }
  getFillByName(name) {
    let areafill
    switch (name) {
      case '1':
        areafill = new Fill({
          color: 'rgba(227,172,41, 0.6)'
        })
        break
      case '2':
        areafill = new Fill({
          color: 'rgba(0,119,10, 0.6)'
        })
        break
      case '3':
        areafill = new Fill({
          color: 'rgba(84,14,176, 0.6)'
        })
        break
      case '4':
        areafill = new Fill({
          color: 'rgba(170,37,65, 0.6)'
        })
        break
    }
    return areafill
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

  zoomToId(id) {
    const fea = this.lyr.getFeature((item) => {
      return id === item.get('info').id
    })
    fea && this.map.fit(fea.getGeometry())
    this.selectObj.getFeatures().clear()
    this.selectObj.getFeatures().push(fea)
  }
}
