<template>
  <div class="pop-track-node">
    <div class="pop-track-content">
      <div>
        <div class="pop-bg bg-top" />
        <div class="pop-bg bg-bottom" />
      </div>
      <div class="container-title">防区</div>
      <div class="container-con">
        <table>
          <tr class="inner_font">
            <td class="con-font">防区编号：</td>
            <td>{{ info.code }}</td>
          </tr>
          <tr class="inner_font">
            <td class="con-font">防区名称：</td>
            <td>{{ info.name }}</td>
          </tr>
          <tr class="inner_font">
            <td class="con-font">布防状态：</td>
            <td>{{ getdefenceStatusName(info.defenceStatus) }}</td>
          </tr>
          <tr class="inner_font">
            <td class="con-font">防区类型：</td>
            <td>{{ getdefenceTypeName(info.defenceType) }}</td>
          </tr>
          <!-- 字段需要重定 -->
        </table>
      </div>
      <div class="container-footer">
        <el-button v-show="getdefenceStatusName(info.defenceStatus)=='撤防'" style="margin-right: 5px" size="mini" @click="Deployment(info.id)">布防</el-button>
        <el-button v-show="getdefenceStatusName(info.defenceStatus)=='布防'" style="margin-right: 5px" size="mini" @click="Withdraw(info.id)">撤防</el-button>
        <el-button v-show="getdefenceStatusName(info.defenceStatus)=='布防'" style="margin-right: 5px" size="mini" @click="bypass(info.id)">旁路</el-button>
        <el-button v-show="getdefenceStatusName(info.defenceStatus)=='旁路'" style="margin-right: 5px" size="mini" @click="cancelBypass(info.id)">取消旁路</el-button>
        <el-button style="margin-right: 5px" size="mini" @click="handleViewVideos">实时监控</el-button>
      </div>
      <div class="vertical-bar">
        <div class="vertical-ball" />
      </div>
    </div>
  </div>
</template>
<script>
import deploymentAPI from '@/api/perimeter/deployment.js'
import { MultiCamera_Com } from '../DialogCmpts/pops'
import { dictBatch } from '@/api/base/dictDetail'
import { createPop } from '@/components/DialogCmpts/index.js'

export default {
  // 防区气泡
  name: 'Perimeter',
  data() {
    return {
      defenceStatusList: [],
      defenceTypeList: []
    }
  },
  created() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      dictBatch(['3040', '3041', '3042']).then(res => {
        this.defenceTypeList = res.data['3041']// 防区类型
        this.defenceStatusList = res.data['3042']// 布防状态
      })
    },
    handleViewVideos() {
      const list = [
        { url: '', title: '华南观点的摄像头很好看1' },
        { url: '', title: '华南观点的摄像头很好看11' },
        { url: '', title: '华南观点的摄像头很好看111' },
        { url: '', title: '华南观点的摄像头很好看112' },
        { url: '', title: '华南观点的摄像头很好看113' },
        { url: '', title: '华南观点的摄像头很好看114' },
        { url: '', title: '华南观点的摄像头很好看115' }
      ]
      const cmpt = new MultiCamera_Com({ list })
      createPop(cmpt, 'cameraPopUp')
    },
    handleChangeState(val) {
      console.log(val)
    },
    // 获取布防状态
    getdefenceStatusName(val) {
      const item = this.defenceStatusList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    },
    bypass(id) {
      deploymentAPI.bypass(id).then(res => {
        this.setStatus(id, '02', this.layer)
        this.$notify.success({
          title: '成功',
          message: '已设置旁路'
        })
      })
    },
    // 取消旁路
    cancelBypass(id) {
      deploymentAPI.cancelBypass(id).then(res => {
        this.setStatus(id, '00', this.layer)
        this.$notify.success({
          title: '成功',
          message: '已取消旁路'
        })
      })
    },
    // 撤防
    Withdraw(id) {
      deploymentAPI.bathWithdraw(id).then(res => {
        this.setStatus(id, '01', this.layer)
        this.$notify.success({
          title: '成功',
          message: '已撤防'
        })
      })
    },
    Deployment(id) {
      deploymentAPI.bathDeployment(id).then(res => {
        this.setStatus(id, '00', this.layer)
        this.$notify.success({
          title: '成功',
          message: '已布防'
        })
      })
    },
    // 获取防区类型
    getdefenceTypeName(val) {
      const item = this.defenceTypeList.find(item => item.key === val)
      if (item) {
        return item.value
      }
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
