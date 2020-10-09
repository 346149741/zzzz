<template>
  <div class="app-container">
    <div class="environment-contain">
      <div class="environment-left contain-item">
        <div class="environment-left-item">
          <div class="title">空气质量指数</div>
          <div class="contain">
            <div class="progress">
              <myProgress />
            </div>
            <div class="group">
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="name">PM2.5</div>
                  <div class="num">13</div>
                  <div class="picture">
                    <div
                      class="picture-fill"
                      :style="{width: '12%'}"
                    />
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="name">SO2</div>
                  <div class="num">13</div>
                  <div class="picture">
                    <div
                      class="picture-fill"
                      :style="{width: '30%'}"
                    />
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="name">NO2</div>
                  <div class="num">13</div>
                  <div class="picture">
                    <div
                      class="picture-fill"
                      :style="{width: '70%'}"
                    />
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="name">CO</div>
                  <div class="num">13</div>
                  <div class="picture">
                    <div
                      class="picture-fill"
                      :style="{width: '20%'}"
                    />
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="name">TEMP</div>
                  <div class="num">13</div>
                  <div class="picture-1">
                    <div class="circular">
                      <div class="ball" />
                    </div>
                    <div class="cylinder">
                      <div
                        class="line"
                        :style="{width: '40%'}"
                      />
                    </div>
                    <div class="scale">
                      <div class="vertical" />
                      <div class="vertical" />
                      <div class="vertical" />
                    </div>
                  </div>
                  <i class="el-icon-sunny air" />
                </el-col>
                <el-col :span="8">
                  <div class="name">HUM</div>
                  <div class="num">13</div>
                  <div class="picture-1">
                    <div class="circular">
                      <div class="ball" />
                    </div>
                    <div class="cylinder">
                      <div
                        class="line"
                        :style="{width: '80%'}"
                      />
                    </div>
                    <div class="scale">
                      <div class="vertical" />
                      <div class="vertical" />
                      <div class="vertical" />
                    </div>
                  </div>
                  <i class="el-icon-cloudy air" />
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="environment-left-item">
          <div class="title">AQI</div>
          <div class="contain">
            <el-radio-group v-model="aqiType">
              <el-radio :label="1">24小时</el-radio>
              <el-radio :label="2">7天</el-radio>
              <el-radio :label="3">30天</el-radio>
            </el-radio-group>
            <div
              id="chart1"
              style="width: 100%;height: 200px;"
            />
          </div>
        </div>
        <div class="environment-left-item">
          <div class="title">蓝天指数</div>
          <div class="contain">
            <Calendar
              @choseDay="clickDay"
              @changeMonth="changeDate"
              @isToday="clickToday"
            />
          </div>
        </div>
      </div>
      <div class="environment-center">
        <Map />
      </div>
      <div class="environment-right contain-item">
        <div class="environment-right-item">
          <div
            id="chart2"
            style="width: 100%;height: 200px;"
          />
          <div class="tight-title">
            <div class="title-name">安全</div>
            同比去年上升5天，按去年预期312天
          </div>
        </div>
        <div class="environment-right-item">
          <div
            id="chart3"
            style="width: 100%;height: 200px;"
          />
          <div class="tight-title">
            <div class="title-name">安全</div>
            同比去年上升5ug/m3，按去年预期45ug/m3
          </div>
        </div>
        <div class="environment-right-item">
          <div
            id="chart4"
            style="width: 100%;height: 200px;"
          />
          <div class="tight-title">
            同比去年下降1天，按去年预期20天
          </div>
          <div class="year">
            <div>2019</div>
            <div>2020</div>
          </div>
          <div class="day">
            <div>21天</div>
            <div>19天</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myProgress from './progress'
