<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>情况统计</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="主题：" class="filter-item">
            <el-input
              v-model="listQuery.params.a"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入关键字"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="比赛时间：" class="filter-item">
            <el-date-picker
              v-model="listQuery.params.b"
              type="daterange"
              class="filter-item mr10"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
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
      <!--固定车辆分页内容-->
      <el-table
        v-loading="listLoading"
        :data="tableData"
        :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
        stripe
        class="t-bd"
        border
      >
        <el-table-column label="序号" fixed width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主题" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.a }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始日期" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.c }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束日期" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.d }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发起人" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.b }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总分" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.e }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最高得分" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.f }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.g }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          fixed="right"
          class-name="small-padding fixed-width"
          width="160px"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(scope.row)" />
            </div>
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!--详情查看-->
    <el-dialog
      class="abow_dialog detail-form"
      :title="detailTitle"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="1200px"
    >
      <div class="dialog-content">
        <div id="chart1" style="width: 900px;height: 500px;"></div>
        <div style="position: absolute;top: 100px;left: 850px;">
          <ul>
            <li v-for="(item, index) in testList" :key="index" style="line-height: 30px;">
              {{ item.c }}<a href="javaScript:;" style="float: right;margin-right: 8px;color: #2D8DEA;">答题详情</a>
            </li>
          </ul>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import MeAPI from '@/api/training/exam-matchStatistics'
  const echarts = require('echarts')
  export default {
    name: 'Index',
    data() {
      return {
        testList: [],
        tableData: [],
        total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          params: {
            a: '',
            b: ''
          }
        },
        dialogForm: {
          visible: false,
          title: '',
          type: 'add'
        },
        dataForm: {
          a: '',
          b: '',
          c: '',
          d: '',
          e: '',
          f: '',
          g: '',
          h: '',
          i: '',
          j: '',
          k: '',
          l: '',
          m: '',
          n: '',
          x: '',
          y: '',
          z: ''
        },
        rules: {
          a: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          b: [{ required: true, message: '请输入数量', trigger: 'blur' }],
          c: [{ required: true, message: '请选择库房', trigger: 'change' }],
          d: [{ required: true, message: '请选择入库时间', trigger: 'change' }],
          e: [{ required: true, message: '请输入使用年限', trigger: 'blur' }]
        },
        checkdetail: false,
        detailTitle: ''
      }
    },
    mounted() {
      this.geDictList()
    },
    methods: {
      geDictList() {
        const res = MeAPI.testPlan()
        this.testList = res.data
        this.getList()
      },
      handleFilter() {
        this.listQuery.pageNo = 1
        this.getList()
      },
      getList() {
        const res = MeAPI.page(this.listQuery)
        this.listLoading = false
        this.total = res.data.totalElements
        this.tableData = res.data.content
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val
        this.getList()
      },
      handleView(info) {
        this.checkdetail = true
        this.dataForm = Object.assign({}, info)
        this.detailTitle = info.a
        setTimeout(() => {
          this.initChart()
        })
      },
      resetForm() {
        this.dataForm = {
          a: '',
          b: '',
          c: '',
          d: '',
          e: '',
          f: '',
          g: '',
          h: '',
          i: '',
          j: '',
          k: '',
          l: '',
          m: '',
          n: '',
          x: '',
          y: '',
          z: ''
        }
      },
      initChart() {
        const option = {
          xAxis: {
            type: 'category',
            data: ['李萧然', '王词合', '杨倪', '张永年', '王大德', '李立', '刘月']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [90, 120, 110, 80, 70, 110, 107],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
            barWidth : 30
          }]
        }
        const myChart = echarts.init(document.getElementById('chart1'))
        myChart.setOption(option, true)
      }
    }
  }
</script>

<style scoped>

</style>
