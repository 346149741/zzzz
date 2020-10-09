<template>
  <div>
    <el-dialog
      v-if="visible"
      class="abow_dialog"
      title="巡查对象"
      :visible.sync="visible"
      :close-on-click-modal="false"
      width="60%"
      :before-close="handleCancel"
    >
      <div class="dialog-content">
        <div class="dialog-table">
          <el-tabs :value="activeModel" type="card">
            <!--['待选区域','已选区域']  height="540px"-->
            <el-tab-pane label="固定区域" name="first">
              <div class="container stable-region">
                <div>
                  <div class="title">待选区域</div>
                  <el-scrollbar class="body">
                    <el-tree
                      ref="tree"
                      class="filter-tree"
                      :data="fromData"
                      :props=" { children: 'children', label: 'areaName' }"
                      default-expand-all
                      :expand-on-click-node="false"
                      @node-click="handleStableNodeClick"
                    />
                  </el-scrollbar>
                </div>
                <div>
                  <div class="title">已选区域</div>
                  <el-scrollbar class="body">
                    <el-tree
                      ref="tree"
                      class="filter-tree"
                      :data="toData"
                      :props=" { children: 'children', label: 'areaName' }"
                      default-expand-all
                    >
                      <span slot-scope="{ node, data }" class="custom-tree-node">
                        <span>{{ data.areaName }}</span>
                        <span>
                          <i class="el-icon-delete" @click="deleteToItem(data)" />
                        </span>
                      </span>
                    </el-tree>
                  </el-scrollbar>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="自定义区域" name="second">
              <div class="container">自定义区域</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { registertree } from '@/api/base/region'
import { delchildren } from '@/utils/index'
export default {
  name: 'DialogInspectionList',
  props: {
    selectId: {
      type: String,
      default: ''
    },
    visible: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeModel: 'first',
      fromData: [],
      toData: [],
      customData: []
    }
  },
  watch: {
    visible(val) {
      if (!val) return
    }
  },
  created() {
    registertree().then(res => {
      this.fromData = delchildren(res.data)
    })
  },
  mounted() {
  },
  methods: {
    handleStableNodeClick(data) {
      const item = this.toData.find((item) => item.id === data.id)
      if (!item) {
        const obj = JSON.parse(JSON.stringify(data))
        if (obj.hasOwnProperty('children')) {
          delete obj.children
        }
        this.toData.push(obj)
      }
    },
    deleteToItem(data) {
      const index = this.toData.findIndex((item) => item.id === data.id)
      this.toData.splice(index, 1)
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    handleOK() {
      this.$emit('handleOK', this.toData)
      this.handleCancel()
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog-table{
    .container{
      height: 540px;
      .body{
        height: 540px;
        border: 1px solid #DDDDDD;
        border-radius: 4px;
      }
      &.stable-region{
        &>div{
          width: 45%;
        }
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        .title{
          text-align: center;
        }
      }
      .custom-tree-node{
        display: block;
        width: 100%;
        .el-icon-delete{
          margin-right: 20px;
          float: right;
        }
      }
    }
  }
</style>
