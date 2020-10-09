export default class GltfLayer {
  constructor(newMap3d) {
    this.newMap3d = newMap3d
    this.modelCollection = []
  }
  // 图层里添加模型
  insertData(geojson, info, symbol) {
    if (!geojson) {
      return
    }
    if (typeof (geojson) === 'string') {
      geojson = JSON.parse(geojson)
    }
    if (geojson.geometry.type.toUpperCase() !== 'POINT') {
      return
    }
    if (!symbol) {
      symbol = {}
    }
    const coordinate = geojson.geometry.coordinates
    const properties = geojson.properties
    const position = Cesium.Cartesian3.fromDegrees(coordinate[0], coordinate[1], coordinate[2] || 0)
    const heading = Cesium.Math.toRadians(properties.heading || 0)
    const pitch = Cesium.Math.toRadians(properties.pitch || 0)
    const roll = Cesium.Math.toRadians(properties.roll || 0)
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

    const model = this.newMap3d.viewer.entities.add({
      info: info,
      position: position,
      orientation: orientation,
      model: {
        uri: symbol.uri,
        scale: properties.scale || symbol.scale || 1
      }
    })
    model.popup = info.popResult
    this.modelCollection.push(model)
  }

  // 显示隐藏
  setVisible(val) {
    if (this.modelCollection.length === 0) {
      return
    }
    if (val) {
      this.modelCollection.forEach(item => {
        this.newMap3d.viewer.entities.add(item)
      })
    } else {
      this.modelCollection.forEach(item => {
        this.newMap3d.viewer.entities.remove(item)
      })
    }
  }
  // id查找模型
  getEntity(id) {
    var model = null
    this.modelCollection.forEach(item => {
      const info = item.info
      if (info.id === id) {
        model = item
      }
    })
    return model
  }
  // 定位到模型
  zoomToEntity(id) {
    const model = this.getEntity(id)
    if (model) {
      this.newMap3d.viewer.zoomTo(model)
    }
  }
  // 模型移动
  moveModelPosition(id, position) {
    const model = this.getEntity(id)
    if (!model) {
      return
    }
    const longitude = position.x
    const latitude = position.y
    const height = position.z
    const pos = Cesium.Cartesian3.fromDegrees(longitude, latitude, height)

    const heading = position.heading
    const pitch = position.pitch
    const roll = position.roll
    const headingoRadians = Cesium.Math.toRadians(heading || 0)
    const pitchoRadians = Cesium.Math.toRadians(pitch || 0)
    const rollRadians = Cesium.Math.toRadians(roll || 0)
    const hpr = new Cesium.HeadingPitchRoll(headingoRadians, pitchoRadians, rollRadians)
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(pos, hpr)
    model.position = pos
    model.orientation = orientation
  }
}
