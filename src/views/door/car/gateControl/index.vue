<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>车辆道闸控制</span>
      </div>
      <div class="gate-door">
        <div class="gate-door-tree">
          <div class="title">
            <span>选择道闸</span>
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
      </div>
    </el-card>

  </div>
</template>

<script>
import CarAPI from '@/api/base/car'
import GateControl from './gateControl'
import { registertree } from '@/api/base/region'
import { delchildren } from '@/utils/index'

export default {
  name: 'GateControl',
  data() {
    this.carBreakList = []
    this.GateControlCls = null
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
      this.GateControlCls.moveToRegion(data)
    },
    initMap() {
      this.GateControlCls = new GateControl({ id: this.$refs.map })
      this.getCarBreakList().then(() => {
        this.GateControlCls.initFeatures(this.carBreakList)
      })
    },
    getCarBreakList() {
      return CarAPI.all().then((res) => {
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
