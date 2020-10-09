<template>
  <div>
    <div v-drag class="videoLocation dargable">
      <div class="video-title-main">
        <div class="video-title">实时监控</div>
        <i class="el-icon-close videoLocation-title" @click="Close" />
      </div>
      <div class="video-body">
        <EasyPlayer
          id="myplayer"
          :video-url="url"
          live
          :fluent="true"
          autoplay="autoplay"
          stretch
        />
        <div class="video-body-title">{{ title||'华南光电南门啊' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import EasyPlayer from '@easydarwin/easyplayer'
import { destroyPop } from '../index'
export default {
  name: 'SingleCamera',
  components: { EasyPlayer },
  data() {
    return {
      url: '',
      title: '华南光电南门啊'
    }
  },
  created() {
  },
  mounted() { },
  methods: {
    Close() {
      this.$destroy()
      destroyPop('cameraPopUp')
    }
  }
}
</script>

<style lang="scss" scoped>
  .videoLocation{
    position: absolute;
    top: 100px;
    right: 300px;
    z-index:2900;
    width: 1150px;
    height:auto;
    background-color: #fff;
    .video-title-main{
      color: #fff;
      background: #1C949A;
      display:flex ;
      justify-content: space-between;
      padding: 0 30px;
      height: 62px;
      line-height: 62px;
      .videoLocation-title{
        line-height: 62px;
        cursor: pointer;
      }
    }
    .video-body {
      padding: 20px 20px 0;

      .video-body-title{
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #444444;
        line-height: 38px;
        height: 38px;
      }

    }
  }
</style>
