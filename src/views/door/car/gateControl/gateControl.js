import NewMap from '@/components/OLMap/core/MapCore.js'
import VecLayer from '@/components/OLMap/core/VecLayer'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Polygon from 'ol/geom/Polygon'
import {
  Stroke,
  Style,
  Text,
  Fill,
  Icon
} from 'ol/style.js'
import { GateDoor_Cmpt } from '@/components/PopupComponents'

export default class GateControl {
  constructor(opts) {
    this.map = new NewMap(opts.id, opts)
    this.map.bindSimpleClickFuc()

    this.lyr = new VecLayer({ zIndex: 15 })
    this.lyr.setStyle(new Style({
      image: new Icon({
        src: require('@assets/terminal/道闸-关.png')
      })
    }))
    this.map.addLayerToMap(this.lyr.lyr)

    this.regionLyr = new VecLayer({ zIndex: 10 })
    this.regionLyr.setStyle(new Style({
      stroke: new Stroke({
        color: '#F9B320',
        width: 2,
        lineDash: [6, 12]
      }),
      fill: new Fill({
        color: 'rgba(249, 179, 32, 0.1)'
      })
    }))
    this.map.addLayerToMap(this.regionLyr.lyr)
  }

  moveToRegion(item) {
    this.regionLyr.clearFeatures()

    if (item.areaLocation && item.areaLocation.constructor.name === 'String') {
      item.areaLocation = JSON.parse(item.areaLocation)
    }
    const geom = new Polygon([item.areaLocation])
    geom.transform('EPSG:4326', 'EPSG:3857')
    const fea = new Feature({
      geometry: geom
    })
    this.regionLyr.addFeature(fea)
    this.map.fitToFeature(fea)
  }

  initFeatures(arr, detailCallback) {
    const _that = this
    const res = []
    arr.forEach((item) => {
      if (item.lngLatAlt && item.lngLatAlt.constructor.name === 'String') {
        item.lngLatAlt = JSON.parse(item.lngLatAlt)
      }
      const geom = new Point(item.lngLatAlt)
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
        const info = e.target.get('info')
        const detailComp = new GateDoor_Cmpt({
          info
        })
        _that.map.setMapOverlay(detailComp.$el, e.target.getGeometry().getCoordinates())
      })
      res.push(fea)
    })
    this.lyr.addFeatures(res)
  }

  zoomToId(id) {
    const fea = this.lyr.getFeature((item) => {
      return id === item.get('info').id
    })
    fea && this.map.fit(fea.getGeometry())
  }
}
