import Draw from 'ol/interaction/Draw.js'
import {
  Vector as VectorSource
} from 'ol/source.js'
import {
  Vector as VectorLayer
} from 'ol/layer.js'
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style
} from 'ol/style.js'
import Overlay from 'ol/Overlay'
import Polygon from 'ol/geom/Polygon'
import LineString from 'ol/geom/LineString'
import Feature from 'ol/Feature'
import {
  getArea,
  getLength
} from 'ol/sphere'
import {
  unByKey
} from 'ol/Observable'
import '../styles/olmap.scss'

// 绘制到地图上的样式
const LAYERSTYLE = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.2)'
  }),
  stroke: new Stroke({
    color: '#ffcc33',
    width: 2
  }),
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({
      color: '#ffcc33'
    })
  })
})

// 绘制时显示的样式
const DRAWINGSTYLE = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.2)'
  }),
  stroke: new Stroke({
    color: 'rgba(0, 0, 0, 0.5)',
    lineDash: [10, 10],
    width: 2
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0.7)'
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    })
  })
})

export default class MapPublicTools {
  constructor(opts = {}) {
    this._opts = opts
    this.source = new VectorSource()
    this.vector = new VectorLayer({
      source: this.source,
      style: LAYERSTYLE,
      zIndex: 999999
    })
    opts.map.addLayerToMap(this.vector)

    window._tst = this
    // 内部对象 绘图-点
    this._draw = undefined
  }

  /**
   * 点标记开启
   */
  handleStartLabel() {
    if (this._draw !== undefined) {
      this._handleEndDraw()
    }
    this._draw = new Draw({
      source: this.source,
      type: 'Point'
    })
    this._draw.on('drawend', res => {
      this._opts.map.removeInteraction(res.target)
    })
    this._opts.map.addInteraction(this._draw)
  }

  /**
   * 开启划线功能
   */
  handleStartLine() {
    this._handleEndDraw()
    this._measuring('LineString')
  }

  handleStartArea() {
    this._handleEndDraw()
    this._measuring('Polygon')
  }

