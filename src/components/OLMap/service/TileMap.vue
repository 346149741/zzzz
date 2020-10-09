<template>
  <div class="tile-map">
    <div class="map-title">
      <div>
        <span>NO:{{ baseInfo.mapNo }}</span>
        <span>名称:{{ baseInfo.mapName }}</span>
        <span>区域:{{ baseInfo|formatterRegionName }}</span>
      </div>
      <div>
        <span>发布人:{{ baseInfo.createUser }}</span>
        <span>发布时间:{{ baseInfo.createTime }}</span>
      </div>
    </div>
    <div class="left-pannel">
      <el-popover
        v-model="tableVisible"
        placement="right"
        width="200"
        trigger="manual"
      >
        <el-table
          :data="layerInfo"
          :show-header="false"
          @row-click="initLyrs"
        >
          <el-table-column width="120" property="dataProductDate" />
          <el-table-column width="50" property="displayTypeName" />
        </el-table>

        <el-button slot="reference" @click="tableVisible = !tableVisible">地图列表</el-button>
      </el-popover>

      <!--<ul>
        <li v-for="(item,index) in layerInfo" :key="index" @click="initLyrs(item.mapBlocks)">
          <span>{{item.dataProductDate}}</span><span>{{item.displayTypeName}}</span>
        </li>
      </ul>-->
    </div>
    <div ref="map" style="height: 600px" />
  </div>
</template>
<script>
import NewMap from '@/components/OLMap/core/MapCore'
import TileLayer from '@/components/OLMap/core/TileLayers'
import TileLayerVec from '@/components/OLMap/core/TileLayerVec'
import { dictRegionExtent } from '@/api/base/dictDetail'

export default {
  data() {
    return {
      tableVisible: false,
      wmtsLyrs: [],
      vecLyr: null,
      map: null,
      baseInfo: {},
      layerInfo: null
    }
  },
  methods: {
    disPlay(data) {
      this.baseInfo = data.baseInfo
      this.layerInfo = data.layerInfo
      this.initMap(data.mapOpts)
    },
    initMap(mapOpts) {
      dictRegionExtent(mapOpts.regionCode).then(item => {
        this.$refs.map.innerHTML = ''
        this.map = new NewMap(this.$refs.map, {
          extent: item.data,
          baseLayerType: mapOpts.baseLayerType
        })
        this.vecLyr = new TileLayerVec()
        this.map.addLayerToMap(this.vecLyr.lyr)
      })
    },
    initLyrs(row) {
      this.wmtsLyrs.forEach(item => {
        this.map.removeLayer(item.lyr)
      })
      this.wmtsLyrs = []
      this.vecLyr.clearFeatures()
      row.mapBlocks.forEach(item => {
        this.addLyr(item)
      })
    },
    addLyr(lyrOpts) {
      const lyrObj = new TileLayer({
        url: lyrOpts.mapServiceAddress,
        layer: lyrOpts.blockName,
        extent: JSON.parse(lyrOpts.blockRange)
      })
      this.vecLyr.addFeature({
        coords: JSON.parse(lyrOpts.blockRange),
        name: lyrOpts.blockName
      })
      this.wmtsLyrs.push(lyrObj)
      this.map.addLayerToMap(lyrObj.lyr)
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
    line-height: 30px;
    background-color: rgba(124, 159, 166, .2);

    span {
      margin-right: 10px;
      color: rgba(135, 135, 152, 1);
    }
  }

  .left-pannel {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
  }
</style>
