<template>
  <div class="app-container">
    <el-card class="app-body app-monitor">
      <el-row class="monitor-main" :gutter="16" style="margin-top: 8px;">
        <el-col :span="12" class="monitor-item">
          <div class="monitor-item-content">
            <p class="item-top">人员情况</p>
            <el-row :gutter="8">
              <el-col :span="12">
                <div class="item-card">
                  <p class="item-title">主管在位情况</p>
                  <div style="height:190px;" class="item-content-chart">
                    <span style="float:left;height:100%;width:40%;padding-left: 24px;">
                      <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">总数</p>
                          <p class="label-content-font">100 <span class="label-content-unit">人</span></p>
                        </div>
                      </div>
                      <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">在位数</p>
                          <p class="label-content-font">80 <span class="label-content-unit">人</span></p>
                        </div>
                      </div>
                      <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">在外数</p>
                          <p class="label-content-font">20 <span class="label-content-unit">人</span></p>
                        </div>
                      </div>
                    </span>
                    <span id="chart1" style="float:left;height:100%;width:50%;padding-bottom: 2%;" />
                  </div>

                  <p class="item-title" style="margin-top: 10px;">各单位人员外出情况</p>
                  <div style="height:190px;" class="item-content-chart">
                    <span style="float:left;height:100%;width:6%;">
                      <i class="el-icon-caret-left arrow-tip" @click="lastChart2" />
                    </span>
                    <span id="chart2" style="float:left;height:100%;width:88%;" />
                    <span style="float:left;height:100%;width:6%;">
                      <i class="el-icon-caret-right arrow-tip" @click="nextChart2" />
                    </span>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="item-card">
                  <p class="item-title">关键岗位人员情况</p>
                  <div style="height:190px;" class="item-content-chart">
                    <span style="float:left;height:100%;width:35%;margin-left: 16px;">
                      <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">人员总数</p>
                          <p class="label-content-font">78 <span class="label-content-unit">人</span></p>
                        </div>
                      </div>
                      <el-row style="margin-top: 8px;">
                        <el-col :span="10" style="margin-top: 8px;">
                          <p class="label-content-font" style="margin-left: 8px;">23</p>
                          <p class="label-title-font" style="font-size: 10px;">司机</p>

                        </el-col>
                        <el-col :span="14" style="margin-top: 8px;">
                          <p class="label-content-font" style="margin-left: 8px;">43</p>
                          <p class="label-title-font">军械员</p>

                        </el-col>
                        <el-col :span="10" style="margin-top: 8px;">
                          <p class="label-content-font" style="margin-left: 8px;">63</p>
                          <p class="label-title-font">保管员</p>

                        </el-col>
                        <el-col :span="14" style="margin-top: 8px;">
                          <p class="label-content-font" style="margin-left: 8px;">45</p>
                          <p class="label-title-font">重点涉密人员</p>

                        </el-col>
                      </el-row>
                    </span>
                    <span style="float:left;height:100%;width:60%;">

                      <div id="chart3" style="margin:0px;width:100%;height:200px;" />
                    </span>
                  </div>

                  <p class="item-title" style="margin-top: 10px;">重点关注人员情况</p>
                  <div style="height:190px;" class="item-content-chart">
                    <span style="float:left;height:100%;width:6%;">
                      <i class="el-icon-caret-left arrow-tip" @click="lastChart4" />
                    </span>

                    <span style="float:left;width:18%;height: 100%;padding-left: 8px;">
                      <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">伤病残疾</p>
                          <p class="label-content-font">23 <span class="label-content-unit">人</span></p>
                        </div>
                      </div>
                      <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">滞留部队</p>
                          <p class="label-content-font">16 <span class="label-content-unit">人</span></p>
                        </div>
                      </div>
                      <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">失管失控</p>
                          <p class="label-content-font">21 <span class="label-content-unit">人</span></p>
                        </div>
                      </div>
                    </span>
                    <span id="chart4" style="float:left;height:100%;width:70%;" />
                    <span style="float:left;height:100%;width:6%;">
                      <i class="el-icon-caret-right arrow-tip" @click="nextChart4" />
                    </span>

                  </div>
                </div>
              </el-col>
            </el-row>
          </div>

        </el-col>

        <el-col :span="12" class="monitor-item">
          <div class="monitor-item-content">
            <p class="item-top">枪支弹药情况</p>
            <el-row :gutter="8">
              <el-col :span="12">
                <div class="item-card">
                  <p class="item-title">枪支情况</p>
                  <div style="height:435px;" class="item-content-chart">
                    <el-row style="margin-left: 24px;margin-right: 24px;">
                      <el-col :span="8">
                        <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                          <div class="border-left">
                            <p class="label-title-font">兵器室总数</p>
                            <p class="label-content-font">{{ chart5List.num1 }} <span class="label-content-unit">支</span></p>
                          </div>
                        </div>
                        <!--<p class="left-bg-radius label-content-font" style="margin-top: 48px;margin-left:16px;text-align: center;">{{chart5List.num1}}</p>
                        <P style="margin-top:8px;margin-left:16px;text-align: center;" class="label-title-font">兵器室总数</P>-->
                      </el-col>
                      <el-col :span="8">
                        <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                          <div class="border-left">
                            <p class="label-title-font">枪支总数</p>
                            <p class="label-content-font">{{ chart5List.num2 }} <span class="label-content-unit">支</span></p>
                          </div>
                        </div>
                        <!--<p class="left-bg-radius label-content-font" style="margin-top: 48px;margin-left:16px;text-align: center;">{{chart5List.num2}}</p>
                        <P style="margin-top:8px;margin-left:16px;text-align: center;" class="label-title-font">枪支总数</P>-->
                      </el-col>
                      <el-col :span="8">
                        <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                          <div class="border-left">
                            <p class="label-title-font">枪支动用总数</p>
                            <p class="label-content-font">{{ chart5List.num3 }} <span class="label-content-unit">支</span></p>
                          </div>
                        </div>
                        <!--<p class="left-bg-radius label-content-font" style="margin-top: 48px;margin-left:16px;text-align: center;">{{chart5List.num3}}</p>
                        <P style="margin-top:8px;margin-left:16px;text-align: center;" class="label-title-font">枪支动用总数</P>-->
                      </el-col>

                      <el-col v-for="(item,index) in data5List" :span="12" style="margin-top: 30px;">
                        <p style="text-align: center;color:#95C9FF;font-size: 12px;margin-top: 6px;">枪支总数{{ item.count }}</p>
                        <span style="width:20%;color:#95C9FF;font-weight: 600;font-size: 12px;margin-top: 8px;">{{ item.name }}</span>
                        <div style="width:60%;background-color:#33B9FF;text-align: center;color:#fff;font-size: 12px;padding: 0px;display: inline-block;border-radius: 11px;margin-left: 10px;margin-top: 8px;">
                          {{ item.num2 }}
                          <p style="float:right;background-color: #EAB612;display: inline-block;border-radius: 10px;" :style="{width:item.rate}">{{ item.num1 }}</p>
                        </div>
                      </el-col>
                    </el-row>

                    <div style="position: absolute;top:390px;width:100%;">
                      <div style="margin-top: 16px;padding-left: 25%;">
                        <span>
                          <p style="width: 30px;height:15px;background-color:#33B9FF;display: inline-block;border-radius:3px;" />
                          <span style="color:#33B9FF;font-size: 12px;margin-left: 8px;line-height: 15px;">在位数</span>
                        </span>
                        <span style="margin-left: 48px;">
                          <p style="width: 30px;height:15px;background-color:#EAB612;display: inline-block;border-radius:3px;" />
                          <span style="color:#33B9FF;font-size: 12px;margin-left: 8px;line-height: 15px;">动用数</span>
                        </span>
                      </div>

                      <div style="margin-top: 16px;text-align: center;">
                        <span v-for="(item,index) in chart5List.sortArr">
                          <p v-if="item != chart5List.optionSelect" class="chart5option" @click="changeChart5(item)" />
                          <p v-if="item == chart5List.optionSelect" class="selectedChart5" @click="changeChart5(item)" />
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="item-card">
                  <p class="item-title">弹药消耗情况</p>
                  <div style="height:435px;padding-top: 16px;" class="item-content-chart">
                    <div style="padding-left: 8px;position: relative;margin-left: 24px;">
                      <div class="border-left">
                        <p class="label-title-font">弹药消耗总数</p>
                        <p class="label-content-font" style="font-size: 26px;">154238 <span class="label-content-unit">枚</span></p>
                      </div>
                    </div>

                    <div id="chart6" style="width: 100%;height:280px;margin-top: 24px;" />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row class="monitor-main" :gutter="16">
        <el-col :span="6" class="monitor-item" style="height:450px;">
          <div class="monitor-item-content" style="height: 440px;">
            <p class="item-top">外来人员</p>
            <div class="item-card">
              <div style="height:377px;background-color: #154073;" class="item-content-chart">
                <el-row style="margin-left: 24px;margin-right: 24px;">
                  <el-col :span="8">
                    <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                      <div class="border-left">
                        <p class="label-title-font">总数</p>
                        <p class="label-content-font">{{ chart7List.num1 }} <span class="label-content-unit">人</span></p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                      <div class="border-left">
                        <p class="label-title-font">访客数</p>
                        <p class="label-content-font">{{ chart7List.num1 }} <span class="label-content-unit">人</span></p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                      <div class="border-left">
                        <p class="label-title-font">亲属来队数</p>
                        <p class="label-content-font">{{ chart7List.num1 }} <span class="label-content-unit">人</span></p>
                      </div>
                    </div>
                  </el-col>
                </el-row>

                <div id="chart7" style="float:left;height:280px;width:100%;" />

                <div style="text-align: center;height: 24px;margin-top: 10px;">
                  <span v-for="(item,index) in chart7List.sortArr">
                    <p v-if="item != chart7List.optionSelect" class="chart5option" @click="changeChart7(item)" />
                    <p v-if="item == chart7List.optionSelect" class="selectedChart5" @click="changeChart7(item)" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="6" class="monitor-item" style="height:450px;">
          <div class="monitor-item-content" style="height: 440px;">
            <p class="item-top">勤务车辆情况</p>
            <div class="item-card">
              <div style="height:377px;background-color: #154073;" class="item-content-chart">
                <el-row style="margin-left: 24px;margin-right: 24px;">
                  <el-col :span="8">
                    <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                      <div class="border-left">
                        <p class="label-title-font">总数</p>
                        <p class="label-content-font">{{ chart8List.num1 }} <span class="label-content-unit">辆</span></p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                      <div class="border-left">
                        <p class="label-title-font">在外数</p>
                        <p class="label-content-font">{{ chart8List.num2 }} <span class="label-content-unit">辆</span></p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div style="padding-left: 8px;margin-top: 16px;position: relative;">
                      <div class="border-left">
                        <p class="label-title-font">在库数</p>
                        <p class="label-content-font">{{ chart8List.num3 }} <span class="label-content-unit">辆</span></p>
                      </div>
                    </div>
                  </el-col>
                </el-row>

                <div id="chart8" style="float:left;height:280px;width:100%;" />

                <div style="text-align: center;height: 24px;margin-top: 5px;">
                  <span v-for="(item,index) in chart8List.sortArr">
                    <p v-if="item != chart8List.optionSelect" class="chart5option" @click="changeChart8(item)" />
                    <p v-if="item == chart8List.optionSelect" class="selectedChart5" @click="changeChart8(item)" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="12" class="monitor-item" style="height:450px;">
          <div class="monitor-item-content" style="height: 440px;">
            <p class="item-top">涉密载体情况</p>
            <el-row :gutter="8">
              <el-col :span="12">
                <div class="item-card">
                  <p class="item-title">涉密载体情况</p>
                  <div style="height:335px;" class="item-content-chart">

                    <div style="float:left;width:30%;height:100%;padding-left: 24px;">
                      <div style="padding-left: 8px;margin-top: 32px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">总数</p>
                          <p class="label-content-font">{{ chart9List.num1 }} <span class="label-content-unit">个</span></p>
                        </div>
                      </div>
                      <div style="padding-left: 8px;margin-top: 24px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">在柜数</p>
                          <p class="label-content-font">{{ chart9List.num2 }} <span class="label-content-unit">个</span></p>
                        </div>
                      </div>
                      <div style="padding-left: 8px;margin-top: 24px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">使用次数</p>
                          <p class="label-content-font">{{ chart9List.num3 }} <span class="label-content-unit">次</span></p>
                        </div>
                      </div>
                      <div style="padding-left: 8px;margin-top: 24px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">超时归还数</p>
                          <p class="label-content-font">{{ chart9List.num4 }} <span class="label-content-unit">次</span></p>
                        </div>
                      </div>
                    </div>

                    <div id="chart9" style="float:left;height:100%;width:70%;" />
                  </div>
                </div>

              </el-col>

              <el-col :span="12">
                <div class="item-card">
                  <p class="item-title">手机违规使用情况</p>
                  <div style="height:335px;" class="item-content-chart">
                    <div style="float:left;width:30%;height:100%;padding-left: 24px;">
                      <div style="padding-left: 8px;margin-top: 32px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">总数</p>
                          <p class="label-content-font">{{ chart10List.num1 }} <span class="label-content-unit">个</span></p>
                        </div>
                      </div>
                      <div style="padding-left: 8px;margin-top: 24px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">涉密消息</p>
                          <p class="label-content-font">{{ chart10List.num2 }} <span class="label-content-unit">个</span></p>
                        </div>
                      </div>
                      <div style="padding-left: 8px;margin-top: 24px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">低俗消息</p>
                          <p class="label-content-font">{{ chart10List.num3 }} <span class="label-content-unit">次</span></p>
                        </div>
                      </div>
                      <div style="padding-left: 8px;margin-top: 24px;position: relative;">
                        <div class="border-left">
                          <p class="label-title-font">其他</p>
                          <p class="label-content-font">{{ chart10List.num4 }} <span class="label-content-unit">次</span></p>
                        </div>
                      </div>
                    </div>

                    <div id="chart10" style="float:left;height:100%;width:70%;" />
                  </div>
                </div>
              </el-col>

            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
