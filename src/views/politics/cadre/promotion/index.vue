<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>晋职晋衔管理</span>
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
          <el-form-item label="晋升日期" prop="factoryDate">
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
        <el-table-column property="i" label="性别" />
        <el-table-column property="j" label="年龄" />
        <el-table-column property="d" label="原职务" />
        <el-table-column property="e" label="原军衔" />
        <el-table-column property="f" label="晋升职务" />
        <el-table-column property="g" label="晋升军衔" />
        <el-table-column property="h" label="晋升日期" />
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i
                class="el-icon-tickets primary table-i"
                title="详情"
                @click="details(1,scope.row.a,scope.row)"
              />
              <i
                class="el-icon-edit-outline warning table-i"
                title="编辑"
                @click="details(2,scope.row.a,scope.row)"
              />
              <i class="el-icon-delete danger table-i" title="回撤" />
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
    <!--查看-->
    <el-dialog
      class="abow_dialog detail-form"
      title="详情"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="序号：">1</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营房名称：">{{ form.a }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位名称：">{{ form.b }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地址：">{{ form.c }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="坐落号：">{{ form.d }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="面积：">{{ form.e }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="栋号：">{{ form.f }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用途：">{{ form.g }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="dialog = false">确定</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      class="abow_dialog "
      :title="title"
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="80%"
    >
      <el-tabs v-model="activeName" type="card" class="card-main">
        <el-tab-pane label="基本信息" name="base">
          <baseCmpt :form="{}" />
          <div class="dialog-item-title">晋职晋衔材料</div>
          <div class="dialog-item">
            <el-form ref="ruleForm" :model="form" label-width="120px" style="overflow: hidden">
              <el-col :md="24" :lg="12">
                <el-form-item label="查看政审材料：" prop="name">
                  <i class="el-icon-download icon-txt" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="上传晋升文件：" prop="name">
                  <i class="el-icon-upload2 icon-txt" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="晋升职务：" prop="name">
                  <el-select v-model="value" placeholder="请选择晋升职务" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="晋升军衔：" prop="name">
                  <el-select v-model="value" placeholder="请选择晋升军衔" />
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
        </el-tab-pane>
        <el-tab-pane label="教育经历" name="edu">
          <eduListViewCmpt :list="eduViewList" />
        </el-tab-pane>
        <el-tab-pane label="任职经历" name="job">
          <jobListViewCmpt :list="jobViewList" />
        </el-tab-pane>
        <el-tab-pane label="培训经历" name="study">
          <trainListViewCmpt :list="trainViewList" />
        </el-tab-pane>
        <el-tab-pane label="重大贡献" name="contribute">
          <contributeListViewCmpt :list="crtbtViewList" />
        </el-tab-pane>
        <el-tab-pane label="家庭情况" name="family">
          <familyListViewCmpt :list="fmlViewList" />
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取消</el-button>
        <el-button type="primary" @click="dialog2 = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { deptList, approveList, restList, eduViewList, jobViewList, trainViewList, crtbtViewList, fmlViewList } from '../mockData'

import baseCmpt from '../cmpts/baseCmpt'
import eduListViewCmpt from '../cmpts/eduListViewCmpt'
import trainListViewCmpt from '../cmpts/trainListViewCmpt.vue'
import contributeListViewCmpt from '../cmpts/contributeListViewCmpt.vue'
import familyListViewCmpt from '../cmpts/familyListViewCmpt.vue'
import jobListViewCmpt from '../cmpts/jobListViewCmpt.vue'
export default {
  components: { baseCmpt, eduListViewCmpt, jobListViewCmpt, trainListViewCmpt, contributeListViewCmpt, familyListViewCmpt },
  data() {
    return {
      activeName: 'base',
      eduViewList, jobViewList, trainViewList, crtbtViewList, fmlViewList,
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
          d: '中队长',
          e: '副连长',
          f: '大队长',
          g: '正连职',
          h: '2020-09-12',
          i: '男',
          j: '32'
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
    getList() { },
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
<style lang="scss" scoped>
  .card-main {
    margin: 0 20px;
    border: 1px solid #eee;
    border-radius: 4px;

  /deep/ .el-tabs__content {
    padding: 0 10px;
  }

  }

  .icon-txt{
    font-size: 20px;
    cursor: pointer;
  }
</style>
