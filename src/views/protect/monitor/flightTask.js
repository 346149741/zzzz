// import * as maputil from '@/components/CesiumMap/Utils.js'
// 未完成，可演示

export default class FlightTask {
  constructor(opts) {
    this.map3d = opts.map
    // this.eventLyr = new GeoJsonLayer(this.map3d)
    if (!this.map3d.viewer.timeline) {
      throw '没有开启时间轴,该功能暂不可用!'
    }
    this.opts = opts
    //  动画
    //  播放完成后显示历史轨迹
  }

  //   readEventData(data, detailCOM) {
  //     data.forEach((item) => {
  //       // eslint-disable-next-line new-cap
  //       item.popResult = {
  //         feaMethods: detailCOM
  //       }
  //       var img = '/upload/legend/20200624/29971eaea52b486486b4d8421f5bfa6c.png'
  //       var legendList
  //       if (item.showStyle2d) {
  //         legendList = JSON.parse(item.showStyle2d)
  //       }

  //       this.eventLyr.insertData(item.lngLatAlt, item, {
  //         billboardIcon: {
  //           url: (function(state) {
  //             for (var i in legendList) {
  //               if (i === state) {
  //                 img = legendList[i]['image']
  //                 break
  //               }
  //             }
  //             return img
  //           })(item.handleState),
  //           color: flashPoint(Cesium.Color.WHITE)
  //         }
  //       })
  //     })
  //   }

