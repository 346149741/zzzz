<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <div class="header-title" style="display: flex;justify-content: space-between"><span style="cursor:pointer;" @click="$router.go(-1)">返回</span><span>任务详情</span><span /></div>
      </div>
      <leftPanel class="pannel" />
      <div class="protect-video">
        <div>
          <EasyPlayer
            :video-url="currentShowDetail.url"
            live
            :fluent="true"
            autoplay="autoplay"
            stretch
          />
        </div>
        <div class="bottom">
          {{ currentShowDetail.name }}
        </div>
      </div>
      <mapCmpt />
    </el-card>
  </div>
</template>
<script>
import mapCmpt from './mapCmpt.vue'
import leftPanel from './leftPanel.vue'
import EasyPlayer from '@easydarwin/easyplayer'
export default {
  name: 'ProtectTaskDetail',
  components: { mapCmpt, leftPanel, EasyPlayer },
  data() {
    return {
      AICheck: false,
      currentShowDetail: {}
    }
  },
  created() {
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  .box-card{
    position: relative;
  }
  .pannel{
    position: absolute;
    left: 60px;
    top: 90px;
    z-index: 99;
  }

  .protect-video {
    z-index: 99;
    padding: 12px;
    position: absolute;
    right: 30px;
    top: 140px;
    width: 360px;
    background: rgba(28, 148, 154, 0.7);
    border: 1px solid #20EBF9;
    border-radius: 4px;

    .title {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #20EBF9;
      line-height: 28px;

      /deep/ .el-checkbox {
        color: #20EBF9;
      }

      /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #20EBF9;
      }

      .iconfont {
        cursor: pointer;
      }
    }

    .bottom {
      text-align: center;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #20EBF9;
      line-height: 30px;
    }
  }
</style>
