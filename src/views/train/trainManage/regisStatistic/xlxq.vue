<template>
  <div>
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
            <span>训练时长</span>
          </div>
          <div
            id="chart3"
            style="height:360px;width:100%;"
          />
        </el-card>
      </el-col>
    </el-row>

    <!--分页内容-->
    <el-table
      :key="tableKey"
      :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
      stripe
      :data="list"
      highlight-current-row
      class="t-bd"
      border
    >
      <el-table-column
        label="参训人员"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.cxry }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="平均训练时长(小时)"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.pjsc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="早操训练"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.zcsc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上午训练"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.swsc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="下午训练"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.xwsc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="晚上训练"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.wssc }}</span>
        </template>
      </el-table-column>
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
      />
    </div>
    <!--添加媒体库-->
    <el-dialog
      class="abow_dialog"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            ref="dataForm"
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="主题：">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入主题"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="培养目标：">
                  <el-input
                    v-model="form.goal"
                    type="textarea"
                    placeholder="请输入内容"
                    maxlength="300"
                    show-word-limit
                    height="300"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="培养计划：">
                  <el-upload
                    class="upload-demo btn-base"
                    multiple
                    :limit="3"
                    action=""
                  >
                    <el-button
                      size="small"
                      type="primary"
                    >上传附件</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="审核人">
                  <el-select
                    v-model="form.goal"
                    class="form-item1"
                  >
                    <el-option
                      v-for="item in sheheList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div
        v-if="dialogStatus!=='view'"
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}</el-button>
        <el-button
          v-else
          type="primary"
          @click="updateData"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!--详情查看-->
    <el-dialog
      class="abow_dialog detail-form"
      title="查看"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="主题：">{{ form.title }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="培养目标：">
                  {{ form.goal }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="培养计划："><span style="color:red;cursor:pointer;">2017级人才培养计划.pdf</span></el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="审核人"><span>张建国</span></el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const option3 = {
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
      data: [
        '王建',
        '张强',
        '刘一',
        '史玉柱',
        '张宝龙',
        '黄军',
        '刘烨',
        '张兰'
      ],
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
      name: '姓名',
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
      name: '时长',
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
      data: [10, 9.6, 8.1, 5, 12, 7.9, 3.6, 6.3],
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
        const colorList = ['#2E8F4C']
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
  color: ['#33B9FF', '#0E77E4'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['参加训练', '未参加训练']
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
        { value: 22, name: '参加训练', selected: true },
        { value: 2, name: '未参加训练' }
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
          cxry: '张强',
          pjsc: '5.5',
          zcsc: '0.5',
          swsc: '3',
          xwsc: '1.5',
          wssc: '0.5'
        },
        {
          cxry: '王建',
          pjsc: '4.3',
          zcsc: '0.3',
          swsc: '2',
          xwsc: '2',
          wssc: '0'
        },
        {
          cxry: '刘一',
          pjsc: '4.3',
          zcsc: '1',
          swsc: '1',
          xwsc: '2',
          wssc: '0.3'
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
    chart3() {
      const myChart = echarts.init(document.getElementById('chart3'))
      myChart.setOption(option3, true)
    },
    chart9() {
      const myChart = echarts.init(document.getElementById('chart9'))
      myChart.setOption(option9, true)
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

