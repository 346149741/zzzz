<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>伙食开支统计</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="5">
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
        <el-col :span="19">
          <el-card>
            <div slot="header" class="clearfix subtitle">
              <div class="asdfgh">
                <span class="title">伙食开支统计</span>
                <span style="float:right;">
                  选择月份:
                  <el-date-picker
                    v-model="listQuery.params.a"
                    type="month"
                    size="small"
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
import { canteenList } from '../mockData'
export default {
  name: 'Index',
  data() {
    return {
      canteenList,
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
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['米面', '油', '肉类', '蔬菜', '干调料', '设备及维修', '低值易耗']
        },
        xAxis: {
          type: 'category',
          data: ['8月1号', '8月2号', '8月3号', '8月4号', '8月5号', '8月6号', '8月7号', '8月8号'],
          name: '日期',
          axisLabel: {
            true: true,
            interval: 0, // 强制文字产生间隔
            rotate: 30, // 文字逆时针旋转0°
            showMaxLabel: true,
            textStyle: {
              color: '#95C9FF',
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '总计'
        },
        series: [
          {
            name: '米面',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [320, 302, 301, 334, 390, 330, 320, 320]
          },
          {
            name: '油',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [120, 132, 101, 134, 90, 230, 210, 22]
          },
          {
            name: '肉类',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [220, 182, 191, 234, 290, 330, 310, 120]
          },
          {
            name: '蔬菜',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [150, 212, 201, 154, 190, 330, 410, 321]
          },
          {
            name: '干调料',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [10, 32, 91, 34, 12, 13, 12]
          },
          {
            name: '设备及维修',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [0, 2, 1, 0, 2, 1, 0, 0]
          },
          {
            name: '低值易耗',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: [10, 32, 91, 34, 12, 13, 12]
          }
        ]
      }
    }
  },
  mounted() {
    this.chartObj = echarts.init(this.$refs.chart)
    this.initChart()
  },
  methods: {
    handleFilter() {

    },
    handleNodeClick() {

    },
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
</style>
