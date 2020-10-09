<template>
  <div>
    <div ref="map" class="map-region" />
  </div>
</template>

<script>
import MapRegionCls from './mapCmpt'

export default {
  name: 'MapCmpt',
  data() {
    this.MapRegionCls = null
    this.mapDrawObj = null
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.MapRegionCls = new MapRegionCls({
        id: this.$refs.map
      })
    },
    handleInitRegions(infos) {
      this.MapRegionCls.lyr.clearFeatures()
      this.MapRegionCls.initFeatures(infos, this.handleRegionView)
    },
    handleRegionView(e) {
      const info = e.target.get('info')
      this.$emit('handleOptRegion', { info })
    },
    handleRegionItemDraw(callback) {
      this.MapRegionCls.addDrawItem(function(e) {
        callback && callback({
          coords: e.feature.getGeometry().clone().transform('EPSG:3857', 'EPSG:4326').getCoordinates()[0]
        })
      })
    },
    handleZoomToId(id) {
      this.MapRegionCls.zoomToId(id)
    },
    updateSize() {
      setTimeout(() => {
        this.MapRegionCls.map.updateSize()
      }, 285)
    }
  }
}
</script>

<style lang="scss" scoped>
.map-region{
  width: 100%;
  height: 77vh;
}
</style>
