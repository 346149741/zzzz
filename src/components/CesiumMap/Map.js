import * as Popup from './Popup'
import {
  createImageryProvider,
  customBaseLayer
} from './layer/ImageryProvider.js'
import {
  transformMethod
} from '@/components/OLMap/utils/coordsTransform.js'
import CoordsTransform from '@/components/OLMap/utils/coordsTransform.js'

function initMap3d(id, config, options) {
  // 地球初始化
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMzVlZmUzZi0xMWRmLTQxZGEtYWQyMS1iMDhmYWM3NDkyZjMiLCJpZCI6MTIzMTAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjA4MzkzNTZ9.ORdbpPmws56kqB_GOcdYo-v38ezBkYUVqjPJiZ73JvA'

  // 离线所需环境
  options.imageryProvider = new Cesium.TileMapServiceImageryProvider({
    url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
  })
  // 为了加载3dtiles的倾斜摄影，
  // var obj = [6378137.0, 6378137.0, 6356752.3142451793]
  // Cesium.Ellipsoid.WGS84 = new Cesium.Ellipsoid(obj[0], obj[1], obj[2])
  const viewer = new Cesium.Viewer(id, options)
  viewer.cesiumWidget.creditContainer.style.display = 'none' // 去cesium logo

  // 底图加载
  var imageryOpt = {
    show: true,
    alpha: 1,
    minimumTerrainLevel: 0,
    maximumTerrainLevel: 20
  }

  const imageryProvider = createImageryProvider({
    type: config.baseLayerType,
    crs: config.crs,
    layer: config.layer
  })
  const imageryProviderAno = createImageryProvider({
    type: config.baseLayerType,
    crs: config.crs,
    layer: 'ano'
  })
  const imageryProviderNormal = createImageryProvider({
    type: config.baseLayerType,
    crs: config.crs,
    layer: 'normal'
  })
  const baseLayerNormal = new Cesium.ImageryLayer(imageryProviderNormal, imageryOpt)
  baseLayerNormal.show = false
  viewer.NormalLyr = baseLayerNormal
  viewer.imageryLayers.add(baseLayerNormal)

  const baseLayer = new Cesium.ImageryLayer(imageryProvider, imageryOpt)
  viewer.imageryLayers.add(baseLayer)
  viewer.SatelliteLyr = baseLayer

  const baseLayerAno = new Cesium.ImageryLayer(imageryProviderAno, imageryOpt)
  viewer.SatelliteLyrAno = baseLayerAno
  viewer.imageryLayers.add(baseLayerAno)

  // 离线数据
  // viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
  //   url: '/data/titles/{z}/{x}/{y}.jpg' // 服务地址
  // }))

  // 地球一些属性设置
  var scene = viewer.scene
  scene.globe.baseColor = Cesium.Color.SILVER // 背景改为灰色
  if (config.style) {
    scene.globe.depthTestAgainstTerrain = config.style.testTerrain // 深度监测
    scene.globe.enableLighting = config.style.lighting // 光照渲染（阳光照射区域高亮）
    scene.skyAtmosphere.show = config.style.atmosphere // 大气渲染
    scene.fog.enabled = config.style.fog // 雾化效果
  }

  // 限制缩放级别
  scene.screenSpaceCameraController.maximumZoomDistance = config.maxzoom || 20000000
  scene.screenSpaceCameraController.minimumZoomDistance = config.minzoom || 1
  // popup 初始化
  Popup.init(viewer)
  return viewer
}

export default class NewMap3d {
  constructor(id, config) {
    // 类内部使用
    this.viewer = null
    this.handlers = null // 地图相关事件
    this.viewerDivId = id
    this.configdata = config || {}
    // 坐标系
    this.configdata.crs = this.configdata.crs ? this.configdata.crs : '3857'
    this.crs = this.configdata.crs

    // 底图，默认谷歌
    this.configdata.baseLayerType = this.configdata.baseLayerType ? this.configdata.baseLayerType : 'google'
    this.configdata.layer = this.configdata.layer ? this.configdata.layer : 'img_d'

    // 控件全部不显示
    const defoptions = {
      animation: false, // 是否创建动画小器件，左下角仪表
      scene3DOnly: true,
      timeline: true, // 是否显示时间线控件，任务管理轨迹飞行需使用，当前需设置为true
      fullscreenButton: false, // 右下角全屏按钮
      vrButton: false, // 右下角vr虚拟现实按钮
      geocoder: false, // 是否显示地名查找控件
      sceneModePicker: false, // 是否显示投影方式控件
      homeButton: false, // 回到默认视域按钮
      navigationHelpButton: false, // 是否显示帮助信息控件
      baseLayerPicker: false,
      // terrainProvider: Cesium.createWorldTerrain(), // 加载地形
      infoBox: false, // 是否显示点击要素之后显示的信息
      selectionIndicator: false // 选择模型是是否显示绿色框,
    }
    this.viewer = initMap3d(id, this.configdata, defoptions)
    // 抗锯齿,使绘制曲线光滑
    this.viewer.scene.fxaa = false
    // this.viewer.scene.postProcessStages.fxaa.enabled = false
    var supportsImageRenderingPixelated = this.viewer.cesiumWidget._supportsImageRenderingPixelated
    if (supportsImageRenderingPixelated) {
      var vtxf_dpr = window.devicePixelRatio
      while (vtxf_dpr >= 2.0) {
        vtxf_dpr /= 2.0
      }
      this.viewer.resolutionScale = vtxf_dpr
    }

    // 取消双击定位
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    // 初始化定位
    // this.centerAt(this.configdata.centeropt, 0)
  }

  zoomIn() {
    const cameraPos = this.viewer.camera.position
    const ellipsoid = this.viewer.scene.globe.ellipsoid
    const cartographic = ellipsoid.cartesianToCartographic(cameraPos)
    const height = cartographic.height
    this.viewer.camera.zoomIn(height / 3)
  }

