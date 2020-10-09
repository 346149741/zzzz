import VectorSource from 'ol/source/Vector.js'
import { Vector as VectorLayer } from 'ol/layer.js'

export default class VecLayer {
  constructor(opts = {}) {
    this.lyr = new VectorLayer({
      source: new VectorSource(),
      zIndex: opts.zIndex || 10
    })
  }

  // 查询指定的元素function
  getFeature(fuc) {
    return this.getFeatures().find(fuc)
  }

  getFeatureById(id) {
    return this.lyr.getSource().getFeatureById(id)
  }

  getFeatures() {
    return this.lyr.getSource().getFeatures()
  }

  removeFeature(fea) {
    this.lyr.getSource().removeFeature(fea)
  }

  addFeatures(feats) {
    this.lyr.getSource().addFeatures(feats)
  }

  addFeature(fea) {
    this.lyr.getSource().addFeature(fea)
  }

  clearFeatures() {
    this.lyr.getSource().clear()
  }

  setStyle(sty) {
    this.lyr.setStyle(sty)
  }

  setVisible(flag) {
    this.lyr.setVisible(flag)
  }
}
