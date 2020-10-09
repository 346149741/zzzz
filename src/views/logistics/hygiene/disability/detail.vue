<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>伤病残统计统计</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="7">
          <div id="chart1" style="width: 100%;height: 400px;" />
        </el-col>
        <el-col :span="17">
          <div id="chart2" style="width: 100%;height: 400px;" />
        </el-col>
        <el-col :span="24" style="margin-top: 24px;">
          <div id="chart3" style="width: 100%;height: 300px;" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import MeAPI from '@/api/training/exam-annualCheck'
const echarts = require('echarts')
export default {
  name: 'Index',
  data() {
    return {
      yearList: [],
      scoreList: [],
      typeList: [],
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
      }
    }
  },
  mounted() {
    this.getDict()
    setTimeout(() => {
      this.initChart1()
      this.initChart2()
      this.initChart3()
    })
  },
  methods: {
    getDict() {
      const res = MeAPI.dict()
      this.yearList = res.data['01']
      this.scoreList = res.data['02']
      this.typeList = res.data['03']
    },
    handleFilter() {

    },
    initChart1() {
      const option = {
        title: {
          text: '占比统计',
          left: 'left',
          top: 'top',
          textStyle: {
            color: '#1C9399'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          // type: 'scroll',
          // orient: 'vertical',
          left: 'left',
          top: 'bottom',
          data: ['十级伤残', '九级伤残', '八级伤残', '七级伤残', '六级伤残', '五级伤残', '四级伤残', '三级伤残', '二级伤残', '一级伤残']
        },
        series: [
          {
            name: '伤残人数',
            type: 'pie',
            radius: '45%',
            center: ['50%', '50%'],
            data: [
              { value: 54, name: '十级伤残' },
              { value: 24, name: '九级伤残' },
              { value: 35, name: '八级伤残' },
              { value: 17, name: '七级伤残' },
              { value: 43, name: '六级伤残' },
              { value: 52, name: '五级伤残' },
              { value: 22, name: '四级伤残' },
              { value: 43, name: '三级伤残' },
              { value: 29, name: '二级伤残' },
              { value: 36, name: '一级伤残' }],
            itemStyle: {
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              normal: {
                label: {
                  show: true,
                  formatter: '{d}%'
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      }

      const myChart = echarts.init(document.getElementById('chart1'))
      myChart.setOption(option, true)
    },
    initChart2() {
      const option = {
        title: {
          text: '数量统计',
          left: 'left',
          top: 'top',
          textStyle: {
            color: '#1C9399'
          }
        },
        legend: {
          data: ['参加人数'],
          left: 'right',
          top: 'top'
        },
        tooltip: {
          formatter: '{a} <br/>{b} {c}'
        },
        xAxis: {
          type: 'category',
          data: ['十级伤残', '九级伤残', '八级伤残', '七级伤残', '六级伤残', '五级伤残', '四级伤残', '三级伤残', '二级伤残', '一级伤残']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '伤残人数',
          data: [54, 24, 35, 17, 43, 52, 22, 43, 29, 36],
          type: 'bar',
          color: '#1C9399',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          label: {
            show: true,
            position: 'top'
          },
          barWidth: 30
        }]
      }
      const myChart = echarts.init(document.getElementById('chart2'))
      myChart.setOption(option, true)
    },
    initChart3() {
      const option = {
        title: {
          text: '近十年统计',
          left: 'left',
          top: 'top',
          textStyle: {
            color: '#1C9399'
          }
        },
        tooltip: {
          formatter: '{a} <br/>{b} {c}'
        },
        xAxis: {
          type: 'category',
          data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '伤残人数',
          data: [654, 286, 493, 387, 128, 542, 654, 458, 524, 314],
          type: 'line',
          color: '#1C9399',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          label: {
            show: true,
            position: 'top'
          }
        }]
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
  .title{
    font-size: 16px;
    color: #1C9399;
    font-weight: 600;
  }
</style>
