<template>
  <div>
    <div
      v-drag
      class="videoLocation dargable"
    >
      <div class="video-title-main">
        <div class="video-title">实时监控</div>
        <i
          class="el-icon-close videoLocation-title"
          @click="Close"
        />
      </div>
      <div class="video-body">
        <el-row
          :gutter="20"
          style="padding: 20px 20px 0;"
        >
          <el-col :span="24">
            <EasyPlayer
              id="myplayer"
              :video-url="selectUrl"
              live
              :fluent="true"
              autoplay="autoplay"
              stretch
              v-if="selectUrl==''"
            />
            <img
              src="@/assets/watchPoint/ZP.png"
              v-if="selectUrl==='11'"
              style="width:100%;height: 400px;"
            />
          </el-col>
        </el-row>
        <div class="video-body-title">
          <el-carousel
            type="card"
            height="120px"
            :autoplay="false"
            arrow="always"
            indicator-position="none"
            @change="changeVideo"
          >
            <el-carousel-item
              v-for="(item,index) in dataList"
              :key="index"
            >
              <img
                :src="item.img"
                style="height:100%;"
              >
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import EasyPlayer from "@easydarwin/easyplayer";
import { destroyPop } from "../index";
import "swiper/dist/css/swiper.css";
export default {
  name: "SingleCamera",
  components: { EasyPlayer },
  data() {
    return {
      selectUrl: "",
      dataList: [],
    };
  },
  created() {
    this.dataList = this.list;
    this.selectUrl = this.dataList[0].url;
  },
  mounted() {},
  methods: {
    Close() {
      this.$destroy();
      destroyPop("cameraPopUp");
    },
    changeVideo(val) {
      this.selectUrl = this.dataList[val].url;
    },
  },
};
</script>
<style >
.el-carousel__container {
  background: white !important;
}
</style>
<style lang="scss" scoped>
.videoLocation {
  position: absolute;
  top: 100px;
  right: 300px;
  z-index: 1900;
  width: 800px;
  height: 650px;
  background-color: #fff;
  .video-title-main {
    color: #fff;
    background: #1c949a;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    height: 62px;
    line-height: 62px;
    .videoLocation-title {
      line-height: 62px;
      cursor: pointer;
    }
  }
  .video-body {
    .video-body-title {
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #444444;
      line-height: 155px;
      height: 155px;
      margin-top: 10px;
    }
  }
  .el-carousel__arrow--left,
  .el-carousel__arrow--right {
    background-color: #1c949a;
  }
  .el-carousel__arrow:hover {
    background-color: #1c949a;
  }
}
</style>
