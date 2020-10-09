import VectorSource from 'ol/source/Vector.js'
import { Fill, Stroke, Style } from 'ol/style.js'
import { Vector as VectorLayer } from 'ol/layer.js'
import KML from 'ol/format/KML.js'
import { mercatortogcj, mercatortobd } from '../utils/gemoTransform'

export default class KmlLayer {
  constructor(opts = {}) {
    const defaultStyle = new Style({
      fill: new Fill({
        color: 'rgba(245, 0, 255, 0.1)'
      }),
      stroke: new Stroke({
        color: 'red',
        width: 2
      })
    })
    this.options = Object.assign(opts, { style: defaultStyle })

    this.lyr = new VectorLayer({
      source: new VectorSource({}),
      style: opts.style
    })
  }

  addKMLToLyr(kmlInfos) {
    const kml = new KML()
    const feas = kml.readFeatures(kmlInfos, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    })
    let transFuc = mercatortogcj
    switch (this.options.dataType) {
      case 'google':
      case 'gaode':
        transFuc = mercatortogcj
        break
      case 'baidu':
        transFuc = mercatortobd
        break
    }
    feas.forEach(item => {
      item.setStyle(this.options.style)
      if (kmlInfos.dataType !== 'tianditu') {
        item.setGeometry(transFuc(item.getGeometry()))
      }
    })

    this.lyr.getSource().addFeatures(feas)
  }

  display(flag) {
    this.lyr.setVisible(flag)
  }
}
