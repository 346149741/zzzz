export default class TileLayer {
  constructor(newMap3d) {
    this.newMap3d = newMap3d
    this.layer = null
  }

  initData(url, layerName, zIndex) {
    const matrixIds = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10',
      'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'
    ]

    // 1.新建ImageryProvider
    const wmtsImageryProvider = new Cesium.WebMapTileServiceImageryProvider({
      url: url, // 服务地址，如：'http://localhost:8080/geoserver/gwc/service/wmts'
      layer: layerName, // 图层名称，如：'tasmania'
      style: '',
      format: 'image/png',
      tileMatrixSetID: 'EPSG:4326',
      tileMatrixLabels: matrixIds,
      tilingScheme: new Cesium.GeographicTilingScheme({
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 1
      })
    })

    // 2.新建imageryLayer
    this.layer = new Cesium.ImageryLayer(wmtsImageryProvider, {
      show: true, // 是否可见
      alpha: 1 // 透明度
    })

    // 3.将imageryLayer加入到viewer中

    if (zIndex) {
      this.newMap3d.viewer.imageryLayers.add(this.layer, zIndex)
    } else {
      this.newMap3d.viewer.imageryLayers.add(this.layer)
    }
  }

  initDataXYZ(url, layerName, extent, zIndex) {
    const xyzImageryProvider = new Cesium.UrlTemplateImageryProvider({
      url: url, // 服务地址
      layer: layerName // 图层名称
    })
    // 2.新建imageryLayer
    this.layer = new Cesium.ImageryLayer(xyzImageryProvider, {
      show: true, // 是否可见
      alpha: 1 // 透明度
    })
    if (zIndex) {
      this.newMap3d.viewer.imageryLayers.add(this.layer, zIndex)
    } else {
      this.newMap3d.viewer.imageryLayers.add(this.layer)
    }
  }

  // 移除
  remove() {
    if (this.layer == null) return
    this.newMap3d.viewer.imageryLayers.remove(this.layer, true)
    this.layer = null
  }

  setVisible(flag = true) {
    this.layer.show = flag
  }

  // 设置透明度
  setOpacity(value) {
    if (this.layer == null) return

    this.layer.alpha = value
  }

  // 设置叠加顺序
  setZIndex(order) {
    if (this.layer == null || order == null) return

    // 先移动到最顶层
    this.newMap3d.viewer.imageryLayers.raiseToTop(this.layer)

    var layers = this.newMap3d.viewer.imageryLayers._layers
    for (var i = layers.length - 1; i >= 0; i--) {
      if (layers[i] === this.layer) continue
      var _temp = layers[i].config
      if (_temp && _temp.order) {
        if (order < _temp.order) {
          this.newMap3d.viewer.imageryLayers.lower(this.layer)
        }
      }
    }
  }
}
