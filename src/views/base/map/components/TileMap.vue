<template>
  <div class="tile-map">
    <div class="map-title">
      <span>NO:{{ baseInfo.mapNo }}</span>
      <span>名称:{{ baseInfo.mapName }}</span>
      <span>区域:{{ baseInfo | formatterRegionName }}</span>
      <span style="margin-left:48px;">发布人:{{ baseInfo.createUser }}</span>
      <span>发布时间:{{ baseInfo.createTime }}</span>
    </div>
    <div class="left-pannel">
      <el-select
        v-model="selectedLay"
        placeholder="地图列表"
        clearable
        @change="changeLay"
      >
        <el-option
          v-for="item in layerInfo"
          :key="item.id"
          :label="item.displayTypeName"
          :value="item"
        >
          <span style="float: left">{{ item.date }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{
            item.displayTypeName
          }}</span>
        </el-option>
      </el-select>
    </div>
    <div ref="map" style="height: 600px" />
  </div>
</template>
<script>
import NewMap2 from '@/components/CesiumMap/Map'
import Tiles3dLayer from '@/components/CesiumMap/layer/Tiles3dLayer'
import NewMap from '@/components/OLMap/core/MapCore'
import TileLayer from '@/components/OLMap/core/TileLayers'
import TileXYZLayers from '@/components/OLMap/core/TileXYZLayers.js'
import TileLayerVec from '@/components/OLMap/core/TileLayerVec'
import { dictRegionExtent } from '@/api/base/dictDetail'
import { transformExtent } from 'ol/proj'

export default {
  data() {
    this.wmtsLyrs = []
    this.vecLyr = null
    this.map = null
    return {
      tableVisible: false,
      // wmtsLyrs: [],
      // vecLyr: null,
      // map: null,
      baseInfo: {},
      layerInfo: null,
      selectedLay: null,
      defaultMapType: '1',
      beforeRegion: '', // 记录点击列表的范围区域
      beforeMapYype: '' // 记录点击列表的地图类型
    }
  },

  methods: {
    disPlay(data) {
      this.selectedLay = null
      this.defaultMapType = '1'
      this.baseInfo = data.baseInfo
      this.layerInfo = data.layerInfo
      this.initMap(data.mapOpts)
    },
    initMap(mapOpts) {
      const that = this
      dictRegionExtent(mapOpts.regionCode).then(item => {
        this.$refs.map.innerHTML = ''
        that.wmtsLyrs = []
        this.beforeRegion = item.data // 存储初始范围
        this.beforeMapYype = mapOpts.baseLayerType // 存储初始地图类型
        that.map = new NewMap(this.$refs.map, {
          extent: item.data,
          baseLayerType: mapOpts.baseLayerType
        })
        that.vecLyr = new TileLayerVec()
        this.map.addLayerToMap(that.vecLyr.lyr)
      })
    },
    initLyrs(row) {
      // 和默认地图类型不一样，进行地图初始化和切换
      if (this.defaultMapType !== row.displayType) {
        this.$refs.map.innerHTML = ''
        this.wmtsLyrs = []
        // 初始化二维
        if (row.displayType === '1') {
          this.map = new NewMap(this.$refs.map, {
            extent: this.beforeRegion,
            baseLayerType: this.beforeMapYype
          })
          this.vecLyr = new TileLayerVec()
          this.map.addLayerToMap(this.vecLyr.lyr)
        // eslint-disable-next-line brace-style
        }
        // 初始化三维
        else if (row.displayType === '2') {
          this.map = new NewMap2(this.$refs.map, {
            extent: this.beforeRegion,
            baseLayerType: this.beforeMapYype
          })
        }
      }
      // 进行类型赋值
      this.defaultMapType = row.displayType

      // 进行二三维图层加载
      if (row.displayType === '1') {
        if (this.wmtsLyrs) {
          this.wmtsLyrs.forEach(item => {
            this.map.removeLayer(item.lyr)
          })
        }
        this.wmtsLyrs = []
        this.vecLyr.clearFeatures()

        row.mapBlocks.forEach(item => {
          this.addLyr(item)
          let lyrExtent = JSON.parse(item.blockRange)
          lyrExtent = transformExtent(lyrExtent, 'EPSG:4326', 'EPSG:3857')
          this.map.fit(lyrExtent)
          return false
        })
      } else if (row.displayType === '2') {
        // 三维地图
        this.wmtsLyrs = []
        this.map.viewer.entities.removeAll()
        row.mapBlocks.forEach(item => {
          this.addLyr(item)
        })
      }
    },
    addLyr(lyrOpts) {
      if (this.defaultMapType === '1') {
        var lyrObj
        if (lyrOpts.mapServerType === '02') {
          lyrObj = new TileLayer({
            url: lyrOpts.mapServiceAddress,
            layer: lyrOpts.blockName,
            extent: JSON.parse(lyrOpts.blockRange)
          })
        } else { // 1 自研服务
          lyrObj = new TileXYZLayers({
            url: lyrOpts.mapServiceAddress,
            layer: lyrOpts.blockName
          })
        }
        this.vecLyr.addFeature({
          coords: JSON.parse(lyrOpts.blockRange),
          name: lyrOpts.blockName
        })
        this.wmtsLyrs.push(lyrObj)
        this.map.addLayerToMap(lyrObj.lyr)
      } else if (this.defaultMapType === '2') {
        const tiles3d = new Tiles3dLayer(this.map)
        if (typeof lyrOpts.mapLoadParm === 'string') {
          lyrOpts.mapLoadParm = JSON.parse(lyrOpts.mapLoadParm)
        }
        tiles3d.initData({ url: lyrOpts.mapServiceAddress, offset: lyrOpts.mapLoadParm })
      }
    },
    removeLyr(name) {
      const index = this.wmtsLyrs.findIndex(item => {
        return item.lyr.get('id') === name
      })
      if (index > -1) {
        this.map.removeLayer(this.wmtsLyrs[index].lyr)
        this.wmtsLyrs.splice(index, 1)
        this.vecLyr.removeFeature(name)
      }
    },
    changeLay(row) {
      if (row !== '') {
        this.initLyrs(row)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tile-map {
  position: relative;
}

.map-title {
  display: flex;
  justify-content: space-between;
  line-height: 24px;
  background-color: rgba(124, 159, 166, 0.2);
  white-space: nowrap;
  overflow: scroll;
  margin-bottom: -10px;

  span {
    margin-right: 10px;
    color: rgba(135, 135, 152, 1);
  }
}

.left-pannel {
  position: absolute;
  left: 8px;
  top: 54px;
  transform: translateY(-50%);
  z-index: 999;
}
</style>