const option1 = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    /* feature: {
          restore: {},
          saveAsImage: {}
      }*/
  },
  title: {
    text: '主管在位率',
    left: 'center',
    top: 'bottom',
    textStyle: {
      // 文字颜色
      color: '#3496F3',
      // 字体风格,'normal','italic','oblique'
      fontStyle: 'normal',
      // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
      fontWeight: 'bold',
      // 字体系列
      fontFamily: 'sans-serif',
      // 字体大小
      fontSize: 14
    }
  },
  series: [
    {
      name: '主管在位率',
      type: 'gauge',
      radius: '45%',
      axisLine: {// 仪表圈
        show: false,
        lineStyle: {
          color: [[1, '#0CD7F5']],
          width: 10
        }
      },
      splitLine: {// 分割线
        show: false,
        length: 10
      },
      axisTick: {// 刻度线
        show: false,
        splitNumber: 5,
        length: 10,
        lineStyle: {
          color: '#0066FF',
          width: 2
        }

      },
      axisLabel: {// 刻度标签
        // show:false
        distance: -54,
        textStyle: {
          color: '#3BC0ED'
        }
      },
      pointer: {// 指针
        width: 4,
        length: '80%'

      },
      detail: {
        formatter: '{value}%',
        textStyle: {
          fontSize: 20,
          fontWeight: 500,
          color: '#99CBFF'
        },
        padding: [50, 0, 0, 0]
      },
      data: [{
        value: 80
      }]
    },
    {// 空仪表,中间白色空白
      name: '',
      type: 'gauge',
      radius: '64%',
      detail: { formatter: '{value}%' },
      axisLine: {// 仪表圈
        show: true,
        lineStyle: {
          color: [[1, '#3399FF']], // F0F0F0
          width: 10
        }
      },
      splitLine: {// 分割线
        show: false
      },
      axisTick: {// 刻度线
        show: false
      },
      axisLabel: {// 刻度标签
        show: false
      },
      pointer: {// 指针
        show: false
      },
      detail: {
        show: false
      },
      data: []
    },
    {// 空仪表,最外层边框
      name: '',
      type: 'gauge',
      radius: '74%',
      detail: { formatter: '{value}%' },
      axisLine: {// 仪表圈
        show: true,
        lineStyle: {
          color: [[1, '#0ADFFB']],
          width: 3
        }
      },
      splitLine: {// 分割线
        show: false
      },
      axisTick: {// 刻度线
        show: false

      },
      axisLabel: {// 刻度标签
        show: false
      },
      pointer: {// 指针
        show: false
      },
      detail: {
        show: false
      },
      data: []
    }
  ]
}

