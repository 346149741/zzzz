import Modify from 'ol/interaction/Modify'

export default class ShapeModify {
  constructor(props) {
    this.modify = new Modify({
      features: props.features,
      insertVertexCondition: function() { return false }
    })
    this.map = props.map
    this.map.addInteraction(this.modify)
  }

  stopModify() {
    this.map.removeInteraction(this.modify)
  }
}
