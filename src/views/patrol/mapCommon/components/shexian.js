import {
  transform
} from 'ol/proj'
/*
 * 射线图
 */
export function parseShexianRender(map, path) {
  if (document.getElementById('canvasDiv')) {
    document.getElementById('canvasDiv').remove()
  }

  var _option = {
    lineWidth: 3,
    pointRadius: 3,
    pathPointRadius: 2,
    rgbaLineColor: 'rgba(255,229,153,0.6)',
    rgbaPointColor: 'rgba(255,255,0,0.8)',
    pathPointColor: 'rgba(250,250,250,0.8)',

    path: path
  }
  new MigrationLine(map, _option)
}
/*
 * 射线图构造函数
 */

/**
 * 射线图
 */
function MigrationLine(map, options) {
  this._map = map
  this.options = options || {}
  this.path = options.path || []
  this.canvasDiv = document.getElementById('canvasDiv')
  if (!this.canvasDiv) {
    this.canvasDiv = document.createElement('div')
    this.canvasDiv.id = 'canvasDiv'
    this.canvasDiv.style.position = 'absolute'
    var dom = document.getElementsByClassName('ol-viewport')[0]
    this.canvasDiv.style.height = window.screen.height + 'px'
    this.canvasDiv.style.width = window.screen.width + 'px'
    this.canvasDiv.style.top = 0
    this.canvasDiv.style.left = 0
    dom.appendChild(this.canvasDiv)
  }

  this.lineWidth = this.options.lineWidth || 1 // 线粗细

  this.pointRadius = this.options.pointRadius || 1 // 点颜色

  this.rgbaLineColor = options.rgbaLineColor

  this.rgbaPointColor = options.rgbaPointColor

  this.pathPointColor = options.pathPointColor
  this.pathPointRadius = options.pathPointRadius
  this.init()
}
/*
 * 射线图初始化 创建两个canvas
 */
MigrationLine.prototype.init = function () {
  this.getCanvasIDline = document.getElementById('canvasIDline')
  if (!this.getCanvasIDline) {
    this.getCanvasIDline = document.createElement('canvas')
    this.getCanvasIDline.id = 'canvasIDline'
    this.getCanvasIDline.style.position = 'absolute'
    this.getCanvasIDline.height = parseInt(this.canvasDiv.style.height)
    this.getCanvasIDline.width = parseInt(this.canvasDiv.style.width)
    this.getCanvasIDline.style.top = 0
    this.getCanvasIDline.style.left = 0
    this.canvasDiv.appendChild(this.getCanvasIDline)
  }
  this.getCanvasIDpathpoint = document.getElementById('canvasIDpathpoint')
  if (!this.getCanvasIDpathpoint) {
    this.getCanvasIDpathpoint = document.createElement('canvas')
    this.getCanvasIDpathpoint.id = 'canvasIDpathpoint'
    this.getCanvasIDpathpoint.style.position = 'absolute'
    this.getCanvasIDpathpoint.height = parseInt(this.canvasDiv.style.height)
    this.getCanvasIDpathpoint.width = parseInt(this.canvasDiv.style.width)
    this.getCanvasIDpathpoint.style.top = 0
    this.getCanvasIDpathpoint.style.left = 0
    this.canvasDiv.appendChild(this.getCanvasIDpathpoint)
  }
  var me = this
  // 渲染全部完成

  this._map.once('postrender', function (e) {
    me.drawLine()

    me.drawpathPoint()
  })
  var pointerdragFun = function () {
    cancelAnimationFrame(me.timer2)
    var ctx1 = me.getCanvasIDline.getContext('2d')
    ctx1.clearRect(0, 0, document.getElementById('canvasDiv').offsetWidth, document.getElementById('canvasDiv').offsetHeight)
    var ctx2 = me.getCanvasIDpathpoint.getContext('2d')
    ctx2.clearRect(0, 0, document.getElementById('canvasDiv').offsetWidth, document.getElementById('canvasDiv').offsetHeight)
  }
  this._map.un('pointerdrag', pointerdragFun)
  this._map.on('pointerdrag', pointerdragFun)
  var moveendFun = function () {
    me.drawLine()
    me.drawpathPoint()
  }
  this._map.un('moveend', moveendFun)
  this._map.on('moveend', moveendFun)
  var movestartFun = function () {
    cancelAnimationFrame(me.timer2)
    var ctx1 = me.getCanvasIDline.getContext('2d')
    ctx1.clearRect(0, 0, document.getElementById('canvasDiv').offsetWidth, document.getElementById('canvasDiv').offsetHeight)
    var ctx2 = me.getCanvasIDpathpoint.getContext('2d')
    ctx2.clearRect(0, 0, document.getElementById('canvasDiv').offsetWidth, document.getElementById('canvasDiv').offsetHeight)
  }
  this._map.un('movestart', movestartFun)
  this._map.on('movestart', movestartFun)
}
/*
 * 地理坐标转化屏幕坐标
 */