const option2 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  title: {
    text: '总数：100人    到课率：90%',
    left: 'center',
    top: 10,
    textStyle: {
      // 文字颜色
      color: '#8EC1F5',
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
  legend: {
    data: [
      { name: '临时外出', textStyle: { color: '#037AF0' }},
      { name: '探亲休假', textStyle: { color: '#33B8FF' }},
      { name: '外出学习', textStyle: { color: '#33DBFF' }},
      { name: '执行任务', textStyle: { color: '#95EBFC' }}
    ],
    x: 'center',
    y: 'bottom',
    padding: [0, 0, 10, 0],
    textStyle: {// 图例文字的样式
      // color:'#fff',
      fontSize: 12
    }
  },
  grid: {
    top: '12%',
    bottom: '18%',
    left: 0,
    right: '4%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['一连', '二连', '三连', '四连', '五连', '六连', '七连'],
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#3670b1',
          width: '1'
        }
      },
      axisLabel: {
        true: true,
        textStyle: {
          color: '#95C9FF',
          fontSize: 12
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#3670b1',
          width: '1'
        }
      },
      axisLabel: {
        true: true,
        textStyle: {
          color: '#95C9FF',
          fontSize: 12
        }
      }
    }
  ],
  series: [
    {
      name: '临时外出',
      type: 'bar',
      stack: 'outpeople',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '探亲休假',
      type: 'bar',
      stack: 'outpeople',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '外出学习',
      type: 'bar',
      stack: 'outpeople',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '执行任务',
      type: 'bar',
      stack: 'outpeople',
      barWidth: 20,
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ],
  color: ['#037AF0', '#33B8FF', '#33DBFF', '#95EBFC']
}

