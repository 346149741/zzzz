<template>
  <div>
    <div>
      <div class="particulars dragable">
        <div class="between">
          <span class="bor-l">任务信息</span>
          <ul>
            <li>任务编号：{{ data.taskNo }}</li>
            <li>任务描述：{{ data.remark }}</li>
            <li>执行单位：{{ data.executeOrgName }}</li>
            <li>执行人：{{ data.executePersonInfo }}</li>
            <li>计划完成时间：{{ data.planFinishTime }}</li>
            <li>任务开始时间：{{ data.beginTime }}</li>
            <li>任务结束时间：{{ data.endTime }}</li>
          </ul>
        </div>
        <div v-if="parameter.taskFlag === '3'" class="playback">
          <div class="track">
            <span>播放轨迹</span>
            <i
              style="font-style: normal;float:right;cursor:pointer"
              @click="handleClearAnimateTrail"
            >清空</i>
          </div>
          <div class="control">
            <span class="triangle" @click="startPlaying">
              <i class="el-icon-caret-right" />
            </span>
            <span class="control-font" @click="startPlaying">播放</span>
            <span class="square" @click="pausede" />
            <span class="control-font" @click="pausede">停止</span>
            <span class="visual-angle">
              <img class="visual-img" src="@/assets/tool/visualAngle.png">
              <el-select v-model="visualAngle" placeholder="视角模式" @change="visualAngleChange">
                <el-option label="无" value="0" />
                <el-option label="跟随视角" value="1" />
              </el-select>
            </span>
          </div>
        </div>
        <div v-if="parameter.taskFlag === '3'" class="scrollbar">
          <span class="situation">任务执行情况</span>
          <div class="scroll-t">
            <ul>
              <li v-for="(item,index) in active" :key="index" class="timeset" @click="zero(item)">
                <div class="left-l">
                  <span class="ball" />
                  <br>
                  <span v-if="index === active.length-1?false:true" class="line" />
                </div>
                <div class="event-t" @click="handleMoveToEventItem(item)">
                  <span :class="item.type === 0 ? 'event-name' : 'term-name' ">{{ item.content }}</span>
                  <div style="display:inline-block">
                    <p class="fontp">{{ item.uploadDataTypeName }}</p>
                    <p class="event-time">{{ item.timestamp }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { timestream } from '@/api/routinetasks'

export default {
  name: 'FlyDetailComp',
  props: {
    parameter: {
      type: Object,
      default: function() {
        return {
          taskFlag: '3'
        }
      }
    }
  },
  data() {
    return {
      data: {
        taskNo: 'task-20201001',
        remark: '临时巡检',
        executeOrgName: '无人机二队',
        executePersonInfo: '胡健民',
        planFinishTime: '2020-9-25 ',
        beginTime: '2020-9-24 10:02',
        endTime: '2020-9-24 12:00'
      },
      active: [
        { type: '0', content: '预警', uploadDataTypeName: '非法入侵', timestamp: '2020年9月25日14:53:29' },
        { type: '0', content: '预警', uploadDataTypeName: '非法入侵', timestamp: '2020年9月25日14:53:29' }
      ],
      dialogVisible: false,
      dialog: false,
      dataname: '',
      actived: '',
      paused: true,
      hidedata: false,
      viewLock: false,
      visualAngle: '1'
    }
  },
  mounted() {},
  methods: {
    handleViewLocked(val) {
      // Methods.lockScanView(val)
    },
    handleMoveToEventItem(item) {
      // Methods.moveToItem(item.id)
    },
    initdata() {
      // console.log(this.parameter)
      // this.active = []
      // timestream(this.parameter.id).then(res => {
      //   for (let i = 0; i < res.data.length; i++) {
      //     const list = {
      //       content: res.data[i].operateTypeName,
      //       timestamp: res.data[i].operateTime,
      //       type: res.data[i].type,
      //       id: res.data[i].id,
      //       uploadDataTypeName: res.data[i].uploadDataTypeName
      //     }
      //     this.active.push(list)
      //   }
      // })
    },
    zero(item) {
      // if (item.type === 1) {
      //   this.dataname = item.id
      //   this.dialog = true
      // } else if (item.type === 0) {
      //   this.actived = item.id
      //   this.dialogVisible = true
      // }
    },
    handleClearAnimateTrail() {
      // this.paused = false
      // Methods.clearFlyTrail()
    },
    pausede() {
      // this.paused = false
      // Methods.TrailStop()
    },
    startPlaying() {
      // this.paused = false
      // this.$parent.traiectoryOpen(this.data)
      // Methods.TrailPlay()
    },
    hide() {
      // this.$emit('closeDetailTaskPanel')
    },
    visualAngleChange() {
      // if (this.visualAngle === '0') {
      //   this.handleViewLocked(false)
      // } else if (this.visualAngle === '1') {
      //   this.handleViewLocked(true)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.height-b {
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 600px;
  }
}
.title-close {
  position: absolute;
  top: 8px;
  right: 8px;
  color: #cde7ff;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    color: #ffffff;
  }
}

.particulars {
  width: 100%;
  min-width: 260px;
  position: absolute;
  top: 50px;
  left: 110%;
  padding: 10px;
  background: rgba(28, 147, 153, 0.6);
  border: 1px solid #20EBF9;
  border-radius: 10px;
  overflow-x: hidden;
  overflow-y: hidden;

  .header-t {
    width: 100%;
    height: 20px;
    position: absolute;
    left: 0;
    top: 0;

    .left-f {
      float: left;
      width: 20px;
      height: 20px;
      border-top: 2px solid rgba(1, 176, 241, 1);
      border-left: 2px solid rgba(1, 176, 241, 1);
    }

    .right-l {
      float: right;
      width: 20px;
      height: 20px;
      border-top: 2px solid rgba(1, 176, 241, 1);
      border-right: 2px solid rgba(1, 176, 241, 1);
    }
  }

  .header-b {
    width: 100%;
    height: 20px;
    position: absolute;
    bottom: 0;
    left: 0;

    .left-f {
      float: left;
      width: 20px;
      height: 20px;
      border-bottom: 2px solid rgba(1, 176, 241, 1);
      border-left: 2px solid rgba(1, 176, 241, 1);
    }

    .right-l {
      float: right;
      width: 20px;
      height: 20px;
      border-bottom: 2px solid rgba(1, 176, 241, 1);
      border-right: 2px solid rgba(1, 176, 241, 1);
    }
  }

  .between {
    color: white;

    .bor-l {
      display: block;
      color: #cde7ff;
      border-left: 2px solid #cde7ff;
      padding-left: 10px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      margin: 10px 0;
      font-size: 14px;
    }

    i {
      margin: 0 4px;
    }

    ul {
      font-size: 12px;
      padding-left: 14px;

      li {
        color: rgba(173, 219, 242, 0.9);
        line-height: 28px;
      }
    }
  }

  h5 {
    margin: 0px;
  }

  ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;
    }
  }

  .playback {
    color: #cde7ff;

    .track {
      border-left: 2px solid #cde7ff;
      padding-left: 10px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      margin: 10px 0;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
    }

    .control {
      display: flex;
      padding-top: 8px;
      padding-bottom: 8px;

      .triangle {
        display: block;
        margin-left: 5px;
        font-size: 20px;
        color: #23f170;
        cursor: pointer;
      }

      .square {
        display: block;
        border: none;
        margin: 3px;
        margin-top: 7px;
        width: 12px;
        height: 12px;
        background-color: #e63535;
        cursor: pointer;
      }

      .initiate {
        display: block;
        margin: 10px;
        width: 8px;
        height: 10px;
        border-left: 2px solid rgb(92, 164, 95);
        border-right: 2px solid rgb(92, 164, 95);
      }

      .visual-angle {
        position: absolute;
        right: 10px;
        width: 95px;
        .visual-img {
          width: 17px;
          height: 17px;
          margin-left: -25px;
          margin-bottom: -4px;
        }
      }

      .control-font {
        font-size: 9px;
        margin-top: 6px;
        margin-left: 6px;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: white;
        }
      }
    }
  }

  .scrollbar {
    margin-top: 5px;
    color: white;

    .situation {
      display: block;
      color: #cde7ff;
      border-left: 2px solid #cde7ff;
      padding-left: 10px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      margin: 10px 0;
      font-size: 14px;
    }

    .scroll-t {
      // padding-top: 12px;
      padding-left: 14px;
      font-size: 12px;
    }
  }

  @media (max-height: 760px) {
    .scroll-t {
      height: 200px;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .scroll-t::-webkit-scrollbar {
      display: none;
    }
  }
  @media (min-height: 760px) {
    .scroll-t {
      max-height: 310px;
      overflow: auto;
    }
    .scroll-t::-webkit-scrollbar {
      display: none;
    }
  }
  /*.scrollbar:after{*/
  /*    content:'.';*/
  /*    display:block;*/
  /*    clear:both;*/
  /*    height:0;*/
  /*    overflow:hidden;*/
  /*    visibility:hidden;*/
  /*}*/
  .ball {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(173, 219, 242, 0.9);
    position: absolute;
    top: 10px;
  }
  .left-l {
    float: left;
    position: relative;
    width: 10px;
  }
  .event-t {
    float: left;
    margin-left: 15px;
  }
  .event-name {
    border: 1px solid rgba(98, 214, 253, 1);
    padding: 6px;
    border-radius: 5px;
    color: rgba(98, 214, 253, 1);
    float: left;
  }
  .term-name {
    border: 1px solid #fa9133;
    padding: 6px;
    border-radius: 5px;
    color: #fa9133;
    float: left;
  }
  .event-time {
    margin-left: 16px;
    margin-top: 0;
    margin-bottom: 0;
    color: rgba(173, 219, 242, 0.9);
  }
  .line {
    width: 2px;
    height: 50px;
    background: rgba(173, 219, 242, 0.9);
    position: absolute;
    left: 4px;
  }
  .timeset {
    height: 50px;
    cursor: pointer;

    ul {
      /*padding-left: 0px;*/
      /*margin: 0px;*/

      .event-t {
        margin-left: 20px;

        span {
          // display: block;
          border: none;
          height: 6px;
        }

      }

      li {
        /*list-style: none;*/
        /*float: left;*/
        /*padding-left: 0px;*/
      }
    }

  }

  .nonurgent {
    position: absolute;
    right: 4px;
    top: 30px;
    width: 83%;
    background-color: rgba(0, 108, 108, 0.5);
  }

  .nonurgented {
    position: absolute;
    right: 4px;
    top: 30px;
    width: 83%;
    background-color: rgba(0, 108, 108, 0.5);
  }
}
.particulars::-webkit-scrollbar {
  display: none;
}
.fontp {
  color: #CDE7FF;
  margin-left: 16px;
  margin-bottom: 5px;
  margin-top: 0;
}
</style>
<style lang="scss">
$font-default: #cde7ff;
$font-hover: #ffffff;
.bg-c {
  background-color: rgb(0, 108, 108) !important;

  .el-dialog__header {
    padding: 0px;
  }
}
.visual-angle {
  .el-input {
    font-size: 12px;
  }
  .el-input__inner {
    height: 26px;
    background-color: rgba(7, 52, 96, 0);
    color: $font-default;
    line-height: 30px;
    border: 1px solid $font-default;
  }
  .el-input__icon {
    color: $font-default;
    line-height: unset;
  }
}

</style>
