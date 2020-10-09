<template>
  <div>
    <div id="map" ref="map" class="onemap" />
    <div id="pos_lnglat" ref="pos_lnglat" />
  </div>
</template>

<script>
import { initMap, addMouseWheelLngLat } from './components/index'
import { mapGetters, mapMutations } from 'vuex'
// import Tiles3dLayer from '@/components/CesiumMap/layer/Tiles3dLayer'
// OverlayCompnt为静态标注的右键菜单
export default {
  name: 'MapMaintain',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['projectInfo', 'currentMap'])
  },
  watch: {
    currentMap: {
      immediate: false,
      handler() {
        this.handleInit()
      }
    }
  },
  mounted() {
    // 默认2维
    this.setCurrentMap('map2d')
    this.handleInit()
  },
  methods: {
    ...mapMutations({ setCurrentMap: 'map/setCurrentMap' }),
    handleInit() {
      // const proInfo = this.$store.getters.projectInfo
      const mapOpts = {
        baseLayerType: 'google',
        extent: [116.2297220229497, 36.79799835004467, 119.3278171399768, 39.93958307034004],
        viewExtent: [116.2297220229497, 36.79799835004467, 119.3278171399768, 39.93958307034004]
      }
      initMap(this.$refs.map, mapOpts)
      addMouseWheelLngLat(this.$refs.pos_lnglat)

      this.initData()
    },
    initData() {
      // const tiles3d = new Tiles3dLayer(Global.map3d)
      // tiles3d.initData({
      //   url: 'http://192.168.1.220:9000/model/279216e09a7811ea98cef74966001d10/tileset.json',
      //   flyTo: true
      // })
      // console.log(Global.map3d)

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
</style>
<style>
  .cesium-viewer-timelineContainer{
    display: none!important;
  }
</style>