const option3 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    show: false
  },
  grid: {
    top: '24%',
    bottom: '4%',
    // left:-24,
    right: '17%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['司机', '军械员', '保管员', '重点涉密人员'],
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#3670b1',
          width: '1'
        }
      },
      axisLabel: {
        true: true,
        interval: 0, // 强制文字产生间隔
        rotate: 30, // 文字逆时针旋转0°
        showMaxLabel: true,
        textStyle: {
          color: '#95C9FF',
          fontSize: 12
        }
      },
      name: '岗位',
      nameTextStyle: {
        color: '#95C9FF',
        fontSize: 12
      }
      // nameLocation:'center',
    }
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: false
      },
      show: true,
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#3670b1',
          width: '1'
        }
      },
      axisLabel: {
        show: true,
        interval: 0, // 强制文字产生间隔
        rotate: 0, // 文字逆时针旋转0°
        showMaxLabel: true,
        textStyle: {
          color: '#95C9FF',
          fontSize: 12
        }
      },
      name: '数量',
      // nameLocation:'center',
      nameTextStyle: {
        color: '#95C9FF',
        fontSize: 12
      }
    }
  ],
  series: [
    {
      type: 'bar',
      barWidth: '40%',
      data: [120, 132, 101, 134],
      itemStyle: {
        normal: {
          /* color:'#00BFFF',
            borderColor:'#00FFFF',
            opacity:0.5,*/
          label: {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: { // 数值样式
              color: '#fff',
              fontSize: 12
            }
          }
        }
      },
      color: function(params) {
        // 定义颜色列表
        const colorList = ['#2E8F4C', '#33B9FF', '#D25752', '#EAB710']
        if (params.dataIndex % 4 == 0) {
          return colorList[0]
        } else {
          return colorList[(params.dataIndex % 4)]
        }
      }
    }
  ]
}

const option4 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    show: true,
    data: [
      { name: '伤病残疾', textStyle: { color: '#E9B612' }},
      { name: '滞留部队', textStyle: { color: '#33B9FF' }},
      { name: '失管失控', textStyle: { color: '#D25752' }}],
    x: 'center',
    y: 'bottom',
    padding: [0, 0, 10, 0],
    textStyle: {// 图例文字的样式
      color: '#fff',
      fontSize: 12
    }
  },
  grid: {
    top: '15%',
    bottom: '20%',
    left: '0',
    right: '1%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['一营', '二营', '三营', '四营'],
      axisLine: {
        show: false,
        lineStyle: {
          type: 'solid',
          color: '#66CCFF',
          width: '1'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        true: true,
        interval: 0, // 强制文字产生间隔
        rotate: 0, // 文字逆时针旋转0°
        showMaxLabel: true,
        textStyle: {
          color: '#95C9FF',
          fontSize: 12
          /* backgroundColor:'#3399FF',
            padding:[6,6,6,6],
            borderColor: '#fff',
            borderWidth: 1,*/
        }
      }

    }
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: false
      },
      show: false
    }
  ],
  series: [
    {
      type: 'bar',
      name: '伤病残疾',
      barWidth: 12,
      data: [4, 6, 4, 5],
      itemStyle: {
        normal: {
          color: '#E9B612',
          // opacity:0.5,
          label: {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: { // 数值样式
              color: '#95C9FF',
              fontSize: 12
            }
          }
        }
      }
    },
    {
      type: 'bar',
      name: '滞留部队',
      barWidth: 12,
      data: [6, 3, 7, 4],
      itemStyle: {
        normal: {
          color: '#33B9FF',
          // borderColor:'#00FFFF',
          // opacity:0.5,
          label: {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: { // 数值样式
              color: '#95C9FF',
              fontSize: 12
            }
          }
        }
      }
    },
    {
      type: 'bar',
      name: '失管失控',
      barWidth: 12,
      data: [2, 8, 5, 6],
      itemStyle: {
        normal: {
          color: '#D25752',
          /* borderColor:'#00FFFF',
            opacity:0.4,*/
          label: {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: { // 数值样式
              color: '#95C9FF',
              fontSize: 12
            }
          }
        }
      }
    }
  ]
}

