<template>
  <div>
    <div class="searchDiv">
      <span>关键词 : </span>
      <el-input v-model="pointName" placeholder="请输入内容" calss="searchInput" />
      <el-button slot="append" icon="el-icon-search" @click.native="search" />
      <el-button slot="append" icon="el-icon-plus" style="margin-left:0" @click.native="currentItemAdd" />
    </div>
    <div v-if="selectCentShow" class="selectCent">
      <div v-for="(item,index) in ckllList" :key="index" class="cent" @click="goMap(item)">
        <div v-text="item.pointName" />
        <div><span>坐标：</span><span v-text="item.latitude+&quot;;&quot;+item.longitude" /></div>
        <div><span>等级：</span><span v-text="item.grade" /></div>
      </div>
    </div>
    <div id="map" ref="map" class="onemap" />
    <!-- 静态标注编辑属性窗口 -->
    <MapDialog ref="mapDialog" />

  </div>
</template>

<script>
import { init, currentItemAdd, removeFeature, saveFeature, ZoomToCenter, addData } from './components/map2d'
import { getList, addPatrolObj, updatePatrolObj, lookPatrolObj, delPatrolObj, upload } from '@/api/base/patro-pointManage'
import MapDialog from './mapDialog'
// import Tiles3dLayer from '@/components/CesiumMap/layer/Tiles3dLayer'
// OverlayCompnt为静态标注的右键菜单
export default {
  name: 'MapMaintain',
  components: {
    MapDialog
  },
  data() {
    return {
      pointName: '',
      operateName: '查看',
      formData: {
        enable: '是', // 是否启用
        pointName: '', // 巡更点名称
        grade: '关键', // 等级
        id: '', // 记录ID
        longitude: '', // 经度
        latitude: '', // 纬度
        deviceId: '', // 巡更卡设备id
        deviceName: '', // 巡更卡设备名称
        deviceType: '', // 巡更卡设备类型
        deviceFactory: '', // 巡更卡设备厂家
        deviceModel: '', // 巡更卡设备型号
        devicePictureUrl: '' // 巡更卡图片地址
      },
      dialogVisible: false,
      selectCentShow: false,
      ckllList: []
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.handleInit()
    getList({ 'pointName': this.pointName }).then((response) => {
      console.log(response)
      if (response.code == 200) {
        this.ckllList = response.data
        this.addData()
      }
    })
  },
  methods: {
    handleInit() {
      // const proInfo = this.$store.getters.projectInfo
      const mapOpts = {
        baseLayerType: 'google',
        extent: [111.586674, 29.054022, 111.609669, 29.080614],
        zoom: 18
      }
      init(this.$refs.map, mapOpts, this.$refs.mapDialog)
    },
    addData() {
      // 接口获取巡更点数据
      // 关键、重要、一般
      // var PointData = [{
      //   longitude: 111.59930884838103,
      //   latitude: 29.061671832671237,
      //   pointName: '火药库',
      //   grade: '关键',
      //   id: '火药库',
      //   enable: '是'
      // }, {
      //   longitude: 111.60085111856459,
      //   latitude: 29.062032886860337,
      //   pointName: '军械库',
      //   grade: '重要',
      //   id: '军械库',
      //   enable: '是'
      // }, {
      //   longitude: 111.60046219825746,
      //   latitude: 29.060415752808993,
      //   pointName: '档案库',
      //   grade: '一般',
      //   id: '档案库',
      //   enable: '是'
      // }]
      addData(this.ckllList)
      console.log('数据', this.ckllList)
    },
    // 跳转地图地位
    goMap(val) {
      console.log(val)
      ZoomToCenter(val.longitude, val.latitude)
    },
    currentItemAdd() {
      currentItemAdd()
    },
    // 搜索巡更点时间
    search() {
      getList({ 'pointName': this.pointName }).then((response) => {
        console.log(response)
        if (response.code == 200) {
          this.ckllList = response.data
          addData(this.ckllList)
          if (this.ckllList.length > 0) {
            this.selectCentShow = true
          } else {
            this.selectCentShow = false
          }
        }
      })
    },
    // 清除巡更点
    removeFeature(id) {
      removeFeature(id)
    },
    // 更新地图要素属性值
    saveFeature(data, id) {
      saveFeature(data, id)
    },
    // 定位至搜索中心
    ZoomToCenter() {
      ZoomToCenter(111.591552, 29.069702)
    }

  }
}
</script>

<style lang="scss" scoped>
.onemap {
  position: absolute;
  height: 100%;
  width: 100%;
}
.searchDiv{
  position: absolute;
  top:40px;
  left:30px;
  width: 400px;
  z-index:10;
  background: rgba(28,147,153,0.5);
    padding: 2px;
    border-radius: 3px;
}
.searchDiv span{
  font-size: 14px;
  color:#ffffff;
  margin-left: 10px;
}
.el-input{
  width:200px;
  background: rgba(28, 147, 153, 0.3)!important;
}
 .searchDiv >>>  .el-input__inner{
  background: rgba(28, 147, 153, 0.3)!important;
  color:#ffffff;
}
 .searchDiv >>>  .el-button{
  background: #20EBF9!important;
  color:#ffffff;
  border:0;
  outline: none;
}
#pos_lnglat {
  position: fixed;
  z-index: 999;
  color: white;
  bottom: 10px;
  right: 10px;
  border-radius: 3px;
  background-color: rgba(0,60,136,0.4);
  padding: 5px;
}
  .cesium-viewer-timelineContainer{
    display: none!important;
  }
  .selectCent{
    padding: 0 10px;
     position: absolute;
     top:86px;
     left:30px;
     font-size: 12px;
     color:#ffffff;
     width:188px;
     height: 400px;
     background: rgba(28, 147, 153, 0.5);
     overflow: auto;
     z-index: 999;
  }
 .selectCent .cent{
   height: 80px;
   border-top: 1px dashed #5CC3C6;
  }
  .selectCent .cent div{
    line-height: 22px;
  }
 .selectCent .cent div:nth-child(1){
   margin-top: 6px;
 }
 .el-col-24{
   height: 30px;
 }

 h5{
   color:#1c9399;
   font-size: 18px;
 }
</style>
