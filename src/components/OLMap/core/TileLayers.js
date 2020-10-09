import {
  getWidth,
  getTopLeft
} from 'ol/extent.js'
import TileLayer from 'ol/layer/Tile.js'
import {
  get as getProjection
} from 'ol/proj.js'
import WMTS from 'ol/source/WMTS.js'
import WMTSTileGrid from 'ol/tilegrid/WMTS.js'

var projectionExtent = getProjection('EPSG:4326').getExtent()
var size = getWidth(projectionExtent) / 256
var resolutions = new Array(22)
var matrixIds = new Array(22)
for (var z = 0; z < 22; ++z) {
  resolutions[z] = size / Math.pow(2, z + 1)
  matrixIds[z] = 'EPSG:4326:' + z
}

export default class TileLayers {
  constructor(opts) {
    // wmts方式加载
    this.lyr = new TileLayer({
      source: new WMTS({
        url: opts.url,
        layer: opts.layer,
        matrixSet: 'EPSG:4326',
        format: 'image/png',
        projection: 'EPSG:4326',
        crossOrigin: 'anonymous',
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions: resolutions,
          extent: opts.extent,
          matrixIds: matrixIds
        }),
        wrapX: true
      }),
      id: opts.layer,
      zIndex: opts.zIndex ? opts.zIndex : null
    })
  }

  setSource(opts) {
    this.lyr.setSource(
      new WMTS({
        url: opts.url,
        layer: opts.layer,
        matrixSet: 'EPSG:4326',
        format: 'image/png',
        projection: 'EPSG:4326',
        crossOrigin: 'anonymous',
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions: resolutions,
          extent: opts.extent,
          matrixIds: matrixIds
        }),
        wrapX: true
      })
    )
  }

  setVisible(flag) {
    this.lyr.setVisible(flag)
  }
}
