import { Vector as VectorLayer } from 'ol/layer.js'
import { Cluster, Vector as VectorSource } from 'ol/source.js'

export default class VecClusterLayer {
  constructor(opts = {}) {
    this.lyr = new VectorLayer({
      source: new Cluster({
        distance: 30,
        source: new VectorSource()
      }),
      zIndex: opts.zIndex || 10
    })
  }

  addFeatures(feats) {
    this.lyr.getSource().getSource().addFeatures(feats)
  }

  clearFeatures() {
    this.lyr.getSource().getSource().clear(true)
  }

  getFeatures() {
    return this.lyr.getSource().getSource().getFeatures()
  }

  setStyle(sty) {
    this.lyr.setStyle(sty)
  }

  setVisible(flag) {
    this.lyr.setVisible(flag)
  }
}
