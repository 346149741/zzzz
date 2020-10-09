<template>
  <div class="protect-monitor">
    <!--  左侧树  -->
    <div class="gate-door-tree">
      <div class="title">
        <span>无人机巡检</span>
        <span class="caret" @click="isOpen=!isOpen">
          <i v-if="isOpen" class=" el-icon-caret-bottom" />
          <i v-else class=" el-icon-caret-top" />
        </span>
      </div>
      <el-collapse-transition>
        <div v-if="isOpen" class="gate-tree">
          <el-tree
            :data="regionTree"
            node-key="id"
            default-expand-all
            :highlight-current="true"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span v-if="node.isLeaf" style="margin-left: 20px;">
                <i class="iconfont iconlocation" />
                <i class="iconfont iconguiji" />
                <i class="iconfont icon-_jiankong" />
              </span>
            </span>
          </el-tree>
        </div>
      </el-collapse-transition>
    </div>
    <!--  主地图  -->
    <div id="map" ref="map" class="onemap" />
    <!--  视频  -->
    <div v-if="videoVisible" class="protect-video">
      <div class="title">
        <span>实时监控</span>
        <el-checkbox v-model="AICheck">AI识别</el-checkbox>
        <i class="iconfont iconcuowu" @click="handleVideoDialogVisible(false)" />
      </div>
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
    <!--操控-->
    <div class="protect-control">
      <div class="pannel">
        <div class="container dashboard">
          <div class="item battery">
            <div>
              <span class="fly-btn" size="medium" @click="handleUAVFly">一键起飞</span>
              <span class="fly-btn" size="medium" @click="handleUAVLand">一键降落</span>
            </div>
            <div class="battery-main">
              <div class="power-txt">
                <div>电池状态：<span class="state">良好</span></div>
                <div>当前电压：<span class="state">45.5V</span></div>
              </div>
              <Battery :full="100" :current="89" />
            </div>
          </div>
          <div class="item radar">
            <div class="tip-txt">起点距离:256.33m</div>
            <div class="radar-item">
              <div class="cell" />
              <span class="txt">航偏</span></div>
            <div class="radar-item">
              <div class="cell">
                <Radar />
              </div>
              <span class="txt">避障</span></div>
          </div>
          <div class="item radar">
            <div class="radar-item">
              <div class="cell">
                <HeightDashboard :full="300" :current="120" />
              </div>
              <span class="txt">高度(m)</span></div>
            <div class="radar-item">
              <div class="cell">
                <SpeedDashboard :full="300" :current="0" />
              </div>
              <span class="txt">速度(m/s)</span></div>
          </div>
        </div>
        <div class="container yuntai">
          <div class="main">
            <div class="img">
              <img class="sanjiao left one" src="@/assets/yuntai/gou.png" alt="">
              <img class="sanjiao middle two" src="@/assets/yuntai/gou.png" alt="">
              <img class="sanjiao middle three" src="@/assets/yuntai/gou.png" alt="">
              <img class="sanjiao left four" src="@/assets/yuntai/gou.png" alt="">
              <img src="@/assets/yuntai/yuntai.png" alt="">
            </div>
            <br>
            <el-radio-group v-model="currentShowDetail.radioType">
              <el-radio :label="3">锁定</el-radio>
              <el-radio :label="6">控制</el-radio>
              <el-radio :label="9">回中</el-radio>
            </el-radio-group>
          </div>
          <div class="control">
            <div class="txt">云台控制</div>
            <div class="rectangle">
              <div class="block left top"><i class="icon el-icon-circle-plus" /><span>放大</span></div>
              <div class="block right top"><i class="icon el-icon-remove" /><span>缩小</span></div>
              <div class="block left bottom"><i class="icon el-icon-camera-solid" /><span>拍照</span></div>
              <div class="block right bottom"><i class="icon el-icon-video-camera-solid" /><span>录像</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapMonitor from './mapMonitor'
import EasyPlayer from '@easydarwin/easyplayer'
import Battery from './battery'
import FlyAttitude from './FlyAttitude'
import HeightDashboard from './HeightDashboard'
import SpeedDashboard from './SpeedDashboard'
import Radar from './Radar'

