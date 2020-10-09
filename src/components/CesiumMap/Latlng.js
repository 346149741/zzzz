function pickCenterPoint(scene) {
  const canvas = scene.canvas
  const center = new Cesium.Cartesian2(
    canvas.clientWidth / 2,
    canvas.clientHeight / 2)

  const ray = scene.camera.getPickRay(center)
  const target = scene.globe.pick(ray, scene)
  return target || scene.camera.pickEllipsoid(center)
}

/**
 * 获取鼠标当前的屏幕坐标位置的三维Cesium坐标
 * @param {Cesium.Scene} scene
 * @param {Cesium.Cartesian2} position 二维屏幕坐标位置
 */
export function getCurrentMousePosition(scene, position) {
  var cartesian

  // 在模型上提取坐标
  var pickobject = scene.pick(position) // 取模型
  if (scene.pickPositionSupported && Cesium.defined(pickobject)) { //! scene.pickPositionSupported : 不支持深度拾取,无法进行鼠标交互绘制
    cartesian = scene.pickPosition(position)
    if (cartesian) {
      var pgeo = scene.globe.ellipsoid.cartesianToCartographic(cartesian)
      if (pgeo.height > 0) {
        return cartesian
      }
    }
  }

  // 提取鼠标点的地理坐标
  var pickRay = scene.camera.getPickRay(position)
  cartesian = scene.globe.pick(pickRay, scene)
  return cartesian
}

// 提取地球中心点坐标
export function getCenter(viewer) {
  var scene = viewer.scene
  var target = pickCenterPoint(scene)
  var bestTarget = target
  if (!bestTarget) {
    var globe = scene.globe
    var carto = scene.camera.positionCartographic.clone()
    var height = globe.getHeight(carto)
    carto.height = height || 0
    bestTarget = Cesium.Ellipsoid.WGS84.cartographicToCartesian(carto)
  }

  var bestTargetCartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(bestTarget)
  var lng = Number(Cesium.Math.toDegrees(bestTargetCartographic.longitude).toFixed(6))
  var lat = Number(Cesium.Math.toDegrees(bestTargetCartographic.latitude).toFixed(6))

  return {
    x: lng,
    y: lat,
    z: scene.camera.positionCartographic.height
  }
}

// // 提取相机视角范围参数
// export function getCameraView(viewer, isToWgs) {
//   var camera = viewer.camera
//   var position = camera.positionCartographic
//
//   var bookmark = {}
//   bookmark.y = Number(Cesium.Math.toDegrees(position.latitude).toFixed(6))
//   bookmark.x = Number(Cesium.Math.toDegrees(position.longitude).toFixed(6))
//   bookmark.z = Number(position.height.toFixed(1))
//   bookmark.heading = Number(Cesium.Math.toDegrees(camera.heading).toFixed(1))
//   bookmark.pitch = Number(Cesium.Math.toDegrees(camera.pitch).toFixed(1))
//   bookmark.roll = Number(Cesium.Math.toDegrees(camera.roll).toFixed(1))
//
//   if (isToWgs) { bookmark = mars3d.map.point2wgs(bookmark) } // 坐标转换为wgs
//
//   return bookmark
// }
