import View from 'ol/View'
import Map from 'ol/Map'
import {
  getCenter
} from 'ol/extent'
import {
  transform,
  transformExtent
} from 'ol/proj'
import {
  defaults as defaultInteractions
} from 'ol/interaction'
import {
  defaults as defaultControls,
  ScaleLine
} from 'ol/control.js'
import getBaseLayers, {
  customBaseLayer
} from './BaseLayers'
import 'ol/ol.css'
import CoordsTransform from '../utils/coordsTransform'
import Overlay from 'ol/Overlay'

/**
 * 初始化地图
 * tip：地图内部按照3857数据传输，入参均为4326坐标
 * @param {Object} mapId 地图div的ID
 * @param {Object} options 地图初始化可选项
 */
function initMap(mapId, options) {
  const opts = {
    center: options.center || (options.extent && getCenter(options.extent)) || [116.403825, 39.914806],
    baseLayerType: options.baseLayerType || 'google',
    zoom: options.zoom || 3,
    minZoom: options.minZoom || 3,
    zoomControl: true,
    projection: 'EPSG:3857',
    // extent: options.extent || [73.55, 3.85, 135.08333333333334, 53.55],111.59362792968749
    extent: options.extent || [111.58869266510008, 29.05631975939791, 111.6053009033203, 29.067648406204654],
    viewLimit: options || true,
    notSetCursor: !!options.notSetCursor
  }

  opts.baseLayers = getBaseLayers(opts.baseLayerType)
  opts.center_sys = transform(opts.center, 'EPSG:4326', 'EPSG:3857')
  opts.extent_sys = transformExtent(opts.extent, 'EPSG:4326', 'EPSG:3857')

  this.mapOptions = opts

  // 添加各种控件
  const controlsArr = []
  if (options.controls && options.controls.ScaleLine) {
    const opts = {
      ...options.controls.ScaleLine
    }
    const scaleLine = new ScaleLine(opts)
    controlsArr.push(scaleLine)
  }
  const map = new Map({
    controls: controlsArr,
    interactions: defaultInteractions({
      altShiftDragRotate: false,
      pinchRotate: false,
      doubleClickZoom: false,
      shiftDragZoom: false
    }),
    layers: [
      opts.baseLayers.Normal,
      opts.baseLayers.Satellite
    ],
    target: mapId,
    view: new View({
      center: opts.center_sys,
      zoom: opts.zoom,
      minZoom: opts.minZoom,
      projection: opts.projection,
      extent: opts.extent_sys
    })
  })

  // 定位到指定位置
  map.getView().fit(opts.extent_sys)
  // 设置是否无限缩放
  opts.viewLimit && map.getView().setMinZoom(map.getView().getZoom())
  // 设置经过元素的时候变为小手，增加一个判断，不设置notSetCursor或设置false。不设置鼠标样式（notSetCursor）设置为true时，不执行函数
  !opts.notSetCursor && setCursorStyle(map)
  return map
}

function setCursorStyle(map) {
  // 鼠标经过元素样式
  map.on('pointermove', e => {
    const pixel = map.getEventPixel(e.originalEvent)
    const feature = map.forEachFeatureAtPixel(pixel, function(feature) {
      return feature
    })
    if (feature === undefined) {
      map.getTargetElement().style.cursor = 'auto'
    } else {
      map.getTargetElement().style.cursor = 'pointer'
    }
  })
}

export default class NewMap {
  constructor(mapId, options = {}) {
    this.newMap = initMap.call(this, mapId, options)
    //  创建地图基本的overlay
    const _overlay = new Overlay({
      offset: [0, 0],
      positioning: 'bottom-center'
    })
    this.newMap.addOverlay(_overlay)
    this.newMap._overlay = _overlay
  }

  zoomIn() {
    const view = this.getView()
    view.setZoom(view.getZoom() + 1)
  }

  zoomOut() {
    const view = this.getView()
    view.setZoom(view.getZoom() - 1)
  }

  setMapOverlay(ele, coords) {
    this.newMap._overlay.setElement(ele)
    this.newMap._overlay.setPosition(coords)
  }

  hideMapOverlay() {
    this.newMap._overlay.setPosition(undefined)
  }

  addLayerToMap(layer) {
    this.newMap.addLayer(layer)
  }