const echarts = require('echarts')
import Calendar from 'vue-calendar-component'
import Map from './map.vue'
export default {
  name: 'Environment',
  components: { myProgress, Calendar, Map },
  data() {
    return {
      percentage: 10,
      aqiType: '1',
      today: new Date()
    }
  },
  mounted() {
    setTimeout(() => {
      this.getChart1()
      this.initChart2()
      this.initChart3()
      this.initChart4()
      this.getWeather(new Date())
    })
  },
  methods: {
    getWeather(selDate) {
      var curMonth = selDate.getMonth()
      selDate.setMonth(curMonth + 1)
      selDate.setDate(0)
      const days = selDate.getDate()
      // 当前月第一天星期几
      const d = new Date(selDate.setDate(1))
      const weekday = d.getDay()
      console.log(weekday)
      const dayArr = []
      const dataItem = document.getElementsByClassName('wh_item_date')
      for (let k = 0; k < days; k++) {
        dayArr.push(k)
        dataItem[k + weekday - 1].classList.remove('wea-sunny')
        dataItem[k + weekday - 1].classList.remove('wea-cloud')
        dataItem[k + weekday - 1].classList.remove('wea-rain')
        const type = Math.floor(Math.random() * 3) + 1
        console.log(type)
        if (type === 1) {
          dataItem[k + weekday - 1].classList.add('wea-sunny')
        } else if (type === 2) {
          dataItem[k + weekday - 1].classList.add('wea-cloud')
        } else if (type === 3) {
          dataItem[k + weekday - 1].classList.add('wea-rain')
        }
      }
    },
    clickDay(data) {
      // console.log(data) // 选中某天
    },
    changeDate(data) {
      console.log(data) // 左右点击切换月份
      this.getWeather(new Date(data))
    },
    clickToday(data) {
      // console.log(data) // 跳到了本月
    },
    getChart1() {
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['PM2.5', 'SO2', 'CO', 'NO2', 'TEMP', 'HUM'],
          type: 'scroll',
          orient: 'vertical',
          left: 10,
          top: 20,
          bottom: 20,
          textStyle: {
            // 图例文字的样式
            color: '#fff',
            fontSize: 12
          }
        },
        grid: {
          left: '20%',
          right: '4%',
          bottom: '3%',
          top: '6%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#FFFFFF',
              width: '1'
            }
          },
          axisLabel: {
            true: true,
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#FFFFFF',
              width: '1'
            }
          },
          axisLabel: {
            true: true,
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12
            }
          }
        },
        series: [
          {
            name: 'PM2.5',
            type: 'line',
            stack: '总量',
            data: [56, 45, 88, 38, 78, 82, 84]
          },
          {
            name: 'SO2',
            type: 'line',
            stack: '总量',
            data: [25, 14, 58, 25, 64, 48, 58]
          },
          {
            name: 'CO',
            type: 'line',
            stack: '总量',
            data: [28, 120, 37, 87, 67, 66, 84]
          },
          {
            name: 'NO2',
            type: 'line',
            stack: '总量',
            data: [54, 28, 53, 67, 78, 42, 35]
          },
          {
            name: 'TEMP',
            type: 'line',
            stack: '总量',
            data: [14, 25, 43, 34, 32, 29, 24]
          },
          {
            name: 'HUM',
            type: 'line',
            stack: '总量',
            data: [19, 24, 34, 25, 26, 30, 31]
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('chart1'))
      myChart.setOption(option, true)
    },
    initChart2() {
      const option = {
        title: {
          text: '优良天数',
          left: 'center',
          top: 'top',
          textStyle: {
            // 文字颜色
            color: '#ffffff',
            // 字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: 'bold',
            // 字体系列
            fontFamily: 'sans-serif',
            // 字体大小
            fontSize: 20
          }
        },
        grid: {
          y: 45
        },
        tooltip: {
          formatter: '{a} <br/>{c} {b}'
        },
        series: [
          {
            name: '优良天数',
            type: 'gauge',
            min: 0,
            max: 360,
            splitNumber: 12,
            radius: '90%',
            center: ['50%', '65%'], // **调整仪表盘的位置**
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [0.09, '#ff4500'],
                  [0.82, '#1e90ff'],
                  [1, 'lime']
                ],
                width: 3,
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            axisLabel: {
              // 坐标轴小标记
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            },
            axisTick: {
              // 坐标轴小标记
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              // 分隔线
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5,
              width: 4
            },
            title: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 16,
                fontStyle: 'italic',
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            detail: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                color: '#fff'
              }
            },
            data: [{ value: 40, name: '天' }]
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('chart2'))
      myChart.setOption(option, true)
    },
    initChart3() {
      const option = {
        title: {
          text: 'PM2.5',
          left: 'center',
          top: 'top',
          textStyle: {
            // 文字颜色
            color: '#ffffff',
            // 字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: 'bold',
            // 字体系列
            fontFamily: 'sans-serif',
            // 字体大小
            fontSize: 20
          }
        },
        grid: {
          y: 45
        },
        tooltip: {
          formatter: '{a} <br/>{c} {b}'
        },
        series: [
          {
            name: 'PM2.5',
            type: 'gauge',
            min: 0,
            max: 60,
            splitNumber: 12,
            radius: '90%',
            center: ['50%', '65%'], // **调整仪表盘的位置**
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [0.16, 'lime'],
                  [0.82, '#1e90ff'],
                  [1, '#ff4500']
                ],
                width: 3,
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            axisLabel: {
              // 坐标轴小标记
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            },
            axisTick: {
              // 坐标轴小标记
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              // 分隔线
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5,
              width: 4
            },
            title: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 16,
                fontStyle: 'italic',
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            detail: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                color: '#fff'
              }
            },
            data: [{ value: 42, name: 'ug/m3' }]
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('chart3'))
      myChart.setOption(option, true)
    },
    initChart4() {
      const option = {
        title: {
          text: '重污染天数',
          left: 'center',
          top: 'top',
          textStyle: {
            // 文字颜色
            color: '#ffffff',
            // 字体风格,'normal','italic','oblique'
            fontStyle: 'normal',
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: 'bold',
            // 字体系列
            fontFamily: 'sans-serif',
            // 字体大小
            fontSize: 20
          }
        },
        grid: {
          y: 45
        },
        tooltip: {
          formatter: '{a} <br/>{c} {b}'
        },
        series: [
          {
            name: '2019',
            type: 'gauge',
            center: ['50%', '50%'], // 默认全局居中
            radius: '65%',
            min: 10,
            max: 30,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [0.2, 'lime'],
                  [0.8, '#1e90ff'],
                  [1, '#ff4500']
                ],
                width: 2,
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false,
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            axisLabel: {
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              width: 2,
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 21, name: '天' }]
          },
          {
            name: '2020',
            type: 'gauge',
            center: ['50%', '50%'], // 默认全局居中
            radius: '65%',
            min: 10,
            max: 30,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [0.2, 'lime'],
                  [0.8, '#1e90ff'],
                  [1, '#ff4500']
                ],
                width: 2,
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              width: 2,
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 19, name: '天' }]
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('chart4'))
      myChart.setOption(option, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.environment-contain {
  min-width: 1700px;
  background-color: #104244;
  color: #20ebf9;
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
    width: 30%;
    .environment-left-item {
      background-color: #1c949a;
      border: 1px solid #20ebf9;
      width: 100%;
      height: 250px;
      .title {
        color: #20ebf9;
        text-align: left;
        margin-left: 16px;
        font-size: 14px;
        line-height: 26px;
      }
      .contain {
        margin-left: 16px;
        .progress {
          float: left;
          margin-top: 16px;
          background-color: #1c949a;
          width: 140px;
          height: 140px;
        }
        .group {
          float: left;
          margin-left: 16px;
          margin-top: 16px;
          width: 60%;
          .name {
            text-align: center;
            font-size: 15px;
            color: #ffffff;
            line-height: 26px;
          }
          .num {
            text-align: center;
            font-size: 14px;
            color: #00ff00;
            line-height: 26px;
          }
          .picture {
            margin-top: 8px;
            margin-bottom: 12px;
            border: 1px solid #ffffff;
            border-radius: 9px;
            height: 14px;
            width: 100%;
            .picture-fill {
              background-color: #00ff00;
              height: 12px;
              border-radius: 8px;
            }
          }
          .picture-1 {
            margin-top: 4px;
            .circular {
              float: left;
              width: 30px;
              height: 20px;
              border: 3px solid #00ff00;
              border-radius: 50% / 50%;
              padding: 4px;
              .ball {
                width: 100%;
                height: 100%;
                background-color: #00ff00;
                border-radius: 50% / 50%;
              }
            }
            .cylinder {
              float: left;
              margin-left: -6px;
              width: 40px;
              height: 14px;
              margin-top: 3px;
              border: 3px solid #00ff00;
              border-left: 0px;
              border-top-right-radius: 7px;
              border-bottom-right-radius: 7px;
              z-index: 3;
              background-color: #1c949a;
              .line {
                height: 1px;
                border: 1px solid #00ff00;
                margin-left: -3px;
                margin-top: 3px;
              }
            }
            .scale {
              position: absolute;
              margin-top: 17px;
              margin-left: 23px;
              .vertical {
                float: left;
                margin-left: 6px;
                height: 4px;
                width: 1px;
                border: 2px solid #00ff00;
              }
            }
          }
          .air {
            color: #00ff00;
            margin-left: 2px;
          }
        }
      }
    }
    /deep/.el-radio {
      color: #ffffff;
    }
    /deep/.el-radio__input.is-checked + .el-radio__label {
      color: #20ebf9;
    }
    /deep/.el-radio__input.is-checked .el-radio__inner {
      background-color: #20ebf9;
      border-color: #20ebf9;
    }
    /deep/.wh_container {
      .wh_top_changge li {
        height: 30px;
      }
      .wh_content_all,
      .wh_top_changge,
      .wh_content {
        background-color: #1c949a;
      }
      .wh_content_item {
        height: 30px;
        font-size: 12px;
      }
      .wh_item_date,
      .wh_top_tag {
        height: 30px;
      }
      .wh_item_date {
        width: 30px;
        border-radius: 50%;
      }
      .wea-sunny {
        background-color: #17a3fc;
      }
      .wea-cloud {
        background-color: #8cceff;
      }
      .wea-rain {
        background-color: #aeb6be;
      }
    }
  }
  .environment-center {
    background-color: #1c949a;
    width: 48%;
    border: 1px solid #20ebf9;
    height: 800px;
  }
  .environment-right {
    background-color: #1c949a;
    width: 18%;
    border: 1px solid #20ebf9;
    height: 800px;
    .environment-right-item {
      position: relative;
      width: 100%;
      height: 250px;
      .tight-title {
        color: white;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        padding: 0 8px;
        .title-name {
          color: #00ff00;
          font-size: 16px;
          line-height: 24px;
          font-weight: 500;
        }
      }
      .year {
        position: absolute;
        top: 50%;
        left: 48px;
        color: #ffffff;
        font-size: 14px;
        line-height: 20px;
        margin-top: -40px;
      }
      .day {
        position: absolute;
        top: 50%;
        right: 48px;
        color: #ffffff;
        font-size: 14px;
        line-height: 20px;
        margin-top: -40px;
      }
    }
  }
}
</style>
