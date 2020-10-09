<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>车辆实时监控</span>
      </div>
      <div class="gate-door">
        <div class="gate-door-tree">
          <div class="title">
            <span>选择摄像头</span>
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
                :props="{ children: 'children', label: 'areaName' }"
                @node-click="handleNodeClick"
              />
            </div>
          </el-collapse-transition>
        </div>
        <div ref="map" class="map-container" />
        <rightPanel />
      </div>
    </el-card>

  </div>
</template>

<script>
import CameraAPI from '@/api/base/camera'
import MonitorCls from './MonitorCls'
import { registertree } from '@/api/base/region'
import { delchildren } from '@/utils/index'
import rightPanel from './rightPanel'
import { SingleCamera_Com, MultiCamera_Com } from '@/components/DialogCmpts/pops.js'
import { createPop } from '@/components/DialogCmpts'

export default {
  name: 'Monitor',
  components: { rightPanel },
  data() {
    this.carBreakList = []
    this.MonitorObj = null
    return {
      isOpen: true,
      regionTree: null
    }
  },
  mounted() {
    this.initMap()
    this.initTree()
  },
  methods: {
    initTree() {
      registertree().then((res) => {
        this.regionTree = delchildren(res.data)
      })
    },
    handleNodeClick(data) {
      this.MonitorObj.moveToRegion(data, this.cameraShow)
    },
    initMap() {
      this.MonitorObj = new MonitorCls({ id: this.$refs.map })
      this.getCameraList().then(() => {
        this.MonitorObj.initFeatures(this.carBreakList, this.cameraShow)
      })
    },
    cameraShow(type, info) {
      let cmpt = null
      if (type === 'single') {
        cmpt = new SingleCamera_Com({ url: '', title: '华南观点的摄像头很好看' })
      } else {
        const list = [
          { url: '', title: '华南观点的摄像头很好看1' },
          { url: '', title: '华南观点的摄像头很好看11' },
          { url: '', title: '华南观点的摄像头很好看111' },
          { url: '', title: '华南观点的摄像头很好看112' },
          { url: '', title: '华南观点的摄像头很好看113' },
          { url: '', title: '华南观点的摄像头很好看114' },
          { url: '', title: '华南观点的摄像头很好看115' }
        ]
        cmpt = new MultiCamera_Com({ list })
      }
      createPop(cmpt, 'cameraPopUp')
      this.$nextTick(() => {
      })
    },
    getCameraList() {
      return CameraAPI.all().then((res) => {
        this.carBreakList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .gate-door {
    position: relative;

    .gate-door-tree {
      position: absolute;
      left: 20px;
      top: 10px;
      z-index: 99;
      width: 270px;
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
    }
  }

  .gate-tree {
    /deep/ .el-tree {
      background: rgba(28, 148, 154, 0.7);
      color: #fff;

      .el-tree-node__content{
        height: 30px!important;
      }
       .el-tree-node.is-current > .el-tree-node__content,
       .el-tree-node:focus > .el-tree-node__content
       {
        background-color: #14C0CC;
      }
      .el-tree-node__content:hover      {
        background-color: #1c9399;
      }

    }
  }

  .map-container {
    height: 70vh;
  }
</style>
