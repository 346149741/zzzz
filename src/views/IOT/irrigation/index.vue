<template>
  <div class="app-container">
    <div class="environment-contain">
      <div class="environment-left contain-item">
        <div class="environment-left-item">
          <div class="title">今日灌溉数据</div>
          <div class="contain">
            <el-row :gutter="10" style="font-weight: 600;padding: 24px 12px;line-height: 30px;">
              <el-col :span="10" class="item1"><i class="el-icon-s-data" style="margin-right: 8px;" />今日灌溉次数</el-col>
              <el-col :span="7" class="item1">30</el-col>
              <el-col :span="7" class="item1">次</el-col>
              <el-col :span="10" class="item1"><i class="iconfont iconshichang" style="margin-right: 8px;font-size: 14px;font-weight: 100;" />今日灌溉时长</el-col>
              <el-col :span="7" class="item1">9</el-col>
              <el-col :span="7" class="item1">小时</el-col>
              <el-col :span="10" class="item1"><i class="iconfont iconyongdian" style="margin-right: 8px;font-size: 14px;font-weight: 100;" />今日灌溉用电量</el-col>
              <el-col :span="7" class="item1">1205</el-col>
              <el-col :span="7" class="item1">度</el-col>
              <el-col :span="10" class="item1"><i class="iconfont iconyongshuiliang" style="margin-right: 8px;font-size: 14px;font-weight: 100;" />今日灌溉用水量</el-col>
              <el-col :span="7" class="item1">50</el-col>
              <el-col :span="7" class="item1">吨</el-col>
              <el-col :span="10" class="item1"><i class="iconfont iconturangshidu" style="margin-right: 8px;font-size: 14px;font-weight: 100;" />今日土壤湿度</el-col>
              <el-col :span="7" class="item1">40</el-col>
              <el-col :span="7" class="item1">%</el-col>
              <el-col :span="10" class="item1"><i class="iconfont iconshebeilixian" style="margin-right: 8px;font-size: 14px;font-weight: 100;" />今日设备离线次数</el-col>
              <el-col :span="7" class="item1">12</el-col>
              <el-col :span="7" class="item1">次</el-col>
              <el-col :span="10" class="item1"><i class="iconfont iconguzhang" style="margin-right: 8px;font-size: 14px;font-weight: 100;" />今日故障次数</el-col>
              <el-col :span="7" class="item1">0</el-col>
              <el-col :span="7" class="item1">次</el-col>
            </el-row>
          </div>
        </div>
        <div class="environment-left-item">
          <div class="title">本月灌溉数据</div>
          <div class="contain">
            <div style="margin-top: 24px;margin-bottom: 12px;">
              <div class="item2" style="background-color: #20F97C;" />电量(度)
              <div class="item2" style="background-color: #20EBF9;" />水量(吨)
              <div class="item2" style="background-color: #F9B320;" />土壤平均湿度(%)
            </div>
            <div class="item3">
              <el-row>
                <el-col :span="6" style="line-height: 45px;text-align: center;font-weight: 600;">
                  1区
                </el-col>
                <el-col :span="15">
                  <el-progress :percentage="60" color="#20F97C" />
                  <el-progress :percentage="30" color="#20EBF9" />
                  <el-progress :percentage="40" color="#F9B320" />
                </el-col>
              </el-row>
            </div>
            <div class="item3">
              <el-row>
                <el-col :span="6" style="line-height: 45px;text-align: center;font-weight: 600;">
                  2区
                </el-col>
                <el-col :span="15">
                  <el-progress :percentage="90" color="#20F97C" />
                  <el-progress :percentage="35" color="#20EBF9" />
                  <el-progress :percentage="25" color="#F9B320" />
                </el-col>
              </el-row>
            </div>
            <div class="item3">
              <el-row>
                <el-col :span="6" style="line-height: 45px;text-align: center;font-weight: 600;">
                  3区
                </el-col>
                <el-col :span="15">
                  <el-progress :percentage="84" color="#20F97C" />
                  <el-progress :percentage="31" color="#20EBF9" />
                  <el-progress :percentage="35" color="#F9B320" />
                </el-col>
              </el-row>
            </div>
            <div class="item3">
              <el-row>
                <el-col :span="6" style="line-height: 45px;text-align: center;font-weight: 600;">
                  4区
                </el-col>
                <el-col :span="15">
                  <el-progress :percentage="58" color="#20F97C" />
                  <el-progress :percentage="36" color="#20EBF9" />
                  <el-progress :percentage="39" color="#F9B320" />
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <div class="environment-center table-wrapper">
        <div style="width: 100%;height: 65%"><Map /></div>
        <div style="width: 100%;height: 35%">
          <div>
            <span style="font-size: 12px;float: left;margin-left: 0;">当前监测区域：1区</span>
            <span style="font-size: 12px;float: right;margin-right: 0;">时间：{{ monitorTime }}</span>
          </div>
          <el-table
            :data="tableData"
            border
            height="95%"
            style="width: 100%"
          >
            <el-table-column prop="name" label="阀门" width="180px" />
            <el-table-column prop="a" label="压力(帕)" />
            <el-table-column prop="b" label="时长(小时)" />
            <el-table-column prop="c" label="水流量(吨)" />
            <el-table-column prop="d" label="土壤湿度(%)" />
            <el-table-column prop="e" label="工作状态" />
            <el-table-column prop="f" label="设备状态" />
          </el-table>
        </div>
      </div>
      <div class="environment-right contain-item">
        <div class="environment-right-item">
          <div class="title">设备状态</div>
          <div class="contain">
            <div id="chart1" style="display: inline-block;width: 50%;height: 200px;" />
            <div style="display: inline-block;width: 40%;height: 200px;margin-left: 5%;">
              <el-row style="margin-top: 24px;color: white;line-height: 40px;font-size: 12px;">
                <el-col :span="12" class="item4">灌溉</el-col><el-col :span="12" class="item4">54</el-col>
                <el-col :span="12" class="item4">闲置</el-col><el-col class="item4" :span="12">24</el-col>
                <el-col :span="12" class="item4">离线</el-col><el-col class="item4" :span="12">35</el-col>
                <el-col :span="12" class="item4">故障</el-col><el-col class="item4" :span="12">17</el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="environment-right-item">
          <div class="title">设备信息</div>
          <div class="contain">
            <el-row style="margin-top: 24px;color: white;line-height: 40px;font-size: 12px;margin-right: 12px;">
              <el-col :span="4" class="item4"><el-checkbox /></el-col><el-col :span="12" class="item4">A区自动检测土壤湿度</el-col><el-col :span="8" class="item4">2019-09-12</el-col>
              <el-col :span="4" class="item4"><el-checkbox /></el-col><el-col :span="12" class="item4">A区灌溉机启动</el-col><el-col :span="8" class="item4">2019-09-12</el-col>
              <el-col :span="4" class="item4"><el-checkbox /></el-col><el-col :span="12" class="item4">A区灌溉机灌溉完成</el-col><el-col :span="8" class="item4">2019-09-12</el-col>
              <el-col :span="4" class="item4"><el-checkbox /></el-col><el-col :span="12" class="item4">B区自动检测土壤湿度</el-col><el-col :span="8" class="item4">2019-09-12</el-col>
            </el-row>
          </div>
        </div>
        <div class="environment-right-item">
          <div class="title">告警信息</div>
          <div class="contain">
            <el-row style="margin-top: 24px;color: white;line-height: 40px;font-size: 12px;margin-right: 12px;">
              <el-col :span="4" class="item4"><el-checkbox /></el-col><el-col :span="12" class="item4">A区土壤含水量低于12%</el-col><el-col :span="8" class="item4">2019-09-12</el-col>
              <el-col :span="4" class="item4"><el-checkbox /></el-col><el-col :span="12" class="item4">A区灌溉机离线</el-col><el-col :span="8" class="item4">2019-09-12</el-col>
              <el-col :span="4" class="item4"><el-checkbox /></el-col><el-col :span="12" class="item4">A区灌溉机故障停机</el-col><el-col :span="8" class="item4">2019-09-12</el-col>
              <el-col :span="4" class="item4"><el-checkbox /></el-col><el-col :span="12" class="item4">B区土壤含水量低于12%</el-col><el-col :span="8" class="item4">2019-09-12</el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="environment-bottom">
      <div class="bottom-contain">
        <div class="title">日监测曲线</div>
        <div class="contain">
          <el-row>
            <el-col :span="6">
              <div id="chart2" style="width: 100%;height: 270px;" />
            </el-col>
            <el-col :span="6">
              <div id="chart3" style="width: 100%;height: 270px;" />
            </el-col>
            <el-col :span="6">
              <div id="chart4" style="width: 100%;height: 270px;" />
            </el-col>
            <el-col :span="6">
              <div id="chart5" style="width: 100%;height: 270px;" />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="environment-bottom">
      <div class="bottom-contain">
        <div class="title">月灌溉数据统计</div>
        <div class="contain">
          <el-row>
            <el-col :span="8">
              <div id="chart6" style="width: 100%;height: 270px;" />
            </el-col>
            <el-col :span="8">
              <div id="chart7" style="width: 100%;height: 270px;" />
            </el-col>
            <el-col :span="8">
              <div id="chart8" style="width: 100%;height: 270px;" />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from './map.vue'