  addTrail(data, imgData, getPositionInfo) {
    if (data.length === 0) return

    const start = Cesium.JulianDate.fromDate(new Date(data[0].positionTime), new Cesium.JulianDate())
    const stop = Cesium.JulianDate.fromDate(new Date(data[data.length - 1].positionTime), new Cesium.JulianDate())
    this.opts.time = {
      start,
      stop
    }

    this.map3d.viewer.clock.startTime = start.clone()
    this.map3d.viewer.clock.stopTime = stop.clone()
    this.map3d.viewer.clock.currentTime = start.clone()
    this.map3d.viewer.clock.multiplier = 50
    this.map3d.viewer.clock.clockRange = Cesium.ClockRange.CLAMPED // 达到终止时间后停止
    // 固定时间轴
    this.map3d.viewer.timeline.zoomTo(start, stop)

    this.opts.position = new Cesium.SampledPositionProperty()
    data.forEach((cell) => {
      const time = Cesium.JulianDate.fromDate(new Date(cell.positionTime), new Cesium.JulianDate())
      if (typeof (cell.lngLatAlt) === 'string') {
        cell.lngLatAlt = JSON.parse(cell.lngLatAlt)
      }
      // const coords = cell.lngLatAlt.geometry.coordinates
      const pt = Cesium.Cartesian3.fromDegrees(cell.lngLatAlt[0], cell.lngLatAlt[1], cell.lngLatAlt[2])
      this.opts.position.addSample(time, pt)
    })

    const entity = {
      show: false,
      availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval(this.opts.time)]),
      position: this.opts.position,
      orientation: new Cesium.VelocityOrientationProperty(this.opts.position),
      // model: {
      //   uri: process.env.BASE_URL + '/models/CesiumAir/Cesium_Air.glb', // 加载模型
      //   minimumPixelSize: 128 // 指定模型大小
      // },
      path: {
        show: true, // 显示轨迹
        resolution: 1,
        material: Cesium.Color.GREEN,
        width: 3
      }
    }

    // 只用三维模型
    entity.model = {}
    entity.model.uri = 'http://localhost:8090/models/CesiumAir/Cesium_Air.glb'
    entity.model.minimumPixelSize = 64

    this.entity = this.map3d.viewer.entities.add(entity)

    this.entity.position.setInterpolationOptions({
      interpolationDegree: 2,
      interpolationAlgorithm: Cesium.HermitePolynomialApproximation
    })
    // var that = this
    // var entityInfo = {
    //   yaw: data[0] ? data[0].yaw.toFixed(3) : '',
    //   pitch: data[0] ? data[0].pitch.toFixed(3) : '',
    //   roll: data[0] ? data[0].roll.toFixed(3) : ''
    // }
    // this.map3d.viewer.clock.onTick.addEventListener(function() {
    //   if (that.map3d.viewer.clock.shouldAnimate) {
    //     var position = that.entity.position.getValue(that.map3d.viewer.clock.currentTime)
    //     // var position84 = maputil.Cartesian3_to_WGS84(position)
    //     // 获取未线性时的具体属性
    //     for (var i = 0; i < data.length; i++) {
    //       const time = Cesium.JulianDate.fromDate(new Date(data[i].positionTime), new Cesium.JulianDate())
    //       if (time.dayNumber === that.map3d.viewer.clock.currentTime.dayNumber && time.secondsOfDay === parseInt(that.map3d.viewer.clock.currentTime.secondsOfDay)) {
    //         entityInfo.yaw = data[i].yaw.toFixed(3)
    //         entityInfo.pitch = data[i].pitch.toFixed(3)
    //         entityInfo.roll = data[i].roll.toFixed(3)
    //         break
    //       }
    //     }
    //     // getPositionInfo(position84.lnglathei, entityInfo)
    //   }
    // })
  }

  play() {
    if (this.entity) {
      this.map3d.viewer.clock.shouldAnimate = true
      this.entity.show = true
      this.lockView(this.opts.lockScanView || false)
    }
  }

  pause() {
    if (this.entity) {
      this.map3d.viewer.clock.shouldAnimate = false
    }
  }

  stop() {
    if (this.entity) {
      this.map3d.viewer.clock.shouldAnimate = false
      this.map3d.viewer.clock.currentTime = this.map3d.viewer.clock.startTime.clone()
      this.entity.show = false
    }
  }

  speed(num) {
    this.map3d.viewer.clock.multiplier = num
  }

  lockView(flag) {
    this.opts.lockScanView = flag
    if (flag) {
      this.map3d.viewer.trackedEntity = this.entity
    } else {
      this.map3d.viewer.trackedEntity = undefined
    }
  }

  showPath(flag) {
    if (this.entity) {
      this.entity.path.show = flag
    }
  }

  destroyEntities() {
    this.stop()
    this.map3d.viewer.entities.remove(this.entity)
  }

  //   moveToItem(id) {
  //     this.eventLyr.zoomToEntity(id)
  //   }

  // demo
  init(trackList) {
    this.viewer.clock.shouldAnimate = true

    const start = Cesium.JulianDate.fromDate(new Date(trackList[0].time), new Cesium.JulianDate())
    const stop = Cesium.JulianDate.fromDate(new Date(trackList[trackList.length - 1].time), new Cesium.JulianDate())

    this.opts.time = {
      start,
      stop
    }

    this.viewer.clock.startTime = start.clone()
    this.viewer.clock.stopTime = stop.clone()
    this.viewer.clock.currentTime = start.clone()

    this.viewer.clock.multiplier = this.opts.speed || 1
    this.viewer.clock.clockRange = this.opts.loop ? Cesium.ClockRange.LOOP_STOP : Cesium.ClockRange.CLAMPED

    // 固定时间轴
    this.viewer.timeline.zoomTo(start, stop)

    const position = new Cesium.SampledPositionProperty()
    trackList.forEach((cell) => {
      const time = Cesium.JulianDate.fromDate(new Date(cell.time), new Cesium.JulianDate())
      const pt = Cesium.Cartesian3.fromDegrees(cell.lng, cell.lat, cell.alt)
      position.addSample(time, pt)
    })

    let entity = {
      availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
        start: start,
        stop: stop
      })]),
      position: position,
      orientation: new Cesium.VelocityOrientationProperty(position)
    }
    entity = {
      ...entity,
      ...this.opts.style
    }
    this.entity = this.viewer.entities.add(entity)

    this.entity.position.setInterpolationOptions({
      interpolationDegree: 5,
      interpolationAlgorithm: this.opts.originalLine ? Cesium.LinearApproximation : Cesium.LagrangePolynomialApproximation
    })
  }

  // 计算转弯
  getBezierSpline(pt1, pt2, pt3) {
    var npt1 = this.getPointForLineAlong(pt2, pt1, 300, 0.2)
    var npt2 = this.getPointForLineAlong(pt2, pt1, 200, 0.1)

    var npt3 = this.getPointForLineAlong(pt2, pt3, 200, 0.1)
    var npt4 = this.getPointForLineAlong(pt2, pt3, 300, 0.2)

    var line = turf.lineString([npt1, npt2, pt2, npt3, npt4])
    var feature = turf.bezierSpline(line, { sharpness: 0.5 })

    var lonlats = []
    var h2 = pt2[2]
    for (var i = 0; i < feature.geometry.coordinates.length; i++) {
      var item = feature.geometry.coordinates[i]
      lonlats.push(Number(item[0]))
      lonlats.push(Number(item[1]))
      lonlats.push(h2)
    }
    var positions = Cesium.Cartesian3.fromDegreesArrayHeights(lonlats)

    // this.viewer.entities.add({ polyline: { positions: positions,  width: 5,   } }); //test

    return positions
  }
  // 求在P1点到P2点的线上，距离P1点len米长度的点
  getPointForLineAlong(p1, p2, len, bl) {
    var point1 = Cesium.Cartesian3.fromDegrees(p1[0], p1[1], p1[2] || 0)
    var point2 = Cesium.Cartesian3.fromDegrees(p2[0], p2[1], p2[2] || 0)

    var alllen = Cesium.Cartesian3.distance(point1, point2) // 米
    if (len === 0 || len >= alllen * bl) len = alllen * bl

    var line = turf.lineString([p1, p2])
    var along1 = turf.along(line, len / 1000, { units: 'kilometers' })
    var jd = along1.geometry.coordinates[0]
    var wd = along1.geometry.coordinates[1]

    var h1 = p1[2]
    var h2 = p2[2]
    var height = h1 + (h2 - h1) * len / alllen

    return [jd, wd, height]
  }
}
