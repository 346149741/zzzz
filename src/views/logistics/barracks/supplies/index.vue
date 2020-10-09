<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>营房物资</span>
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
            <div ref="chart" class="my-chart" />
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { region } from '../mockData'
import echarts from 'echarts'
export default {
  name: 'Index',
  data() {
    return {
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
          data: ['锁具', '卫生洁具', '管件及闸门', '工具类', '泵类', '工具类']
        },
        yAxis: {},
        series: [{
          name: '总计',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
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
        }]
      }
    }
  },
  mounted() {
    this.chartObj = echarts.init(this.$refs.chart)
    this.initChart()
  },
  methods: {
    initChart() {
      this.chartObj.setOption(this.chartOption)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-chart{
  height: 60vh;
}
</style>