const echarts = require('echarts')
export default {
  name: 'Index',
  components: { Map },
  data() {
    return {
      monitorTime: '',
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      tableData: [
        { name: '阀门1', a: '98', b: '5', c: '56', d: '43', e: '灌溉', f: '正常' },
        { name: '阀门2', a: '104', b: '6', c: '45', d: '41', e: '灌溉', f: '正常' },
        { name: '阀门3', a: '102', b: '7', c: '58', d: '54', e: '停止', f: '正常' },
        { name: '阀门4', a: '108', b: '3', c: '51', d: '31', e: '启动', f: '正常' },
        { name: '阀门5', a: '107', b: '5', c: '49', d: '35', e: '启动', f: '正常' },
        { name: '阀门6', a: '106', b: '4', c: '38', d: '54', e: '停止', f: '正常' },
        { name: '阀门7', a: '105', b: '5', c: '63', d: '46', e: '灌溉', f: '正常' }
      ]
    }
  },
  mounted() {
    this.getTime()
    setTimeout(() => {
      this.initChart1()
      this.initChart2()
      this.initChart3()
      this.initChart4()
      this.initChart5()
      this.initChart6()
      this.initChart7()
      this.initChart8()
    })
  },
  methods: {
    getTime() {
      this.monitorTime = this.$moment().format('YYYY-MM-DD hh:mm:ss')
      setTimeout(() => {
        this.getTime()
      }, 1000)
    },
    initChart1() {
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#20F97C', '#20EBF9', '#F9B320', '#F94E20'],
        series: [
          {
            name: '设备数',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['50%', '50%'],
            data: [
              { value: 54, name: '灌溉' },
              { value: 24, name: '闲置' },
              { value: 35, name: '离线' },
              { value: 17, name: '故障' }],
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
                  show: true
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
        color: ['#20E8F9', '#0000CD', '#00FF7F', '#4169E1'],
        title: {
          text: '土壤湿度',
          left: 'center',
          top: 10,
          textStyle: {
            // 文字颜色
            color: '#20E8F9',
            // 字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: '400',
            // 字体系列
            // fontFamily:'sans-serif',
            // 字体大小
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '土壤湿度',
            type: 'funnel',
            width: '40%',
            height: '70%',
            left: '5%',
            top: '15%',
            funnelAlign: 'right',
            center: ['25%', '25%'],
            data: [
              { value: 90, name: '1区' },
              { value: 70, name: '2区' },
              { value: 50, name: '3区' },
              { value: 30, name: '4区' }
            ]
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('chart2'))
      myChart.setOption(option, true)
    },
    initChart3() {
      const option = {
        color: ['#20E8F9', '#0000CD', '#00FF7F', '#4169E1'],
        title: {
          text: '平均用电量（度）',
          left: 'center',
          top: 10,
          textStyle: {
            // 文字颜色
            color: '#20E8F9',
            // 字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: '400',
            // 字体系列
            // fontFamily:'sans-serif',
            // 字体大小
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{c}'
        },
        series: [{
          name: '漏斗图',
          type: 'funnel',
          left: '10%',
          top: 60,
          // x2: 80,
          bottom: 60,
          width: '80%',
          // height: {totalHeight} - y - y2,
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: [
            { value: 80, name: '一区' },
            { value: 60, name: '二区' },
            { value: 40, name: '三区' },
            { value: 30, name: '四区' }
          ]
        }]
      }
      const myChart = echarts.init(document.getElementById('chart3'))
      myChart.setOption(option, true)
    },
    initChart4() {
      const option = {
        color: '#20E8F9',
        title: {
          text: '阀门开启时间（小时）',
          left: 'center',
          top: 10,
          textStyle: {
            // 文字颜色
            color: '#20E8F9',
            // 字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: '400',
            // 字体系列
            // fontFamily:'sans-serif',
            // 字体大小
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['1区', '2区', '3区', '4区'],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          },
          axisLabel: {
            true: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          },
          axisLabel: {
            true: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          }
        },
        series: [{
          data: [8, 7, 9, 8],
          type: 'bar',
          barWidth: 20
        }]
      }
      const myChart = echarts.init(document.getElementById('chart4'))
      myChart.setOption(option, true)
    },
    initChart5() {
      const option = {
        color: '#20E8F9',
        title: {
          text: '阀门平均水流量（吨）',
          left: 'center',
          top: 10,
          textStyle: {
            // 文字颜色
            color: '#20E8F9',
            // 字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: '400',
            // 字体系列
            // fontFamily:'sans-serif',
            // 字体大小
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['1区', '2区', '3区', '4区'],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          },
          axisLabel: {
            true: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          },
          axisLabel: {
            true: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          }
        },
        series: [{
          data: [50, 60, 55, 45],
          type: 'bar',
          barWidth: 20
        }]
      }
      const myChart = echarts.init(document.getElementById('chart5'))
      myChart.setOption(option, true)
    },
    initChart6() {
      const option = {
        color: '#20E8F9',
        title: {
          text: '日均灌溉用电量统计 平均值：500',
          left: 'center',
          top: 10,
          textStyle: {
            // 文字颜色
            color: '#20E8F9',
            // 字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: '400',
            // 字体系列
            // fontFamily:'sans-serif',
            // 字体大小
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          },
          axisLabel: {
            true: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          },
          axisLabel: {
            true: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          }
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130, 254, 180, 190, 120, 200, 150, 80, 70, 110, 130, 254, 180, 190, 120, 200, 150, 80, 70, 110, 130, 254, 180, 190],
          type: 'bar'
        }]
      }
      const myChart = echarts.init(document.getElementById('chart6'))
      myChart.setOption(option, true)
    },
    initChart7() {
      const option = {
        color: '#20E8F9',
        title: {
          text: '日均灌溉用水量统计 平均值：60',
          left: 'center',
          top: 10,
          textStyle: {
            // 文字颜色
            color: '#20E8F9',
            // 字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: '400',
            // 字体系列
            // fontFamily:'sans-serif',
            // 字体大小
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          },
          axisLabel: {
            true: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          },
          axisLabel: {
            true: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          }
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130, 254, 180, 190, 120, 200, 150, 80, 70, 110, 130, 254, 180, 190, 120, 200, 150, 80, 70, 110, 130, 254, 180, 190],
          type: 'bar'
        }]
      }
      const myChart = echarts.init(document.getElementById('chart7'))
      myChart.setOption(option, true)
    },
    initChart8() {
      const option = {
        color: '#20E8F9',
        title: {
          text: '日均土壤湿度 平均值：45',
          left: 'center',
          top: 10,
          textStyle: {
            // 文字颜色
            color: '#20E8F9',
            // 字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体系列
            // fontFamily:'sans-serif',
            // 字体大小
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          },
          axisLabel: {
            true: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ffffff',
              width: '1'
            }
          },
          axisLabel: {
            true: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            }
          }
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130, 254, 180, 190, 120, 200, 150, 80, 70, 110, 130, 254, 180, 190, 120, 200, 150, 80, 70, 110, 130, 254, 180, 190],
          type: 'bar'
        }]
      }
      const myChart = echarts.init(document.getElementById('chart8'))
      myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped lang="scss">
  .environment-contain {
    min-width: 1700px;
    background-color: #104244;
    color: #20EBF9;
    padding: 24px 12px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    .contain-item {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .environment-left {
      width: 25%;
      .environment-left-item {
        background-color: #1c949a;
        border: 1px solid #20EBF9;
        width: 100%;
        height: 390px;
      }
    }
    .environment-center {
      background-color: #1c949a;
      width: 46%;
      border: 1px solid #20EBF9;
      height: 800px;
      padding: 20px;
    }
    .environment-right {
      width: 25%;
      .environment-right-item {
        background-color: #1c949a;
        border: 1px solid #20EBF9;
        width: 100%;
        height: 250px;
      }
    }
  }
  .environment-bottom{
    width: 100%;
    min-width: 1700px;
    background-color: #104244;
    color: #20EBF9;
    padding: 12px 24px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    .bottom-contain{
      background-color: #1c949a;
      border: 1px solid #20EBF9;
      width: 100%;
      height: 300px;
    }
  }
  .title {
    color: #20EBF9;
    text-align: left;
    margin-left: 16px;
    font-size: 14px;
    line-height: 14px;
    border-left: 4px solid #20EBF9;
    margin-top: 12px;
    margin-bottom: 12px;
    padding-left: 12px;
  }
  .contain {
    margin-left: 16px;
  }
  .item1{
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .item2{
    display: inline-block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin-left: 18px;
    margin-right: 5px;
  }
  .item3{
    margin-top: 18px;
  }
  /deep/.el-progress__text{
    color: #ffffff;
  }
  .item4{
    border-bottom: 1px dashed #20EBF9;
  }
  .table-wrapper /deep/ .el-table--fit{
    padding: 0;
  }
  .table-wrapper /deep/  .el-table, .el-table__expanded-cell {
    background-color: transparent;
    color: #20EBF9;
  }

  .table-wrapper /deep/ .el-table tr {
    background-color: transparent!important;
    color: #20EBF9;
  }
  .table-wrapper /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
    background-color: transparent;
    color: #20EBF9;
  }
  .table-wrapper /deep/ .el-table th.is-leaf {
    background-color: transparent;
    color: #20EBF9;
  }
</style>
