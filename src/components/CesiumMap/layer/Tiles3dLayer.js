import {
  transformMethod
} from '@/components/OLMap/utils/coordsTransform.js'

export default class Tiles3dLayer {
  constructor(newMap3d) {
    this.newMap3d = newMap3d
    this.model = null
  }

  // 显示隐藏
  setVisible(val) {
    if (!this.model) {
      return
    }
    if (val) {
      this.newMap3d.viewer.scene.primitives.add(this.model)
    } else {
      this.newMap3d.viewer.scene.primitives.remove(this.model)
    }
  }

  // 定位至数据区域
  centerAt(duration) {
    if (this.boundingSphere) {
      this.newMap3d.viewer.camera.flyToBoundingSphere(this.boundingSphere, {
        offset: new Cesium.HeadingPitchRange(0.0, -0.5, this.boundingSphere.radius * 2),
        duration: duration
      })
    }
  }

  initData(cfg) {
    // 默认值
    cfg.maximumScreenSpaceError = cfg.maximumScreenSpaceError || 16
    cfg.skipLevelOfDetail = cfg.skipLevelOfDetail || true
    cfg.maximumMemoryUsage = cfg.maximumMemoryUsage || 2000
    cfg.dynamicScreenSpaceError = cfg.dynamicScreenSpaceError || true
    this.model = this.newMap3d.viewer.scene.primitives.add(new Cesium.Cesium3DTileset(cfg))

    var $this = this
    this.model.readyPromise.then(function(tileset) {
      $this.name = cfg.name || ''
      // 记录模型原始的中心点
      var boundingSphere = tileset.boundingSphere
      $this.boundingSphere = boundingSphere

      var catographic = Cesium.Cartographic.fromCartesian(boundingSphere.center)

      var height = Number(catographic.height.toFixed(2))
      var longitude = Number(Cesium.Math.toDegrees(catographic.longitude).toFixed(6))
      var latitude = Number(Cesium.Math.toDegrees(catographic.latitude).toFixed(6))
      $this.originalCenter = {
        Xs: longitude,
        Ys: latitude,
        Zs: height
      }
      console.log($this.name + ' 模型原始位置:' + JSON.stringify($this.originalCenter))

      // 转换坐标系【如果是高德谷歌国测局坐标系时转换坐标进行加偏，其它的原样返回】
      var transfromCoord = transformMethod($this.newMap3d.configdata.baseLayerType)($this.originalCenter.Xs, $this.originalCenter.Ys)

      var rawCenter = {
        Xs: transfromCoord[0],
        Ys: transfromCoord[1],
        Zs: $this.originalCenter.Zs
      }
      cfg.offset = cfg.offset || {} // 配置信息中指定的坐标信息或高度信息
      $this.offsetopt = {
        Xs: cfg.offset.Xs || rawCenter.Xs,
        Ys: cfg.offset.Ys || rawCenter.Ys,
        Zs: cfg.offset.Zs || rawCenter.Zs,
        Rx: cfg.offset.Rx || 0,
        Ry: cfg.offset.Ry || 0,
        Rz: cfg.offset.Rz || 0
      }
      // $this.updateMatrix($this.offsetopt)
      $this.update3dtilesMaxtrix($this.offsetopt)
      $this.modelRead = true
      if (cfg.flyTo) {
        $this.centerAt(0)
      }
    }).otherwise(function(error) {
      $this.model = null
      $this.modelRead = false
      console.log(error)
    })
  }

  // 平移、贴地、旋转模型（新）
  update3dtilesMaxtrix(params) {
    console.log(' 模型修改后位置:' + JSON.stringify(params))
    this.offsetopt = params
    // 旋转
    var mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(params.Rx || 0))
    var my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(params.Ry || 0))
    var mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.Rz || 0))
    var rotationX = Cesium.Matrix4.fromRotationTranslation(mx)
    var rotationY = Cesium.Matrix4.fromRotationTranslation(my)
    var rotationZ = Cesium.Matrix4.fromRotationTranslation(mz)

    // 平移
    var position = Cesium.Cartesian3.fromDegrees(params.Xs, params.Ys, params.Zs)
    var m = Cesium.Transforms.eastNorthUpToFixedFrame(position)

    // 旋转、平移矩阵相乘
    Cesium.Matrix4.multiply(m, rotationX, m)
    Cesium.Matrix4.multiply(m, rotationY, m)
    Cesium.Matrix4.multiply(m, rotationZ, m)

    // 赋值给tileset
    this.model._root.transform = m
  }

  // offsetopt.x，y不能多次更改
  updateMatrix(offsetopt) {
    if (this.model == null) return

    console.log(' 模型修改后位置:' + JSON.stringify(offsetopt))

    var boundingSphere = this.model.boundingSphere
    var catographic = Cesium.Cartographic.fromCartesian(boundingSphere.center)
    var surface = Cesium.Cartesian3.fromRadians(catographic.longitude, catographic.latitude, 0.0)
    var offset = Cesium.Cartesian3.fromDegrees(offsetopt.x, offsetopt.y, offsetopt.z)

    var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3())
    this.model.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
  }
  // 暂时未使用，自动贴地，测试距离地面还有距离
  add3dTitles(terrainProvider) {
    this.model = this.newMap3d.viewer.scene.groundPrimitives.add(new Cesium.Cesium3DTileset({
      url: this.config.url // 此处填写tileset url地址
    }))
    this.model.readyPromise.then(function(tileset) {
      var boundingSphere = tileset.boundingSphere
      var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center) // 获取到倾斜数据中心点的经纬度坐标（弧度）
      var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0) // 倾斜数据中心点的笛卡尔坐标
      var positions = [Cesium.Cartographic.fromDegrees(cartographic.longitude, cartographic.latitude)]
      var promise = Cesium.sampleTerrainMostDetailed(terrainProvider, positions) // 其中terrainProvider是当前场景使用的高程Provider
      Cesium.when(promise, function(updatedPositions) {
        var terrainHeight = updatedPositions[0].height // 高程
        var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, terrainHeight) // 带高程的新笛卡尔坐标
        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3()) // 做差得到变换矩阵
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
      })
    }).otherwise(function(error) {
      console.log(error)
    })
  }
  initData2(cfg) {
    this.model = new Cesium.Cesium3DTileset({
      url: 'http://192.168.1.219:9000/model/290fb9e0aa5511eaa59c6d67e9eeb2dc/tileset.json' // osgb(倾斜摄影)
    })
    this.newMap3d.viewer.scene.primitives.add(this.model)
    this.model.readyPromise.then(function(argument) {
      /*
       * 调整高度
       */
      var heightoff = 0
      var cartographic = Cesium.Cartographic.fromCartesian(this.model.boundingSphere.center)
      var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic
        .heightoff)
      var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightoff)
      var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3())
      this.model.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
    })
    // 视角定位
    this.newMap3d.viewer.flyTo(this.model, {
      duration: 3,
      offset: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-40),
        range: 720
      }
    })
  }
}
