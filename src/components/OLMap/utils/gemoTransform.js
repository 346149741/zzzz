import { Polygon, LineString, Point, Circle } from 'ol/geom'

const coordtransform = require('coordtransform')

/**
 * WGS84坐标系转换为火星坐标 (GCJ-02)，也就是国测局坐标系
 * @param {Object} olGeom 输入值为ol中定义的geomtry
 * @returns {Object} 坐标转换后的geometry
 */
export function wgstogcj(olGeom) {
  if (olGeom instanceof Polygon) {
    const coordArray = olGeom.getCoordinates()
    coordArray.forEach(function(item, index, coordArray) {
      item.forEach(function(coord, coordIndex) {
        coordArray[index][coordIndex] = coordtransform.wgs84togcj02(coord[0], coord[1])
      })
    })
    olGeom.setCoordinates(coordArray)
  } else if (olGeom instanceof LineString) {
    const coordArray = olGeom.getCoordinates()
    coordArray.forEach(function(coord, coordIndex, coordArray) {
      coordArray[coordIndex] = coordtransform.wgs84togcj02(coord[0], coord[1])
    })
    olGeom.setCoordinates(coordArray)
  } else if (olGeom instanceof Point) {
    var coord = olGeom.getCoordinates()
    olGeom.setCoordinates(coordtransform.wgs84togcj02(coord[0], coord[1]))
  } else if (olGeom instanceof Circle) {
    olGeom.setCenter(coordtransform.wgs84togcj02(olGeom.center[0], olGeom.center[1]))
  } else if (olGeom instanceof Array) {
    olGeom = coordtransform.wgs84togcj02(olGeom[0], olGeom[1])
  }
  return olGeom
}

/**
 * 墨卡托坐标系转换为火星坐标 (GCJ-02)，也就是国测局坐标系
 * @param {Object} olGeom 输入值为ol中定义的geomtry
 * @returns {Object} 坐标转换后的geometry
 */
export function mercatortogcj(olGeom) {
  olGeom = olGeom.transform('EPSG:3857', 'EPSG:4326')
  olGeom = wgstogcj(olGeom)
  olGeom = olGeom.transform('EPSG:4326', 'EPSG:3857')
  return olGeom
}

/**
 * WGS84坐标系转换为百度坐标 (GCJ-02)，先转换为国测局坐标系然后再转换为百度坐标(BD-09)
 * @param {Object} olGeom 输入值为ol中定义的geomtry
 * @returns {Object} 坐标转换后的geometry
 */
export function wgstobd(olGeom) {
  if (olGeom instanceof Polygon) {
    const coordArray = olGeom.getCoordinates()
    coordArray.forEach(function(item, index, coordArray) {
      item.forEach(function(coord, coordIndex, item) {
        var gjcCoord = coordtransform.wgs84togcj02(coord[0], coord[1])
        coordArray[index][coordIndex] = coordtransform.gcj02tobd09(gjcCoord[0], gjcCoord[1])
      })
    })
    olGeom.setCoordinates(coordArray)
  } else if (olGeom instanceof LineString) {
    const coordArray = olGeom.getCoordinates()
    coordArray.forEach(function(coord, coordIndex, coordArray) {
      var gjcCoord = coordtransform.wgs84togcj02(coord[0], coord[1])
      coordArray[coordIndex] = coordtransform.gcj02tobd09(gjcCoord[0], gjcCoord[1])
    })
    olGeom.setCoordinates(coordArray)
  } else if (olGeom instanceof Point) {
    var coord = olGeom.getCoordinates()
    var gjcCoord = coordtransform.wgs84togcj02(coord[0], coord[1])
    olGeom.setCoordinates(coordtransform.gcj02tobd09(gjcCoord[0], gjcCoord[1]))
  } else if (olGeom instanceof Circle) {
    var coord = olGeom.getCoordinates()
    var gjcCoord = coordtransform.wgs84togcj02(coord[0], coord[1])
    olGeom.setCenter(coordtransform.gcj02tobd09(gjcCoord[0], gjcCoord[1]))
  }
  return olGeom
}

/**
 * 墨卡托坐标系转换为火星坐标 (BD_09坐标)
 * @param {Object} olGeom 输入值为ol中定义的geomtry
 * @returns {Object} 坐标转换后的geometry
 */
export function mercatortobd(olGeom) {
  olGeom = olGeom.transform('EPSG:3857', 'EPSG:4326')
  olGeom = wgstobd(olGeom)
  olGeom = olGeom.transform('EPSG:4326', 'EPSG:3857')
  return olGeom
}