const option6 = {
  color: ['#EAB612', '#33B9FF', '#D25752', '#40AC61'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 10,
    data: ['直达', '营销广告', '搜索引擎', '邮件营销'],
    show: false
  },
  series: [
    {
      name: '弹药消耗总数',
      type: 'pie',
      radius: '60%',
      label: {
        /* formatter: '{b|{b}}{abg|}\n{hr|}\n {c}',
          borderColor: '#aaa',
          borderWidth: 1,
          borderRadius: 4,
          color: '#fff',*/
        formatter: '{b|{b}}\n{hr|}\n {c}',
        padding: [0, -3],
        lineHeight: 18,

        /* shadowBlur:3,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowColor: '#999',
          padding: [3, 8],*/

        itemStyle: {
          /* backgroundColor: function(params) {
                //自定义颜色
                const colorList = ['#00BFFF','#FFD700','#FF0000','#7B68EE'];
                return colorList[params.dataIndex];
            },*/
        },

        rich: {
          a: {
            color: '#999',
            lineHeight: 22,
            align: 'center'
          },
          /* abg: {
                backgroundColor: '#333',
                width: '100%',
                align: 'right',
                height: 22,
                borderRadius: [4, 4, 0, 0]
            },*/
          hr: {
            /* borderColor: function(params) {
                  //定义颜色列表
                  let colorList = ['#EAB612','#33B9FF','#D25752','#40AC61'];
                  if(params.dataIndex % 4 == 0){
                      return colorList[0];
                  }else{
                      return colorList[(params.dataIndex % 4)];
                  }
              },*/
            borderColor: 'auto', // hr的颜色为auto时候会主动显示颜色的
            width: '100%',
            borderWidth: 0.5,
            height: 0
          },
          b: {
            fontSize: 14
            /* lineHeight: 33,
              color:'#fff',
              backgroundColor: function(params) {
                  //自定义颜色
                  const colorList = ['#00BFFF','#FFD700','#FF0000','#7B68EE'];
                  return colorList[params.dataIndex];
              },*/
          },
          c: {
            fontSize: 14
            /* lineHeight: 30,
              color:'#fff',
              align:'center',
              backgroundColor: function(params) {
                  //自定义颜色
                  const colorList = ['#00BFFF','#FFD700','#FF0000','#7B68EE'];
                  return colorList[params.dataIndex];
              },*/
          },
          per: {
            color: '#eee',
            backgroundColor: '#334455',
            padding: [2, 4],
            borderRadius: 2
          }
        }
      },
      labelLine: {
        length2: 0
      },
      data: [
        { value: 2335, name: '95式  5.54mm' },
        { value: 3310, name: 'P90  9mm' },
        { value: 2314, name: 'M24  7.62mm' },
        { value: 1035, name: '53式  5.54mm' }
      ].sort(function(a, b) { return a.value - b.value }),
      roseType: 'radius'
    }
  ]
}

const option7 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: [
      { name: '临时外出', textStyle: { color: '#037AF0' }},
      { name: '探亲休假', textStyle: { color: '#33B8FF' }},
      { name: '外出学习', textStyle: { color: '#33DBFF' }},
      { name: '执行任务', textStyle: { color: '#95EBFC' }}
    ],
    x: 'center',
    y: 'bottom',
    padding: [0, 0, 10, 0],
    textStyle: {// 图例文字的样式
      // color:'#fff',
      fontSize: 12
    }
  },
  legend: {
    show: true,
    data: [
      { name: '访客数', textStyle: { color: '#33B9FF' }},
      { name: '亲属来队数', textStyle: { color: '#95EBFF' }}],
    left: 'center',
    bottom: 0,
    padding: [0, 0, 16, 0],
    textStyle: {// 图例文字的样式
      color: '#fff',
      fontSize: 12
    }
  },
  grid: {
    top: '10%',
    bottom: '15%',
    left: '3%',
    right: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['一营', '二营', '三营', '四营'],
      axisLine: {
        show: true,
        lineStyle: {
          type: 'solid',
          color: '#3670b1',
          width: '1'
        }
      },
      axisLabel: {
        show: true,
        interval: 0, // 强制文字产生间隔
        rotate: 0, // 文字逆时针旋转0°
        showMaxLabel: true,
        textStyle: {
          color: '#95C9FF',
          fontSize: 12
          /* backgroundColor:'#3399FF',
            padding:[6,6,6,6],
            borderColor: '#fff',
            borderWidth: 1,*/
        }
      }

    }
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: false
      },
      show: true,
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#3670b1',
          width: '1'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#95C9FF',
          fontSize: 12
        }
      }
    }
  ],
  series: [
    {
      type: 'bar',
      name: '访客数',
      barWidth: 12,
      data: [4, 6, 4, 5],
      itemStyle: {
        normal: {
          color: '#33B9FF',
          /* borderColor:'#00FFFF',
            opacity:0.3,*/
          label: {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: { // 数值样式
              color: '#95C9FF',
              fontSize: 12
            }
          }
        }
      }
    },
    {
      type: 'bar',
      name: '亲属来队数',
      barWidth: 12,
      data: [6, 3, 7, 4],
      itemStyle: {
        normal: {
          color: '#95EBFF',
          /* borderColor:'#00FFFF',
            opacity:0.8,*/
          label: {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: { // 数值样式
              color: '#95C9FF',
              fontSize: 12
            }
          }
        }
      }
    }
  ]
}

const option8 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    show: true,
    data: [
      { name: '在外数', textStyle: { color: '#33B9FF' }},
      { name: '在库数', textStyle: { color: '#95EBFF' }}],
    left: 'center',
    bottom: 0,
    padding: [0, 0, 16, 0],
    textStyle: {// 图例文字的样式
      color: '#fff',
      fontSize: 12
    }
  },
  grid: {
    top: '10%',
    bottom: '15%',
    left: '3%',
    right: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['一营', '二营', '三营', '四营'],
      axisLine: {
        show: true,
        lineStyle: {
          type: 'solid',
          color: '#3670b1',
          width: '1'
        }
      },
      axisLabel: {
        true: true,
        interval: 0, // 强制文字产生间隔
        rotate: 0, // 文字逆时针旋转0°
        showMaxLabel: true,
        textStyle: {
          color: '#95EBFF',
          fontSize: 12
          /* backgroundColor:'#3399FF',
            padding:[6,6,6,6],
            borderColor: '#fff',
            borderWidth: 1,*/
        }
      }

    }
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: false
      },
      show: true,
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#3670b1',
          width: '1'
        }
      },
      axisLabel: {
        true: true,
        textStyle: {
          color: '#95EBFF',
          fontSize: 12
        }
      }
    }
  ],
  series: [
    {
      type: 'bar',
      name: '在外数',
      barWidth: 12,
      data: [4, 6, 4, 5],
      itemStyle: {
        normal: {
          color: '#81CA9A',
          /* borderColor:'#00FFFF',
            opacity:0.3,*/
          label: {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: { // 数值样式
              color: '#95C9FF',
              fontSize: 12
            }
          }
        }
      }
    },
    {
      type: 'bar',
      name: '在库数',
      barWidth: 12,
      data: [6, 3, 7, 4],
      itemStyle: {
        normal: {
          color: '#21A349',
          /* borderColor:'#00FFFF',
            opacity:0.8,*/
          label: {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: { // 数值样式
              color: '#95C9FF',
              fontSize: 12
            }
          }
        }
      }
    }
  ]
}

