import * as mapUtil from '@/components/CesiumMap/Utils.js'
export default class SpatialTools {
  constructor(opts) {
    this.viewer = opts.map.viewer
    this.spatialIds = []
    this.submergeTimer = null
    this.isTerrain = false
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

  // 菜单关闭
  spatialAnalysisClose() {
    this.clearEntity()
    // 关闭地形
    this.viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider({})
    this.isTerrain = false
  }
  // 切换分析菜单清除相关entity,关闭深度检测，加载地形
  clearEntity() {
    for (var i = 0; i < this.spatialIds.length; i++) {
      this.viewer.entities.removeById(this.spatialIds[i])
    }
    // 清除淹没分析相关循环
    if (this.submergeTimer) {
      clearTimeout(this.submergeTimer)
    }
    // 关闭深度检测,设置延迟，方式entity未删完延迟
    setTimeout(function() {
      this.viewer.scene.globe.depthTestAgainstTerrain = false
    }, 500)
  }

  /** ************************************淹没分析*********************************/
  SubmergeAnalysis(message) {
    this.clearEntity()
    // 开启地形,默认值为EllipsoidTerrainProvider
    if (!this.isTerrain) {
      this.viewer.terrainProvider = Cesium.createWorldTerrain({
        // requestWaterMask: true,
        // // required for terrain lighting
        // requestVertexNormals: true
      })
      this.isTerrain = true
      message.info('正在开启地形，请稍后！')
    }
    var that = this
    that.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(102.5, 30.0, 50000),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-35.0),
        roll: 0.0
      }
    })
    // 运行
    this.DrawPolygonAnalysis(that.viewer, '淹没分析', callback)
    // 双击分析回调
    function callback(waterEntity, maxH, interval, speed) {
      if (waterEntity) {
        that.viewer.scene.globe.depthTestAgainstTerrain = true
        waterEntity.polygon.heightReference = 'CLAMP_TO_GROUND'
        waterEntity.polygon.material = require('@/assets/tool/water.png')
        let h = 0
        waterEntity.polygon.extrudedHeight = 0 // 需要提前设置 不然会全部出现
        that.submergeTimer = setInterval(function() {
          h = h + speed
          if (h >= maxH) {
            h = maxH // 给个最大值
            clearTimeout(that.submergeTimer)
          }
          waterEntity.polygon.extrudedHeight = h
        }, interval)
      }
    }
  }
  /** ************************************方量分析*********************************/
  VolumnAnalysis(message) {
    this.clearEntity()
    // 开启地形,默认值为EllipsoidTerrainProvider
    if (!this.isTerrain) {
      this.viewer.terrainProvider = Cesium.createWorldTerrain({
        // requestWaterMask: true,
        // // required for terrain lighting
        // requestVertexNormals: true
      })
      this.isTerrain = true
      message.info('正在开启地形，请稍后！')
    }
    var that = this
    // 运行
    this.DrawPolygonAnalysis(that.viewer, '方量分析', callback, message)

    function callback(points, pointsOA) {
      var minHeight = 15000
      var lonlats = []
      for (var i = 0; i < points.length; i++) {
        var cartographic = Cesium.Cartographic.fromCartesian(points[i])
        var height = that.viewer.scene.globe.getHeight(cartographic)
        if (minHeight > height) {
          minHeight = height
        }
        // 经纬度值
        var lng = Cesium.Math.toDegrees(cartographic.longitude)
        var lat = Cesium.Math.toDegrees(cartographic.latitude)
        lonlats.push(lng, lat)
      }
      // 设置网格粒度
      var granularity = Math.PI / Math.pow(2, 11)
      granularity = granularity / (64)
      // 创建多边形平面几何体
      var polygonGeometry = new Cesium.PolygonGeometry.fromPositions({
        positions: points,
        vertexFormat: Cesium.PerInstanceColorAppearance.FLAT_VERTEX_FORMAT,
        granularity: granularity
      })
      // 创建多边形平面几何体
      var geom = new Cesium.PolygonGeometry.createGeometry(polygonGeometry)
      var totalVolume = 0
      var maxHeight = 0
      var i0, i1, i2
      var height1, height2, height3
      var p1, p2, p3
      var cartesian
      var cartographic
      var bottomArea
      // 循环计算网格的节点, indices顶点索引数据，用于确定几何中的基元
      for (var i = 0; i < geom.indices.length; i += 3) {
        i0 = geom.indices[i]
        i1 = geom.indices[i + 1]
        i2 = geom.indices[i + 2]
        // 获取几何体三角面第一个面点
        cartesian = new Cesium.Cartesian3(geom.attributes.position.values[i0 * 3],
          geom.attributes.position.values[i0 * 3 + 1],
          geom.attributes.position.values[i0 * 3 + 2])
        cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        height1 = that.viewer.scene.globe.getHeight(cartographic)
        p1 = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0)
        if (maxHeight < height1) {
          maxHeight = height1
        }
        // 获取几何体三角面第二个面点
        cartesian = new Cesium.Cartesian3(geom.attributes.position.values[i1 * 3],
          geom.attributes.position.values[i1 * 3 + 1],
          geom.attributes.position.values[i1 * 3 + 2])
        cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        // 从网格的节点计算地面高度
        height2 = that.viewer.scene.globe.getHeight(cartographic)
        p2 = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0)
        if (maxHeight < height2) {
          maxHeight = height2
        }
        // 获取几何体三角面第三个面点
        cartesian = new Cesium.Cartesian3(geom.attributes.position.values[i2 * 3],
          geom.attributes.position.values[i2 * 3 + 1],
          geom.attributes.position.values[i2 * 3 + 2])
        cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        height3 = that.viewer.scene.globe.getHeight(cartographic)
        p3 = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0)
        if (maxHeight < height3) {
          maxHeight = height3
        }
        // 计算三角面的面积
        var pointsLonLat = [mapUtil.Cartesian3_to_WGS84(p1).lnglathei, mapUtil.Cartesian3_to_WGS84(p2).lnglathei, mapUtil.Cartesian3_to_WGS84(p3).lnglathei]
        var positions = [p1, p2, p3]
        bottomArea = mapUtil.getArea(pointsLonLat, positions)
        // bottomArea = computeAreaOfTriangle(p1, p2, p3)
        // 计算体积
        totalVolume = totalVolume + bottomArea * (height1 - minHeight + height2 - minHeight + height3 - minHeight) / 3
      }
      // 计算测量图形的中心点
      var pointsOAArray = []
      for (var i = 0; i < pointsOA.length; i++) {
        pointsOAArray.push([pointsOA[i].lon, pointsOA[i].lat])
      }
      var centroid = mapUtil.getPointsCenter(pointsOAArray)
      // 创建体积文字
      var entity = that.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(centroid[0], centroid[1], maxHeight + 30),
        label: {
          text: '' + totalVolume.toFixed(1) + '立方米',
          font: '12pt Microsoft YaHei',
          showBackground: true,
          backgroundColor: Cesium.Color.RED.withAlpha(0.5)
        }
      })
      that.spatialIds.push(entity.id)
      // this.wallHeight = maxHeight
      // 创建体积墙
      that.createWall(lonlats, maxHeight)
    }
  }
  createWall(lonlats, maxHeight) {
    this.viewer.scene.globe.depthTestAgainstTerrain = true
    var entity = this.viewer.entities.add({
      name: 'Wyoming',
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray(lonlats),
        material: Cesium.Color.RED.withAlpha(0.5),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        perPositionHeight: true,
        height: 0,
        extrudedHeight: maxHeight
      }
    })
    this.spatialIds.push(entity.id)
  }
  /** ************************************坡度分析*********************************/
  slopAnalysis(message) {
    this.clearEntity()
    // 开启地形,默认值为EllipsoidTerrainProvider
    if (!this.isTerrain) {
      this.viewer.terrainProvider = Cesium.createWorldTerrain({
        // requestWaterMask: true,
        // // required for terrain lighting
        // requestVertexNormals: true
      })
      this.isTerrain = true
      message.info('正在开启地形，请稍后！')
    }
    var that = this
    // 运行
    this.DrawPolygonAnalysis(that.viewer, '坡度分析', callback, message)
    // 双击分析回调
    function callback(startx1, starty1, startz1, startx2, starty2, startz2, startx3, starty3, startz3, startx4, starty4, startz4) {
      // 高度z全为0
      var count = 10
      var slopelineposition = []
      var hireacys = []
      for (var j = 0; j < 10; j++) {
        for (var i = 0; i < 10; i++) {
          var hireacy = []
          // 分割成小面，切分经纬度
          hireacy.push(new Cesium.Cartesian3(startx1 + (startx2 - startx1) / count * i + (startx4 + (startx3 - startx4) / count * (i) - startx1 - (startx2 - startx1) / count * i) / count * j,
            starty1 + (starty2 - starty1) / count * i + (starty4 + (starty3 - starty4) / count * (i) - starty1 - (starty2 - starty1) / count * i) / count * j,
            startz1 + (startz2 - startz1) / count * i + (startz4 + (startz3 - startz4) / count * (i) - startz1 - (startz2 - startz1) / count * i) / count * j))
          hireacy.push(new Cesium.Cartesian3(startx1 + (startx2 - startx1) / count * (i + 1) + (startx4 + (startx3 - startx4) / count * (i + 1) - startx1 - (startx2 - startx1) / count * (i + 1)) / count * j,
            starty1 + (starty2 - starty1) / count * (i + 1) + (starty4 + (starty3 - starty4) / count * (i + 1) - starty1 - (starty2 - starty1) / count * (i + 1)) / count * j,
            startz1 + (startz2 - startz1) / count * (i + 1) + (startz4 + (startz3 - startz4) / count * (i + 1) - startz1 - (startz2 - startz1) / count * (i + 1)) / count * j))
          hireacy.push(new Cesium.Cartesian3(startx4 + (startx3 - startx4) / count * (i + 1) - (startx4 + (startx3 - startx4) / count * (i + 1) - startx1 - (startx2 - startx1) / count * (i + 1)) / count * (count - 1 - j),
            starty4 + (starty3 - starty4) / count * (i + 1) - (starty4 + (starty3 - starty4) / count * (i + 1) - starty1 - (starty2 - starty1) / count * (i + 1)) / count * (count - 1 - j),
            startz4 + (startz3 - startz4) / count * (i + 1) - (startz4 + (startz3 - startz4) / count * (i + 1) - startz1 - (startz2 - startz1) / count * (i + 1)) / count * (count - 1 - j)))
          hireacy.push(new Cesium.Cartesian3(startx4 + (startx3 - startx4) / count * i - (startx4 + (startx3 - startx4) / count * (i) - startx1 - (startx2 - startx1) / count * i) / count * (count - 1 - j),
            starty4 + (starty3 - starty4) / count * i - (starty4 + (starty3 - starty4) / count * (i) - starty1 - (starty2 - starty1) / count * i) / count * (count - 1 - j),
            startz4 + (startz3 - startz4) / count * i - (startz4 + (startz3 - startz4) / count * (i) - startz1 - (startz2 - startz1) / count * i) / count * (count - 1 - j)))
          hireacys.push(hireacy)
          // 取出面的8个点坐标，拿点坐标去求高度值
          slopelineposition.push(Cesium.Cartographic.fromDegrees(hireacy[0].x, hireacy[0].y))
          slopelineposition.push(Cesium.Cartographic.fromDegrees((hireacy[0].x + hireacy[1].x) / 2, (hireacy[0].y + hireacy[1].y) / 2))
          slopelineposition.push(Cesium.Cartographic.fromDegrees(hireacy[1].x, hireacy[1].y))
          slopelineposition.push(Cesium.Cartographic.fromDegrees((hireacy[1].x + hireacy[2].x) / 2, (hireacy[1].y + hireacy[2].y) / 2))
          slopelineposition.push(Cesium.Cartographic.fromDegrees(hireacy[2].x, hireacy[2].y))
          slopelineposition.push(Cesium.Cartographic.fromDegrees((hireacy[2].x + hireacy[3].x) / 2, (hireacy[2].y + hireacy[3].y) / 2))
          slopelineposition.push(Cesium.Cartographic.fromDegrees(hireacy[3].x, hireacy[3].y))
          slopelineposition.push(Cesium.Cartographic.fromDegrees((hireacy[3].x + hireacy[0].x) / 2, (hireacy[3].y + hireacy[0].y) / 2))
        }
      }
      var promise = Cesium.sampleTerrainMostDetailed(that.viewer.terrainProvider, slopelineposition)
      Cesium.when(promise,
        function(updatedPositions) {
          // 拿到所有的高度数据
          var heighmm = []
          var m = 0
          // 计算坡度比的次数
          var countcolor1 = 0
          var countcolor2 = 0
          var countcolor3 = 0
          var countcolor4 = 0
          var countcolor5 = 0
          var countcolor6 = 0
          var countcolor7 = 0
          for (var k = 0; k < updatedPositions.length / 8; k++) {
            // 第一个点与第五个点的坡度
            var slope1 = (updatedPositions[m].height - updatedPositions[m + 4].height) / (Cesium.Cartesian3.distance(
              Cesium.Cartesian3.fromDegrees(updatedPositions[m].latitude, updatedPositions[m].longitude, updatedPositions[m].height),
              Cesium.Cartesian3.fromDegrees(updatedPositions[m + 4].latitude, updatedPositions[m + 4].longitude, updatedPositions[m + 4].height)))
            // 第二个点与第六个点的坡度
            var slope2 = (updatedPositions[m + 1].height - updatedPositions[m + 5].height) / (Cesium.Cartesian3.distance(
              Cesium.Cartesian3.fromDegrees(updatedPositions[m + 1].latitude, updatedPositions[m + 1].longitude, updatedPositions[m + 1].height),
              Cesium.Cartesian3.fromDegrees(updatedPositions[m + 5].latitude, updatedPositions[m + 5].longitude, updatedPositions[m + 5].height)))
            // 第三个点与第七个点的坡度
            var slope3 = (updatedPositions[m + 2].height - updatedPositions[m + 6].height) / (Cesium.Cartesian3.distance(
              Cesium.Cartesian3.fromDegrees(updatedPositions[m + 2].latitude, updatedPositions[m + 2].longitude, updatedPositions[m + 2].height),
              Cesium.Cartesian3.fromDegrees(updatedPositions[m + 6].latitude, updatedPositions[m + 6].longitude, updatedPositions[m + 6].height)))
            // 第四个点与第八个点的坡度
            var slope4 = (updatedPositions[m + 3].height - updatedPositions[m + 7].height) / (Cesium.Cartesian3.distance(
              Cesium.Cartesian3.fromDegrees(updatedPositions[m + 3].latitude, updatedPositions[m + 3].longitude, updatedPositions[m + 3].height),
              Cesium.Cartesian3.fromDegrees(updatedPositions[m + 7].latitude, updatedPositions[m + 7].longitude, updatedPositions[m + 7].height)))
            // console.log("slope1:"+slope1+";slope2:"+slope2+";slope3:"+slope3+";slope4:"+slope4);
            var arrposition = [Math.abs(slope1), Math.abs(slope2), Math.abs(slope3), Math.abs(slope4)] // 取绝对值
            arrposition.sort()
            var slope = arrposition[3] // 拿到最大的坡度值
            var lineposition = [] // 画方向线的坐标
            if (slope === Math.abs(slope1)) {
              if (slope1 > 0) {
                lineposition.push(Cesium.Math.toDegrees(updatedPositions[m].longitude), Cesium.Math.toDegrees(updatedPositions[m].latitude),
                  Cesium.Math.toDegrees(updatedPositions[m + 4].longitude), Cesium.Math.toDegrees(updatedPositions[m + 4].latitude))
              } else {
                lineposition.push(
                  Cesium.Math.toDegrees(updatedPositions[m + 4].longitude), Cesium.Math.toDegrees(updatedPositions[m + 4].latitude),
                  Cesium.Math.toDegrees(updatedPositions[m].longitude), Cesium.Math.toDegrees(updatedPositions[m].latitude))
              }
            } else if (slope === Math.abs(slope2)) {
              if (slope2 > 0) {
                lineposition.push(Cesium.Math.toDegrees(updatedPositions[m + 1].longitude), Cesium.Math.toDegrees(updatedPositions[m + 1].latitude),
                  Cesium.Math.toDegrees(updatedPositions[m + 5].longitude), Cesium.Math.toDegrees(updatedPositions[m + 5].latitude))
              } else {
                lineposition.push(
                  Cesium.Math.toDegrees(updatedPositions[m + 5].longitude), Cesium.Math.toDegrees(updatedPositions[m + 5].latitude),
                  Cesium.Math.toDegrees(updatedPositions[m + 1].longitude), Cesium.Math.toDegrees(updatedPositions[m + 1].latitude))
              }
            } else if (slope === Math.abs(slope3)) {
              if (slope3 > 0) {
                lineposition.push(Cesium.Math.toDegrees(updatedPositions[m + 2].longitude), Cesium.Math.toDegrees(updatedPositions[m + 2].latitude),
                  Cesium.Math.toDegrees(updatedPositions[m + 6].longitude), Cesium.Math.toDegrees(updatedPositions[m + 6].latitude))
              } else {
                lineposition.push(
                  Cesium.Math.toDegrees(updatedPositions[m + 6].longitude), Cesium.Math.toDegrees(updatedPositions[m + 6].latitude),
                  Cesium.Math.toDegrees(updatedPositions[m + 2].longitude), Cesium.Math.toDegrees(updatedPositions[m + 2].latitude))
              }
            } else if (slope === Math.abs(slope4)) {
              if (slope4 > 0) {
                lineposition.push(Cesium.Math.toDegrees(updatedPositions[m + 3].longitude), Cesium.Math.toDegrees(updatedPositions[m + 3].latitude),
                  Cesium.Math.toDegrees(updatedPositions[m + 7].longitude), Cesium.Math.toDegrees(updatedPositions[m + 7].latitude))
              } else {
                lineposition.push(
                  Cesium.Math.toDegrees(updatedPositions[m + 7].longitude), Cesium.Math.toDegrees(updatedPositions[m + 7].latitude),
                  Cesium.Math.toDegrees(updatedPositions[m + 3].longitude), Cesium.Math.toDegrees(updatedPositions[m + 3].latitude))
              }
            }
            slope = (Math.abs(slope1) + Math.abs(slope2) + Math.abs(slope3) + Math.abs(slope4)) / 4 // 四个坡度值大小有的差值特别大，这里取的平均值用来配置颜色
            // console.log(slope);
            var slopecolor
            if (slope >= 0 && slope < 0.29) {
              slopecolor = '#ff9090'
              countcolor1++
            } else if (slope >= 0.29 && slope < 0.5) {
              slopecolor = '#ff8080'
              countcolor2++
            } else if (slope >= 0.5 && slope < Math.sqrt(2) / 2) {
              slopecolor = '#ff7070'
              countcolor3++
            } else if (Math.sqrt(2) / 2 <= slope && slope < 0.87) {
              slopecolor = '#ff6060'
              countcolor4++
            } else if (slope >= 0.87 && slope < 0.91) {
              slopecolor = '#ff5050'
              countcolor5++
            } else if (slope >= 0.91 && slope < 0.95) {
              slopecolor = '#ff4040'
              countcolor6++
            } else {
              slopecolor = '#ff3030'
              countcolor7++
            }
            var south = Cesium.Math.toDegrees(updatedPositions[m].latitude)
            var north = Cesium.Math.toDegrees(updatedPositions[m + 4].latitude)

            var entity = that.viewer.entities.add({
              type: 'drawSloperectange',
              rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(
                  Cesium.Math.toDegrees(updatedPositions[m].longitude), north > south ? south : north,
                  Cesium.Math.toDegrees(updatedPositions[m + 4].longitude), north > south ? north : south),
                material: Cesium.Color.fromCssColorString(slopecolor)

              },
              polyline: {
                clampToGround: true,
                positions: Cesium.Cartesian3.fromDegreesArray(lineposition),
                material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.fromCssColorString('#ff9090')), // Cesium.Color.BLUE.withAlpha(0.5) ,
                width: 8,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, updatedPositions[m + 4].height + 4500)
              }
            })
            that.spatialIds.push(entity.id)
            m += 8
          }
          // var contents = "<div class='slope_layer'><div> <div style='height:19px;background-color:#ff9090; width: 64px;float: left;'> </div><span >" + (countcolor1 / (updatedPositions.length / 8) * 100).toFixed(2) + '% (<0.29)</span></div>'
          // contents += " <div  style='clear: both;'><div style='height:19px;background-color:#ff8080 ; width: 64px;float: left;'></div><span >  " + (countcolor2 / (updatedPositions.length / 8) * 100).toFixed(2) + '%(<0.5)</span></div>'
          // contents += "<div   style='clear: both;'><div  style='height:19px;background-color:#ff7070;width: 64px;float: left;'> </div><span >" + (countcolor3 / (updatedPositions.length / 8) * 100).toFixed(2) + '%(<0.7)</span></div>'
          // contents += " <div  style='clear: both;'><div style='height:19px;background-color:#ff6060;width: 64px;float: left;'> </div><span >" + (countcolor4 / (updatedPositions.length / 8) * 100).toFixed(2) + '%(<0.87)</span></div>'
          // contents += " <div  style='clear: both;'><div style='height:19px;background-color:#ff5050;width: 64px;float: left;'> </div><span > " + (countcolor5 / (updatedPositions.length / 8) * 100).toFixed(2) + '%(<0.91)</span></div>'
          // contents += " <div  style='clear: both;'><div style='height:19px;background-color:#ff4040;width: 64px;float: left;'> </div><span >" + (countcolor6 / (updatedPositions.length / 8) * 100).toFixed(2) + '%(<0.95)</span></div>'
          // contents += " <div  style='clear: both;'><div style='height:19px;background-color:#ff3030;width: 64px;float: left;'> </div><span > " + (countcolor7 / (updatedPositions.length / 8) * 100).toFixed(2) + '%(<1)</span></div></div>'
          // layer.closeAll()

          // layer.open({
          //   type: 1,
          //   offset: ['500px', '1200px'],
          //   area: ['260px', '179px'],
          //   title: '坡度分析信息',
          //   content: contents,
          //   btnAlign: 'c', // 按钮居中
          //   shade: 0, // 不显示遮罩
          //   cancel: function (index) {
          //     layer.close(index)
          //   }
          // })
        })
    }
  }

  // 通用画贴地面
  DrawPolygonAnalysis(viewer, analysisName, callback, message) {
    var that = this
    let waterEntity
    var handler
    // 取消双击事件-追踪该位置
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    // 鼠标事件
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection)
    const positions = []
    const tempPoints = []
    let polygon = null
    let cartesian = null
    let floatingPoint // 浮动点
    handler.setInputAction(function(movement) {
      that.showTooltip(movement)
      // cartesian = viewer.scene.pickPosition(movement.endPosition);
      const ray = viewer.camera.getPickRay(movement.endPosition)
      cartesian = viewer.scene.globe.pick(ray, viewer.scene)
      // cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
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
      that.tooltip.style.display = 'none'
      // cartesian = viewer.scene.pickPosition(movement.position);
      const ray = viewer.camera.getPickRay(movement.position)
      cartesian = viewer.scene.globe.pick(ray, viewer.scene)
      // cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
      if (positions.length === 0) {
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
      floatingPoint = viewer.entities.add({
        name: '多边形面积',
        position: positions[positions.length - 1],
        point: {
          pixelSize: 10,
          color: new Cesium.Color.fromCssColorString('rgb(255, 204, 51)'),
          outlineColor: new Cesium.Color.fromCssColorString('rgb(255, 204, 51)'),
          outlineWidth: 1,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
      })
      that.spatialIds.push(floatingPoint.id)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    handler.setInputAction(function(movement) {
      handler.destroy()
      positions.pop()
      // 开始进入淹没分析
      if (analysisName === '淹没分析') {
        callback(waterEntity, 500, 10, 1) // maxH 设置为2000;最大淹没海拔 每10毫秒前进1海拔;
      } else if (analysisName === '坡度分析') {
        tempPoints.pop()
        if (tempPoints.length < 4) {
          message.info('正在开启地形，请稍后！')
        } else {
          callback(tempPoints[0].lon, tempPoints[0].lat, tempPoints[0].hei, tempPoints[1].lon, tempPoints[1].lat, tempPoints[1].hei, tempPoints[2].lon, tempPoints[2].lat, tempPoints[2].hei, tempPoints[3].lon, tempPoints[3].lat, tempPoints[3].hei) // maxH 设置为2000;最大淹没海拔 每10毫秒前进1海拔;
        }
      } else if (analysisName === '方量分析') {
        callback(positions, tempPoints)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    /* 多边形*/
    const PolygonPrimitive = (function() {
      function _(positions) {
        this.options = {
          name: '多边形',
          polygon: {
            hierarchy: new Cesium.PolygonHierarchy([]),
            // perPositionHeight : true,
            material: new Cesium.ColorMaterialProperty(new Cesium.Color.fromCssColorString(
              'rgba(0, 0, 0,0)')),
            // heightReference:20000
            outlineColor: new Cesium.Color.fromCssColorString('rgb(255, 204, 51)'),
            outlineWidth: 10,
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
        waterEntity = viewer.entities.add(this.options)
        that.spatialIds.push(waterEntity.id)
      }
      return _
    })()
  }
  // 鼠标移入显示提示
  showTooltip(movement) {
    this.tooltip.style.display = 'block'
    this.tooltip.style.left = movement.endPosition.x + 3 + 'px'
    this.tooltip.style.top = movement.endPosition.y - 25 + 'px'
    this.tooltip.innerHTML = '<p>单击绘制区域，双击结束</p>'
  }
}
