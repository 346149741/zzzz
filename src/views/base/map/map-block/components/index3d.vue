<template>
  <div ref="map" style="height: 100%" />
</template>
<script>
import { dictRegionExtent } from '@/api/base/dictDetail'
import * as MapMethods from './index.js'

export default {
  data() {
    return {
      wmtsLyrs: [],
      vecLyr: null,
      map: null,
      maptype: '2'
    }
  },
  watch: {
    mapOpts() {}
  },
  methods: {
    initMap(mapOpts) {
      this.wmtsLyrs = []
      this.maptype = mapOpts.maptype
      dictRegionExtent(mapOpts.regionCode).then(item => {
        this.$refs.map.innerHTML = ''
        const opt = {
          extent: item.data,
          baseLayerType: mapOpts.baseLayerType
        }
        MapMethods.initMap(this.$refs.map, opt, mapOpts.maptype)
      })
    },
    initLyrs(arr) {
      MapMethods.initLyrs(arr, this.maptype)
    },
    addLyr(lyrOpts, tabIndex) {
      MapMethods.addLyr(lyrOpts, tabIndex, this.maptype)
    },
    removeLyr(lyrOpts, tabIndex) {
      MapMethods.removeLyr(lyrOpts, tabIndex, this.maptype)
    }
  }
}
</script>
<style lang="scss" scoped></style>
