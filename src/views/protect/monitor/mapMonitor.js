import NewMap3d from '@/components/CesiumMap/Map.js'
import FlightTask from './flightTask'

export default class MapPerimeter {
  constructor(opts) {
    // opts.maxzoom = 1500
    this.map = new NewMap3d(opts.id, opts)
    this.addS3MData()
    this.initFlyTaskClass()
  }

  initData() {

  }

  addS3MData() {
    const scene = this.map.viewer.scene
    // 添加S3M图层服务
    // scene.open('http://localhost:8090/iserver/services/3D-hn/rest/realspace')
    scene.open('http://localhost:8090/iserver/services/3D-hn-2/rest/realspace')
  }

  initFlyTaskClass() {
    const taskObj = new FlightTask({
      map: this.map,
      lockScanView: false
    })
    // 数据随便造的，演示前需重新选点
    const data = [
      { lngLatAlt: [111.59491539001465, 29.060896382468485, 100], positionTime: '2020/9/11 09:00:00', yaw: 0, pitch: 0, roll: 0 },
      { lngLatAlt: [111.5988850593567, 29.063428443192734, 100], positionTime: '2020/9/11 09:02:00', yaw: 0, pitch: 0, roll: 0 },
      { lngLatAlt: [111.59918546676637, 29.063072082850937, 120], positionTime: '2020/9/11 09:04:00', yaw: 0, pitch: 0, roll: 0 },
      { lngLatAlt: [111.59538745880127, 29.060464988145398, 130], positionTime: '2020/9/11 09:07:00', yaw: 0, pitch: 0, roll: 0 },
      { lngLatAlt: [111.59575223922731, 29.059789758624902, 120], positionTime: '2020/9/11 09:12:00', yaw: 0, pitch: 0, roll: 0 }
      // { lngLatAlt: [111.59978628158568, 29.06269696537096, 110], positionTime: '2020/9/11 09:15:00', yaw: 0, pitch: 0, roll: 0 },
      // { lngLatAlt: [111.60073041915894, 29.06340968741597, 120], positionTime: '2020/9/11 09:20:00', yaw: 0, pitch: 0, roll: 0 },
      // { lngLatAlt: [111.60152435302734, 29.062997059464138, 130], positionTime: '2020/9/11 09:22:00', yaw: 0, pitch: 0, roll: 0 },
      // { lngLatAlt: [111.59624576568602, 29.05952716817275, 130], positionTime: '2020/9/11 09:24:00', yaw: 0, pitch: 0, roll: 0 },
      // { lngLatAlt: [111.59686803817748, 29.058945715506084, 110], positionTime: '2020/9/11 09:30:00', yaw: 0, pitch: 0, roll: 0 },
      // { lngLatAlt: [111.60210371017455, 29.062603185787708, 110], positionTime: '2020/9/11 09:30:00', yaw: 0, pitch: 0, roll: 0 },
      // { lngLatAlt: [111.60283327102658, 29.06192797027012, 110], positionTime: '2020/9/11 09:30:00', yaw: 0, pitch: 0, roll: 0 },
      // { lngLatAlt: [111.59834861755371, 29.058683122904455, 110], positionTime: '2020/9/11 09:30:00', yaw: 0, pitch: 0, roll: 0 },
      // { lngLatAlt: [111.5995717048645, 29.05817669242714, 110], positionTime: '2020/9/11 09:30:00', yaw: 0, pitch: 0, roll: 0 },
      // { lngLatAlt: [111.60276889801024, 29.060690063669597, 110], positionTime: '2020/9/11 09:30:00', yaw: 0, pitch: 0, roll: 0 }
    ]
    taskObj.addTrail(data)
    taskObj.play()
    taskObj.showPath()
  }
}
