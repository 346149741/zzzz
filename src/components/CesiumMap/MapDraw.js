export default class MapPublicTools3d {
  constructor(opts) {
    this.viewer = opts.viewer
    this.entityId = null // 记录添加要素的id，便于后期删除
  }
  // 画点
  drawPoint(symbol, callback) {
    var _this = this
    // 坐标存储
    var positions = []
    var handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)

    // 单击鼠标左键画点
    handler.setInputAction(function(movement) {
      var cartesian = _this.viewer.scene.camera.pickEllipsoid(movement.position, _this.viewer.scene.globe.ellipsoid)
      positions.push(cartesian)
      var float = _this.viewer.entities.add({
        position: cartesian,
        point: {
          color: Cesium.Color.RED,
          pixelSize: 5
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
      })
      _this.entityId = float.id
      // 事件回调，传回position
      handler.destroy()
      if (callback) {
        callback(positions[0], _this.entityId)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }
  // 画线
  drawLineString(symbol, callback) {
    var _this = this
    var PolyLinePrimitive = (function() {
      function _(positions) {
        this.options = {
          polyline: {
            show: true,
            positions: [],
            material: new Cesium.Color.fromCssColorString(symbol.polyline.materialString),
            width: symbol.polyline.stokeWidth
          }
        }
        this.positions = positions
        this._init()
      }

      _.prototype._init = function() {
        var _self = this
        var _update = function() {
          return _self.positions
        }
        // 实时更新polyline.positions
        this.options.polyline.positions = new Cesium.CallbackProperty(_update, false)
        var float = _this.viewer.entities.add(this.options)
        _this.entityId = float.id
      }
      return _
    })()

    var handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)
    var positions = []
    var poly = null
    // 鼠标左键单击画点
    handler.setInputAction(function(movement) {
      const ray = _this.viewer.camera.getPickRay(movement.position)
      var cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene)
      if (positions.length == 0) {
        positions.push(cartesian.clone())
      }
      positions.push(cartesian)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    // 鼠标移动
    handler.setInputAction(function(movement) {
      const ray = _this.viewer.camera.getPickRay(movement.endPosition)
      var cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene)
      if (positions.length >= 2) {
        if (!Cesium.defined(poly)) {
          poly = new PolyLinePrimitive(positions)
        } else {
          if (cartesian !== undefined) {
            positions.pop()
            positions.push(cartesian)
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    // 单击鼠标右键结束画线
    handler.setInputAction(function(movement) {
      handler.destroy()
      if (callback) {
        positions.pop()
        callback(positions, _this.entityId)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  }

  // 画面
  drawPolygon(symbol, callback) {
    var _this = this
    var PolygonPrimitive = (function() {
      function _(positions) {
        this.options = {
          name: '多边形',
          polygon: {
            hierarchy: [],
            perPositionHeight: true,
            material: new Cesium.Color.fromCssColorString(symbol.polygon.materialString),
            outlineColor: new Cesium.Color.fromCssColorString(symbol.polygon.stokeColor),
            outlineWidth: symbol.polygon.stokeWidth,
            outline: true
          }
        }
        this.hierarchy = {
          positions
        }
        this._init()
      }

      _.prototype._init = function() {
        var _self = this
        var _update = function() {
          return _self.hierarchy
        }
        // 实时更新polygon.hierarchy
        this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update, false)
        var float = _this.viewer.entities.add(this.options)
        _this.entityId = float.id
      }
      return _
    })()

    var handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)
    var positions = []
    var poly = null

    // 鼠标单击画点
    handler.setInputAction(function(movement) {
      const ray = _this.viewer.camera.getPickRay(movement.position)
      var cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene)
      if (positions.length === 0) {
        positions.push(cartesian.clone())
      }
      positions.push(cartesian)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    // 鼠标移动
    handler.setInputAction(function(movement) {
      const ray = _this.viewer.camera.getPickRay(movement.endPosition)
      var cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene)
      if (positions.length >= 2) {
        if (!Cesium.defined(poly)) {
          poly = new PolygonPrimitive(positions)
        } else {
          if (cartesian !== undefined) {
            positions.pop()
            positions.push(cartesian)
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    // 鼠标右键单击结束绘制
    handler.setInputAction(function(movement) {
      handler.destroy()
      if (callback) {
        positions.pop()
        positions.push(positions[0].clone())
        callback(positions, _this.entityId)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  }
}
