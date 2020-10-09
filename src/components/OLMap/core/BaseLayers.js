/**
 * 底图类，包括平面图和卫星图两类
 */
import XYZ from 'ol/source/XYZ'
import {
  Group as LayerGroup,
  Tile as TileLayer
} from 'ol/layer'
import TileImage from 'ol/source/TileImage'
import Collection from 'ol/Collection'
import TileGrid from 'ol/tilegrid/TileGrid'

/**
 * 根据传入的地图类型返回基础图层
 * @param {Object} mapType 地图类型，谷歌google，百度baidu，高德gaode，天地图tianditu
 * 日期：2018.1.21
 */
const PROTOCOL = document.location.protocol

function getBaseLayers(mapType) {
  mapType = mapType.toLowerCase()
  var baseLayers = {}
  switch (mapType) {
    case 'baidu':
      baseLayers.Normal = getBaiduNormalLyr()
      baseLayers.Satellite = getBaiduSatelliteLyr()
      break
    case 'gaode':
      baseLayers.Normal = getGaodeNormalLyr()
      baseLayers.Satellite = getGaodeSatelliteLyr()
      break
    case 'google':
      baseLayers.Normal = getGoogleNormalLyr()
      baseLayers.Satellite = getGoogleSatelliteLyr()
      break
    case 'tianditu':
      baseLayers.Normal = getTiandituNormalLyr()
      baseLayers.Satellite = getTiandituSatelliteLyr()
      break
  }
  return baseLayers
}

/**
 * 百度二维平面图层
 * 日期：2018.1.21
 */
function getBaiduNormalLyr() {
  var resolutions = []
  for (var i = 0; i < 19; i++) {
    resolutions[i] = Math.pow(2, 18 - i)
  }
  var tilegrid = new TileGrid({
    origin: [0, 0],
    resolutions: resolutions
  })

  var baidu_source = new TileImage({
    // projection: ol.proj.get("EPSG:3857"),
    tileGrid: tilegrid,
    tileUrlFunction: function(tileCoord, pixelRatio, proj) {
      if (!tileCoord) {
        return ''
      }
      var z = tileCoord[0]
      var x = tileCoord[1]
      var y = tileCoord[2]

      if (x < 0) {
        x = 'M' + (-x)
      }
      if (y < 0) {
        y = 'M' + (-y)
      }

      // return 'http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=' + x + '&y=' + y + '&z=' + z + '&styles=pl&udt=20151021&scaler=1&p=1'
      return 'http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=' + x + '&y=' + y + '&z=' + z + '&styles=pl&udt=20170620&scaler=1&p=1'
    }
  })

  var baidu_layer = new TileLayer({
    type: 'base',
    source: baidu_source
  })
  return baidu_layer
}

/**
 * 百度二维卫星图层，包括卫星图和注记层
 * 日期：2018.1.21
 */
function getBaiduSatelliteLyr() {
  var baseGroup = new LayerGroup({
    visible: true
  })

  var resolutions = []
  for (var i = 0; i < 19; i++) {
    resolutions[i] = Math.pow(2, 18 - i)
  }
  var tilegrid = new TileGrid({
    origin: [0, 0],
    resolutions: resolutions
  })

  var baidu_layer = new TileLayer({
    type: 'base',
    source: new TileImage({
      // projection: ol.proj.get("EPSG:3857"),
      tileGrid: tilegrid,
      tileUrlFunction: function(tileCoord, pixelRatio, proj) {
        if (!tileCoord) {
          return ''
        }
        var z = tileCoord[0]
        var x = tileCoord[1]
        var y = tileCoord[2]

        if (x < 0) {
          x = 'M' + (-x)
        }
        if (y < 0) {
          y = 'M' + (-y)
        }
        return 'http://shangetu' + parseInt(Math.random() * 10) + '.map.bdimg.com/it/u=x=' + x + ';y=' + y + ';z=' + z + ';v=009;type=sate&fm=46&udt=20170606'
      }
    })
  })

  var baiduSalte_layer = new TileLayer({
    zIndex: 1,
    type: 'base',
    source: new TileImage({
      // projection: ol.proj.get("EPSG:3857"),
      tileGrid: tilegrid,
      tileUrlFunction: function(tileCoord, pixelRatio, proj) {
        if (!tileCoord) {
          return ''
        }
        var z = tileCoord[0]
        var x = tileCoord[1]
        var y = tileCoord[2]

        if (x < 0) {
          x = 'M' + (-x)
        }
        if (y < 0) {
          y = 'M' + (-y)
        }
        return 'http://online' + parseInt(Math.random() * 10) + '.map.bdimg.com/onlinelabel/?qt=tile&x=' + x + '&y=' + y + '&z=' + z + '&styles=sl&udt=20170620&scaler=1&p=1'
      }
    })
  })

  baseGroup.setLayers(new Collection([baidu_layer, baiduSalte_layer]))
  return baseGroup
}