  _measuring(typeSelect) {
    var _that = this
    var map = this._opts.map.newMap

    // 创建一个当前要绘制的对象
    var sketch = new Feature()
    // 创建一个帮助提示框对象
    var helpTooltipElement
    // 创建一个帮助提示信息对象
    var helpTooltip
    // 创建一个测量提示框对象
    var measureTooltipElement
    // 创建一个测量提示信息对象
    var measureTooltip
    // 继续绘制多边形的提示信息
    var continuePolygonMsg = '单击确定点,双击结束'
    // 继续绘制线段的提示信息
    var continueLineMsg = '单击确定点,双击结束'
    // 定义一个控制鼠标点击次数的变量
    var count = 0

    // 鼠标移动触发的函数
    var pointerMoveHandler = function(evt) {
      // Indicates if the map is currently being dragged.
      // Only set for POINTERDRAG and POINTERMOVE events. Default is false.
      // 如果是平移地图则直接结束
      if (evt.dragging) {
        return
      }
      // 帮助提示信息
      var helpMsg = '左键开始!'

      if (sketch) {
        // Get the feature's default geometry.
        // A feature may have any number of named geometries.
        // 获取绘图对象的几何要素
        var geom = sketch.getGeometry()
        // 如果当前绘制的几何要素是多边形，则将绘制提示信息设置为多边形绘制提示信息
        // 如果当前绘制的几何要素是多线段，则将绘制提示信息设置为多线段绘制提示信息
        if (geom instanceof Polygon) {
          helpMsg = continuePolygonMsg
        } else if (geom instanceof LineString) {
          helpMsg = continueLineMsg
        }
      }
      // 设置帮助提示要素的内标签为帮助提示信息
      helpTooltipElement.innerHTML = helpMsg
      // 设置帮助提示信息的位置
      // The coordinate in view projection corresponding to the original browser event.
      helpTooltip.setPosition(evt.coordinate)
      // 移除帮助提示要素的隐藏样式
      helpTooltipElement.classList.remove('hidden')
    }
    // 触发pointermove事件
    this._opts.map.newMap.on('pointermove', pointerMoveHandler)

    // 当鼠标移除地图视图的时为帮助提示要素添加隐藏样式
    this._opts.map.newMap.getViewport().addEventListener('mouseout', function() {
      helpTooltipElement.classList.add('hidden')
    })

    // 定义一个交互式绘图对象
    var draw = _that._draw

    // 添加交互式绘图对象的函数
    function addInteraction() {
      // 获取当前选择的绘制类型
      var type = typeSelect
      // 创建一个交互式绘图对象
      draw = new Draw({
        // 绘制的数据源
        source: _that.source,
        // 绘制类型
        type: type,
        // 样式
        style: DRAWINGSTYLE
      })

      // 将交互绘图对象添加到地图中
      map.addInteraction(draw)
      // 创建测量提示框
      createMeasureTooltip()
      // 创建帮助提示框
      createHelpTooltip()

      // 定义一个事件监听
      var listener
      // 绘制开始事件
      draw.on('drawstart', function(evt) {
        // The feature being drawn.
        sketch = evt.feature
        // 提示框的坐标
        var tooltipCoord = evt.coordinate
        // 监听几何要素的change事件

        listener = sketch.getGeometry().on('change', function(evt) {
          // 获取绘制的几何对象
          var geom = evt.target
          // 定义一个输出对象，用于记录面积和长度
          var output
          if (geom instanceof Polygon) {
            // 输出多边形的面积
            output = formatArea(geom)
            // 获取多变形内部点的坐标
            tooltipCoord = geom.getInteriorPoint().getCoordinates()
          } else if (geom instanceof LineString) {
            // 输出多线段的长度
            output = formatLength(geom)
            // 获取多线段的最后一个点的坐标
            tooltipCoord = geom.getLastCoordinate()
          }

          // 设置测量提示框的内标签为最终输出结果
          measureTooltipElement.innerHTML = output
          // 设置测量提示信息的位置坐标
          measureTooltip.setPosition(tooltipCoord)
        })
      }, this)

      // 绘制结束事件
      draw.on('drawend', function(evt) {
        count = 0
        // 设置测量提示框的样式
        measureTooltipElement.className = 'tooltip tooltip-static'
        // Set the offset for this overlay.
        // 设置偏移量
        measureTooltip.setOffset([0, -7])
        // 清空绘制要素
        sketch = null
        // 清空测量提示要素
        measureTooltipElement = null
        // 创建测量提示框
        createMeasureTooltip()
        // 移除事件监听
        unByKey(listener)
        // 移除地图单击事件
        unByKey(singleClickKey)
        map.removeInteraction(draw)
        map.removeOverlay(helpTooltip)
        map.removeOverlay(measureTooltip)
      }, this)

      // 地图单击事件
      var singleClickKey
      if (type === 'LineString') {
        singleClickKey = map.on('singleclick', mapSingleClick)
      }
    }

    // 地图单击事件
    function mapSingleClick(evt) {
      // 设置测量提示信息的位置坐标，用来确定鼠标点击后测量提示框的位置
      measureTooltip.setPosition(evt.coordinate)
      // 如果是第一次点击，则设置测量提示框的文本内容为起点
      if (count === 0) {
        measureTooltipElement.innerHTML = '起点'
      }
      // 更改测量提示框的样式，使测量提示框可见
      measureTooltipElement.className = 'tooltip tooltip-static'
      // 创建测量提示框
      createMeasureTooltip()
      // 点击次数增加
      count++
    }

    // 创建帮助提示框
    function createHelpTooltip() {
      // 如果已经存在帮助提示框则移除
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement)
      }
      // 创建帮助提示要素的div
      helpTooltipElement = document.createElement('div')
      // 设置帮助提示要素的样式
      helpTooltipElement.className = 'tooltip hidden'
      // 创建一个帮助提示的覆盖标注
      helpTooltip = new Overlay({
        id: `measure_${parseInt(Math.random() * 1000)}`,
        element: helpTooltipElement,
        offset: [5, 0],
        positioning: 'center-left'
      })
      helpTooltip.set('always', true)
      // 将帮助提示的覆盖标注添加到地图中
      map.addOverlay(helpTooltip)
    }

    // 创建测量提示框
    function createMeasureTooltip() {
      // 创建测量提示框的div
      measureTooltipElement = document.createElement('div')
      measureTooltipElement.setAttribute('id', 'lengthLabel')
      // 设置测量提示要素的样式
      measureTooltipElement.className = 'tooltip tooltip-measure'
      // 创建一个测量提示的覆盖标注
      measureTooltip = new Overlay({
        id: `measure_${parseInt(Math.random() * 1000)}`,
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
      })
      measureTooltip.set('always', true)
      // 将测量提示的覆盖标注添加到地图中
      map.addOverlay(measureTooltip)
    }

    // 格式化测量长度
    function formatLength(line) {
      // 定义长度变量
      var length = Math.round(getLength(line) * 100) / 100

      // 定义输出变量
      var output
      // 如果长度大于1000，则使用km单位，否则使用m单位
      if (length > 1000) {
        output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km' // 换算成KM单位
      } else {
        output = (Math.round(length * 100) / 100) + ' ' + 'm' // m为单位
      }
      return output
    }

    // 格式化测量面积
    function formatArea(polygon) {
      // 定义面积变量
      var area = getArea(polygon)
      // 定义输出变量
      var output
      // 当面积大于10000时，转换为平方千米，否则为平方米
      if (area > 10000) {
        output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>'
      } else {
        output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>'
      }
      return output
    }

    addInteraction()
  }

  _handleEndDraw() {
    this._opts.map.removeInteraction(this._draw)
  }

  /**
   * 清空所有的标注
   */
  clearAllMarks() {
    this.source.clear(false)
    const arr = this._opts.map.newMap.getOverlays().getArray().filter(item => {
      const id = item.getId()
      return id && id.startsWith('measure_')
    })
    arr.forEach(item => {
      this._opts.map.newMap.removeOverlay(item)
    })
  }
}
