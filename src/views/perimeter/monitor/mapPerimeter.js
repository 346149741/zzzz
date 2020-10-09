import NewMap from '@/components/OLMap/core/MapCore.js'
import VecLayer from '@/components/OLMap/core/VecLayer'
import {
  Perimeter_Com,
  PerimeterCamera_Com
} from '@/components/PopupComponents'
import {
  Style,
  Stroke,
  Circle,
  Fill,
  Icon
} from 'ol/style.js'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import deploymentAPI from '@/api/perimeter/deployment.js'
import CameraAPI from '@/api/base/camera'

const styles = {
  // 正常
  '00': new Style({
    stroke: new Stroke({
      color: 'rgba(27, 250, 179, 1)',
      width: 4
    }),
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: 'rgba(27, 250, 179, 1)'
      }),
      stroke: new Stroke({
        color: 'rgba(255, 255, 255, 1)',
        width: 2
      })
    })
  }),
  // 故障
  'fault': new Style({
    stroke: new Stroke({
      color: 'rgba(254, 0, 0, 1)',
      width: 4
    }),
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: 'rgba(254, 0, 0, 1)'
      }),
      stroke: new Stroke({
        color: 'rgba(255, 255, 255, 1)',
        width: 2
      })
    })
  }),
  // 报警
  'warning': new Style({
    stroke: new Stroke({
      color: 'rgba(248, 178, 30, 1)',
      width: 4
    }),
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: 'rgba(248, 178, 30, 1)'
      }),
      stroke: new Stroke({
        color: 'rgba(255, 255, 255, 1)',
        width: 2
      })
    })
  }),
  // 报警处理中
  'processing': new Style({
    stroke: new Stroke({
      color: 'rgba(249, 114, 32, 1)',
      width: 4
    }),
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: 'rgba(249, 114, 32, 1)'
      }),
      stroke: new Stroke({
        color: 'rgba(255, 255, 255, 1)',
        width: 2
      })
    })
  }),
  // 撤防
  '01': new Style({
    stroke: new Stroke({
      color: 'rgba(229, 226, 227, 1)',
      width: 4
    }),
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: 'rgba(229, 226, 227, 1)'
      }),
      stroke: new Stroke({
        color: 'rgba(255, 255, 255, 1)',
        width: 2
      })
    })
  }),
  // 旁路
  '02': new Style({
    stroke: new Stroke({
      color: 'rgba(31, 31, 31, 1)',
      width: 4
    }),
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: 'rgba(31, 31, 31, 1)'
      }),
      stroke: new Stroke({
        color: 'rgba(255, 255, 255, 1)',
        width: 2
      })
    })
  })
}
const imgStyle = new Style({
  image: new Icon({
    src: require('@/assets/terminal/摄像头.png')
  })
})
const cameraStyles = {
  'show': (feature, resolution) => {
    const value = imgStyle.getImage().getScale()
    const SCALE = resolution > 600 ? 0.4 : resolution > 300 ? 0.6 : resolution > 50 ? 0.75 : 1
    if (value !== SCALE) {
      imgStyle.getImage().setScale(SCALE)
    }
    return [imgStyle]
  },
  'hide': new Style({
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0)'
    })
  })
}
export default class MapPerimeter {
  constructor(opts) {
    this.map = new NewMap(opts.id, opts)
    this.checkedPerimeter = false // 选中防区
    this.bindSimpleClickFuc()
    this.initData()
  }

