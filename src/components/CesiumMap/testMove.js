// /**
//  * 模型移动函数 米
//  * @param model
//  * @param meters
//  * @param seconds
//  */
// function modelMoveMeters(model, meters, seconds) {
//   if ((!model) || (!meters) || (!seconds)) {
//     return
//   }
//   const modelNowPosition = Cartesian3_to_WGS84(getEntityPosition(model))
//   var ln = 0.00001141
//   var la = 0.00000899
//   const modelEndPosition = {
//     lng: modelNowPosition.lng + ln * meters.lng,
//     lat: modelNowPosition.lat + la * meters.lat,
//     alt: modelNowPosition.alt + meters.alt
//   }
//   modelMove(model, modelNowPosition, modelEndPosition, seconds)
// }
/**
 * 模型移动函数
 * @param model
 * @param startPosition 起点位置
 * @param endPosition 终点位置
 * @param seconds 秒数
 */
export function modelMove(model, startPosition, endPosition, seconds) {
  if (model) {
    const p1 = {
      lng: parseFloat(startPosition.x),
      lat: parseFloat(startPosition.y),
      alt: parseFloat(startPosition.z)
    }
    const p2 = {
      lng: parseFloat(endPosition.x),
      lat: parseFloat(endPosition.y),
      alt: parseFloat(endPosition.z)
    }
    const start = Cesium.JulianDate.now()
    const stop = Cesium.JulianDate.addSeconds(start, seconds, new Cesium.JulianDate())
    const stop_ = Cesium.JulianDate.addSeconds(start, seconds + 5000000, new Cesium.JulianDate())
    if (typeof model.availability !== 'undefined' && typeof model.availability.addInterval !== 'undefined') {
      if (model.availability.length > 2) {
        model.availability.removeInterval(model.availability.get(0))
      }
      model.availability.addInterval(
        new Cesium.TimeInterval({
          start: start,
          stop: stop_
        })
      )
      model.position.addSample(start, Cesium.Cartesian3.fromDegrees(p1.lng, p1.lat, p1.alt))
      model.position.addSample(stop, Cesium.Cartesian3.fromDegrees(p2.lng, p2.lat, p2.alt))
      model.position.addSample(stop_, Cesium.Cartesian3.fromDegrees(p2.lng, p2.lat, p2.alt))
    } else {
      model.availability = new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
          start: start,
          stop: stop_
        })
      ])
      const property = new Cesium.SampledPositionProperty()
      property.addSample(start, Cesium.Cartesian3.fromDegrees(p1.lng, p1.lat, p1.alt))
      property.addSample(stop, Cesium.Cartesian3.fromDegrees(p2.lng, p2.lat, p2.alt))
      property.addSample(stop_, Cesium.Cartesian3.fromDegrees(p2.lng, p2.lat, p2.alt))
      model.position = property
    }
  }
}