const option9 = {
  color: ['#33B9FF', '#0E77E4'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  grid: {
    top: '8%',
    bottom: '8%',
    left: '0',
    right: '3%',
    containLabel: true
  },
  series: [
    {
      name: '涉密载体情况',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '60%'],

      label: {
        position: 'inner',
        formatter: '{c} \n \n {b}'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 333, name: '在柜数', selected: true },
        { value: 90, name: '借出数' }
      ]
    }
  ]
}

const option10 = {
  color: ['#D25752', '#EAB612', '#33B9FF'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  series: [
    {
      name: '手机违规使用情况',
      type: 'pie',
      selectedMode: 'single',
      radius: ['30%', '60%'],

      label: {
        position: 'inner',
        formatter: '{b}'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 25, name: '涉密消息', selected: true },
        { value: 36, name: '低俗消息' },
        { value: 35, name: '其他' }
      ]
    }
  ]
}
const echarts = require('echarts')
export default {
  name: 'Index',
  data() {
    return {
      chart2List: {
        startNum: 0,
        endNum: 7,
        maxNum: 20,
        typeList: ['一连', '二连', '三连', '四连', '五连', '六连', '七连', '八连', '九连', '十连', '十一连', '十二连', '十三连', '十四连', '十五连', '十六连', '十七连', '十八连', '十九连', '二十连'],
        dataList: [
          [120, 132, 101, 134, 90, 230, 210, 220, 182, 150, 232, 201, 154, 190, 232, 201, 154, 190, 330, 410],
          [220, 182, 191, 234, 290, 330, 310, 201, 154, 150, 232, 201, 154, 190, 90, 230, 210, 220, 182, 150],
          [150, 232, 201, 154, 190, 330, 410, 101, 134, 220, 182, 191, 234, 290, 154, 190, 330, 410, 101, 134],
          [150, 232, 201, 154, 190, 330, 410, 234, 290, 150, 232, 201, 154, 190, 134, 90, 230, 210, 220, 182]
        ]
      },
      chart4List: {
        startNum: 0,
        endNum: 4,
        maxNum: 10,
        typeList: ['一营', '二营', '三营', '四营', '五营', '六营', '七营', '八营', '九营', '十营'],
        dataList: [
          [4, 5, 7, 2, 3, 7, 5, 9, 3, 1],
          [2, 5, 2, 3, 7, 3, 7, 5, 6, 4],
          [5, 4, 3, 8, 5, 1, 8, 7, 5, 7]
        ]
      },
      chart5List: {
        startNum: 0,
        endNum: 6,
        maxNum: 10,
        num1: 143,
        num2: 365,
        num3: 222,
        sortArr: 3,
        optionSelect: 1,
        dataList: [
          {
            name: '一连',
            count: 60,
            num1: 14,
            num2: 46,
            rate: '23%'
          },
          {
            name: '二连',
            count: 40,
            num1: 10,
            num2: 30,
            rate: '25%'
          },
          {
            name: '三连',
            count: 53,
            num1: 13,
            num2: 40,
            rate: '24%'
          },
          {
            name: '四连',
            count: 35,
            num1: 15,
            num2: 20,
            rate: '42%'
          },
          {
            name: '五连',
            count: 49,
            num1: 25,
            num2: 24,
            rate: '51%'
          },
          {
            name: '六连',
            count: 42,
            num1: 30,
            num2: 12,
            rate: '71%'
          },
          {
            name: '七连',
            count: 25,
            num1: 14,
            num2: 11,
            rate: '56%'
          }, {
            name: '八连',
            count: 56,
            num1: 36,
            num2: 20,
            rate: '64%'
          },
          {
            name: '九连',
            count: 47,
            num1: 35,
            num2: 12,
            rate: '74%'
          },
          {
            name: '十连',
            count: 39,
            num1: 23,
            num2: 16,
            rate: '58%'
          },
          {
            name: '十一连',
            count: 60,
            num1: 31,
            num2: 29,
            rate: '51%'
          },
          {
            name: '十二连',
            count: 60,
            num1: 31,
            num2: 29,
            rate: '51%'
          },
          {
            name: '十三连',
            count: 60,
            num1: 31,
            num2: 29,
            rate: '51%'
          },
          {
            name: '十四连',
            count: 60,
            num1: 31,
            num2: 29,
            rate: '51%'
          }
        ]
      },
      data5List: [],

      chart7List: {
        startNum: 0,
        endNum: 8,
        maxNum: 20,
        num1: 246,
        num2: 142,
        num3: 104,
        sortArr: 3,
        optionSelect: 1,
        typeList: ['一营', '二营', '三营', '四营', '五营', '六营', '七营', '八营', '九营', '十营', '十一营', '十二营', '十三营', '十四营', '十五营', '十六营', '十七营', '十八营', '十九营', '二十营'],
        dataList: [
          [120, 132, 101, 134, 90, 230, 210, 220, 182, 150, 232, 201, 154, 190, 232, 201, 154, 190, 330, 410],
          [220, 182, 191, 234, 290, 330, 310, 201, 154, 150, 232, 201, 154, 190, 90, 230, 210, 220, 182, 150]
        ]
      },

      chart8List: {
        startNum: 0,
        endNum: 8,
        maxNum: 20,
        num1: 82,
        num2: 56,
        num3: 26,
        sortArr: 3,
        optionSelect: 1,
        typeList: ['一连', '二连', '三连', '四连', '五连', '六连', '七连', '八连', '九连', '十连', '十一连', '十二连', '十三连', '十四连', '十五连', '十六连', '十七连', '十八连', '十九连', '二十连'],
        dataList: [
          [12, 12, 11, 14, 9, 20, 20, 20, 12, 10, 22, 21, 14, 19, 22, 21, 14, 19, 30, 40],
          [22, 12, 11, 24, 20, 30, 30, 21, 14, 35, 21, 17, 25, 30, 19, 23, 21, 22, 12, 10]
        ]
      },

      chart9List: {
        num1: 423,
        num2: 333,
        num3: 123,
        num4: 32
      },

      chart10List: {
        num1: 96,
        num2: 36,
        num3: 25,
        num4: 35
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.chart1()
      this.chart2()
      this.chart3()
      this.chart4()
      this.chart5()
      this.chart6()
      this.chart7()
      this.chart8()
      this.chart9()
      this.chart10()
    })
  },
  methods: {
    chart1() {
      const myChart = echarts.init(document.getElementById('chart1'))
      myChart.setOption(option1, true)
    },

    chart2() {
      const myChart = echarts.init(document.getElementById('chart2'))
      const that = this
      this.chart2List.dataList.forEach(function(item, index) {
        option2.series[index].data = []
        item.forEach(function(item1, index1) {
          if (index1 >= that.chart2List.startNum && index1 < that.chart2List.endNum) {
            option2.series[index].data.push(item1)
          }
        })
      })
      option2.xAxis[0].data = []
      this.chart2List.dataList[0].forEach(function(item1, index1) {
        if (index1 >= that.chart2List.startNum && index1 < that.chart2List.endNum) {
          option2.xAxis[0].data.push(that.chart2List.typeList[index1])
        }
      })
      myChart.setOption(option2, true)
    },
    lastChart2() {
      const startNum = this.chart2List.startNum - 7
      if (startNum >= 0) {
        this.chart2List.endNum = this.chart2List.startNum
        this.chart2List.startNum = startNum
        const myChart = echarts.init(document.getElementById('chart2'))
        const that = this
        this.chart2List.dataList.forEach(function(item, index) {
          option2.series[index].data = []
          item.forEach(function(item1, index1) {
            if (index1 >= that.chart2List.startNum && index1 < that.chart2List.endNum) {
              option2.series[index].data.push(item1)
            }
          })
        })
        option2.xAxis[0].data = []
        this.chart2List.dataList[0].forEach(function(item1, index1) {
          if (index1 >= that.chart2List.startNum && index1 < that.chart2List.endNum) {
            option2.xAxis[0].data.push(that.chart2List.typeList[index1])
          }
        })
        myChart.setOption(option2, true)
      }
    },
    nextChart2() {
      if (this.chart2List.endNum < this.chart2List.maxNum) {
        this.chart2List.startNum = this.chart2List.endNum
        this.chart2List.endNum = this.chart2List.endNum + 7
        const myChart = echarts.init(document.getElementById('chart2'))
        const that = this
        this.chart2List.dataList.forEach(function(item, index) {
          option2.series[index].data = []
          item.forEach(function(item1, index1) {
            if (index1 >= that.chart2List.startNum && index1 < that.chart2List.endNum) {
              option2.series[index].data.push(item1)
            }
          })
        })
        option2.xAxis[0].data = []
        this.chart2List.dataList[0].forEach(function(item1, index1) {
          if (index1 >= that.chart2List.startNum && index1 < that.chart2List.endNum) {
            option2.xAxis[0].data.push(that.chart2List.typeList[index1])
          }
        })
        myChart.setOption(option2, true)
      }
    },

    chart3() {
      const myChart = echarts.init(document.getElementById('chart3'))
      myChart.setOption(option3, true)
    },

    chart4() {
      const myChart = echarts.init(document.getElementById('chart4'))
      const that = this
      this.chart4List.dataList.forEach(function(item, index) {
        option4.series[index].data = []
        item.forEach(function(item1, index1) {
          if (index1 >= that.chart4List.startNum && index1 < that.chart4List.endNum) {
            option4.series[index].data.push(item1)
          }
        })
      })
      option4.xAxis[0].data = []
      this.chart4List.dataList[0].forEach(function(item1, index1) {
        if (index1 >= that.chart4List.startNum && index1 < that.chart4List.endNum) {
          option4.xAxis[0].data.push(that.chart4List.typeList[index1])
        }
      })
      myChart.setOption(option4, true)
    },
    lastChart4() {
      const startNum = this.chart4List.startNum - 4
      if (startNum >= 0) {
        this.chart4List.endNum = this.chart4List.startNum
        this.chart4List.startNum = startNum
        const myChart = echarts.init(document.getElementById('chart4'))
        const that = this
        this.chart4List.dataList.forEach(function(item, index) {
          option4.series[index].data = []
          item.forEach(function(item1, index1) {
            if (index1 >= that.chart4List.startNum && index1 < that.chart4List.endNum) {
              option4.series[index].data.push(item1)
            }
          })
        })
        option4.xAxis[0].data = []
        this.chart4List.dataList[0].forEach(function(item1, index1) {
          if (index1 >= that.chart4List.startNum && index1 < that.chart4List.endNum) {
            option4.xAxis[0].data.push(that.chart4List.typeList[index1])
          }
        })
        myChart.setOption(option4, true)
      }
    },
    nextChart4() {
      if (this.chart4List.endNum < this.chart4List.maxNum) {
        this.chart4List.startNum = this.chart4List.endNum
        this.chart4List.endNum = this.chart4List.endNum + 4
        const myChart = echarts.init(document.getElementById('chart4'))
        const that = this
        this.chart4List.dataList.forEach(function(item, index) {
          option4.series[index].data = []
          item.forEach(function(item1, index1) {
            if (index1 >= that.chart4List.startNum && index1 < that.chart4List.endNum) {
              option4.series[index].data.push(item1)
            }
          })
        })
        option4.xAxis[0].data = []
        this.chart4List.dataList[0].forEach(function(item1, index1) {
          if (index1 >= that.chart4List.startNum && index1 < that.chart4List.endNum) {
            option4.xAxis[0].data.push(that.chart4List.typeList[index1])
          }
        })
        myChart.setOption(option4, true)
      }
    },

    chart5() {
      const that = this
      this.data5List = []
      this.chart5List.dataList.forEach(function(item, index) {
        if (index >= that.chart5List.startNum && index < that.chart5List.endNum) {
          that.data5List.push(item)
        }
      })
    },
    changeChart5(num) {
      this.chart5List.optionSelect = num
      this.chart5List.startNum = (num - 1) * 6
      this.chart5List.endNum = num * 6

      const that = this
      this.data5List = []
      this.chart5List.dataList.forEach(function(item, index) {
        if (index >= that.chart5List.startNum && index < that.chart5List.endNum) {
          that.data5List.push(item)
        }
      })
    },

    chart6() {
      const myChart = echarts.init(document.getElementById('chart6'))
      myChart.setOption(option6, true)
    },

    chart7() {
      const that = this
      this.chart7List.dataList.forEach(function(item, index) {
        option7.series[index].data = []
        item.forEach(function(item1, index1) {
          if (index1 >= that.chart7List.startNum && index1 < that.chart7List.endNum) {
            option7.series[index].data.push(item1)
          }
        })
      })
      option7.xAxis[0].data = []
      this.chart7List.dataList[0].forEach(function(item1, index1) {
        if (index1 >= that.chart7List.startNum && index1 < that.chart7List.endNum) {
          option7.xAxis[0].data.push(that.chart7List.typeList[index1])
        }
      })

      const myChart = echarts.init(document.getElementById('chart7'))
      myChart.setOption(option7, true)
    },
    changeChart7(num) {
      this.chart7List.optionSelect = num
      this.chart7List.startNum = (num - 1) * 8
      this.chart7List.endNum = num * 8

      this.chart7()
    },

    chart8() {
      const that = this
      this.chart8List.dataList.forEach(function(item, index) {
        option8.series[index].data = []
        item.forEach(function(item1, index1) {
          if (index1 >= that.chart8List.startNum && index1 < that.chart8List.endNum) {
            option8.series[index].data.push(item1)
          }
        })
      })
      option8.xAxis[0].data = []
      this.chart8List.dataList[0].forEach(function(item1, index1) {
        if (index1 >= that.chart8List.startNum && index1 < that.chart8List.endNum) {
          option8.xAxis[0].data.push(that.chart8List.typeList[index1])
        }
      })

      const myChart = echarts.init(document.getElementById('chart8'))
      myChart.setOption(option8, true)
    },
    changeChart8(num) {
      this.chart8List.optionSelect = num
      this.chart8List.startNum = (num - 1) * 8
      this.chart8List.endNum = num * 8

      this.chart8()
    },

    chart9() {
      const myChart = echarts.init(document.getElementById('chart9'))
      myChart.setOption(option9, true)
    },

    chart10() {
      const myChart = echarts.init(document.getElementById('chart10'))
      myChart.setOption(option10, true)
    }
  }

}
</script>

