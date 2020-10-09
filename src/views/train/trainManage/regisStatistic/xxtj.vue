<template>
  <div>
    <!--搜索条件-->
    <div class="filter-container">
      <el-form
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item
          label="训练兵力:"
          class="filter-item"
        >
          <el-select
            v-model="listQuery.params.unit"
            placeholder="请选择兵力"
            clearable
            class="filter-item mr10"
          >
            <el-option
              v-for="item in unitList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="训练时间："
          class="filter-item"
        >
          <el-date-picker
            v-model="listQuery.params.trainTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item class="filter-item">
          <el-button
            v-waves
            class="filter-item btn-base"
            type="primary"
            icon="mr10 iconfont iconsousuo"
          >{{ $t('table.search') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="20">
      <el-col
        :md="24"
        :lg="24"
      >
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>训练时长</span>
          </div>
          <div
            id="chart10"
            style="height:360px;width:100%;"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :md="24"
        :lg="12"
      >
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>参训率</span>
          </div>
          <div
            id="chart9"
            style="height:360px;width:100%;"
          />
        </el-card>
      </el-col>
      <el-col
        :md="24"
        :lg="12"
      >
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>参训率</span>
          </div>
          <div
            id="chart3"
            style="height:360px;width:100%;"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :md="24"
        :lg="12"
      >
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>训练科目次数比例</span>
          </div>
          <div
            id="chart1"
            style="height:360px;width:100%;"
          />
        </el-card>
      </el-col>
      <el-col
        :md="24"
        :lg="12"
      >
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>训练科目时长比例</span>
          </div>
          <div
            id="chart2"
            style="height:360px;width:100%;"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const option1 = {
  tooltip: {},
  legend: {
    data: ['训练次数'],
    left: 'left'
  },
  grid: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    containLabel: true
  },
  radar: {
    // shape: 'circle',
    name: {
      textStyle: {
        color: '#fff',
        backgroundColor: '#999',
        borderRadius: 3,
        padding: [3, 5]
      }
    },
    indicator: [
      { name: '停止间转法', max: 20 },
      { name: '实弹射击', max: 20 },
      { name: '战斗运动', max: 20 },
      { name: '仰卧起坐', max: 20 },
      { name: '30米X2蛇形跑', max: 20 },
      { name: '400米疏散物资', max: 20 }
    ]
  },
  series: [
    {
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // areaStyle: {normal: {}},
      data: [
        {
          value: [18, 17, 14, 13, 12, 11],
          name: '训练次数'
        }
      ]
    }
  ]
}
const option2 = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  color: ['#33B9FF', '#0E77E4', '#D25752', '#EAB710', '#48e1e9', '#49a9ad'],
  legend: {
    orient: 'vertical',
    left: 10,
    data: [
      '停止间转法',
      '实弹射击',
      '战斗运动',
      '仰卧起坐',
      '30米X2蛇形跑',
      '400米疏散物资'
    ]
  },
  series: [
    {
      name: '时间',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 35, name: '停止间转法' },
        { value: 26, name: '实弹射击' },
        { value: 18, name: '战斗运动' },
        { value: 22, name: '仰卧起坐' },
        { value: 16, name: '30米X2蛇形跑' },
        { value: 8, name: '400米疏散物资' }
      ]
    }
  ]
}
const option10 = {
  xAxis: {
    data: [
      '3月1日',
      '3月2日',
      '3月3日',
      '3月4日',
      '3月5日',
      '3月6日',
      '3月7日'
    ],
    name: '日期',
    axisLine: {
      lineStyle: {
        type: 'solid',
        color: '#3670b1',
        width: '1'
      }
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        type: 'solid',
        color: '#3670b1',
        width: '1'
      }
    },
    name: '时长(小时)'
  },
  series: [
    {
      data: [9, 10, 15, 8.5, 13, 12, 11],
      type: 'line',
      areaStyle: {
        normal: {}
      }
    }
  ]
}

