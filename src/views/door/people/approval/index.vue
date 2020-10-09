<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>访客通行审批</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="姓名：" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              class="filter-item"
              placeholder="请输入姓名"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="来访类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.visit"
              clearable
              class="form-item"
              placeholder="请选择来访类型"
            >
              <el-option
                v-for="(item,key) in visitList"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="人员类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.type"
              clearable
              class="form-item"
              placeholder="请选择人员类型"
            >
              <el-option
                v-for="(item,key) in peoplestypeList"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="审批进度：" class="filter-item">
            <el-select
              v-model="listQuery.params.isshenpi"
              clearable
              class="form-item"
              placeholder="请选择审批进度"
            >
              <el-option label="待审批" value="待审批" />
              <el-option label="已通过" value="已通过" />
              <el-option label="未通过" value="未通过" />
            </el-select>
          </el-form-item>
          <el-form-item label="证件类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.cardtype"
              clearable
              class="form-item"
              placeholder="请选择证件类型"
            >
              <el-option
                v-for="(item,key) in cardtypeList"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码：" class="filter-item">
            <el-input
              v-model="listQuery.params.idno"
              type="text"
              class="filter-item"
              placeholder="请输入证件号码"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="申请日期：" class="filter-item">
            <el-date-picker
              v-model="value1"
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
              icon="mr10 iconfont el-icon-search"
              @click="handleFilter"
            >{{ $t('table.search') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column property="a" label="姓名" />
        <el-table-column property="b" label="性别" />
        <el-table-column property="c" label="联系电话" />
        <el-table-column property="d" label="人员类型" />
        <el-table-column property="e" label="工作单位" />
        <el-table-column property="f" label="受访部门" />
        <el-table-column property="g" label="受访人员" />
        <el-table-column property="a" label="来访类型" />
        <el-table-column property="b" label="是否审批" />
        <el-table-column property="c" label="审批状态" />
        <el-table-column property="d" label="访客时间" />
        <el-table-column property="e" label="随访人员" />
        <el-table-column property="f" label="随访车辆" />
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i
                class="el-icon-tickets primary table-i"
                title="详情"
                @click="details(1,scope.row.a)"
              />
              <i
                class="el-icon-s-management warning table-i"
                @click="details(2,scope.row.a)"
                title="审批"
              />
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
    <el-dialog
      class="abow_dialog detail-form"
      :title="poptit"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">来访信息</div>
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="来访时间：">2020-08-10 10:00:00</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预计截止时间：">2020-08-10 10:00:00</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="来访类型：">私人拜访</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="来访事由：">无</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="受访人员：">李思思</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">人员信息</div>
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名：">张宇</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别：">男</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件类型：">身份证</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件号码：">4102562263312533</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：">15432626565263</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="人员类型：">外来人员</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作单位：">某某军区</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">车辆信息</div>
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="车牌号：">豫A 1***1</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="车辆类型：">小型车</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="品牌型号：">奥迪</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="车身颜色：">黑色</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="驾驶证号：">13********31</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">审批流程</div>
        <div class="dialog-item">
          <el-steps :space="200" :active="1" finish-status="success">
            <el-step title="已完成"></el-step>
            <el-step title="进行中"></el-step>
            <el-step title="步骤 3"></el-step>
          </el-steps>
          <el-form v-if="poptit=='审批'" ref="shenheForm" :model="shenheForm" :rules="rules" label-width="120px" style="margin-top:20px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="审批：" prop="isshenpi" class="unborder">
                  <el-select
                    v-model="shenheForm.isshenpi"
                    clearable
                    class="form-item"
                    placeholder="请选择是否审批"
                  >
                    <el-option label="通过" value="通过" />
                    <el-option label="未通过" value="未通过" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="下级审核人员：" class="unborder">
                  <el-input v-model="shenheForm.name" placeholder="请选择审核人员" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" v-if="poptit=='审批'">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="dialog = false">确定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { dictBatch } from '@/api/base/dictDetail'
export default {
  data () {
    return {
      value1: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
        }
      },
      list: [
        {
          a: 'a',
          b: 'b',
          c: 'c',
          d: 'd',
          e: 'e',
          f: 'f',
          g: 'g'
        }
      ],
      form: {

      },
      shenheForm: {

      },
      rules: {
        isshenpi: [{
          required: true,
          message: '请选择审批类型',
          trigger: 'change'
        }],
      },
      total: null, // 总数
      listLoading: false,
      dialog: false,
      peoplestypeList: [],
      cardtypeList: [],
      visitList: [],
      poptit: ''
    }
  },
  created () {
    this.getList()
    dictBatch(['3001', '3016', '3017']).then(res => {
      this.peoplestypeList = res.data['3001']
      this.cardtypeList = res.data['3016']
      this.visitList = res.data['3017']
    })
  },
  methods: {
    handleFilter () {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList () {
      if (this.value1 != null) {
        this.listQuery.params.startTime = this.value1[0]
        this.listQuery.params.endTime = this.value1[1]
      }
      // this.listLoading = true
      // floorpage(this.listQuery).then((response) => {
      //   this.list = response.data.content
      //   this.total = response.data.totalElements
      //   this.listLoading = false
      // })
    },
    details (e, id) {
      if (e == '1') {
        this.poptit = "详情"
      } else {
        this.poptit = "审批"
      }
      this.dialog = true
      this.getdetails(id)
    },
    getdetails (id) {
      // floorget(id).then((response) => {
      //   this.ruleForm = response.data
      // })
    },
    handleSizeChange (val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNo = val
      this.getList()
    },
  }
}
</script>
<style scoped>
.photo {
  width: 100px;
  height: 100px;
}
</style>