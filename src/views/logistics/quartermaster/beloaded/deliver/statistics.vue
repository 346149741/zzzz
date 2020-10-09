<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>被装统计</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-card>
            <h3>部门</h3>
            <hr>
            <el-tree
              ref="tree"
              :data="treeData"
              node-key="id"
              :props="{ children: 'children', label: 'label'}"
              highlight-current
              default-expand-all
              :expand-on-click-node="false"
            />
          </el-card>
        </el-col>
        <el-col :span="19">
          <el-card>
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="被装发放总览" name="first">
                <div ref="chart" class="my-chart" />
              </el-tab-pane>
              <el-tab-pane label="被装发放详情" name="second">
                <div class="filter-container">
                  <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="姓名：" class="filter-item">
                      <el-input
                        v-model="listQuery.params.c"
                        type="text"
                        class="filter-item"
                        placeholder="请输入姓名"
                        @keyup.enter.native="handleFilter"
                      />
                    </el-form-item>
                    <el-form-item label="被装类型：" class="filter-item">
                      <el-input
                        v-model="listQuery.params.a"
                        type="text"
                        class="filter-item"
                        placeholder="请输入被装类型"
                        @keyup.enter.native="handleFilter"
                      />
                    </el-form-item>
                    <el-form-item class="filter-item">
                      <el-button
                        v-waves
                        class="filter-item btn-base"
                        type="primary"
                        icon="mr10 iconfont el-icon-search"
                        @click="handleFilter"
                      >{{ $t('table.search') }}
                      </el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
                  <el-table-column type="index" label="序号" width="50" />
                  <el-table-column property="a" label="姓名" />
                  <el-table-column property="b" label="被装类型" />
                  <el-table-column property="c" label="个数" />
                  <!--<el-table-column label="操作" width="100px">-->
                  <!--  <template slot-scope="scope">-->
                  <!--    <div class="t-col-operate">-->
                  <!--      <i-->
                  <!--        class="el-icon-tickets primary table-i"-->
                  <!--        title="详情"-->
                  <!--        @click="details(1,scope.row.a,scope.row)"-->
                  <!--      />-->
                  <!--    </div>-->
                  <!--  </template>-->
                  <!--</el-table-column>-->
                </el-table>
                <!--分页工具条-->
                <div class="pagination-container">
                  <el-pagination
                    background
                    :current-page="listQuery.pageNo"
                    :page-sizes="[10,20,30, 50]"
                    :page-size="listQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="list.length"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                  />
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { region } from '../../../barracks/mockData'
import echarts from 'echarts'
export default {
  name: 'Index',
  data() {
    return {
      activeName: 'first',
      listLoading: false,
      total: 0,
      list: [
        {
          a: '王海洋',
          b: '夏常服',
          c: 1
        },
        {
          a: '王海洋',
          b: '作训服',
          c: 1
        }, {
          a: '王海洋',
          b: '袜子',
          c: 6
        }
      ],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          b: ''
        }
      },
      treeData: region,
      chartObj: null,
      chartOption: {
        title: {
          text: '物资统计详情'
        },
        tooltip: {},
        legend: {
          data: ['总数']
        },
        xAxis: {
          data: ['作战服', '战术腰带', '作战靴', '袜子', '常服', '衬衫']
        },
        yAxis: {},
        series: [{
          name: '总计',
          type: 'bar',
          data: [220, 220, 220, 600, 800, 400],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ]
            )
          }
        },
        {
          data: [531, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  mounted() {
    this.chartObj = echarts.init(this.$refs.chart)
    this.initChart()
  },
  methods: {
    details() {

    },
    handleFilter() {
      this.listQuery.pageNo = 1
    },
    initChart() {
      this.chartObj.setOption(this.chartOption)
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    getList() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .my-chart{
    height: 60vh;
  }
</style>