  removeLayer(layer) {
    this.newMap.removeLayer(layer)
  }

  getLayers() {
    return this.newMap.getLayers()
  }

  getLayerGroup() {
    return this.newMap.getLayerGroup()
  }

  updateSize() {
    this.newMap.updateSize()
  }

  changeBaseLayer(normalFlag) {
    this.mapOptions.baseLayers.Normal.setVisible(normalFlag)
    this.mapOptions.baseLayers.Satellite.setVisible(!normalFlag)
    if (this.mapOptions.customLayer) {
      this.removeLayer(this.mapOptions.customLayer)
    }
  }

  setCustomLayer(lyrCfg) {
    this.mapOptions.baseLayers.Normal.setVisible(false)
    this.mapOptions.baseLayers.Satellite.setVisible(false)
    // 移除上次添加的图层
    if (this.mapOptions.customLayer) {
      this.removeLayer(this.mapOptions.customLayer)
    }
    this.mapOptions.customLayer = customBaseLayer(lyrCfg)
    this.addLayerToMap(this.mapOptions.customLayer)
  }

  setGridVisible(val) {
    this.mapOptions.baseLayers.Satellite.getLayers().getArray()[1].setVisible(val)
  }

  /**
   * 设置地图的范围
   * @param extent 地图范围
   * @returns {number} 返回当前范围的分辨率
   */
  setMapExtent(extent) {
    if (extent instanceof Array && extent.length === 4) {
      extent = transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
      this.newMap.getView().fit(extent, {
        nearest: true
      })
    }
    return this.newMap.getView().getResolution()
  }

  setView(view) {
    this.newMap.setView(view)
  }

  getView() {
    return this.newMap.getView()
  }

  fit(geometryOrExtent, opt_options = { maxZoom: 19, duration: 800 }) {
    this.getView().fit(geometryOrExtent, opt_options)
  }

  flyTo(coords) {
    this.newMap.getView().animate({ // 只设置需要的属性即可
      center: coords, // 中心点
      zoom: 17, // 级别
      rotation: undefined, // 缩放完成view视图旋转弧度
      anchor: 0, // 在旋转或分辨率动画期间保持固定的可选锚点 不需要设置，
      duration: 1000 // 缩放持续时间，默认不需要设置
    })
  }

  limitViewExtent(extent, resolution) {
    // wait for check
    if (extent instanceof Array && extent.length === 4) {
      extent = transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
      this.newMap.setView(new View({
        center: this.mapOptions.center,
        zoom: this.mapOptions.zoom,
        projection: this.mapOptions.projection,
        minZoom: this.mapOptions.minZoom,
        extent: extent,
        maxResolution: resolution
      }))
      this.newMap.updateSize()
    }
  }

  getTarget() {
    return this.newMap.getTarget()
  }

  getTargetElement() {
    return this.newMap.getTargetElement()
  }

  fitToFeature(fea, opts = { maxZoom: 19, duration: 800 }) {
    fea && this.newMap.getView().fit(fea.getGeometry(), opts)
  }

  addInteraction(interaction) {
    this.newMap.addInteraction(interaction)
  }

  removeInteraction(interaction) {
    this.newMap.removeInteraction(interaction)
  }

  bindLeftClickFuc(fuc) {
    this.newMap.on('click', fuc)
  }

  bindSimpleClickFuc() {
    const _this = this
    this.newMap.on('click', function(event) {
      // 清除非一直显示的overlay
      _this.newMap.getOverlays().getArray().forEach(item => {
        if (!item.get('always')) item.setPosition(undefined)
      })

      const feas = _this.newMap.getFeaturesAtPixel(event.pixel)
      if (feas === null || feas.length === 0) return
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

  addMouseWheelLngLat(el) {
    let coordSwitchFuc = CoordsTransform.unTransform
    switch (this.mapOptions.baseLayerType) {
      case 'google':
      case 'gaode':
        coordSwitchFuc = CoordsTransform.gcj02_wgs
        break
      case 'baidu':
        coordSwitchFuc = CoordsTransform.bd09_wgs
        break
    }
    this.newMap.on('pointermove', e => {
      // 先web墨卡托 再转火星
      const [lng, lat] = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326')
      const res = coordSwitchFuc(lng, lat)
      el.innerHTML = res.map(item => item.toFixed(6)).join(',')
    })
  }
}
