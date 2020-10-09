export default class GeoJsonLayer {
  constructor(newMap3d) {
    this.newMap3d = newMap3d
    this.entityCollection = []
  }

  insertData(geojson, info, symbol) {
    if (!geojson) {
      return
    }
    if (typeof (geojson) === 'string') {
      geojson = JSON.parse(geojson)
    }
    // 移除无用 geojsonID
    delete geojson.id

    const promise = Cesium.GeoJsonDataSource.load(geojson)
    const that = this
    promise.then(function(dataSource) {
      const entities = dataSource.entities.values
      for (let i = 0; i < entities.length; i++) {
        var entity = entities[i]
        entity.info = info
        entity.popup = info.popResult
        that.setSymbol(entity, symbol)
        that.newMap3d.viewer.entities.add(entity)
        that.entityCollection.push(entity)
      }
    }).otherwise(function(error) {
      console.log(error)
    })
  }

  // 聚合数据添加
  insertDataMerge(geojson, info, symbol, dataSourceLayer) {
    if (!geojson) {
      return
    }
    if (typeof (geojson) === 'string') {
      geojson = JSON.parse(geojson)
    }
    // 移除无用 geojsonID
    delete geojson.id
    const promise = Cesium.GeoJsonDataSource.load(geojson)
    const that = this
    promise.then(function(dataSource) {
      const entities = dataSource.entities.values
      for (let i = 0; i < entities.length; i++) {
        var entity = entities[i]
        entity.info = info
        entity.popup = info.popResult
        that.setSymbol(entity, symbol)
        dataSourceLayer.clusterDataSource.entities.add(entity)
        that.entityCollection.push(entity)
      }
    }).otherwise(function(error) {
      console.log(error)
    })
  }
  // 实体管道数据添加
  insertVolumnData(geojson, info, symbol, instances) {
    const circle = this.computeCircle(5)
    if (!geojson) {
      return
    }
    if (typeof (geojson) === 'string') {
      geojson = JSON.parse(geojson)
    }
    // 移除无用 geojsonID
    delete geojson.id

    const promise = Cesium.GeoJsonDataSource.load(geojson)
    const that = this
    promise.then(function(dataSource) {
      const entities = dataSource.entities.values
      for (let i = 0; i < entities.length; i++) {
        var entity = entities[i]
        // that.addPolylineVolumn(entity.polyline.positions._value, instances)
        var entity2 = new Cesium.Entity({
          polylineVolume: new Cesium.PolylineVolumeGraphics({
            positions: entity.polyline.positions._value,
            shape: [new Cesium.Cartesian2(-5, -5),
              new Cesium.Cartesian2(5, -5),
              new Cesium.Cartesian2(5, 5),
              new Cesium.Cartesian2(-5, 5)
            ],
            material: Cesium.Color.GREEN
          })
        })
        entity2.info = info
        entity2.popup = info.popResult
        that.newMap3d.viewer.entities.add(entity2)

        that.entityCollection.push(entity2)
      }
    }).otherwise(function(error) {
      console.log(error)
    })
  }

  computeCircle(radius) {
    var positions = []
    for (var i = 0; i < 360; i++) {
      var radians = Cesium.Math.toRadians(i)
      positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)))
    }
    return positions
  }
  addPolylineVolumn(positions, instances) {
    // let circle = this.computeCircle(5)
    // this.newMap3d.viewer.scene.globe.depthTestAgainstTerrain = true // 开启地形深度检测
    // 定义 PolylineVolumeGeometry
    var volume = new Cesium.PolylineVolumeGeometry({
      polylinePositions: positions,
      shapePositions: [new Cesium.Cartesian2(-5, -5),
        new Cesium.Cartesian2(5, -5),
        new Cesium.Cartesian2(5, 5),
        new Cesium.Cartesian2(-5, 5)
      ] // 四边形 注：如果shapePositions属性定义成圆形的话会导致面太多，内存狂飙，网页直接崩溃，特别是数据量大的情况
      // shapePositions: circle
    })

    // 定义 Geometry
    var geometry = Cesium.PolylineVolumeGeometry.createGeometry(volume)

    // 定义 GeometryInstance
    var instance = new Cesium.GeometryInstance({
      geometry: geometry,
      id: Math.random().toString(),
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
      }
    })
    instances.push(instance)
  }

  // 转换为PolylineGeometry所需坐标格式[0.0, 0.0,5.0, 0.0,5.0, 5.0]
  getLineCoordinates(lineCoordinates) {
    var lineArray = []
    lineCoordinates.forEach(item => {
      lineArray.push(item[0])
      lineArray.push(item[1])
    })
    return lineArray
  }
  // 显示隐藏
  setVisible(val) {
    if (this.entityCollection.length === 0) {
      return
    }
    if (val) {
      this.entityCollection.forEach(item => {
        this.newMap3d.viewer.entities.add(item)
        // 聚合
        this.newMap3d.viewer.dataSources.getByName('clusterDataSource')[0].entities.add(item)
      })
      // 测试桩添加,聚合和primitive
      // if (pointPrimitives) {
      //   this.entityCollection.forEach(item => {
      //     pointPrimitives.add(item)
      //   })
      // }
    } else {
      this.entityCollection.forEach(item => {
        this.newMap3d.viewer.entities.remove(item)
        // 清除聚合源
        this.newMap3d.viewer.dataSources.remove(this.newMap3d.viewer.dataSources.getByName('clusterDataSource')[0], true)
      })
      // 测试桩删除，聚合和primitive
      // if (pointPrimitives) {
      //   this.entityCollection.forEach(item => {
      //     pointPrimitives.remove(item)
      //   })
      // }
    }
  }

  getEntity(id) {
    return this.entityCollection.find(item => {
      const info = item.info
      if (info.id === id) {
        return item
      }
    })
  }

  zoomToEntity(id) {
    const ent = this.getEntity(id)
    if (ent) {
      if (ent.info.label === '测试桩') {
        var lonlat = JSON.parse(ent.info.lngLatAlt).geometry.coordinates
        this.newMap3d.viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(lonlat[0], lonlat[1], 2000.0),
          orientation: {
            heading: Cesium.Math.toRadians(90.0), // east, default value is 0.0 (north)
            pitch: Cesium.Math.toRadians(-90), // default value (looking down)
            roll: 0.0 // default value
          }
        })
      } else {
        this.newMap3d.viewer.zoomTo(ent)
      }
    }
  }

  removeEntity(id) {
    const ent = this.getEntity(id)
    if (ent) {
      this.newMap3d.viewer.entities.remove(ent)
      const iIndex = this.entityCollection.indexOf(ent)
      this.entityCollection.splice(iIndex, 1)
    }
  }

  clearEntities() {
    this.entityCollection.forEach(item => {
      this.newMap3d.viewer.entities.remove(item)
    })
    this.entityCollection = []
  }

  setSymbol(entity, symbol) {
    if (symbol.polygon) {
      entity.polygon.material = symbol.polygon.material || Cesium.Color.WHITE
      entity.polygon.outline = true
      entity.polygon.outlineColor = symbol.polygon.outlineColor || Cesium.Color.BLACK
      entity.polygon.outlineWidth = symbol.polygon.width || 4
    } else if (symbol.polyline) {
      if (entity.info.layerCode === '0401') {
        entity.polyline.material = new Cesium.PolylineTrailLinkMaterialProperty(symbol.polyline.material, 2000)
      } else {
        entity.polyline.material = symbol.polyline.material
      }

      entity.polyline.width = symbol.polyline.width
    } else if (symbol.point) {
      entity.billboard = {}
      entity.point = {}
      entity.point.color = symbol.point.color
      entity.point.pixelSize = symbol.point.pixelSize
    } else if (symbol.billboardIcon) {
      entity.billboard.scale = symbol.billboardIcon.scale || 1
      entity.billboard.horizontalOrigin = symbol.billboardIcon.horizontalOrigin || Cesium.HorizontalOrigin.CENTER
      entity.billboard.verticalOrigin = symbol.billboardIcon.verticalOrigin || Cesium.VerticalOrigin.BOTTOM
      entity.billboard.image = symbol.billboardIcon.url
      entity.billboard.color = symbol.billboardIcon.color
      entity.billboard.width = symbol.billboardIcon.width || 24
      entity.billboard.height = symbol.billboardIcon.height || 24
      entity.billboard.scaleByDistance = new Cesium.NearFarScalar(10, 1.5, 500000, 0.5)
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
