import VectorSource from 'ol/source/Vector.js'
import { Stroke, Style, Text, Fill } from 'ol/style.js'
import { Vector as VectorLayer } from 'ol/layer.js'
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'

export default class TileLayerVec {
  constructor(opts = {}) {
    const defaultStyleFunc = (feature, resolution) => {
      return [new Style({
        fill: new Fill({
          color: 'rgba(0,0,0,0)'
        }),
        stroke: new Stroke({
          color: 'red',
          width: 2
        }),
        text: new Text({
          text: feature.get('info').name,
          font: 'normal 14px SimSun',
          fill: new Fill({
            color: '#000'
          })
        })
      })]
    }
    this.opts = Object.assign(opts, { style: defaultStyleFunc })

    this.lyr = new VectorLayer({
      source: new VectorSource(),
      style: this.opts.style,
      zIndex: 999
    })
  }

  addFeature(Info) {
    Info.coords = [[[Info.coords[0], Info.coords[1]],
      [Info.coords[2], Info.coords[1]],
      [Info.coords[2], Info.coords[3]],
      [Info.coords[0], Info.coords[3]]
    ]]
    const fea = new Feature({
      geometry: new Polygon(Info.coords),
      info: Info,
      event: 'TILEVECCLICK'
    })
    fea.on('TILEVECCLICK', item => {
    })
    fea.getGeometry().transform('EPSG:4326', 'EPSG:3857')
    if (Info.style) {
      fea.setStyle(Info.style)
    }
    this.lyr.getSource().addFeature(fea)
  }

  removeFeature(feaName) {
    const fea = this.lyr.getSource().getFeatures().find(item => {
      return item.get('info').name === feaName
    })
    if (fea) {
      this.lyr.getSource().removeFeature(fea)
    }
  }

  clearFeatures() {
    this.lyr.getSource().clear()
  }

  setVisible(flag) {
    this.lyr.setVisible(flag)
  }
}
