<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span class="go-back" @click="goback">返回</span>
      </div>
      <div>
        <EasyPlayer
          id="myplayer"
          :video-url="url"
          :fluent="true"
          autoplay="autoplay"
          stretch
        />
        <div class="video-body-title">{{ name }}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import EasyPlayer from '@easydarwin/easyplayer'

export default {
  name: 'MediaVideoDetail',
  components: { EasyPlayer },
  data() {
    return {
      url: 'https://v5.szjal.cn/20200910/xrpU7nqC/index.m3u8',
      name: '庆祝中华人民共和国成立70周年阅兵式'
    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .go-back {
    cursor: pointer;
  }
  #myplayer{
    width:  70%;
  }

  .video-body-title {
    padding: 20px 5px;
    font-size: 20px;
    font-weight: 800;
  }
</style>
