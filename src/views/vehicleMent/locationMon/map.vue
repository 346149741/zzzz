<template>
  <div>
    <div ref="map" class="map-region" />
    <!--图例-->
    <div class="legend">
      <div class="title"><span>图示</span></div>
      <ul>
        <li><img src="@/assets/car/red.png"><label>告警</label></li>
        <li><img src="@/assets/car/blue.png"><label>正常</label></li>
        <li><img src="@/assets/car/white.png"><label>离线</label></li>
      </ul>
    </div>
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
        id: this.$refs.map
        // extent: [109.792705, 28.274762, 113.633141, 30.246876]
      })
      // 车辆查询
      this.addcarLayerPoint()
    },
    // 车辆查询
    addcarLayerPoint() {
      var data = [{ lon: 111.597195, lat: 29.06205, text: '豫A9FG25(行驶中)', type: '正常' },
        { lon: 111.598236, lat: 29.062378, text: '豫A95625(行驶中)', type: '正常' },
        { lon: 111.597882, lat: 29.06129, text: '豫A8MP70(行驶中)', type: '告警' },
        { lon: 111.597109, lat: 29.064244, text: '豫A9ZK10(行驶中)', type: '离线' },
        { lon: 111.600693, lat: 29.061243, text: '豫A3DH20(行驶中)', type: '正常' },
        { lon: 111.604308, lat: 29.061131, text: '豫ASH510(行驶中)', type: '离线' }]
      this.MapCon.addcarLayerPoint(data)
    },
    // 实时跟踪
    realTimeTracking() {
      var data = [{ lon: 111.597109, lat: 29.064244, text: '豫A9ZK10(行驶中)', type: '正常' }]
      var lineString = '[[111.59699141979216,29.06412885178787],[111.5968331694603,29.06368574866056],[111.59745275974274,29.063509913558406],[111.59790337085724,29.063399137290048],[111.59815013408662,29.063389759399428],[111.59833252429964,29.063549183423888],[111.59878849983217,29.063591383859688],[111.59940540790558,29.06365234001423],[111.59975945949556,29.063619517473953],[111.60010278224948,29.063460093558263],[111.60040318965912,29.063277224645518],[111.60084307193756,29.062972442403435],[111.60082161426544,29.062784883652782],[111.60076797008514,29.06259263557925],[111.60057485103609,29.06251761184356],[111.60025835037231,29.062503544887036],[111.59995794296265,29.06251761184356]]'
      this.MapCon.realTimeTracking(data, lineString)
    },
    // 区域查询
    addArea() {
      var data = [{ lon: 111.597195, lat: 29.06205, text: '豫A9FG25(行驶中)', type: '正常' },
        { lon: 111.598236, lat: 29.062378, text: '豫A95625(行驶中)', type: '正常' },
        { lon: 111.597882, lat: 29.06129, text: '豫A8MP70(行驶中)', type: '正常' },
        { lon: 111.600693, lat: 29.061243, text: '豫A3DH20(行驶中)', type: '正常' },
        { lon: 111.604308, lat: 29.061131, text: '豫ASH510(行驶中)', type: '离线' }]
      this.MapCon.addcarLayerPoint(data)
      var polygon = '[ [ 111.59341335296631, 29.06382231371633 ], [ 111.59349918365477, 29.05830798945638 ], [ 111.60542964935301, 29.058232962603 ], [ 111.60500049591062, 29.06412240453379 ], [ 111.59341335296631, 29.06382231371633 ] ]'
      this.MapCon.addArea(polygon)
    },
    addDZWL() {
      var data = [{ lon: 111.597195, lat: 29.06205, text: '豫A9FG25(行驶中)', type: '正常' },
        { lon: 111.598236, lat: 29.062378, text: '豫A95625(行驶中)', type: '正常' },
        { lon: 111.597109, lat: 29.064244, text: '豫A9ZK10(行驶中)', type: '告警' },
        { lon: 111.597882, lat: 29.06129, text: '豫A8MP70(行驶中)', type: '正常' },
        { lon: 111.600693, lat: 29.061243, text: '豫A3DH20(行驶中)', type: '正常' },
        { lon: 111.604308, lat: 29.061131, text: '豫ASH510(行驶中)', type: '离线' }]
      this.MapCon.addcarLayerPoint(data)
      var polygon = '[ [ 111.59341335296631, 29.06382231371633 ], [ 111.59349918365477, 29.05830798945638 ], [ 111.60542964935301, 29.058232962603 ], [ 111.60500049591062, 29.06412240453379 ], [ 111.59341335296631, 29.06382231371633 ] ]'
      this.MapCon.addArea(polygon)
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
.title{
  text-align:center;
}
.legend{
  background: rgba(55, 238, 250, 0.3);
    z-index: 999;
    border: 1px solid #24DCE8;
    top: 516px;
    width: 110px;
    position:absolute;
    height: 170px;
    right: 30px;
    color: white;
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
  display: flex;
    align-items: center;
}
.legend ul li img{
    height: 33px;
    margin-left: 20px;
}
.legend ul li label{
margin-left: 15px;
    display: inline-block;
}
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
