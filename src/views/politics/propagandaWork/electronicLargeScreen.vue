<template>
  <div class="app-container">
    <el-row :gutter="15">
      <!--部门树-->
      <el-col :span="4">
        <el-card class="box-card">
          <el-tree
            :data="data"
            node-key="id"
            show-checkbox
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent"
          />
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card class="box-card app-body">
          <div slot="header" class="clearfix">
            <span>电子橱窗</span>
          </div>
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="电子屏：" class="filter-item">
                <el-input
                  v-model="listQuery.params.bumen"
                  type="text"
                  class="filter-item"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item class="filter-item">
                <el-button
                  v-waves
                  class="filter-item btn-base"
                  type="primary"
                >{{ $t('table.search') }}</el-button>
              </el-form-item>
            </el-form>
            <img src="./img5.png" alt="">
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { registertree } from '@/api/base/region'
export default {
  data() {
    return {
      data: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      dialog1: false,
      form: {

      }
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    getTree() {
      registertree().then((response) => {
        this.data = response.data
      })
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{data.areaName}</span>
        </span>
      )
    }
  }
}
</script>
<style scoped>
</style>
