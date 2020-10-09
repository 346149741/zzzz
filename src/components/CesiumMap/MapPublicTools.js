import * as mapUtil from '@/components/CesiumMap/Utils.js'
import _ from 'lodash'
// 地图点位样式
const pointStyle = {
  pixelSize: 1,
  color: new Cesium.Color.fromCssColorString('rgb(255, 204, 51)'),
  outlineColor: new Cesium.Color.fromCssColorString('rgb(255, 204, 51)'),
  outlineWidth: 1
  // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
}
// 地图标注样式
const labelStyle = {
  text: '',
  font: '12px sans-serif',
  fillColor: new Cesium.Color.fromCssColorString('rgba(0, 0, 0,0.7)'),
  showBackground: true,
  backgroundColor: new Cesium.Color.fromCssColorString('rgba(255, 255, 255,0.7)'),
  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  pixelOffset: new Cesium.Cartesian2(10, 0)
  // disableDepthTestDistance: 1000
  // heightReference: Cesium.HeightReference.NONE
}
// 地图线型样式
const lineStyle = {
  material: new Cesium.Color.fromCssColorString('rgb(255, 204, 51)'),
  width: 3
}
// 地图面样式
const polygonStyle = {
  material: new Cesium.ColorMaterialProperty(new Cesium.Color.fromCssColorString('rgba(255, 255, 255,0.2)')),
  outlineColor: new Cesium.Color.fromCssColorString('rgb(255, 204, 51)'),
  outlineWidth: 10
}

export default class MapPublicTools3d {
  constructor(opts) {
    this.viewer = opts.map.viewer
    this.measureIds = []
    this.handler = null
    this.tooltip = document.createElement('div')
    this.viewer.container.appendChild(this.tooltip)
    this.tooltip.style.display = 'none'
    this.tooltip.style.position = 'absolute'
    this.tooltip.style.zIndex = 5
    this.tooltip.style.color = 'black'
    this.tooltip.style.opacity = '0.7'
    this.tooltip.style.border = '1px solid white'
    this.tooltip.style['pointer-events'] = 'none'
    this.tooltip.style.padding = '4px 8px'
    this.tooltip.style.borderRadius = '4px'
    this.tooltip.style.backgroundColor = '#FFFFFF'
    this.tooltip.style['font-size'] = '12px'
    this.tooltip.style['white-space'] = 'nowrap'
  }
  // 清除鼠标事件
  clearHandler() {
    if (this.handler) {
      this.handler.destroy()
    }
  }
  // 鼠标移入显示提示
  showTooltip(movement, tip = '单击开始，双击结束') {
    this.tooltip.style.display = 'block'
    this.tooltip.style.left = movement.endPosition.x + 3 + 'px'
    this.tooltip.style.top = movement.endPosition.y - 25 + 'px'
    this.tooltip.innerHTML = `<p>${tip}</p>`
  }

