<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>巡防任务</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="任务名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.taskName"
              type="text"
              class="filter-item"
              placeholder="请输入任务名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="任务状态：" class="filter-item">
            <el-select
              v-model="listQuery.params.taskFlag"
              clearable
              class="form-item"
            >
              <el-option
                v-for="(item,key) in dictList[2016]"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间：" class="filter-item">
            <el-date-picker
              v-model="queryDate"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="执行人：" class="filter-item">
            <el-input
              v-model="listQuery.params.executePersonInfo"
              type="text"
              class="filter-item"
              placeholder="请输入执行人"
              @keyup.enter.native="handleFilter"
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
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont el-icon-search"
              @click="handleAddNew"
            >添加任务</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column property="taskNo" label="任务编号" />
        <el-table-column property="prowledObject" label="巡检对象" />
        <el-table-column property="remark" label="任务描述" />
        <el-table-column property="taskTypeName" label="任务类型" />
        <el-table-column property="taskFlag" label="任务状态" />
        <el-table-column property="f" label="任务来源" />
        <el-table-column property="beginTime" label="开始时间" />
        <el-table-column property="endTime" label="结束时间" />
        <el-table-column property="planFinishTime" label="计划完成时间" />
        <el-table-column property="executeOrgName" label="执行机构" />
        <el-table-column property="executePersonInfo" label="执行人" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="详情" @click="$router.push({name:'ProtectTaskDetail'})" />
              <i class="el-icon-circle-close warning table-i" title="取消" />
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
          :total="listTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <el-dialog
      class="abow_dialog"
      title="新增任务"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="60%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="任务编号" prop="taskNo">
                  <el-input
                    v-model="form.taskNo"
                    class="form-item1"
                    placeholder="请输入任务编号"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="任务名称" prop="taskName">
                  <el-input
                    v-model="form.taskName"
                    class="form-item1"
                    placeholder="请输入任务名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="巡检对象" prop="prowledObject">
                  <el-input
                    v-model="form.prowledObject"
                    class="form-item1"
                    placeholder="请输入巡检对象"
                  >
                    <i slot="suffix" class="el-input__icon el-input_txt" @click="showInspectionList">选择</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="执行机构" prop="executeOrgName">
                  <!--executeOrg-->
                  <el-cascader
                    ref="area"
                    v-model="form.executeOrg"
                    class="form-item1"
                    :options="areaList"
                    :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'areaName', value: 'id' }"
                  >
                    <template slot-scope="{ node, data }">
                      <span class="123456" @click="cascaderRadioClick(data)">{{ data.areaName }}</span>
                    </template>
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="执行人：" prop="executePersonInfo">
                  <el-input v-model="form.executePersonInfo" class="form-item1">
                    <i slot="suffix" class="el-input__icon el-input_txt" @click="chosePeople('commandOfficer', form.executePersonInfo)">选择</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="无人机终端" prop="terminalInfo">
                  <el-input v-model="form.terminalInfo" class="form-item1">
                    <i slot="suffix" class="el-input__icon el-input_txt" @click="showUAVDialog">选择</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="计划完成时间" prop="planFinishTime">
                  <el-date-picker
                    v-model="form.planFinishTime"
                    class="form-item1"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择计划完成时间"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!--    <allPeoples v-if="dialogUserVisible" ref="peopleSelect" :msg="msg" @peopleSelect="peopleSelect" />-->
    <DialogUAVChoose :select-id="form.terminalId" :visible.sync="uavDialogVisible" @handleOK="handleUAVDialogOK" />
    <DialogInspectionList :select-id="form.terminalId" :visible.sync="inspectionListVisible" @handleOK="handleInspectionListOK" />
  </div>
</template>
<script>
import { dictBatch } from '@/api/base/dictDetail'
import { page, getById, del } from '@/api/protect/task'
import { registertree } from '@/api/base/region'
import { delchildren } from '@/utils/index'
import allPeoples from '@/components/peoples/choicePeoples'
import DialogUAVChoose from './DialogUAVChoose'
import DialogInspectionList from './DialogInspectionList'
export default {
  name: 'ProtectTask',
  components: { allPeoples, DialogUAVChoose, DialogInspectionList },
  data() {
    return {
      uavDialogVisible: false,
      inspectionListVisible: false,
      dictList: [],
      queryDate: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          taskName: '',
          taskFlag: '',
          beginTime: '',
          endTime: '',
          executePersonInfo: ''
        }
      },
      list: [],
      listTotal: 0,
      listLoading: false,
      dialog: false,
      areaList: [],
      form: {
        taskNo: '',
        taskName: '',
        executeOrg: '',
        executeOrgName: '',
        terminalId: '',
        terminalInfo: '',
        planFinishTime: ''
      },
      rules: {
        taskNo: [{ required: true, message: '请输入任务编号', trigger: 'blur' }],
        taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        executeOrg: [{ required: true, message: '请选择执行机构', trigger: 'blur' }],
        url: [{ required: true, message: '请上传图例', trigger: 'change' }]
      },
      dialogUserVisible: false
    }
  },
  watch: {
    queryDate(val) {
      let res = ['', '']
      if (val !== null) {
        res = val
      }
      this.listQuery.beginTime = res[0]
      this.listQuery.endTime = res[1]
    }
  },
  created() {
    this.getList()
    dictBatch(['2016']).then(res => {
      this.dictList = res.data
    })
    registertree().then(res => {
      this.areaList = delchildren(res.data)
    })
  },
  methods: {
    showUAVDialog() {
      this.uavDialogVisible = true
    },
    showInspectionList() {
      this.inspectionListVisible = true
    },
    handleInspectionListOK(val) {
      console.log(val)
    },
    handleUAVDialogOK(val) {
      if (val) {
        this.form.terminalId = val.id
        this.form.terminalInfo = val.brand
      } else {
        this.form.terminalId = ''
        this.form.terminalInfo = ''
      }
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      page(this.listQuery).then((res) => {
        this.listLoading = false
        this.list = res.data.content
        this.listTotal = res.data.totalElements
      })
    },
    handleAddNew() {
      this.dialog = true
    },
    createData() {

    },
    details(id) {
      this.dialog = true
      this.getdetails(id)
    },
    getdetails(id) {
      // floorget(id).then((response) => {
      //   this.ruleForm = response.data
      // })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    chosePeople(type, val) {
      this.dialogUserVisible = true
      this.peopleType = type
      this.msg.id = val
    },
    cascaderRadioClick(val, name) {
      this.form.executeOrg = val.id
      this.form.executeOrgName = val.areaName
    }
  }
}
</script>
<style scoped>
  .photo{
    width: 100px;
    height: 100px;
  }
</style>
