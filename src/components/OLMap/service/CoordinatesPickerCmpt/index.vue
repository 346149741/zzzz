<template>
  <el-dialog
    v-if="dialogVisible"
    class="abow_dialog coord_dialog"
    :close-on-click-modal="false"
    title="坐标选择"
    :visible.sync="dialogVisible"
    width="70%"
    :destroy-on-close="true"
  >
    <div ref="map" class="map-view" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MapOpts from './mapOpts.js'
const iconList = {
  'camera': { legendPath: require('@/assets/terminal/摄像头.png') },
  'barrier': { legendPath: require('@/assets/terminal/道闸-关.png') },
  'door': { legendPath: require('@/assets/terminal/门禁-关.png') },
  'marker': { legendPath: require('@/assets/terminal/tempMarker.jpg') },
  'defaultLine': { 'stroke': { 'color': 'rgba(0, 0, 255, 1)', 'lineDash': 'dashed', 'width': 2 }},
  'defaultRegion': { 'fill': 'rgba(255, 255, 255, 0.3)', 'stroke': { 'color': 'rgba(0, 255, 0, 0.8)', 'lineDash': 'dashed', 'width': 2 }}
}
export default {
  name: 'CoordinatesPickerCmpt',
  props: {
    displayType: { // 显示类型 view、update、create
      type: String,
      default: 'create',
      validator: function(value) {
        return ['view', 'update', 'create'].indexOf(value) !== -1
      }
    },
    dataType: { // 数据类型 Point LineString Polygon
      required: true,
      type: String,
      validator: function(value) {
        return ['Point', 'LineString', 'Polygon'].indexOf(value) !== -1
      }
    },
    coords: {
      required: false
    },
    styleType: {
      validator: (value) => {
        if (typeof value === 'string') {
          return Object.keys(iconList).indexOf(value) !== -1
        }
        return true //  非预制类型先不进行校验
      }
    }
  },
  data() {
    this.mapOptCls = {}
    return {
      dialogVisible: false
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.init()
        })
      }
    }
  },
  methods: {
    init() {
      let coords
      try {
        if (this.coords && this.coords.length > 0) {
          coords = JSON.parse(this.coords)
        }
      } catch (e) {
        console.log(e)
      }
      this.mapOptCls = new MapOpts(this.$refs.map, {
        dataType: this.dataType,
        displayType: this.displayType,
        coords
      })

      let styleType = this.styleType
      // 赋值默认点线面样式
      if (styleType === undefined) {
        if (this.dataType === 'Point') {
          styleType = 'marker'
        } else if (this.dataType === 'LineString') {
          styleType = 'defaultLine'
        } else if (this.dataType === 'Polygon') {
          styleType = 'defaultRegion'
        }
      }
      let sty = iconList[styleType]
      if (this.styleType instanceof Object) {
        sty = this.styleType
      }
      this.mapOptCls.setLyrStyle(sty)
    },
    handleOk() {
      this.$emit('handleOK', this.mapOptCls.getCoords())
      this.dialogVisible = false
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