MigrationLine.prototype.getcityxy = function (str) {
  var cityPoint = transform([parseFloat(str.longitude), parseFloat(str.latitude)], 'EPSG:4326', 'EPSG:3857') // 地理坐标系转化为投影坐标系

  return {
    x: this._map.getPixelFromCoordinate(cityPoint)[0],
    y: this._map.getPixelFromCoordinate(cityPoint)[1]
  }
}
/*
 * 画点 可闪烁
 */
MigrationLine.prototype.drawPoint = function (str) {
  var path = this.path
  var width = document.getElementById('canvasDiv').offsetWidth
  var height = document.getElementById('canvasDiv').offsetHeight
  var radius = 0
  var context = this.getCanvasIDpathpoint.getContext('2d')
  var that = this
  var draw = function () {
    for (var i = 0; i < path.length; i++) {
      var xy = that.getcityxy(path[i].start)
      context.beginPath()
      context.arc(xy.x, xy.y, radius, 0, Math.PI * 2)
      context.closePath()
      context.lineWidth = 1 // 线条宽度
      context.strokeStyle = 'rgba(250,0,0,1)' // 颜色
      context.stroke()
      radius += 0.008 // 每一帧半径增加0.1
      // 半径radius大于7时，重置为0
      if (radius > 7) {
        radius = 0
      }
    }
  }
  var render = function () {
    // 默认值为source-over
    var prev = context.globalCompositeOperation
    context.globalCompositeOperation = 'destination-in'
    context.globalAlpha = 0.95
    context.fillRect(0, 0, width, height)
    context.globalCompositeOperation = prev
    draw()
  }

  this.timer = requestAnimationFrame(function fn() {
    render(context)
    that.timer = requestAnimationFrame(fn)
  })
}
/*
 * 画线和点
 */
MigrationLine.prototype.drawLine = function () {
  var path = this.path
  var me = this
  var context = this.getCanvasIDline.getContext('2d')
  for (var i = 0; i < path.length - 1; i++) {
    var startxy = me.getcityxy(path[i])
    var endxy = me.getcityxy(path[i + 1])
    context.beginPath()
    context.moveTo(startxy.x, startxy.y)
    context.lineTo(endxy.x, endxy.y)
    context.lineWidth = me.lineWidth // 线条粗细
    context.strokeStyle = me.rgbaLineColor // 线颜色
    context.stroke()

    context.beginPath()
    context.arc(startxy.x, startxy.y, me.pointRadius, 0, Math.PI * 2) // 点大小
    context.arc(endxy.x, endxy.y, me.pointRadius, 0, Math.PI * 2)
    context.fillStyle = me.rgbaPointColor // 点颜色
    context.fill()
  }
}

/*
 * 线上移动的点
 */
MigrationLine.prototype.drawpathPoint = function () {
  var path = this.path
  var width = document.getElementById('canvasDiv').offsetWidth
  var height = document.getElementById('canvasDiv').offsetHeight
  var context = this.getCanvasIDpathpoint.getContext('2d')
  var me = this
  var pathse = []
  var pathpoint = []
  var distance = []
  for (var i = 0; i < path.length - 1; i++) {
    var startxy = me.getcityxy(path[i])
    var endxy = me.getcityxy(path[i + 1])
    var ly = endxy.y - startxy.y
    var lx = endxy.x - startxy.x
    var l = Math.pow((ly * ly + lx * lx), 0.5)
    pathpoint.push(startxy)
    distance.push(0)
    pathse.push({
      start: {
        x: startxy.x,
        y: startxy.y
      },
      l: l,
      ly: ly,
      lx: lx
    })
  }
  var drawpoint = function () {
    if (pathpoint) {
      for (var i = 0; i < pathpoint.length; i++) {
        if (distance[i] > pathse[i].l) {
          distance[i] = 0
          pathpoint[i].y = pathse[i].start.y
          pathpoint[i].x = pathse[i].start.x
          continue
        } else {
          distance[i] += pathse[i].l / 300
          pathpoint[i].y = (pathse[i].ly / pathse[i].l) * distance[i] + pathse[i].start.y
          pathpoint[i].x = (pathse[i].lx / pathse[i].l) * distance[i] + pathse[i].start.x

          context.beginPath()
          context.arc(pathpoint[i].x, pathpoint[i].y, me.pathPointRadius, 0, Math.PI * 2)
          context.fillStyle = me.pathPointColor // 颜色
          context.fill()
        }
      }
    }
  }
  var render = function (ctx) {
    var prev = ctx.globalCompositeOperation
    ctx.globalCompositeOperation = 'destination-in'
    ctx.globalAlpha = 1 // 透明度
    ctx.fillRect(0, 0, width, height)
    ctx.globalCompositeOperation = prev
    drawpoint()
  }
  this.timer2 = requestAnimationFrame(function fn() {
    render(context)
    me.timer2 = requestAnimationFrame(fn)
  })
}