/**
 * 高德二维平面图层，高德在线地图图层
 * 日期：2018.1.21
 */
function getGaodeNormalLyr() {
  var gaodeMapLayer = new TileLayer({
    type: 'base',
    source: new XYZ({
      // url:'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
      url: 'http://webrd03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8' // 高德地图在线
    }),
    visible: true
  })
  return gaodeMapLayer
}

/**
 * 高德二维卫星图层，包括卫星图和注记层
 * 日期：2018.1.21
 */
function getGaodeSatelliteLyr() {
  var baseGroup = new LayerGroup({
    visible: true
  })
  var gaodeMapLayer = new TileLayer({
    source: new XYZ({
      url: 'https://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
      // url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
    })
  })
  var gaodeAnnotionLayer = new TileLayer({
    zIndex: 1,
    source: new XYZ({
      url: 'https://webst04.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
    })
  })
  baseGroup.setLayers(new Collection([gaodeMapLayer, gaodeAnnotionLayer]))
  return baseGroup
}

/**
 * 天地图二维平面图层
 * 日期：2018.1.21
 */
function getTiandituNormalLyr() {
  var baseGroup = new LayerGroup({
    visible: true
  })
  var tiandituMapLayer = new TileLayer({
    source: new XYZ({
      url: 'https://t3.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6e0bef8dea081ff1bf6003ffcff9dc49'
    })
  })
  var tiandituAnnotionLayer = new TileLayer({
    source: new XYZ({
      url: 'https://t3.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=6e0bef8dea081ff1bf6003ffcff9dc49'
    })
  })
  baseGroup.setLayers(new Collection([tiandituMapLayer, tiandituAnnotionLayer]))
  return baseGroup
}

/**
 * 天地图二维卫星图层，天地图在线地图图层，包括卫星图和注记层
 * 日期：2018.1.21
 */
function getTiandituSatelliteLyr() {
  var baseGroup = new LayerGroup({
    visible: true
  })
  var tiandituMapLayer = new TileLayer({
    source: new XYZ({
      url: 'https://t3.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=6e0bef8dea081ff1bf6003ffcff9dc49'
    })
  })
  var tiandituAnnotionLayer = new TileLayer({
    source: new XYZ({
      url: 'https://t3.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=6e0bef8dea081ff1bf6003ffcff9dc49'
    }),
    zIndex: 1
  })
  baseGroup.setLayers(new Collection([tiandituMapLayer, tiandituAnnotionLayer]))
  return baseGroup
}

/**
 * google平面图加载
 */
function getGoogleNormalLyr() {
  var googleMapLayer = new TileLayer({
    type: 'base',
    source: new XYZ({
      // url: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'
      // url: 'https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
      url: PROTOCOL + '//mt2.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil',
      crossOrigin: 'anonymous'
    }),
    visible: false
  })
  return googleMapLayer
}

/**
 * google影像图加载
 */
function getGoogleSatelliteLyr() {
  // 加上gl=cn 即可解决偏移和不偏移问题，使用www.google.cn会报跨域问题
  var baseGroup = new LayerGroup({
    visible: true
  })
  var mapLayer = new TileLayer({
    source: new XYZ({
      crossOrigin: 'anonymous',
      url: PROTOCOL + '//mt2.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali&gl=cn'
      // eslint-disable-next-line no-dupe-keys
    })

  })
  var annotionLayer = new TileLayer({
    source: new XYZ({
      url: PROTOCOL + '//mt2.google.cn/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}',
      crossOrigin: 'anonymous'
    }),
    zIndex: 1
  })
  baseGroup.setLayers(new Collection([mapLayer, annotionLayer]))
  return baseGroup
}

export function customBaseLayer(lyrCfg) {
  if (lyrCfg.layer === 'arcgis') {
    let url = ''
    switch (lyrCfg.type) {
      case 'colour':
        url = PROTOCOL + '//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'
        break
      case 'gray':
        url = PROTOCOL + '//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}'
        break
      case 'dark':
        url = PROTOCOL + '//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
        break
    }
    return new TileLayer({
      source: new XYZ({
        url: url,
        crossOrigin: 'anonymous'
      }),
      zIndex: 1
    })
  }
}

export default getBaseLayers
