// 点闪烁效果(传入color为Cesium.color,默认为红色点闪烁)
export function flashPoint(color = Cesium.Color.RED) {
  var x = 1
  var flog = true
  var property = new Cesium.CallbackProperty(function () {
    if (flog) {
      x = x - 0.02
      if (x <= 0.1) {
        flog = false
      }
    } else {
      x = x + 0.02
      if (x >= 1) {
        flog = true
      }
    }
    return color.withAlpha(x)
  }, false)
  return property
}

export function flowPolyline() {
  /*
            流动纹理线
             color 颜色
             duration 持续时间 毫秒
          */
  function PolylineTrailLinkMaterialProperty(color, duration) {
    this._definitionChanged = new Cesium.Event()
    this._color = undefined
    this._colorSubscription = undefined
    this.color = color
    this.duration = duration
    this._time = (new Date()).getTime()
  }
  Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
    isConstant: {
      get: function () {
        return false
      }
    },
    definitionChanged: {
      get: function () {
        return this._definitionChanged
      }
    },
    color: Cesium.createPropertyDescriptor('color')
  })
  PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
    return 'PolylineTrailLink'
  }
  PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
      result = {}
    }
    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color)
    result.image = Cesium.Material.PolylineTrailLinkImage
    result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration
    return result
  }
  PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
    return this === other ||
      (other instanceof PolylineTrailLinkMaterialProperty &&
        Cesium.Property.equals(this._color, other._color))
  }
  Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty
  Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink'
  Cesium.Material.PolylineTrailLinkImage = require('@assets/common/colors4.png')

  Cesium.Material.PolylineTrailLinkSource = 'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                            {\n\
                                                                 czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                                 vec2 st = materialInput.st;\n\
                                                                 vec4 colorImage = texture2D(image, vec2(fract(-(st.s + time)), st.t));\n\
                                                                 material.alpha = colorImage.a * color.a;\n\
                                                                 material.diffuse =color.rgb;\n\
                                                                 return material;\n\
                                                             }'
  Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
    fabric: {
      type: Cesium.Material.PolylineTrailLinkType,
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
        image: Cesium.Material.PolylineTrailLinkImage,

        time: 0
      },
      source: Cesium.Material.PolylineTrailLinkSource
    },
    translucent: function (material) {
      return true
    }
  })
}

export function flashPoint2() {
  /*
    点闪烁效果
     color 颜色
     duration 持续时间 毫秒
  */
  function EllipsoidFadeMaterialProperty(color, duration) {
    this._definitionChanged = new Cesium.Event()
    this._color = undefined
    this._colorSubscription = undefined
    this.color = color
    this.duration = duration
    this._time = (new Date()).getTime()
  }
  Object.defineProperties(EllipsoidFadeMaterialProperty.prototype, {
    isConstant: {
      get: function () {
        return false
      }
    },
    definitionChanged: {
      get: function () {
        return this._definitionChanged
      }
    },
    color: Cesium.createPropertyDescriptor('color')
  })
  EllipsoidFadeMaterialProperty.prototype.getType = function (time) {
    return 'EllipsoidFade'
  }
  EllipsoidFadeMaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
      result = {}
    }
    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color)

    result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration
    return result

    // return Cesium.defined(result) || (result = {}),
    //     result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color),
    //     void 0 === this._time && (this._time = time.secondsOfDay),
    //     result.time = time.secondsOfDay - this._time,
    //     result
  }
  EllipsoidFadeMaterialProperty.prototype.equals = function (other) {
    return this === other ||
      (other instanceof EllipsoidFadeMaterialProperty &&
        Property.equals(this._color, other._color))
  }
  Cesium.EllipsoidFadeMaterialProperty = EllipsoidFadeMaterialProperty
  Cesium.Material.EllipsoidFadeType =
    'EllipsoidFade'
  Cesium.Material.EllipsoidFadeSource =
    'czm_material czm_getMaterial(czm_materialInput materialInput)\n' +
    '{\n' +
    'czm_material material = czm_getDefaultMaterial(materialInput);\n' +
    'material.diffuse = 1.5 * color.rgb;\n' +
    'vec2 st = materialInput.st;\n' +
    'float dis = distance(st, vec2(0.5, 0.5));\n' +
    'float per = fract(time);\n' +
    'if(dis > per * 0.5){\n' +
    'material.alpha = 0.0;\n' +
    'discard;\n' +
    '}else {\n' +
    'material.alpha = color.a  * dis / per / 1.0;\n' +
    '}\n' +
    'return material;\n' +
    '}'
  Cesium.Material._materialCache.addMaterial(Cesium.Material.EllipsoidFadeType, {
    fabric: {
      type: Cesium.Material.EllipsoidFadeType,
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 1),
        time: 0
      },
      source: Cesium.Material.EllipsoidFadeSource
    },
    translucent: function (material) {
      return true
    }
  })
}
