<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>副食品采购公布</span>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-card>
              <div slot="header" class="clearfix subtitle">
                <span class="title">食堂列表</span>
              </div>
              <el-tree
                :data="canteenList"
                node-key="id"
                default-expand-all
                :highlight-current="true"
                :expand-on-click-node="false"
                :props="{ children: 'children', label: 'name' }"
                @node-click="handleNodeClick"
              />
            </el-card>
          </el-col>
          <el-col :span="20">
            <el-card>
              <div slot="header" class="clearfix subtitle ">
                <div class="asdfgh">
                  <span class="title">每周采购详情</span>
                  <span style="float:right;">
                    选择日期:
                    <el-date-picker
                      v-model="searchTime"
                      type="week"
                      size="small"
                      format="yyyy 第 WW 周"
                      placeholder="选择周"
                    />
                    <el-button
                      v-waves
                      class="filter-item btn-base ssssss"
                      type="primary"
                      size="mini"
                      icon="mr10 iconfont iconsousuo"
                      @click="handleFilter"
                    >查询</el-button>
                  </span>
                </div>
              </div>
              <div class="menu-table">
                <h3 style="text-align: center">2020年第32周</h3>
                <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
                  <el-table-column type="index" label="序号" width="50" />
                  <el-table-column property="a" label="食堂名称" />
                  <el-table-column property="b" label="类型" />
                  <el-table-column property="c" label="个数" />
                  <el-table-column property="d" label="单价" />
                  <el-table-column property="e" label="总价" />
                  <el-table-column property="f" label="采购时间" />
                </el-table>
                <!--分页工具条-->
                <div class="pagination-container">
                  <el-pagination
                    background
                    :current-page="listQuery.pageNo"
                    :page-sizes="[10,20,30, 50]"
                    :page-size="listQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                  />
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { canteenList } from '../mockData'

export default {
  name: 'MenuShow',
  data() {
    return {
      canteenList,
      searchTime: '',
      listLoading: '',
      total: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          a: '',
          b: ''
        }
      },
      list: [
        {
          a: '机关1食堂',
          b: '咸菜',
          c: '200斤',
          d: '5元',
          e: '1000元',
          f: '2020-08-12'
        }
      ]
    }
  },
  methods: {
    getList() {

    },
    handleFilter() {

    },
    handleNodeClick() {

    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .subtitle {
    .title, .asdfgh /deep/ span{
      font-weight: 600;
      font-size: 16px;
      color: #000;
    }
  }
  .ssssss /deep/ span{
    color: #fff!important;
  }

  .menu-table {
    .main{
      border: 1px solid #eee;
      width: 100%;
      padding: 10px;
      border-spacing: 0;
      border-collapse: collapse;
      th,td {
        border: 1px solid #eee;
        height: 100px;
        padding-left: 10px;
      }

    }
  }
</style>
