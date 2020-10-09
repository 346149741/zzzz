<template>
  <el-dialog
    v-if="dialogVisible"
    class="abow_dialog coord_dialog"
    :close-on-click-modal="false"
    title="关联摄像头"
    :visible.sync="dialogVisible"
    width="70%"
    :destroy-on-close="true"
  >
    <div ref="map" class="map-view" />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="isDisabled" @click="handleClear">重 置</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import NewMap from '@/components/OLMap/core/MapCore'
import VecLayer from '@/components/OLMap/core/VecLayer'
import { DragBox } from 'ol/interaction'
import { Style, Icon, Stroke } from 'ol/style.js'
import Point from 'ol/geom/Point'
import LineString from 'ol/geom/LineString'
import Feature from 'ol/Feature'
import { platformModifierKeyOnly } from 'ol/events/condition'
import CameraAPI from '@/api/base/camera'
const iconList = {
  'camera': { legendPath: require('@/assets/terminal/摄像头.png') },
  'camera-checked': { legendPath: require('@/assets/terminal/摄像头-选中.png') }
}
const lineStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(27, 250, 179, 1)',
    width: 4
  })
})
export default {
  name: 'RelateCameraMap',
  props: {
    operationType: { // 操作类型 view、relate
      type: String,
      default: 'relate',
      validator: function(value) {
        return ['view', 'relate'].indexOf(value) !== -1
      }
    },
    perimeterLine: {
      type: String,
      default: ''
    },
    selectIdArr: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      map: null,
      entLayer: null,
      perimeterLayer: null,
      selectStyle: [],
      selectedFeatures: [],
      cameraIdList: [],
      tempSaveSelectedFeatures: [],
      dialogVisible: false,
      isDisabled: true
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.initMap()
        })
      }
    }
  },
  methods: {
    async initMap() {
      this.map = new NewMap(this.$refs.map)
      // 加载线（根据传入坐标）
      this.addPerimeterLine()
      // 添加摄像头图层
      this.addCameraPointLayer()
      // 添加摄像头数据
      const { data: cameraRes } = await CameraAPI.getAll()
      cameraRes.forEach(item => {
        let coords
        try {
          if (item.lngLatAlt && item.lngLatAlt.length > 0) {
            coords = JSON.parse(item.lngLatAlt)
          }
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
          this.entLayer.addFeature(fea)
        }
      })
      // 把已绑定的设备添加到已选择要素中
      this.putInSelectedFeatures()
      // 绑定选择要素事件
      if (this.operationType === 'relate') {
        this.bindClickSelectEvent(this.entLayer.lyr) // 点选
        this.bindExtentSelectEvent(this.entLayer.lyr) // 按住Ctrl框选
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    },
    addPerimeterLine() {
      let coords
      try {
        if (this.perimeterLine && this.perimeterLine.length > 0) {
          coords = JSON.parse(this.perimeterLine)
        }
      } catch (e) {
        console.log(e)
      }
      this.perimeterLayer = new VecLayer()
      this.perimeterLayer.setStyle(lineStyle)
      this.map.addLayerToMap(this.perimeterLayer.lyr)
      if (coords && coords instanceof Array) {
        let geom = null
        geom = new LineString(coords)
        geom.transform('EPSG:4326', 'EPSG:3857')
        const fea = new Feature({
          geometry: geom
        })
        this.perimeterLayer.addFeature(fea)
      }
    },
    addCameraPointLayer() {
      this.entLayer = new VecLayer()
      var style = new Style({
        image: new Icon({
          src: iconList['camera'].legendPath
        })
      })
      let lyrSty = null
      lyrSty = (feature, resolution) => {
        const value = style.getImage().getScale()
        const SCALE = resolution > 600 ? 0.4 : resolution > 300 ? 0.6 : resolution > 50 ? 0.75 : 1
        if (value !== SCALE) {
          style.getImage().setScale(SCALE)
        }
        return [style]
      }
      this.entLayer.setStyle(lyrSty)
      this.map.addLayerToMap(this.entLayer.lyr)
    },
    handleOk() {
      if (this.operationType === 'relate') {
        this.$emit('handleOK', this.getCameraIdList())
      }
      this.dialogVisible = false
    },
    handleClear() {
      this.removeSelectedFeature()
    },
    // 框选
    bindExtentSelectEvent(layer) {
      var that = this
      // DragBox interaction对象，用来实现画框选择
      var dragBox = new DragBox({
        condition: platformModifierKeyOnly
      })
      this.map.newMap.addInteraction(dragBox)

      dragBox.on('boxend', function() {
        var extent = dragBox.getGeometry().getExtent()
        var featureExtent = []
        layer.getSource().forEachFeatureIntersectingExtent(extent, function(feature) {
          featureExtent.push(feature)
          if (that.selectedFeatures.indexOf(feature) === -1) {
            that.selectedFeatures.push(feature)
            feature.setStyle(that.selectedStyleFuc)
          }
        })
        that.getSelectFeatures()
      })
    },
    // 点选
    bindClickSelectEvent(bindLayer) {
      var that = this
      this.map.newMap.on('click', function(event) {
        that.map.newMap.forEachFeatureAtPixel(event.pixel,
          function(feature, layer) {
            if (that.selectedFeatures.indexOf(feature) === -1) {
              that.selectedFeatures.push(feature)
              feature.setStyle(that.selectedStyleFuc)
              that.getSelectFeatures()
            }
            return feature
          }, {
            layerFilter: function(layer, feature) {
              if (layer === bindLayer) {
                return true
              } else {
                return false
              }
            },
            hitTolerance: 0
          })
      })
    },
    // 查询Feature是否被选中
    putInSelectedFeatures() {
      this.selectedFeatures = []
      this.entLayer.getFeatures().forEach(item => {
        const feaInfo = item.get('info')
        if (this.selectIdArr.indexOf(feaInfo.id) !== -1) {
          this.selectedFeatures.push(item)
          item.setStyle(this.selectedStyleFuc)
        }
      })
      this.getSelectFeatures()
    },
    selectedStyleFuc(fea, resolution) {
      const sty = this.createStyle(iconList['camera-checked'].legendPath, undefined)
      sty.getImage().setScale(resolution > 600 ? 0.4 : resolution > 300 ? 0.6 : resolution > 50 ? 0.75 : 1)
      return sty
    },
    unSelectedStyleFuc(fea, resolution) {
      const sty = this.createStyle(iconList['camera'].legendPath, undefined)
      sty.getImage().setScale(resolution > 600 ? 0.4 : resolution > 300 ? 0.6 : resolution > 50 ? 0.75 : 1)
      return sty
    },
    // 图片创建样式
    createStyle(src, img) {
      return new Style({
        image: new Icon(
          {
            crossOrigin: 'anonymous',
            src: src,
            img: img,
            imgSize: img ? [img.width, img.height] : undefined
          }
        )
      })
    },
    // 获取地图中选中的摄像头
    getSelectFeatures() {
      const that = this
      this.cameraIdList = []
      this.selectedFeatures.forEach(function(item, index) {
        that.cameraIdList.push(item.get('info').id)
      })
    },
    removeSelectedFeature() {
      this.selectedFeatures.forEach(item => {
        item.setStyle(this.unSelectedStyleFuc)
      })
      this.selectedFeatures.splice(0, this.selectedFeatures.length)
      this.cameraIdList.splice(0, this.cameraIdList.length)
    },
    getCameraIdList() {
      return this.cameraIdList
    }
  }
}
</script>

<style lang="scss" scoped>
.map-view{
  height: 50vh;
}
</style>
<style>
  .coord_dialog .el-dialog .el-dialog__body{
    padding-top: 0;
  }
</style>
