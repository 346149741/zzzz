<template>
  <div class="pop-track-node">
    <div class="pop-track-content">
      <div>
        <div class="pop-bg bg-top" />
        <div class="pop-bg bg-bottom" />
      </div>
      <div class="container-title">摄像头</div>
      <div class="container-con">
        <table>
          <tr class="inner_font">
            <td class="con-font">品牌：</td>
            <td>{{ form.brand }}</td>
          </tr>
          <tr class="inner_font">
            <td class="con-font">类型：</td>
            <td>{{ form.type }}</td>
          </tr>
          <tr class="inner_font">
            <td class="con-font">所属区域：</td>
            <td>{{ form.areaName }}</td>
          </tr>

          <!-- 字段需要重定 -->
        </table>
      </div>
      <div class="container-footer">
        <el-button style="margin-right: 20px" size="medium" @click="handleViewVideos"><i class="iconfont iconjiankong" />实时监控</el-button>
      </div>
      <div class="vertical-bar">
        <div class="vertical-ball" />
      </div>
    </div>
  </div>
</template>
<script>
import { SingleCamera_Com } from '../DialogCmpts/pops'
import { createPop } from '@/components/DialogCmpts/index.js'
import CameraAPI from '@/api/base/camera'
export default {
  // 防区摄像头气泡
  name: 'PerimeterCamera',
  data() {
    return {
      form: {}
    }
  },
  created() {
    CameraAPI.detail(this.info.id).then(res => {
      if (res.data.lngLatAlt) {
        const lngLatAlt = JSON.parse(res.data.lngLatAlt)
        res.data.longitude = lngLatAlt[0]
        res.data.dimension = lngLatAlt[1]
        res.data.altitude = lngLatAlt[2]
          ? lngLatAlt[2]
          : 0
      }
      this.form = Object.assign({}, res.data)
    })
  },
  mounted() {

  },
  methods: {
    handleViewVideos() {
      const cmpt = new SingleCamera_Com({ url: '', title: '华南观点的摄像头很好看1' })
      createPop(cmpt, 'cameraPopUp')
    }
  }
}
</script>
<style lang="scss" scoped>
  .pop-track-node {
    position: absolute;

    .pop-track-content {
      position: absolute;
      left: -144px;
      bottom: 57px;
      width: 288px;
      background: rgba(28, 147, 153, 0.7);
      .pop-bg{
        z-index: 1;
        position: absolute;
        left: 0;
        width: 288px;
        &.bg-top{
          top: -6px;
          height: 40px;
          background-image: url('~@assets/popup/up.png');
        }
        &.bg-bottom{
          bottom: -6px;
          height: 74px;
          background-image: url('~@assets/popup/bottom.png');
        }
      }
    }

    .container-title {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;
      height: 40px;
      text-align: center;
      border: 1px solid #5CC3C6;
      border-bottom: none;
    }

    .container-con {
      color: #ffffff;
      line-height: 25px;
      font-size: 12px;
      padding: 0 40px;
      border: 1px solid #5CC3C6;
      border-top: none;
      border-bottom: none;
      table{
        border: 1px dashed #5CC3C6;
        border-left: none;
        border-right: none;
      }
      .con-font{
        font-weight: 600;
        width: 80px;
        text-align: right;
        display: inline-block;
      }
    }
    .container-footer{
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 68px;
      /deep/ .el-switch{
        .el-switch__label.is-active{
          color: #13ce66;
        }
         .el-switch__label{
          width: 14px!important;
        }
        .el-switch__label{
          color: #fff;
        }
      }

    }

    .vertical-bar {
      position: absolute;
      left: 50%;
      height: 54px;
      border-left: 3px solid rgba(28, 147, 153, 0.5);

      .vertical-ball {
        position: absolute;
        bottom: -10px;
        left: -7px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgba(28, 147, 153, 0.5);
      }
    }
  }

</style>