const option3 = {
  title: {
    text: '各时间段参训比例',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
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
      data: ['早操', '上午', '下午', '晚上'],
      axisLine: {
        lineStyle: {
          type: 'solid',
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
      name: '时间',
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
          type: 'solid',
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
      name: '比例',
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
      data: [98, 99, 100, 95],
      itemStyle: {
        normal: {
          /* color:'#00BFFF',
            borderColor:'#00FFFF',
            opacity:0.5,*/
          label: {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: {
              // 数值样式
              color: '#fff',
              fontSize: 12
            }
          }
        }
      },
      color: function(params) {
        // 定义颜色列表
        const colorList = ['#33B9FF']
        if (params.dataIndex % 4 == 0) {
          return colorList[0]
        } else {
          return colorList[params.dataIndex % 4]
        }
      }
    }
  ]
}
const option9 = {
  title: {
    text: '各时间段参训比例对比',
    left: 'center'
  },
  color: ['#33B9FF', '#0E77E4', '#D25752', '#EAB710'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['早操', '上午', '下午', '晚上']
  },
  grid: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    containLabel: true
  },
  series: [
    {
      name: '参训率',
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
        { value: 20, name: '早操' },
        { value: 22, name: '上午' },
        { value: 25, name: '下午', selected: true },
        { value: 22, name: '晚上' }
      ]
    }
  ]
}
const echarts = require('echarts')
import { PlayBackCamera_Com } from '@/components/DialogCmpts/pops'
import { createPop } from '@/components/DialogCmpts/index.js'
export default {
  name: 'CameraManage',
  components: {},
  filters: {},
  data() {
    return {
      unitList: [
        { key: '司令部', value: '司令部' },
        { key: '政治部', value: '政治部' },
        { key: '后勤部', value: '后勤部' },
        { key: '参谋部', value: '参谋部' }
      ],
      wzList: [
        { key: '逆行', value: '逆行' },
        { key: '超速', value: '超速' },
        { key: '压实线', value: '压实线' },
        { key: '违章变道', value: '违章变道' },
        { key: '未系安全带', value: '未系安全带' }
      ],
      chart9List: {
        num1: 423,
        num2: 333,
        num3: 123,
        num4: 32
      },
      registerTime: '',
      transferValue: '',
      sheheList: [
        { key: '张建', value: '张建' },
        { key: '王文国', value: '王文国' },
        { key: '张小川', value: '张小川' }
      ],
      tableKey: 0,
      list: [
        {
          cph: '湘JPJ452',
          cpys: '蓝',
          zpsj: '2020-02-02 20:20:20',
          wzdd: '营区南路东侧',
          wzlx: '压白线',
          ldxs: '100',
          sscs: '110',
          csbl: '10%'
        },
        {
          cph: '湘J9M8H0',
          cpys: '蓝',
          zpsj: '2020-02-04 18:06:20',
          wzdd: '卫华东路',
          wzlx: '超速',
          ldxs: '60',
          sscs: '130',
          csbl: '116.67%'
        },
        {
          cph: '湘JN7H20',
          cpys: '蓝',
          zpsj: '2020-01-02 16:25:20',
          wzdd: '营区南路西侧',
          wzlx: '违章变道',
          ldxs: '80',
          sscs: '75',
          csbl: '————'
        }
      ],
      total: null,
      checkdetail: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          area: '',
          isPlaying: false,
          program: ''
        }
      },
      form: {
        title: '',
        isPlaying: false,
        program: '',
        goal:
          '1、培养全面发展型军事人才是打赢现代化战争的关键  2、培养“指技合融”全面型军事人才是实现我军跨越式发展的有力支撑'
      },
      dialogFormVisible: false,
      distribDialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        view: '查看',
        update: '编辑',
        create: '新增计划'
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    setTimeout(() => {
      this.chart1()
      this.chart2()
      this.chart10()
      this.chart3()
      this.chart9()
    }, 200)
  },
  methods: {
    // 视频联动
    openVideo(row) {
      const list = [
        {
          url: '11',
          img: require('@/assets/watchPoint/ZP.png')
        },
        { url: '11', img: require('@/assets/watchPoint/ZP.png') },
        { url: '11', img: require('@/assets/watchPoint/ZP2.jpg') },
        { url: '11', img: require('@/assets/watchPoint/ZP3.jpg') },
        { url: '11', img: require('@/assets/watchPoint/ZP3.jpg') },
        { url: '11', img: require('@/assets/watchPoint/ZP2.jpg') },
        { url: '11', img: require('@/assets/watchPoint/ZP3.jpg') },
        { url: '11', img: require('@/assets/watchPoint/ZP2.jpg') }
      ]
      const cmpt = new PlayBackCamera_Com({ list: list })
      createPop(cmpt, 'cameraPopUp')
    },
    chart1() {
      const myChart = echarts.init(document.getElementById('chart1'))
      myChart.setOption(option1, true)
    },
    chart2() {
      const myChart = echarts.init(document.getElementById('chart2'))
      myChart.setOption(option2, true)
    },
    chart3() {
      const myChart = echarts.init(document.getElementById('chart3'))
      myChart.setOption(option3, true)
    },
    chart9() {
      const myChart = echarts.init(document.getElementById('chart9'))
      myChart.setOption(option9, true)
    },
    chart10() {
      const myChart = echarts.init(document.getElementById('chart10'))
      myChart.setOption(option10, true)
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    enable(row) {
      // 启用
      this.$notify({
        title: '成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
    },
    handleFilter() {
      this.listQuery.pageNo = 1
    },
    resetForm() {
      this.form = {
        area: '',
        isPlaying: false,
        program: ''
      }
    },
    async handleCreate(row) {
      this.resetForm()
      this.dialogStatus = 'create'
      this.form.area = row.area
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    addClickRegion(name) {
      this.list.push({ area: name, program: '', isPlaying: false })
    },
    createData() {
      this.list.push({
        title: this.form.title,
        publishTime: '2020-09-18',
        publishpeople: '王建国',
        status: '待审核'
      })
      this.$notify.success({
        title: '成功',
        message: '选择成功!'
      })
      this.dialogFormVisible = false
    },
    selectProgram(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.form.isPlaying = row.isPlaying
      this.form.area = row.area
      this.form.program = row.program
    },
    updateData() {
      var me = this
      this.list.forEach((item, index) => {
        if (item.area === me.form.area) {
          item.program = me.form.program
        }
      })
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
    },
    handleDelete(row) {
      this.$notify.success({
        title: '成功',
        message: '删除成功'
      })
    },
    handleView(row) {
      this.checkdetail = true
      this.form.title = row.title
      this.form.mark = row.mark
      this.form.useStatus = row.useStatus
    }
  }
}
</script>
<style lang="scss" scoped>
#echart1,
#echart2 {
  height: 400px;
}
.detail-form .el-textarea__inner {
  border: none !important;
}
.el-textarea__inner {
  height: 200px !important;
}
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
.dialog-item {
  margin: 0px 48px 0px 48px !important;
}

.list-query {
  width: 340px;
  margin-right: 22px;
}
.t-col-operate i.table-i {
  margin-right: 0px;
}
// .el-col {
//   margin-right: 20px;
//   &:last-child {
//     margin-right: 0;
//   }
// }
.area {
  text-align: center;
  margin-bottom: 10px;
  height: 25px;
}

.area .area-icon {
  margin: 0 5px;
}

.retate {
  transform: rotate(180deg);
}

.el-button + .el-button {
  margin-left: 0px !important;
}

.el-tag-info {
  margin: 2px;
}

.map-footer {
  text-align: center;
}

.map-footer .el-button {
  margin: 20px 15px 0px;
}
</style>

