import NewMap2d from '@/components/OLMap/core/MapCore'
import NewMap3d from '@/components/CesiumMap/Map'
import TileLayer from '@/components/OLMap/core/TileLayers'
import TileLayerVec from '@/components/OLMap/core/TileLayerVec'
import TileXYZLayer from '@/components/OLMap/core/TileXYZLayers'
import {
  transformExtent
} from 'ol/proj'
// import {
//   flashPoint2
// } from '@/components/CesiumMap/Effects.js'
import Tiles3dLayer from '@/components/CesiumMap/layer/Tiles3dLayer'
let map2d
let map3d
let wmtsLyrs = []
let vecLyr
let modelLyrs = {}
export var currentModel

// 初始化地图，二三维地图需要保存起来
export function initMap(id, opt, maptype) {
  wmtsLyrs = []
  modelLyrs = {}
  if (maptype === '1') {
    // 二维地图
    map2d = new NewMap2d(id, opt)
    // 注册事件
    map2d.newMap.on('click', event => {
      if (map2d.newMap.hasFeatureAtPixel(event.pixel)) {
        map2d.newMap.forEachFeatureAtPixel(event.pixel, function (
          feature
        ) {
          feature.dispatchEvent({
            type: feature.get('event')
          })
        })
      }
    })
    vecLyr = new TileLayerVec()
    map2d.addLayerToMap(vecLyr.lyr)
  } else {
    if (opt.baseLayerType === 'google') {
      opt.crs = 'GCJ-02'
      opt.centeropt = {}
      opt.centeropt.xmin = opt.extent[0]
      opt.centeropt.xmax = opt.extent[2]
      opt.centeropt.ymin = opt.extent[1]
      opt.centeropt.ymax = opt.extent[3]
    }
    map3d = new NewMap3d(id, opt)
    // flashPoint2()

    // var entity = map3d.viewer.entities.add({
    //   name: 'EllipsoidFade',
    //   position: Cesium.Cartesian3.fromDegrees(104.0, 30.0, 1000.0),
    //   ellipse: {
    //     height: 0.1,
    //     // extrudedHeight: 0,
    //     semiMinorAxis: 2.0,
    //     semiMajorAxis: 2.0,
    //     material: new Cesium.EllipsoidFadeMaterialProperty(Cesium.Color.RED, 500)
    //   }
    // })

    // map3d.viewer.zoomTo(entity)
  }
}
// 只用在解析按钮,返回值为数据加载是否成功
export function addLyr(lyrOpts, tabIndex, maptype) {
  if (maptype === '1') {
    var lyrObj
    if (lyrOpts.mapServerType === '02') {
      lyrObj = new TileLayer({
        url: lyrOpts.mapServiceAddress,
        layer: lyrOpts.blockName,
        extent: JSON.parse(lyrOpts.blockRange)
      })
    } else {
      // 01自研服务对应cesiumlab切片发布数据
      lyrObj = new TileXYZLayer({
        url: lyrOpts.mapServiceAddress,
        layer: lyrOpts.blockName
      })
    }
    vecLyr.addFeature({
      coords: JSON.parse(lyrOpts.blockRange),
      name: lyrOpts.blockName
    })
    wmtsLyrs.push(lyrObj)
    map2d.addLayerToMap(lyrObj.lyr)
    // 定位
    let lyrExtent = JSON.parse(lyrOpts.blockRange)
    lyrExtent = transformExtent(lyrExtent, 'EPSG:4326', 'EPSG:3857')
    map2d.fit(lyrExtent)
  } else {
    const tiles3d = new Tiles3dLayer(map3d)
    const lyrId = lyrOpts.orgId + tabIndex
    if (typeof lyrOpts.mapLoadParm === 'string') {
      lyrOpts.mapLoadParm = JSON.parse(lyrOpts.mapLoadParm)
    }
    tiles3d.initData({
      url: lyrOpts.mapServiceAddress,
      // "http://192.168.1.220:9000/model/290fb9e0aa5511eaa59c6d67e9eeb2dc/tileset.json",
      offset: lyrOpts.mapLoadParm,
      flyTo: true
    })
    if (tiles3d.model) {
      modelLyrs[lyrId] = tiles3d
      setCurrentModel(lyrId)
    }
  }
}
// 二三维切换、发布时间切换
export function initLyrs(arr, maptype) {
  // 二维地图
  if (maptype === '1') {
    wmtsLyrs.forEach(item => {
      map2d.removeLayer(item.lyr)
    })
    wmtsLyrs = []
    vecLyr.clearFeatures()
  } else if (maptype === '2') {
    // 三维地图
    for (const item in modelLyrs) {
      modelLyrs[item].setVisible(false)
      delete modelLyrs[item]
    }
  }
  arr.forEach((item, index) => {
    addLyr(item, index, maptype)
  })
}
// 移除地图框
export function removeLyr(lyrOpts, tabIndex, maptype) {
  if (maptype === '1') {
    if (!lyrOpts.blockName) {
      return
    }
    const index = wmtsLyrs.findIndex(item => {
      return item.lyr.get('id') === lyrOpts.blockName
    })
    if (index > -1) {
      map2d.removeLayer(wmtsLyrs[index].lyr)
      wmtsLyrs.splice(index, 1)
      vecLyr.removeFeature(lyrOpts.blockName)
    }
  } else {
    const lyrId = lyrOpts.orgId + tabIndex
    if (modelLyrs[lyrId]) {
      modelLyrs[lyrId].setVisible(false)
      delete modelLyrs[lyrId]
    }
  }
}

export function zoomToLyr(lyrOpts, tabIndex, maptype) {
  if (maptype === '1') {
    // 定位
    var lyrExtent
    try {
      lyrExtent = JSON.parse(lyrOpts.blockRange)
      lyrExtent = transformExtent(lyrExtent, 'EPSG:4326', 'EPSG:3857')
    } catch (e) {
      return
    }
    map2d.fit(lyrExtent)
  } else {
    const lyrId = lyrOpts.orgId + tabIndex
    if (modelLyrs[lyrId] && modelLyrs[lyrId].model) {
      modelLyrs[lyrId].centerAt(0)
    }
  }
}

export function setCurrentModel(lyrId) {
  if (modelLyrs[lyrId] && modelLyrs[lyrId].model && modelLyrs[lyrId].modelRead) {
    currentModel = modelLyrs[lyrId]
    return true
  } else {
    return false
  }
}
