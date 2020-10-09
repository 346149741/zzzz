<template>
  <div ref="map" style="height: 100%" />
</template>
<script>
import NewMap from '@/components/OLMap/core/MapCore'
import TileLayer from '@/components/OLMap/core/TileLayers'
import TileLayerVec from '@/components/OLMap/core/TileLayerVec'
import { dictRegionExtent } from '@/api/base/dictDetail'

export default {
  data() {
    return {
      wmtsLyrs: [],
      vecLyr: null,
      map: null
    }
  },
  watch: {
    mapOpts() {}
  },
  methods: {
    initMap(mapOpts) {
      dictRegionExtent(mapOpts.regionCode).then(item => {
        this.$refs.map.innerHTML = ''
        this.map = new NewMap(this.$refs.map, {
          extent: item.data,
          baseLayerType: mapOpts.baseLayerType
        })
        // 注册事件
        this.map.newMap.on('click', event => {
          if (this.map.newMap.hasFeatureAtPixel(event.pixel)) {
            this.map.newMap.forEachFeatureAtPixel(event.pixel, function(
              feature
            ) {
              feature.dispatchEvent({ type: feature.get('event') })
            })
          }
        })

        this.vecLyr = new TileLayerVec()
        this.map.addLayerToMap(this.vecLyr.lyr)
      })
    },
    initLyrs(arr) {
      this.wmtsLyrs.forEach(item => {
        this.map.removeLayer(item.lyr)
      })
      this.wmtsLyrs = []
      this.vecLyr.clearFeatures()
      arr.forEach(item => {
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
<style lang="scss" scoped></style>
