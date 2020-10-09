import TileLayer from 'ol/layer/Tile.js'
import XYZ from 'ol/source/XYZ'

export default class TileXYZLayers {
  constructor(opts) {
    // XYZ方式加载
    this.lyr = new TileLayer({
      source: new XYZ({
        url: opts.url,
        crossOrigin: 'anonymous'
      }),
      zIndex: opts.zIndex ? opts.zIndex : null
    })
  }

  setSource(opts) {
    this.lyr.setSource(
      new XYZ({
        url: opts.url,
        // 'http://192.168.1.220:9000/image/30196280bea611eab8d8e77f520a3a15/{z}/{x}/{y}'
        crossOrigin: 'anonymous'
      })
    )
  }

  setVisible(flag) {
    this.lyr.setVisible(flag)
  }
}
