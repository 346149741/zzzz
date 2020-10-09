<template>
  <div>
    <div v-drag class="videoLocation dargable">
      <div class="video-title-main">
        <div class="video-title">抓拍图像</div>
        <i class="el-icon-close videoLocation-title" @click="close" />
      </div>
      <div class="video-body">
        <el-image
          :src="url"
          :preview-src-list="[url]"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleImageDialog',
  data() {
    return {
      url: ''
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    close() {
      document.body.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
  .videoLocation{
    position: absolute;
    top: 100px;
    right: 300px;
    z-index:1900;
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
      text-align: center;
    }
  }
</style>
