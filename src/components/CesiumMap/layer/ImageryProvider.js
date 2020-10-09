const PROTOCOL = document.location.protocol
// 创建地图底图
export function createImageryProvider(item) {
  var layer
  var _url
  var maxLevel = 20
  var _crs = item.crs || '3857'
  switch (item.type) {
    // 地图底图
    case 'image':
      if (item.rectangle && item.rectangle.xmin) {
        item.rectangle = Cesium.Rectangle.fromDegrees(item.rectangle.xmin, item.rectangle.ymin, item.rectangle.xmax, item.rectangle.ymax)
      }
      layer = new Cesium.SingleTileImageryProvider(item)
      break
    case 'tile':
      layer = new Cesium.UrlTemplateImageryProvider(item)
      break
    case 'wms':
      layer = new Cesium.WebMapServiceImageryProvider(item)
      break
    case 'wmts':
      layer = new Cesium.WebMapTileServiceImageryProvider(item)
      break

      // 互联网地图
    case 'tianditu': // 天地图
      var _layer
      switch (item.layer) {
        default:
        case 'vec_d':
          _layer = 'vec'
          break
        case 'vec_z':
          _layer = 'cva'
          break
        case 'img_d':
          _layer = 'img'
          break
        case 'img_z':
          _layer = 'cia'
          break
        case 'ter_d':
          _layer = 'ter'
          break
        case 'ter_z':
          _layer = 'cta'
          break
      }
      if (_crs === '3857') {
        // web墨卡托投影
        const matrixIds = new Array(maxLevel)
        for (let z = 0; z <= maxLevel; z++) {
          matrixIds[z] = (z).toString()
        }
        layer = new Cesium.WebMapTileServiceImageryProvider({
          url: 'http://t{s}.tianditu.com/' + _layer + '_w/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer=' + _layer + '&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles',
          layer: _layer,
          style: 'default',
          format: 'tiles',
          tileMatrixSetID: 'w',
          credit: new Cesium.Credit(item.name),
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
          maximumLevel: maxLevel,
          tilingScheme: new Cesium.WebMercatorTilingScheme(),
          tileMatrixLabels: matrixIds
        })
      } else {
        // wgs84投影
        const matrixIds = new Array(maxLevel)
        for (let z = 0; z <= maxLevel; z++) {
          matrixIds[z] = (z + 1).toString()
        }
        layer = new Cesium.WebMapTileServiceImageryProvider({
          url: 'http://t{s}.tianditu.com/' + item.layer + '_c/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer=' + item.layer + '&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles',
          layer: item.layer,
          style: 'default',
          format: 'tiles',
          tileMatrixSetID: 'c',
          credit: new Cesium.Credit(item.name),
          subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
          maximumLevel: maxLevel,
          tilingScheme: new Cesium.GeographicTilingScheme(), // WebMercatorTilingScheme、GeographicTilingScheme
          tileMatrixLabels: matrixIds
        })
      }

      break
    case 'gaode': // 高德
      switch (item.layer) {
        case 'vec':
        default: // style=7是立体的，style=8是灰色平面的
          _url = 'http://' + (item.bigfont ? 'wprd' : 'webrd') + '0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
          break
        case 'img_d':
          _url = 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
          break
        case 'img_z':
          _url = 'http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
          break
        case 'time':
          var time = new Date().getTime()
          _url = 'http://tm.amap.com/trafficengine/mapabc/traffictile?v=1.0&;t=1&x={x}&y={y}&z={z}&&t=' + time
          break
      }

      layer = new Cesium.UrlTemplateImageryProvider({
        url: _url,
        subdomains: ['1', '2', '3', '4'],
        maximumLevel: maxLevel
      })
      break
    case 'google': // 谷歌国内

      if (_crs === '4326' || _crs === 'wgs84') {
        switch (item.layer) {
          default:
          case 'img_d': // 无偏移
            _url = PROTOCOL + '//www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}'
        }
      } else { // 加偏移量
        switch (item.layer) {
          case 'vec':
          default:
            _url = PROTOCOL + '//mt{s}.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile'
            break
          case 'img_d':
            _url = PROTOCOL + '//mt{s}.google.cn/vt/lyrs=s&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&s=Gali'
            break
          case 'img_z':
            _url = PROTOCOL + '//mt{s}.google.cn/vt/imgtp=png32&lyrs=h@207000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil'
            break
          case 'ter':
            _url = PROTOCOL + '//mt{s}.google.cn/vt/lyrs=t@131,r@227000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galile'
            break
          case 'ano':
            _url = PROTOCOL + '//mt2.google.cn/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}'
        }
      }
      layer = new Cesium.UrlTemplateImageryProvider({
        url: _url,
        subdomains: ['1', '2', '3'],
        maximumLevel: maxLevel
      })
      break
  }
  return layer
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
    return new Cesium.UrlTemplateImageryProvider({
      url: url,
      maximumLevel: 20
    })
  }
}