  /* 空间距离 */
  measuerLength(handler) {
    var that = this
    that.viewer.scene.globe.depthTestAgainstTerrain = false // 开启地形深度检测
    handler = new Cesium.ScreenSpaceEventHandler(that.viewer.scene._imageryLayerCollection)
    var positions = []
    var poly = null
    var distance = null
    var cartesian = null
    var floatingPoint
    var _labelStyle = _.cloneDeep(labelStyle)
    _labelStyle.disableDepthTestDistance = Number.POSITIVE_INFINITY
    handler.setInputAction(function(movement) {
      cartesian = mapUtil.getcartesian(movement.endPosition, that.viewer)
      if (cartesian) {
        that.showTooltip(movement)
        if (positions.length >= 2) {
          if (!Cesium.defined(poly)) {
            poly = new PolyLinePrimitive(positions)
          } else {
            positions.pop()
            // cartesian.y += (1 + Math.random());
            positions.push(cartesian)
          }
          distance = mapUtil.getSpaceDistance(positions)
          if (distance > 1000) {
            distance = (distance / 1000.0).toFixed(2) + 'km'
          } else {
            distance = distance.toFixed(2) + 'm'
          }

          // console.log("distance: " + distance);
          that.tooltip.innerHTML = '<p>' + distance + '</p>'
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    handler.setInputAction(function(movement) {
      that.tooltip.style.display = 'none'

      cartesian = mapUtil.getcartesian(movement.position, that.viewer)

      if (positions.length === 0) {
        positions.push(cartesian.clone())
      }
      positions.push(cartesian)
      // 在三维场景中添加Label
      _labelStyle.text = distance
      floatingPoint = that.viewer.entities.add({
        name: '空间直线距离',
        // position: Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180,cartographic.height),
        position: positions[positions.length - 1],
        point: pointStyle,
        label: _labelStyle
      })
      that.measureIds.push(floatingPoint.id)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    handler.setInputAction(function(movement) {
      handler.destroy() // 关闭事件句柄
      positions.pop() // 最后一个点无效
      that.viewer.entities.remove(floatingPoint)
      that.tooltip.style.display = 'none'
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

    var PolyLinePrimitive = (function() {
      function _(positions) {
        this.options = {
          name: '直线',
          polyline: {
            show: true,
            positions: [],
            material: lineStyle.material,
            width: lineStyle.width
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
        var shape = that.viewer.entities.add(this.options)
        that.measureIds.push(shape.id)
      }
      return _
    })()
  }
  // 贴地距离
  measuerSurfaceLength(handler) {
    var that = this
    that.viewer.scene.globe.depthTestAgainstTerrain = true // 开启地形深度检测
    handler = new Cesium.ScreenSpaceEventHandler(that.viewer.scene._imageryLayerCollection)
    var positions = []
    var poly = null
    var distance = 0
    var cartesian = null
    var floatingPoint
    var labelPt

    handler.setInputAction(function(movement) {
      cartesian = mapUtil.getcartesian2(movement.endPosition, that.viewer)
      // 鼠标移动显示提示
      that.showTooltip(movement)
      if (!Cesium.defined(cartesian)) // 跳出地球时异常
      {
        return
      }
      if (positions.length >= 2) {
        if (!Cesium.defined(poly)) {
          poly = new PolyLinePrimitive(positions)
        } else {
          positions.pop()
          positions.push(cartesian)
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    handler.setInputAction(function(movement) {
      that.tooltip.style.display = 'none'
      cartesian = mapUtil.getcartesian2(movement.position, that.viewer)
      if (!Cesium.defined(cartesian)) // 跳出地球时异常
      {
        return
      }

      if (positions.length === 0) {
        positions.push(cartesian.clone())
      }
      positions.push(cartesian)
      // 记录鼠标单击时的节点位置，异步计算贴地距离
      labelPt = positions[positions.length - 1]
      if (positions.length > 2) {
        getSpaceDistance(positions)
      } else if (positions.length === 2) {
        // 在三维场景中添加Label
        floatingPoint = that.viewer.entities.add({
          name: '空间距离',
          position: labelPt,
          point: pointStyle
        })
        that.measureIds.push(floatingPoint.id)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    handler.setInputAction(function(movement) {
      that.viewer.scene.globe.depthTestAgainstTerrain = false
      handler.destroy() // 关闭事件句柄
      positions.pop() // 最后一个点无效
      that.tooltip.style.display = 'none'

      that.viewer.entities.remove(floatingPoint)
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

    var PolyLinePrimitive = (function() {
      function _(positions) {
        this.options = {
          name: '直线',
          polyline: {
            show: true,
            positions: [],
            material: lineStyle.material,
            width: lineStyle.width,
            clampToGround: true
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
        var addedEntity = that.viewer.entities.add(this.options)
        that.measureIds.push(addedEntity.id)
      }

      return _
    })()

    // 贴地两点距离计算函数
    function getSpaceDistance(positions) {
      // 只计算最后一截，与前面累加
      // 因move和鼠标左击事件，最后两个点坐标重复
      var i = positions.length - 3
      var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i])
      var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1])
      getTerrainDistance(point1cartographic, point2cartographic)
    }

    function getTerrainDistance(point1cartographic, point2cartographic) {
      var geodesic = new Cesium.EllipsoidGeodesic()
      geodesic.setEndPoints(point1cartographic, point2cartographic)
      var s = geodesic.surfaceDistance
      var cartoPts = [point1cartographic]
      for (var jj = 1000; jj < s; jj += 1000) { // 分段采样计算距离
        var cartoPt = geodesic.interpolateUsingSurfaceDistance(jj)
        //                console.log(cartoPt);
        cartoPts.push(cartoPt)
      }
      cartoPts.push(point2cartographic)
      // 返回两点之间的距离
      var promise = Cesium.sampleTerrain(that.viewer.terrainProvider, 8, cartoPts)
      Cesium.when(promise, function(updatedPositions) {
        // positions height have been updated.
        // updatedPositions is just a reference to positions.
        for (var jj = 0; jj < updatedPositions.length - 1; jj++) {
          var geoD = new Cesium.EllipsoidGeodesic()
          geoD.setEndPoints(updatedPositions[jj], updatedPositions[jj + 1])
          var innerS = geoD.surfaceDistance
          innerS = Math.sqrt(Math.pow(innerS, 2) + Math.pow(updatedPositions[jj + 1].height - updatedPositions[jj].height, 2))
          distance += innerS
        }

        // 在三维场景中添加Label
        var textDisance = distance.toFixed(2) + 'm'
        if (distance > 1000) {
          textDisance = (distance / 1000.0).toFixed(2) + 'km'
        }
        labelStyle.text = textDisance
        floatingPoint = that.viewer.entities.add({
          name: '贴地距离',
          position: labelPt,
          point: pointStyle,
          label: labelStyle
        })
        that.measureIds.push(floatingPoint.id)
      })
    }
  }

  // 剖面距离
  measureSectionLength(handler, fn) {
    var cartesian = null
    var floatingPoint
    var positions = []
    var poly = null
    var leftX, leftY,
      rightX, rightY
    var that = this
    that.viewer.scene.globe.depthTestAgainstTerrain = true // 开启地形深度检测
    handler = new Cesium.ScreenSpaceEventHandler(that.viewer.scene._imageryLayerCollection)
    handler.setInputAction(function(movement) {
      cartesian = mapUtil.getcartesian2(movement.endPosition, that.viewer)
      if (!Cesium.defined(cartesian)) // 跳出地球时异常
      {
        return
      }

      if (positions.length >= 2) {
        if (!Cesium.defined(poly)) {
          poly = new PolyLinePrimitive(positions)
        } else {
          positions.pop()
          positions.push(cartesian)
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    handler.setInputAction(function(movement) {
      leftX = movement.position.x
      leftY = movement.position.y

      cartesian = mapUtil.getcartesian2(movement.position, that.viewer)

      if (positions.length === 0) {
        positions.push(cartesian.clone())
      }
      positions.push(cartesian)

      floatingPoint = that.viewer.entities.add({
        position: positions[positions.length - 1],
        point: {
          pixelSize: pointStyle.pixelSize,
          color: pointStyle.color,
          outlineColor: pointStyle.outlineColor,
          outlineWidth: pointStyle.outlineWidth
        }
      })
      that.measureIds.push(floatingPoint.id)

      handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    handler.setInputAction(function(movement) {
      rightX = movement.position.x
      rightY = movement.position.y

      cartesian = mapUtil.getcartesian2(movement.position, that.viewer)

      floatingPoint = that.viewer.entities.add({
        position: positions[positions.length - 1],
        point: {
          pixelSize: pointStyle.pixelSize,
          color: pointStyle.color,
          outlineColor: pointStyle.outlineColor,
          outlineWidth: pointStyle.outlineWidth
        }
      })
      that.measureIds.push(floatingPoint.id)
      handler.destroy() // 关闭事件句柄
      var startPoint = positions[0]
      var endPoint = positions[1]
      // 起止点相关信息
      var scartographic = Cesium.Cartographic.fromCartesian(startPoint)
      var slongitude = Cesium.Math.toDegrees(scartographic.longitude)
      var slatitude = Cesium.Math.toDegrees(scartographic.latitude)

      var ecartographic = Cesium.Cartographic.fromCartesian(endPoint)
      var elongitude = Cesium.Math.toDegrees(ecartographic.longitude)
      var elatitude = Cesium.Math.toDegrees(ecartographic.latitude)

      var pointSum = 15 // 取样点个数
      var addXTT = Cesium.Math.lerp(slongitude, elongitude, 1.0 / pointSum) - slongitude
      var addYTT = Cesium.Math.lerp(slatitude, elatitude, 1.0 / pointSum) - slatitude

      var addX = Cesium.Math.lerp(leftX, rightX, 1.0 / pointSum) - leftX
      var addY = Cesium.Math.lerp(leftY, rightY, 1.0 / pointSum) - leftY

      var heightArr = []

      var dp1, dp2

      for (var i = 0; i < pointSum; i++) {
        var longitude = slongitude + (i + 1) * addXTT
        var latitude = slatitude + (i + 1) * addYTT
        if (i === 0) {
          dp1 = new Cesium.Cartesian3(longitude, latitude, 0)
        } else if (i === 1) {
          dp2 = new Cesium.Cartesian3(longitude, latitude, 0)
        }

        var x = leftX + (i + 1) * addX
        var y = leftY + (i + 1) * addY

        var eventPosition = new Cesium.Cartesian2(x, y)
        var position = mapUtil.getcartesian2(eventPosition, that.viewer)

        if (Cesium.defined(position)) {
          var cartographic = Cesium.Cartographic.fromCartesian(position) // 根据笛卡尔坐标获取到弧度
          heightArr[i] = cartographic.height.toFixed(2)
          console.log(cartographic.height)
        }
      }

      // 计算两个三维坐标之间的距离
      var juli = Math.round(Cesium.Cartesian3.distance(dp1, dp2) * 100000) // dp1、dp2 都是三维坐标系
      var yData = heightArr
      var xData = []

      for (var k = 0; k < pointSum; k++) {
        if (k === 0) {
          xData[k] = 0
        } else {
          xData[k] = xData[k - 1] + juli
        }
      }
      fn(xData, yData)
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

    var PolyLinePrimitive = (function() {
      function _(positions) {
        this.options = {
          name: '直线',
          polyline: {
            show: true,
            positions: [],
            material: Cesium.Color.YELLOW,
            width: lineStyle.width,
            clampToGround: true
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
        var polylineEnt = that.viewer.entities.add(this.options)
        that.measureIds.push(polylineEnt.id)
      }

      return _
    })()
  }

  // 空间面积
  measureAreaSpace(handler) {
    var that = this
    var _labelStyle = _.cloneDeep(labelStyle)
    _labelStyle.disableDepthTestDistance = Number.POSITIVE_INFINITY
    that.viewer.scene.globe.depthTestAgainstTerrain = false // 开启地形深度检测
    // 取消双击事件-追踪该位置
    that.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    // 鼠标事件
    handler = new Cesium.ScreenSpaceEventHandler(that.viewer.scene._imageryLayerCollection)
    var positions = []
    var tempPoints = []
    var polygon = null
    // var tooltip = document.getElementById("toolTip");
    var cartesian = null
    var floatingPoint // 浮动点
    // tooltip.style.display = "block";

    handler.setInputAction(function(movement) {
      // 鼠标移动显示提示
      that.showTooltip(movement)

      cartesian = mapUtil.getcartesian(movement.endPosition, that.viewer)
      // const ray = that.viewer.camera.getPickRay(movement.endPosition)
      // cartesian = that.viewer.scene.globe.pick(ray, that.viewer.scene)
      if (positions.length >= 2) {
        if (!Cesium.defined(polygon)) {
          polygon = new PolygonPrimitive(positions)
        } else {
          positions.pop()
          // cartesian.y += (1 + Math.random());
          positions.push(cartesian)
        }
        // tooltip.innerHTML='<p>'+distance+'米</p>';
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    handler.setInputAction(function(movement) {
      that.tooltip.style.display = 'none'
      cartesian = mapUtil.getcartesian(movement.position, that.viewer)
      // const ray = that.viewer.camera.getPickRay(movement.position)
      // cartesian = that.viewer.scene.globe.pick(ray, that.viewer.scene)
      if (positions.length == 0) {
        positions.push(cartesian.clone())
      }
      // positions.pop();
      positions.push(cartesian)
      // 在三维场景中添加点
      var cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1])
      var longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
      var latitudeString = Cesium.Math.toDegrees(cartographic.latitude)
      var heightString = cartographic.height
      tempPoints.push({
        lon: longitudeString,
        lat: latitudeString,
        hei: heightString
      })
      floatingPoint = that.viewer.entities.add({
        name: '多边形面积',
        position: positions[positions.length - 1],
        point: pointStyle
      })
      that.measureIds.push(floatingPoint.id)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    handler.setInputAction(function(movement) {
      handler.destroy()
      positions.pop()
      that.tooltip.style.display = 'none'
      var textArea = getArea(tempPoints) + 'k㎡'
      _labelStyle.text = textArea
      var point = that.viewer.entities.add({
        name: '多边形面积',
        position: positions[positions.length - 1],
        label: _labelStyle
      })
      that.measureIds.push(point.id)
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

    var radiansPerDegree = Math.PI / 180.0 // 角度转化为弧度(rad)
    var degreesPerRadian = 180.0 / Math.PI // 弧度转化为角度

    // 计算多边形面积
    function getArea(points) {
      var res = 0
      // 拆分三角曲面

      for (var i = 0; i < points.length - 2; i++) {
        var j = (i + 1) % points.length
        var k = (i + 2) % points.length
        var totalAngle = Angle(points[i], points[j], points[k])

        var dis_temp1 = distance(positions[i], positions[j])
        var dis_temp2 = distance(positions[j], positions[k])
        res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle))
        console.log(res)
      }
      return (res / 1000000.0).toFixed(2)
    }

    /* 角度 */
    function Angle(p1, p2, p3) {
      var bearing21 = Bearing(p2, p1)
      var bearing23 = Bearing(p2, p3)
      var angle = bearing21 - bearing23
      if (angle < 0) {
        angle += 360
      }
      return angle
    }
    /* 方向 */
    function Bearing(from, to) {
      var lat1 = from.lat * radiansPerDegree
      var lon1 = from.lon * radiansPerDegree
      var lat2 = to.lat * radiansPerDegree
      var lon2 = to.lon * radiansPerDegree
      var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2))
      if (angle < 0) {
        angle += Math.PI * 2.0
      }
      angle = angle * degreesPerRadian // 角度
      return angle
    }

    var PolygonPrimitive = (function() {
      function _(positions) {
        this.options = {
          name: '多边形',
          polygon: {
            hierarchy: [],
            material: polygonStyle.material,
            outlineColor: polygonStyle.outlineColor,
            outlineWidth: polygonStyle.outlineWidth,
            outline: true,
            perPositionHeight: true
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

        var point = that.viewer.entities.add(this.options)
        that.measureIds.push(point.id)
      }

      return _
    })()

    function distance(point1, point2) {
      var point1cartographic = Cesium.Cartographic.fromCartesian(point1)
      var point2cartographic = Cesium.Cartographic.fromCartesian(point2)
      /** 根据经纬度计算出距离**/
      var geodesic = new Cesium.EllipsoidGeodesic()
      geodesic.setEndPoints(point1cartographic, point2cartographic)
      var s = geodesic.surfaceDistance
      // console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
      // 返回两点之间的距离
      s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2))
      return s
    }
  }
  // 测量贴地面积
  measureSurfaceAreaSpace(handler) {
    var that = this
    var waterEntity
    // 取消双击事件-追踪该位置
    that.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    // 鼠标事件
    handler = new Cesium.ScreenSpaceEventHandler(that.viewer.scene._imageryLayerCollection)
    const positions = []
    const tempPoints = []
    var polygon = null
    let cartesian = null
    var floatingPoint // 浮动点
    handler.setInputAction(function(movement) {
      cartesian = mapUtil.getcartesian(movement.endPosition, that.viewer)
      if (positions.length >= 2) {
        if (!Cesium.defined(polygon)) {
          polygon = new PolygonPrimitive(positions)
        } else {
          positions.pop()
          // cartesian.y += (1 + Math.random());
          positions.push(cartesian)
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    handler.setInputAction(function(movement) {
      cartesian = mapUtil.getcartesian(movement.position, that.viewer)
      if (positions.length == 0) {
        positions.push(cartesian.clone())
      }
      // positions.pop();
      positions.push(cartesian)
      // 在三维场景中添加点
      const cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1])
      const longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
      const latitudeString = Cesium.Math.toDegrees(cartographic.latitude)
      const heightString = cartographic.height
      tempPoints.push({
        lon: longitudeString,
        lat: latitudeString,
        hei: heightString
      })
      floatingPoint = that.viewer.entities.add({
        name: '多边形面积',
        position: positions[positions.length - 1],
        point: pointStyle
      })
      that.measureIds.push(floatingPoint.id)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    handler.setInputAction(function(movement) {
      handler.destroy()
      positions.pop()
      const textArea = getArea(tempPoints) + 'k㎡'
      labelStyle.text = textArea
      // 面积标签
      var point = that.viewer.entities.add({
        name: '多边形面积',
        position: positions[positions.length - 1],
        label: labelStyle
      })
      that.measureIds.push(point.id)
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

    const radiansPerDegree = Math.PI / 180.0 // 角度转化为弧度(rad)
    const degreesPerRadian = 180.0 / Math.PI // 弧度转化为角度

    // 计算多边形面积
    function getArea(points) {
      let res = 0
      // 拆分三角曲面

      for (let i = 0; i < points.length - 2; i++) {
        const j = (i + 1) % points.length
        const k = (i + 2) % points.length
        const totalAngle = Angle(points[i], points[j], points[k])

        const dis_temp1 = distance(positions[i], positions[j])
        const dis_temp2 = distance(positions[j], positions[k])
        res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle))
        console.log(res)
      }

      return (res / 1000000.0).toFixed(4)
    }

    /* 角度*/
    function Angle(p1, p2, p3) {
      const bearing21 = Bearing(p2, p1)
      const bearing23 = Bearing(p2, p3)
      let angle = bearing21 - bearing23
      if (angle < 0) {
        angle += 360
      }
      return angle
    }
    /* 方向*/
    function Bearing(from, to) {
      const lat1 = from.lat * radiansPerDegree
      const lon1 = from.lon * radiansPerDegree
      const lat2 = to.lat * radiansPerDegree
      const lon2 = to.lon * radiansPerDegree
      let angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(
        lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2))
      if (angle < 0) {
        angle += Math.PI * 2.0
      }
      angle = angle * degreesPerRadian // 角度
      return angle
    }

    /* 多边形*/
    const PolygonPrimitive = (function() {
      function _(positions) {
        this.options = {
          name: '多边形',
          polygon: {
            hierarchy: new Cesium.PolygonHierarchy([]),
            // perPositionHeight: true,
            material: polygonStyle.material,
            // heightReference:20000
            outlineColor: polygonStyle.outlineColor,
            outlineWidth: polygonStyle.outlineWidth,
            outline: true
          }
        }
        this.hierarchy = new Cesium.PolygonHierarchy(positions)
        this._init()
      }
      _.prototype._init = function() {
        const _self = this
        const _update = function() {
          return _self.hierarchy
        }
        // 实时更新polygon.hierarchy
        this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update, false)
        waterEntity = that.viewer.entities.add(this.options)
        that.measureIds.push(waterEntity.id)
      }

      return _
    })()

    // 计算距离
    function distance(point1, point2) {
      const point1cartographic = Cesium.Cartographic.fromCartesian(point1)
      const point2cartographic = Cesium.Cartographic.fromCartesian(point2)
      /** 根据经纬度计算出距离**/
      const geodesic = new Cesium.EllipsoidGeodesic()
      geodesic.setEndPoints(point1cartographic, point2cartographic)
      let s = geodesic.surfaceDistance
      // console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
      // 返回两点之间的距离
      s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2))
      return s
    }
  }
  // 三角测量
  measureTriangle() {
    const TriangleMeasureLine = function(poly) {
      this.options = {
        name: poly.name,
        polyline: {
          show: true,
          positions: [],
          material: Cesium.Color.GOLD,
          width: 2
        },
        label: {
          font: '18px sans-serif',
          fillColor: Cesium.Color.GOLD,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: poly.label.offset
        }
      }
      this.positions = poly.positions
      this.label = poly.label
      // 实时更新polygon.hierarchy
      var _self = this
      var _update = function() {
        return _self.positions
      }
      var _update_label = function() {
        if (_self.positions.length === 1) {
          return false
        }
        return _self.positions[1]
      }
      var _text = function() {
        if (typeof _self.label.fn === 'function') { // fn 转换函数 scaler 换算  unit 单位
          var text_temp = _self.label.fn(_self.positions)

          if (typeof text_temp === 'number') {
            if (text_temp > 1000) {
              text_temp = (text_temp / 1000.0).toFixed(2) + 'km'
            } else {
              text_temp = text_temp.toFixed(2) + 'm'
            }
          } else {
            text_temp = '0m'
          }
          return `${poly.name}:${text_temp}`
        }
      }
      this.options.polyline.positions = new Cesium.CallbackProperty(_update, false)
      this.options.position = new Cesium.CallbackProperty(_update_label, false)
      this.options.label.text = new Cesium.CallbackProperty(_text, false)
    }
    // 定义初始化数据
    this.triangleSpace = {
      distance: 0,
      lineObj: [],
      entity: [],
      position1: [],
      position2: [],
      position3: [],
      getHeight(positions) {
        const cartographic = Cesium.Cartographic.fromCartesian(positions[0])
        const cartographic1 = Cesium.Cartographic.fromCartesian(positions[1])
        const height_temp = cartographic1.height - cartographic.height
        return height_temp
      },
      point_conf(positions) {
        const cartographic = Cesium.Cartographic.fromCartesian(positions[0])
        const cartographic1 = Cesium.Cartographic.fromCartesian(positions[1])
        const point_temp = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude), cartographic1.height)
        return point_temp
      },
      getDistance(positions) {
        if (positions[1] === undefined) {
          return false
        }
        const point1cartographic = Cesium.Cartographic.fromCartesian(positions[1])
        const point2cartographic = Cesium.Cartographic.fromCartesian(positions[0])
        /** 根据经纬度计算出距离**/
        const geodesic = new Cesium.EllipsoidGeodesic()
        geodesic.setEndPoints(point1cartographic, point2cartographic)
        let s = geodesic.surfaceDistance
        // 返回两点之间的距离
        s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2))
        return s
      },
      createLine(_self) {
        _self.triangleSpace.lineObj[0] = new TriangleMeasureLine({
          name: '直线',
          positions: _self.triangleSpace.position1,
          label: {
            fn: _self.triangleSpace.getDistance,
            offset: new Cesium.Cartesian2(-20, 50)
          }
        })
        _self.triangleSpace.lineObj[1] = new TriangleMeasureLine({
          name: '高度',
          positions: _self.triangleSpace.position2,
          label: {
            fn: _self.triangleSpace.getHeight,
            offset: new Cesium.Cartesian2(20, -20)
          }
        })
        _self.triangleSpace.lineObj[2] = new TriangleMeasureLine({
          name: '水平线',
          positions: _self.triangleSpace.position3,
          label: {
            fn: _self.triangleSpace.getDistance,
            offset: new Cesium.Cartesian2(20, -50)
          }
        })
        var shape = _self.viewer.entities.add(_self.triangleSpace.lineObj[0].options)
        _self.measureIds.push(shape.id)
        var shape1 = _self.viewer.entities.add(_self.triangleSpace.lineObj[1].options)
        _self.measureIds.push(shape1.id)
        var shape2 = _self.viewer.entities.add(_self.triangleSpace.lineObj[2].options)
        _self.measureIds.push(shape2.id)
      }
    }
    const _self = this
    _self.viewer.scene.screenSpaceCameraController.enableRotate = false // 锁定相机
    _self.handler = new Cesium.ScreenSpaceEventHandler(_self.viewer.scene.canvas)

    /**
     * 点击
     */
    _self.handler.setInputAction(function(movement) {
      if (!movement.position) {
        return false
      }
      if (_self.triangleSpace.position1.length === 0) { // 开始
        const cartesian = mapUtil.getcartesian(movement.position, _self.viewer)
        if (!Cesium.defined(cartesian)) {
          return
        }
        _self.triangleSpace.position1.push(cartesian.clone())
        _self.triangleSpace.position1.push(cartesian.clone())
        _self.triangleSpace.position2.push(_self.triangleSpace.position1[0].clone())
        _self.triangleSpace.position2.push(_self.triangleSpace.position1[0].clone())
        // 创建点
        const pt = _self.viewer.entities.add({
          name: '三角量测',
          position: cartesian,
          point: pointStyle
        })
        _self.measureIds.push(pt.id)
      } else { // 第二次点击取消
        _self.handler.destroy() // 关闭事件句柄
        _self.tooltip.style.display = 'none'
        _self.viewer.scene.screenSpaceCameraController.enableRotate = true // 解锁相机

        const cartesian = mapUtil.getcartesian(movement.position, _self.viewer)
        if (!Cesium.defined(cartesian)) {
          return
        }
        // 创建点
        _self.triangleSpace.position1.pop()
        _self.triangleSpace.position1.push(cartesian.clone())
        const tempPoints = _self.triangleSpace.point_conf(_self.triangleSpace.position1)
        // line 2 直刷新第二个点
        _self.triangleSpace.position2.pop()
        _self.triangleSpace.position2.push(tempPoints.clone())
        // line 3 一直刷新
        _self.triangleSpace.position3.pop()
        _self.triangleSpace.position3.pop()
        _self.triangleSpace.position3.push(tempPoints.clone())
        _self.triangleSpace.position3.push(_self.triangleSpace.position1[1].clone())
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    /**
     * 移动
     */
    _self.handler.setInputAction(function(movement) {
      if (_self.triangleSpace.position1.length === 0) {
        _self.showTooltip(movement, '左键开始')
      } else {
        if (movement.endPosition === undefined) {
          return false
        }
        try {
          const cartesian = mapUtil.getcartesian(movement.endPosition, _self.viewer)
          if (!cartesian) return false
          if (!Cesium.defined(_self.triangleSpace.lineObj[0])) { // 画
            _self.triangleSpace.createLine(_self)
          } else {
            _self.triangleSpace.position1.pop()
            _self.triangleSpace.position1.push(cartesian.clone())

            const tempPoints = _self.triangleSpace.point_conf(_self.triangleSpace.position1)
            // line 1
            _self.triangleSpace.position2.pop()
            _self.triangleSpace.position2.push(tempPoints.clone())
            // line 2
            _self.triangleSpace.position3.pop()
            _self.triangleSpace.position3.pop()
            _self.triangleSpace.position3.push(tempPoints.clone())
            _self.triangleSpace.position3.push(_self.triangleSpace.position1[1].clone())
          }
          _self.showTooltip(movement, '再次点击结束!')
        } catch (error) {
          console.log(error)
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  }

  clearAllMarks() {
    // 清除绘制的数据
    for (var i = 0; i < this.measureIds.length; i++) {
      this.viewer.entities.removeById(this.measureIds[i])
    }
    this.measureIds.length = 0
  }
}