export default {
  name: 'ProtectMonitor',
  components: { EasyPlayer, Battery, FlyAttitude, HeightDashboard, SpeedDashboard, Radar },
  data() {
    this.mapMonitor = null
    return {
      videoVisible: true,
      currentShowDetail: {
        radioType: 3,
        url: '',
        name: 'dj0001'
      },
      AICheck: false,
      isOpen: true,
      regionTree: [
        {
          id: '1', label: '任务信息', children: [
            { id: '11', label: '周边日常巡检(2在线 1离线)', children: [
              { id: '111', label: 'dji001(运行中)' },
              { id: '112', label: 'dji002(运行中)' },
              { id: '113', label: 'dji003(离线中)' }
            ] },
            { id: '12', label: '班公湖巡检(1在线)', children: [
              { id: '121', label: 'dji004(运行中)' }
            ] }
          ]
        }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    handleUAVFly() {

    },
    handleUAVLand() {

    },
    handleVideoDialogVisible(val) {
      this.videoVisible = val
    },
    init() {
      this.mapMonitor = new MapMonitor({
        id: this.$refs.map
      })
    },
    handleNodeClick(a, b) {
      debugger
    }
  }
}
</script>

<style lang="scss" scoped>
  .iconfont{
    cursor: pointer;
  }
  .protect-monitor {
    position: relative;
    width: 100%;
    height: 100%;

    .gate-door-tree {
      position: absolute;
      left: 40px;
      top: 30px;
      z-index: 99;
      width: 340px;
      border: 1px solid #20EBF9;
      border-radius: 4px;

      .title {
        height: 40px;
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 40px;
        background: rgba(28, 148, 154, 0.7);

        .caret {
          cursor: pointer;
        }
      }

      .gate-tree {
        /deep/ .el-tree {
          background: rgba(28, 148, 154, 0.7);
          color: #fff;

          .el-tree-node.is-current > .el-tree-node__content,
          .el-tree-node:focus > .el-tree-node__content {
            background-color: #14C0CC;
          }

          .el-tree-node__content:hover {
            background-color: #1c9399;
          }

        }
      }
    }

    .protect-video {
      padding: 0 12px;
      position: absolute;
      right: 30px;
      top: 30px;
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

    .protect-control {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 250px;
      background: rgba(22, 22, 22, 0.8);
      border-radius: 4px;
      text-align: center;

      .pannel {
        display: inline-block;
        margin: 18px 0px;
        width: 1488px;
      }

      .container {
        &:last-child {
          margin-left: 10px;
          padding-right: 20px;
        }

        float: left;
        background: rgba(62, 62, 64, 0.7);
        border: 2px solid #4F4F4F;
        border-radius: 4px;
      }

      .dashboard {
        padding: 32px 10px;
        display: flex;
        align-items: stretch;

        .item {
          padding: 0 10px;
          border-right: 1px solid rgba(255, 255, 255, 0.5);

          &:last-child {
            border-right: none;
          }
        }

        .battery {
          position: relative;
          display: flex;
          justify-content: space-evenly;
          align-items: center;

          .fly-btn {
            &:first-child {
              margin-bottom: 20px;
            }

            cursor: pointer;
            display: block;
            width: 114px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background: #1EC6D2;
            border-radius: 4px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;
          }

          .battery-main {
            margin: 0 40px;
            margin-right: 20px;
          }

          .power-txt {
            position: relative;
            bottom: 10px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 28px;

            .state {
              color: #81C020;
            }
          }
        }

        .radar {
          position: relative;
          display: flex;
          align-items: stretch;
          justify-content: space-evenly;

          .tip-txt {
            position: absolute;
            top: -28px;
            left: 16px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 28px;
          }

          .radar-item {
            position: relative;
            margin: 0 10px;

            .cell {
              width: 150px;
              height: 150px;
            }

            .txt {
              position: absolute;
              left: 50px;
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 28px;
            }
          }
        }
      }

      .yuntai {
        display: flex;
        align-items: stretch;

        .main {
          text-align: center;
          margin: 24px 20px 10px;

          .img {
            .left {
              left: 50%;
              transform: translateX(-50%);
            }

            .middle {
              top: 50%;
              transform: translateY(-50%);
            }

            .sanjiao {
              position: absolute;
              cursor: pointer;
              width: 24px;
            }

            .one {
              transform: rotate(-180deg);
              left: 42%;
              top: 10px;
            }

            .two {
              transform: rotate(90deg);
              top: 42%;
              left: 10px;
            }

            .three {
              right: 10px;
              transform: rotate(-86deg);
              top: 43%;
            }

            .four {
              bottom: 20px;
            }

            display: inline-block;
            position: relative;
          }

          /deep/ .el-radio__label {
            color: #fff;
          }
        }

        .control {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FEFEFE;
          line-height: 24px;

          .txt {
            text-align: center;
            line-height: 40px;
          }

          .rectangle {
            width: 150px;
            height: 150px;
            border: 2px solid #C5C5C5;
            border-radius: 10px;
            position: relative;

            .block {
              position: absolute;
              width: 68px;
              height: 68px;
              text-align: center;
            }

            .left {
              left: 0;
              border-right: 1px solid #747474
            }

            .right {
              right: 0;
              border-left: 1px solid #747474
            }

            .top {
              top: 0;
              border-bottom: 1px solid #747474
            }

            .bottom {
              bottom: 0;
              border-top: 1px solid #747474
            }

            .icon {
              cursor: pointer;
              margin-top: 20px;
              font-size: 25px;
              display: block;
            }
          }
        }

      }
    }

    .onemap {
      position: absolute;
      height: 100%;
      width: 100%;
    }
  }

</style>
