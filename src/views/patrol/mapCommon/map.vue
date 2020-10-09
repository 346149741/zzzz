<template>
  <div style="position:relative;">
    <div id="map" ref="map" class="onemap" />
    <!--图例-->
    <div v-show="legend" class="legend">
      <div class="title"><span>{{ title }}</span></div>
      <ul>
        <li><img :src="imgUrl1"><label>{{ label1 }}</label></li>
        <li><img :src="imgUrl2"><label>{{ label2 }}</label></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { init, ZoomToCenter, addData, saveRoute, addResultData } from './components/map2d'

// import Tiles3dLayer from '@/components/CesiumMap/layer/Tiles3dLayer'
// OverlayCompnt为静态标注的右键菜单
export default {
  name: 'MapMaintain',
  components: {

  },
  data() {
    return {
      legend: false,
      title: '',
      imgUrl1: '',
      label1: '',
      imgUrl2: '',
      label2: ''
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      // const proInfo = this.$store.getters.projectInfo
      const mapOpts = {
        baseLayerType: 'google',
        extent: [111.586674, 29.054022, 111.609669, 29.080614]
      }
      init(this.$refs.map, mapOpts)
    },
    // 定位至搜索中心
    ZoomToCenter(lon, lat) {
      ZoomToCenter(lon, lat)
    },
    // 默认添加所有数据
    addData(PointData) {
      addData(PointData)
    },
    // 修改完顺序后调用，传入id和排序数组[{id:"军械库",num:1},{id:"火药库",num:2},{id:"档案库",num:3}]
    saveRoute(pointRouteData) {
      saveRoute(pointRouteData)
    },
    addResultData(type, data) {
      // 根据类型展示不同图例
      this.legend = true
      // 巡更点异常信息unusual、未按顺序巡更unorder、漏检点leakDetection、巡更点到达延迟delay
      if (type === 'unusual') {
        this.title = '巡更状态图例'
        this.imgUrl1 = require('@/assets/watchPoint/正常1.png')
        this.imgUrl2 = require('@/assets/watchPoint/错误1.png')
        this.label1 = '正常'
        this.label2 = '异常'
      } else if (type === 'unorder') {
        this.title = '巡更次序图例'
        this.imgUrl1 = require('@/assets/watchPoint/TLyellow.png')
        this.imgUrl2 = require('@/assets/watchPoint/TLblue.png')
        this.label1 = '预定路径'
        this.label2 = '实际路径 '
      } else if (type === 'leakDetection') {
        this.title = '漏检状态图例'
        this.imgUrl1 = require('@/assets/watchPoint/正常1.png')
        this.imgUrl2 = require('@/assets/watchPoint/错误1.png')
        this.label1 = '预定路径'
        this.label2 = '实际路径 '
      } else if (type === 'delay') {
        this.title = '到达延迟图例'
        this.imgUrl1 = require('@/assets/watchPoint/正常1.png')
        this.imgUrl2 = require('@/assets/watchPoint/延迟1.png')
        this.label1 = '预定路径'
        this.label2 = '实际路径 '
      }
      addResultData(type, data)
    }
  }
}
</script>
<style lang="scss" scoped>
.onemap {
  //position: absolute;
  height: 100%;
  width: 100%;
}
.legend{
  background: rgba(55, 238, 250, 0.3);
    z-index: 999;
    border: 1px solid #24DCE8;
    bottom: 20px;
    width: 160px;
    position:absolute;
    height: 88px;
    right: 30px;
    color: white;
    border-radius: 6px;
}
.legend .title{
  text-align:center;
      margin-top: 2px;
}
.legend ul{
  padding-inline-start: 0px;
      padding: 3px;
    margin-block-start: 0;
    margin-block-end: 0;
    font-size: 14px;
}
.legend ul li{
  list-style:none;
  padding: 3px 0px;
}
.legend ul li img{
margin-left: 5px;
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
}
.legend ul li label{
margin-left: 15px;
}
.lengendLable{
  display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
}
</style>
