<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>单位统计分析</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="单位名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.a"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入单位名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="考试日期：" class="filter-item">
            <el-date-picker
              v-model="listQuery.params.b"
              type="daterange"
              class="filter-item mr10"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="考试名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.c"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入考试名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconsousuo"
              @click="handleFilter"
            >{{ $t('table.search') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--各单位统计图-->
      <div class="chart-left">
        <div id="chart1" style="width: 100%;height: 600px;"></div>
      </div>
      <div class="chart-right">
        <div id="chart2" style="width: 100%;height: 300px;"></div>
        <div id="chart3" style="width: 100%;height: 300px;"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import MeAPI from '@/api/logistics/equ-information'
  const echarts = require('echarts')
  export default {
    name: 'Index',
    data() {
      return {
        chart1List: [],
        chart2List: [],
        chart3List: [],
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          params: {
            carNo: '',
            unitId: '',
            carUseId: ''
          }
        },
      }
    },
    mounted() {
      setTimeout(() => {
        this.initChart1()
        this.initChart2()
        this.initChart3()
      })
    },
    methods: {
      handleFilter() {

      },
      initChart1() {
        const option = {
          title: {
            text: "各单位统计图",
            left: "left",
            top: "top",
            textStyle: {
              // 文字颜色
              color: "black",
              // 字体风格,'normal','italic','oblique'
              fontStyle: "normal",
              // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
              fontWeight: "bold",
              // 字体系列
              fontFamily: "sans-serif",
              // 字体大小
              fontSize: 20,
            },
          },
          legend: {
            data: ['参考人数'],
            left: "right",
            top: "top",
          },
          tooltip: {
            formatter: "{a} <br/>{b} {c}",
          },
          xAxis: {
            type: 'category',
            data: ['一连', '二连', '三连', '四连', '五连', '六连', '七连', '八连', '九连']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '参考人数',
            data: [27, 52, 64, 80, 68, 92, 57, 87, 68],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
            label: {
              show: true,
              position: 'top'
            },
            barWidth : 30
          }]
        }
        const myChart = echarts.init(document.getElementById('chart1'))
        myChart.setOption(option, true)
      },
      initChart2() {
        const option = {
          title: {
            text: '成绩占比',
            left: 'center',
            top: 'bottom'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: ['60以下', '60-80', '80-90', '90-100']
          },
          series: [
            {
              name: '成绩占比',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {value: 84, name: '60以下'},
                {value: 368, name: '60-80'},
                {value: 283, name: '80-90'},
                {value: 67, name: '90-100'}],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        const myChart = echarts.init(document.getElementById('chart2'))
        myChart.setOption(option, true)
      },
      initChart3() {
        const option = {
          title: {
            text: '及格率占比',
            left: 'center',
            top: 'bottom'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: ['不及格', '及格']
          },
          series: [
            {
              name: '及格率占比',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {value: 84, name: '不及格'},
                {value: 368, name: '及格'}],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        const myChart = echarts.init(document.getElementById('chart3'))
        myChart.setOption(option, true)
      }

    }
  }
</script>

<style scoped>
.chart-left{
  display: inline;
  float: left;
  margin-left: 48px;
  width: 60%;
}
.chart-right{
  display: inline;
  float: left;
  margin-right: 48px;
  width: 30%;
}
</style>
