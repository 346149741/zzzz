<template>
  <div>
    <div ref="map" class="map-region" />
  </div>
</template>

<script>
import MapCon from './map'

export default {
  name: 'MapCon',
  data() {
    this.MapCon = null
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.MapCon = new MapCon({
        id: this.$refs.map,
        extent: [109.792705, 28.274762, 113.633141, 30.246876]
      })
      this.MapCon.addCityRegion()
      var data = [{ lon: 111.225395, lat: 29.744419, num: Math.floor(Math.random() * 350) },
        { lon: 111.878499, lat: 29.6862, num: Math.floor(Math.random() * 350) },
        { lon: 111.512852, lat: 29.195019, num: Math.floor(Math.random() * 350) },
        { lon: 112.169406, lat: 29.23537, num: Math.floor(Math.random() * 350) },
        { lon: 111.32313, lat: 28.872647, num: Math.floor(Math.random() * 350) },
        { lon: 112.018778, lat: 28.957634, num: Math.floor(Math.random() * 350) }]
      this.MapCon.addEnvironmentPoint(data, 'AQI')
    },
    addEnvironmentPoint() {
      var data = [{ lon: 111.225395, lat: 29.744419, num: Math.floor(Math.random() * 350) },
        { lon: 111.878499, lat: 29.6862, num: Math.floor(Math.random() * 350) },
        { lon: 111.512852, lat: 29.195019, num: Math.floor(Math.random() * 350) },
        { lon: 112.169406, lat: 29.23537, num: Math.floor(Math.random() * 350) },
        { lon: 111.32313, lat: 28.872647, num: Math.floor(Math.random() * 350) },
        { lon: 112.018778, lat: 28.957634, num: Math.floor(Math.random() * 350) }]
      this.MapCon.addEnvironmentPoint(data, 'AQI')
    },
    handleZoomToId(id) {
      this.MapCon.zoomToId(id)
    },
    updateSize() {
      setTimeout(() => {
        this.MapCon.map.updateSize()
      }, 285)
    }
  }
}
</script>

<style>
.map-region{
  width: 100%;
  height: 100%;
}
		.point_animation{
			background: #ff9900;
			width: 6px;
			height: 6px;
			border: 2px #ff9900 solid;
			border-radius: 50%;
			position: absolute;
		}

		.point_animation p, .point_animation span{
			position: absolute;
			width: 4px;
			height: 4px;
			animation: point_animation 1.5s  infinite;
			box-shadow: 0px 0px 1px #ff9900;
			margin: 0px;
			border-radius: 50%;
		}
		.point_animation span{
			animation-delay: 0.8s;
		}
		@keyframes point_animation{
			10% {
				transform: scale(1);
			}
			100% {
				transform: scale(8);
			}
		}
    	.css_animation{
			height:50px;
			width:50px;
			border-radius: 25px;
			background: rgba(255, 0, 0, 1);
			transform: scale(0);
			animation: mypoint 2s;
			animation-iteration-count: infinite;
		}
		@keyframes mypoint{
			to{
				transform: scale(1.5);
				background: rgba(0, 0, 0, 0);
			}
		}
</style>
