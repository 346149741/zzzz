import Draw from 'ol/interaction/Draw.js'

export default class MapMesure {
  constructor(props) {
    this.draw = new Draw({
      source: props.lyr.lyr.getSource(),
      type: props.type,
      style: props.lyr.lyrSty
    })
    props.map.addInteraction(this.draw)
  }

  bindEvents(fuc) {
    this.draw.on('drawend', fuc)
  }
}