<style scoped>
  .monitor-main{
    /*background-color: #6495ED;*/
    padding: 4px;
    min-width: 1900px;
  }
  .monitor-item{
    height:550px;
    /*border: 1px solid #bbbbbb;*/
    /*background-color: #000080;*/
  }
  .monitor-item-group{
    background-color: #000080;
  }
  .monitor-item-content{
    background-color:#154073;
    padding: 0px 20px;
    height:540px;
    border-radius: 5px;
  }
  .monitor-item-bottom {
    height: 310px;
  }
  monitor-item-content-bottom{
    background-color:#154073;
    padding: 0px 20px;
    height:300px;
    border-radius: 5px;
  }
  .item-top{
    margin-left: 24px;
    width:100%;
    height:40px;
    font-size: 18px;
    color: #89BBF6;
    font-weight: 500;
    line-height: 35px;
    letter-spacing:4px
  }
  .item-card{
    /*background-color: 	#0000CD;
    height:450px;*/
    padding: 2px;
  }
  .item-title{
    height:42px;
    top:0px;
    left:0px;
    background-color: #3670B0;
    width:100%;
    text-align: center;
    line-height:40px;
    color:#B5D3F2;
    font-size: 16px;
    letter-spacing:2px
  }
  .item-content-chart{
    background-color: #214B7B;
  }
  .left-bg-radius{
    border:2px solid #3399FF;
    border-bottom:none;
    border-right:none;
    border-top-left-radius: 17px;
    border-bottom-left-radius: 17px;
  }
  .label-title-font{
    color:#2D8DEA;
    font-size: 12px;
    font-weight: 600;
  }
  .label-content-font{
    color:#95C9FF;
    line-height: 20px;
    font-size: 20px;
    font-weight: 500;
    margin-top:4px;
  }
  .label-content-unit{
    color:#2D8DEA;
    margin-left: 1px;
    font-size: 12px;
    line-height: 12px;
    font-weight: 600;
  }
  .arrow-tip{
    color:#778899;
    font-size: 30px;
    margin-top:80px;
    cursor:pointer;
  }
  .arrow-tip :hover{
    color:#F0F8FF;
  }
  .arrow-tip-disabled{
    cursor: not-allowed;
    pointer-events:none
  }
  .chart5option{
    width: 10px;
    height:10px;
    border-radius: 5px;
    background-color: #33BAFD;
    display: inline-block;
    margin-left: 8px;
    cursor: pointer;
  }
  .selectedChart5{
    height:10px;
    border-radius: 5px;
    display: inline-block;
    margin-left: 8px;
    width:20px;
    background-color: #8EB9FF;
    cursor: pointer;
  }

  .border-left:before{
    content: '';
    position: absolute;
    left: 0;
    top: 15%;
    bottom: auto;
    right: auto;
    height: 75%;
    width: 2px;
    background-color: #709FD7;
  }
  /*去除 ：ant design 样式设置 margin-bottom:1em；*/
  p {
    margin-top: 0;
    margin-bottom: 0 !important;
  }
</style>
<style>
  .app-monitor .el-card__body{
    overflow-y: auto;
  }
</style>
