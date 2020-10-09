import NewMap from '../../core/MapCore'
import VecLayer from '../../core/VecLayer'
import Point from 'ol/geom/Point'
import LineString from 'ol/geom/LineString'
import Polygon from 'ol/geom/Polygon'
import Feature from 'ol/Feature'
import { Draw, Modify, Snap } from 'ol/interaction.js'
import {
  Stroke,
  Style,
  Text,
  Fill,
  Icon
} from 'ol/style.js'

export default class MapOpts {
  constructor(id, opts) {
    this.opts = opts
    this.map = new NewMap(id)
    this.lyr = new VecLayer()
    this.map.addLayerToMap(this.lyr.lyr)
    if (opts.displayType === 'view') {
      this.addData()
    } else if (opts.displayType === 'create') {
      this.drawPolygon()
      this.modifyPolygon()
    } else if (opts.displayType === 'update') {
      this.addData()
      this.modifyPolygon()
    }
  }

  addData() {
    if (this.opts.coords && this.opts.coords instanceof Array) {
      const { dataType, coords } = this.opts
      let geom = null
      if (dataType === 'Point') {
        geom = new Point(coords)
      } else if (dataType === 'LineString') {
        geom = new LineString(coords)
      } else if (dataType === 'Polygon') {
        geom = new Polygon([coords])
      }

      geom.transform('EPSG:4326', 'EPSG:3857')
      const fea = new Feature({
        geometry: geom
      })
      this.lyr.addFeature(fea)
      this.map.fit(geom)
    }
  }

  drawPolygon() {
    const { dataType } = this.opts
    const drawObj = new Draw({
      source: this.lyr.lyr.getSource(),
      type: dataType
    })
    drawObj.on('drawend', (e) => {
      this.map.removeInteraction(e.target)
    })
    this.map.addInteraction(drawObj)
  }

  modifyPolygon() {
    const snap = new Snap({ source: this.lyr.lyr.getSource() })
    const modify = new Modify({ source: this.lyr.lyr.getSource() })
    this.map.addInteraction(modify)
    this.map.addInteraction(snap)
  }

  getCoords() {
    const arr = this.lyr.getFeatures()
    let res = []
    if (arr.length > 0) {
      const geom = arr[0].getGeometry()
      const { dataType } = this.opts
      if (dataType === 'Point' || dataType === 'LineString') {
        res = geom.transform('EPSG:3857', 'EPSG:4326').getCoordinates()
      } else {
        res = geom.transform('EPSG:3857', 'EPSG:4326').getCoordinates()[0]
      }
    }
    return res
  }

  setLyrStyle(styleInfo) {
    const { dataType } = this.opts
    let lyrSty = null
    if (dataType === 'Point') {
      var style = new Style({
        image: new Icon({
          src: styleInfo.legendPath
        })
      })
      lyrSty = (feature, resolution) => {
        const value = style.getImage().getScale()
        const SCALE = resolution > 600 ? 0.4 : resolution > 300 ? 0.6 : resolution > 50 ? 0.75 : 1
        if (value !== SCALE) {
          style.getImage().setScale(SCALE)
        }
        return [style]
      }
    } else {
      lyrSty = new Style({
        fill: new Fill({
          color: styleInfo.fill
        }),
        stroke: new Stroke({
          color: styleInfo.stroke.color,
          width: styleInfo.stroke.width
          // lineDash: [8, 4, 2, 4] // 数组中第一个是虚线小段的长度，第二个是虚线小段的间隔
        }),
        text: new Text({
          font: 'normal 14px SimSun',
          fill: new Fill({
            color: '#000'
          })
        })
      })
    }
    this.lyr.setStyle(lyrSty)
  }
}
