export default class GifPointLayer {
  constructor(newMap3d) {
    this.newMap3d = newMap3d
    this.gifPointCollection = []
  }

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
    const that = this
    const coordinate = geojson.geometry.coordinates
    var gifOverlay = document.createElement('img')
    this.newMap3d.viewer._container.appendChild(gifOverlay)
    gifOverlay.id = info.id
    gifOverlay.info = info
    gifOverlay.style.width = symbol.width || '24px'
    gifOverlay.style.height = symbol.height || '24px'
    gifOverlay.style.position = 'absolute'
    gifOverlay.src = symbol.url
    const scratch = new Cesium.Cartesian2()
    this.newMap3d.viewer.scene.preRender.addEventListener(function() {
      const position = Cesium.Cartesian3.fromDegrees(coordinate[0], coordinate[1], coordinate[2] || 0)
      gifOverlay.setAttribute('pointposition', position)
      const canvasPosition = that.newMap3d.viewer.scene.cartesianToCanvasCoordinates(position, scratch)
      if (Cesium.defined(canvasPosition)) {
        gifOverlay.style.top = canvasPosition.y + 'px'
        gifOverlay.style.left = canvasPosition.x + 'px'
      }
    })
    this.gifPointCollection.push(gifOverlay)
  }

  setVisible(val) {
    if (val) {
      this.gifPointCollection.forEach(item => {
        item.style.display = 'none'
      })
    } else {
      this.gifPointCollection.forEach(item => {
        item.style.display = 'block'
      })
    }
  }

  getPoint(id) {
    var point = null
    this.gifPointCollection.forEach(item => {
      if (item.id === id) {
        point = item
      }
    })
    return point
  }

  removePoint(id) {
    var point = this.getPoint(id)
    const iIndex = this.gifPointCollection.indexOf(point)
    this.gifPointCollection.splice(iIndex, 1)
    point.remove()
  }
}
