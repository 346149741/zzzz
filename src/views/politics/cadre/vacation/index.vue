<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>干部休假</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="人员部门：" class="filter-item">
            <el-cascader
              ref="area"
              v-model="listQuery.params.a"
              class="filter-item"
              :options="deptList"
              :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'label', value: 'id' }"
              clearable
            >
              <template slot-scope="{ node, data }">
                <span class="123456" @click="cascaderRadioClick(data.id)">{{ data.label }}</span>
              </template>
            </el-cascader>
          </el-form-item>
          <el-form-item label="人员姓名：" class="filter-item">
            <el-input
              v-model="listQuery.params.b"
              type="text"
              class="filter-item"
              placeholder="请输入人员姓名"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="审批状态：" class="filter-item">
            <el-select
              v-model="listQuery.params.isshenpi"
              clearable
              class="form-item"
              placeholder="请选择审批状态"
            >
              <el-option v-for="item in approveList" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="休假状态：" class="filter-item">
            <el-select
              v-model="listQuery.params.isshenpi2"
              clearable
              class="form-item"
              placeholder="请选择休假状态"
            >
              <el-option v-for="item in restList" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="申请日期" prop="factoryDate">
            <el-date-picker
              v-model="listQuery.params.c"
              type="daterange"
              range-separator="至"
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
            >{{ $t('table.search') }}
            </el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont el-icon-folder-add"
              @click="handleCreate"
            >录入
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column property="a" label="人员编号" />
        <el-table-column property="b" label="人员部门" />
        <el-table-column property="c" label="人员姓名" />
        <el-table-column property="d" label="职务" />
        <el-table-column property="e" label="现军衔" />
        <el-table-column property="f" label="开始时间" />
        <el-table-column property="g" label="预计结束时间" />
        <el-table-column property="h" label="申请时间" />
        <el-table-column property="i" label="审批状态" />
        <el-table-column property="j" label="休假状态" />
        <el-table-column property="k" label="销假日期" />
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i
                class="el-icon-tickets primary table-i"
                title="详情"
              />
              <i
                class="el-icon-edit-outline warning table-i"
                title="编辑"
              />
              <i class="el-icon-delete danger table-i" title="删除" />
              <i
                v-if="scope.row.i=='审批通过'"
                class="el-icon-remove table-i"
                title="销假"
              />
              <i
                v-if="scope.row.i==='待审批'"
                class="el-icon-s-check table-i"
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
    <!--编辑-->
    <el-dialog
      class="abow_dialog "
      :title="title"
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="80%"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">人员信息</div>
        <div class="dialog-item">
          <baseCmpt :form="{}" />
        </div>
        <div class="dialog-item-title">假单信息</div>
        <div class="dialog-item">
          <el-form ref="ruleForm" :model="form" label-width="120px" style="overflow: hidden">
            <el-col :md="24" :lg="12">
              <el-form-item label="开始日期：" prop="name">
                <el-date-picker
                  v-model="form.a"
                  class="form-item1"
                  type="date"
                  placeholder="选择日期"
                />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="预计结束日期：" prop="name">
                <el-date-picker
                  v-model="form.b"
                  class="form-item1"
                  type="date"
                  placeholder="选择日期"
                />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="休假类型：" prop="name">
                <el-input v-model="form.c" class="form-item1" />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="事由：" prop="name">
                <el-input v-model="form.d" class="form-item1" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注：" prop="name">
                <el-input
                  v-model="form.carBrakeRemark"
                  class="form-item1"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  maxlength="30"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取消</el-button>
        <el-button type="primary" @click="dialog2 = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { deptList, approveList, restList } from '../mockData'
import baseCmpt from '../cmpts/baseCmpt'

export default {
  components: { baseCmpt },
  data() {
    return {
      title: '编辑',
      deptList,
      approveList,
      restList,
      value1: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          a: '',
          b: '',
          c: ''
        }
      },
      list: [
        {
          a: '10000001',
          b: '机装部',
          c: '张海源',
          d: '科长',
          e: '中尉',
          f: '2020-09-15',
          g: '2020-09-28',
          h: '2020-09-14',
          i: '待审批',
          j: '未开始',
          k: '--'
        },
        {
          a: '10000020',
          b: '作训部',
          c: '王海洋',
          d: '科长',
          e: '上尉',
          f: '2020-09-01',
          g: '2020-09-31',
          h: '2020-08-28',
          i: '审批通过',
          j: '休假中',
          k: '--'
        }
      ],
      form: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '²',
        g: ''
      },
      total: null, // 总数
      listLoading: false,
      dialog: false,
      dialog2: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleCreate() {
      this.title = '新增'
      this.dialog2 = true
      this.form = {}
    },
    getList() {
    },
    cascaderRadioClick(val, name) {
      this.listQuery.params.a = val
    },
    handleFilter() {
      this.listQuery.pageNo = 1
    },
    details(e, id, row) {
      if (e === 1) {
        this.dialog = true
      } else {
        this.title = '编辑'
        this.dialog2 = true
      }
      this.getdetails(id)
      this.form = { ...row }
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
    }
  }
}
</script>
<style scoped>
  .photo {
    width: 100px;
    height: 100px;
  }
</style>