  zoomOut() {
    // 获取当前镜头位置的笛卡尔坐标
    const cameraPos = this.viewer.camera.position
    // 获取当前坐标系标准
    const ellipsoid = this.viewer.scene.globe.ellipsoid
    // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
    const cartographic = ellipsoid.cartesianToCartographic(cameraPos)
    // 获取镜头的高度
    const height = cartographic.height
    // 镜头远离
    this.viewer.camera.zoomOut(height * 1.2)
  }

  addDataSource(source) {
    if (!this.viewer.dataSources.contains(source)) {
      this.viewer.dataSources.add(source)
    }
  }
  removeDataSource(source, destroy = false) {
    if (this.viewer.dataSources.contains(source)) {
      this.viewer.dataSources.remove(source, destroy)
    }
  }

  zoomTo(target, offset) {
    this.viewer.zoomTo(target, offset)
  }
  home() {
    this.centerAt(this.configdata.centeropt, 0)
  }

  getViewer() {
    return this.viewer
  }

  centerAt(centeropt, duration, complete) {
    if (duration == null) duration = 3

    // 让镜头飞行（动画）到配置默认区域
    if (centeropt == null) {
      centeropt = this.configdata.extent || this.configdata.center
    }

    if (centeropt.xmin && centeropt.xmax && centeropt.ymin && centeropt.ymax) {
      var transfromCoordMin = transformMethod(this.configdata.baseLayerType)(centeropt.xmin, centeropt.ymin)
      var transfromCoordMax = transformMethod(this.configdata.baseLayerType)(centeropt.xmax, centeropt.ymax)
      // 使用extent配置
      var xmin = transfromCoordMin[0]
      var xmax = transfromCoordMax[0]
      var ymin = transfromCoordMin[1]
      var ymax = transfromCoordMax[1]

      var rectangle = Cesium.Rectangle.fromDegrees(xmin, ymin, xmax, ymax)
      this.viewer.camera.flyTo({
        destination: rectangle,
        duration: duration,
        complete: complete
      })
    } else {
      // 使用xyz
      var transfromCoord = transformMethod(this.configdata.baseLayerType)(centeropt.x, centeropt.y)
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(transfromCoord[0], transfromCoord[1], centeropt.z || 0), // 经度、纬度、高度
        orientation: {
          heading: Cesium.Math.toRadians(centeropt.heading || 0), // 绕垂直于地心的轴旋转
          pitch: Cesium.Math.toRadians(centeropt.pitch || -90), // 绕纬度线旋转
          roll: Cesium.Math.toRadians(centeropt.roll || 0) // 绕经度线旋转
        },
        duration: duration,
        complete: complete
      })

      // var point = Cesium.Cartesian3.fromDegrees(centeropt.x, centeropt.y, centeropt.z || 0); //经度、纬度、高度
      // var boundingSphere = new Cesium.BoundingSphere(point, centeropt.radius || 50);
      // viewer.camera.flyToBoundingSphere(boundingSphere, {
      //    duration: duration,
      //    complete: complete
      // });
    }
  }

  changeBaseLayer(normalFlag) {
    this.viewer.SatelliteLyr.show = !normalFlag
    this.viewer.SatelliteLyrAno.show = !normalFlag
    this.viewer.NormalLyr.show = normalFlag
    if (this.configdata.customLayer) {
      this.viewer.imageryLayers.remove(this.configdata.customLayer)
    }
  }

  setGridVisible(val) {
    this.viewer.SatelliteLyrAno.show = val
  }

  setCustomLayer(lyrCfg) {
    this.viewer.SatelliteLyr.show = false
    this.viewer.NormalLyr.show = false
    this.viewer.SatelliteLyrAno.show = false
    // 移除上次添加的图层
    if (this.configdata.customLayer) {
      this.viewer.imageryLayers.remove(this.configdata.customLayer)
    }
    const lyr = customBaseLayer(lyrCfg)
    this.configdata.customLayer = this.viewer.imageryLayers.addImageryProvider(lyr, 2)
  }

  addMouseWheelLngLat(el) {
    this.handlers = new Cesium.ScreenSpaceEventHandler(this.viewer.scene._imageryLayerCollection)
    const that = this
    this.handlers.setInputAction(function(event) {
      const ray = that.viewer.scene.camera.getPickRay(event.endPosition)
      const position1 = that.viewer.scene.globe.pick(ray, that.viewer.scene)
      const feature = that.viewer.scene.pick(event.endPosition)
      var lng
      var lat
      var height = 0
      if (feature === undefined && position1) {
        const cartographic1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1)
        lng = Cesium.Math.toDegrees(cartographic1.longitude)
        lat = Cesium.Math.toDegrees(cartographic1.latitude)
        height = 0
      } else {
        const cartesian = that.viewer.scene.pickPosition(event.endPosition)
        if (Cesium.defined(cartesian)) {
          const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
          lng = Cesium.Math.toDegrees(cartographic.longitude)
          lat = Cesium.Math.toDegrees(cartographic.latitude)
          height = cartographic.height
        }
      }
      if (lng && lat) {
        // 火星转84
        let coordSwitchFuc = CoordsTransform.unTransform
        switch (that.configdata.baseLayerType) {
          case 'google':
          case 'gaode':
            coordSwitchFuc = CoordsTransform.gcj02_wgs
            break
          case 'baidu':
            coordSwitchFuc = CoordsTransform.bd09_wgs
            break
        }
        const res = coordSwitchFuc(lng, lat)
        el.innerHTML = res[0].toFixed(6) + ',' + res[1].toFixed(6) + ',' + height.toFixed(3)
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  }
}