  async initData() {
    // 创建防区图层
    this.deploymentLineLayer = new VecLayer()
    this.deploymentLineLayer.setStyle(styles['normal'])
    this.map.addLayerToMap(this.deploymentLineLayer.lyr)
    // 查出所有摄像头
    this.cameraList = await this.getAllCamera()
    // 初始化一个与防区关联的摄像头列表
    this.showCameraList = {}
    // 添加防区数据，在添加的时候读取防区信息中的关联摄像头id，从cameraList拿到对应id信息，形成id->摄像头信息的列表showCameraList。
    await this.addDeployment()
    // 创建摄像头图传
    this.cameraLayer = new VecLayer()
    // 设置为展示样式
    this.cameraLayer.setStyle(cameraStyles['show'])
    this.map.addLayerToMap(this.cameraLayer.lyr)
    // 通过showCameraList向地图上添加摄像头
    this.addShowCamera()
  }
  // 获取所有摄像头
  async getAllCamera() {
    const {
      data: res
    } = await CameraAPI.getAll()
    const list = {}
    res.forEach(item => {
      list[item.id] = {
        id: item.id,
        lngLatAlt: item.lngLatAlt
      }
    })
    return list
  }
  // 构造与防区有关的摄像头数组
  inputShowCamera(monitorIds, cameraList = this.cameraList) {
    let ids = null
    try {
      ids = JSON.parse(monitorIds)
    } catch (e) {
      console.log(e)
    }
    if (ids && ids instanceof Array) {
      ids.forEach(item => {
        this.showCameraList[item] = cameraList[item]
      })
    }
  }
  // 添加防区
  async addDeployment() {
    const that = this
    const {
      data: res
    } = await deploymentAPI.all()
    res.forEach(item => {
      this.inputShowCamera(item.monitorIds)
      const feaStyle = styles[item.defenceStatus]
      // item.defenceStatus 布防状态： 00 布防；01 撤防；02 旁路
      // 需要item.location判断是否为是数组
      let coords
      try {
        if (item.location && item.location.length > 0) {
          coords = JSON.parse(item.location)
        }
      } catch (e) {
        console.log(e)
      }
      if (coords && coords instanceof Array) {
        let geom = null
        geom = new LineString(coords)
        geom.transform('EPSG:4326', 'EPSG:3857')
        const fea = new Feature({
          geometry: geom
        })
        fea.set('info', item)
        fea.setStyle(feaStyle)

        const startPoint = new Point(coords[0])
        startPoint.transform('EPSG:4326', 'EPSG:3857')
        const ptFeature = new Feature({
          geometry: startPoint
        })
        ptFeature.set('info', item)
        ptFeature.setStyle(feaStyle)

        // 要素绑定气泡和点击事件
        fea.set('eventsName', {
          l: 'showDetailInfo'
        })
        // 具体事件
        fea.on('showDetailInfo', e => {
          const info = e.target.get('info')
          const perimeterCom = new Perimeter_Com({
            info,
            layer: that.deploymentLineLayer,
            setStatus: that.setDeploymentStatus
          })
          e.event.map._overlay.setElement(perimeterCom.$el)
          let coords = e.event.coordinate
          if (e.target.getGeometry().getType() === 'Point') {
            coords = e.target.getGeometry().getCoordinates()
          }
          e.event.map._overlay.setPosition(coords)
          // 需要：隐藏不是该防区的所有要素
          const cameraIds = info.monitorIds
          this.showPerimeterCameras(cameraIds)
          that.checkedPerimeter = true // 切换为选中防区状态
        })

        this.deploymentLineLayer.addFeature(fea)
        this.deploymentLineLayer.addFeature(ptFeature)
      }
    })
  }
  // 根据防区状态，改变防区样式
  setDeploymentStatus(id, status, layer = this.deploymentLineLayer) {
    layer.getFeatures().forEach(item => {
      var info = item.get('info')
      if (info.id === id) {
        info.defenceStatus = status
        item.set('info', info)
        item.setStyle(styles[status])
      }
    })
  }

  // 地图展示所有与防区有关的摄像头
  addShowCamera(showCameraList = this.showCameraList) {
    for (const key in showCameraList) {
      if (showCameraList.hasOwnProperty(key)) {
        const item = showCameraList[key]
        let coords
        try {
          coords = JSON.parse(item.lngLatAlt)
        } catch (e) {
          console.log(e)
        }
        if (coords && coords instanceof Array) {
          let geom = null
          geom = new Point(coords)
          geom.transform('EPSG:4326', 'EPSG:3857')
          const fea = new Feature({
            geometry: geom
          })
          fea.set('info', item)
          // 要素绑定气泡和点击事件
          fea.set('eventsName', {
            l: 'showDetailInfo'
          })
          // 具体事件
          fea.on('showDetailInfo', e => {
            const info = e.target.get('info')
            const perCameraCom = new PerimeterCamera_Com({
              info
            })
            e.event.map._overlay.setElement(perCameraCom.$el)
            let coords = e.event.coordinate
            if (e.target.getGeometry().getType() === 'Point') {
              coords = e.target.getGeometry().getCoordinates()
            }
            e.event.map._overlay.setPosition(coords)
          })
          this.cameraLayer.addFeature(fea)
        }
      }
    }
  }
  // 根据传入摄像头id数组，显示数组中的摄像头，隐藏其它摄像头。不传值默认全部显示
  showPerimeterCameras(showIds = Object.keys(this.showCameraList)) {
    let ids = null
    if (!(showIds instanceof Array)) {
      try {
        ids = JSON.parse(showIds)
      } catch (e) {
        ids = []
      }
    } else {
      ids = showIds
    }

    this.cameraLayer.getFeatures().forEach(item => {
      const id = item.get('info').id
      if (ids.indexOf(id) !== -1) {
        // 包含，显示
        item.setStyle(cameraStyles['show'])
      } else {
        // 不包含，隐藏
        item.setStyle(cameraStyles['hide'])
      }
    })
  }

  bindSimpleClickFuc() {
    const that = this
    this.map.newMap.on('click', function(event) {
      // 清除非一直显示的overlay
      that.map.newMap.getOverlays().getArray().forEach(item => {
        if (!item.get('always')) item.setPosition(undefined)
      })

      const feas = that.map.newMap.getFeaturesAtPixel(event.pixel)
      if (feas === null || feas.length === 0) {
        if (that.checkedPerimeter) {
          // 选中防区状态切换为未选中状态，需要显示所有摄像头
          that.showPerimeterCameras()
          that.checkedPerimeter = false
        }
        return
      }
      // 多个元素的话取最上层的那个
      let feature = feas[0]
      // 对聚合图层进行特殊处理
      if (feature.get('features')) {
        feature = feature.get('features')[0]
      }
      const eventsName = feature.get('eventsName')
      if (eventsName && eventsName.hasOwnProperty('l')) {
        feature.dispatchEvent({
          type: eventsName.l,
          event: event
        })
      }
    })
  }
}
