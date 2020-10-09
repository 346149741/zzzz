<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>楼宇注册</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="楼宇名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.towerName"
              type="text"
              class="filter-item"
              placeholder="请输入楼宇名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="安防级别：" class="filter-item">
            <el-select
              v-model="listQuery.params.securityLevel"
              clearable
              class="form-item"
              placeholder="请选择安防级别"
            >
              <el-option value="1" label="普通" />
              <el-option value="2" label="重要" />
            </el-select>
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconsousuo"
              @click="handleFilter"
            >{{ $t('table.search') }}</el-button>
            <el-button class="filter-item btn-base filter-add-btn" @click="handleCreate(1)">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column property="towerCode" label="楼宇编号" />
        <el-table-column property="towerName" label="楼宇名称" />
        <el-table-column property="towerTier" label="楼宇层数" />
        <el-table-column property="securityLevelName" label="安防级别" />
        <el-table-column property="createTime" label="注册日期" />
        <el-table-column property="towerLocation" label="位置" />
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="详情" @click="details(scope.row.id)" />
              <i
                class="el-icon-edit-outline warning table-i"
                title="编辑"
                @click="handleCreate(2,scope.row.id)"
              />
              <i class="el-icon-delete danger table-i" title="删除" @click="delitem(scope.row.id)" />
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
      class="abow_dialog"
      :title="poptit"
      :visible.sync="dialog1"
      :close-on-click-modal="false"
      width="800px"
      @close="clearruleForm"
    >
      <div class="dialog-item">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="95px">
          <el-row :gutter="20">
            <el-col :md="24" :lg="12">
              <el-form-item label="楼宇编号：" prop="towerCode">
                <el-input v-model="ruleForm.towerCode" class="form-item1" placeholder="请输入楼宇编号" />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="楼宇名称：" prop="towerName">
                <el-input v-model="ruleForm.towerName" class="form-item1" placeholder="请输入楼宇名称" />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="楼宇层数：" prop="towerTier">
                <el-input v-model="ruleForm.towerTier" class="form-item1" placeholder="请输入楼宇层数" />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="安防级别：" prop="securityLevel">
                <el-select
                  ref="securityLevel"
                  v-model="ruleForm.securityLevel"
                  class="form-item1"
                  placeholder="请选择安防级别"
                >
                  <el-option value="1" label="普通" />
                  <el-option value="2" label="重要" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="楼宇位置：">
                <el-input v-model="ruleForm.towerLocation" class="form-item1" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="坐标：">
                <el-input v-model="ruleForm.location" class="form-item1 form-suffix">
                  <i slot="suffix" class="el-input__icon el-input_txt" @click="handleOptCoord">拾取位置</i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="24">
              <el-form-item label="楼宇描述：">
                <el-input
                  v-model="ruleForm.towerDescription"
                  class="form-item1"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 4}"
                  placeholder="请输入内容"
                  maxlength="500"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="submitmsg">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="abow_dialog detail-form"
      title="楼宇详情"
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="楼宇编号：">{{ ruleForm.towerCode }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="楼宇名称：">{{ ruleForm.towerName }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="楼宇层数：">{{ ruleForm.towerTier }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="安防级别：">{{ ruleForm.securityLevelName }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="楼宇位置：">
                  {{ ruleForm.towerLocation }}（{{ ruleForm.location }}）
                  <el-button type="primary" class="filter-item btn-base filter-add-btn" @click="handleMapView">定位</el-button>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="注册日期：">{{ ruleForm.createTime }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="楼宇描述：">{{ ruleForm.towerDescription }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <CoordinatesPickerCmpt ref="coords" data-type="Polygon" :display-type="mapDataDisplayType" :coords="ruleForm.location" @handleOK="handleRegionOK" />
  </div>
</template>
<script>
import CoordinatesPickerCmpt from '@/components/OLMap/service/CoordinatesPickerCmpt'
import {
  floorpage,
  floorsave,
  floorput,
  floordel,
  floorget
} from '@/api/base/region'
export default {
  components: { CoordinatesPickerCmpt },
  data() {
    return {
      mapDataDisplayType: 'create',
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {}
      },
      list: [],
      ruleForm: {
        location: []
      },
      lo: '',
      la: '',
      al: '',
      rules: {
        towerCode: [
          { required: true, message: '请输入楼宇编号', trigger: 'blur' }
        ],
        towerName: [
          { required: true, message: '请输入楼宇名称', trigger: 'blur' }
        ],
        towerTier: [
          { required: true, message: '请输入楼宇层数', trigger: 'blur' }
        ],
        securityLevel: [
          { required: true, message: '请选择安防级别', trigger: 'change' }
        ]
      },
      total: null, // 总数
      listLoading: false,
      dialog1: false,
      dialog2: false,
      poptit: '新增楼宇'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleMapView() {
      this.mapDataDisplayType = 'view'
      this.$refs.coords.dialogVisible = true
    },
    handleRegionOK(res) {
      if (res.length === 2) res[2] = 0
      this.ruleForm.location = JSON.stringify(res)
      /* this.lo = res[0]
      this.la = res[1]
      this.al = res[2]*/
    },
    handleOptCoord() {
      this.mapDataDisplayType = 'create'
      if (this.ruleForm.location.length > 0) {
        this.mapDataDisplayType = 'update'
      }
      this.$refs.coords.dialogVisible = true
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    handleCreate(e, id) {
      this.dialog1 = true
      if (e === 1) {
        this.poptit = '新增楼宇'
      } else {
        this.poptit = '编辑楼宇'
        this.getdetails(id)
      }
    },
    clearruleForm() {
      this.ruleForm = { location: '' }
      this.$refs['ruleForm'].clearValidate()
    },
    getList() {
      this.listLoading = true
      floorpage(this.listQuery).then((response) => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    delitem(id) {
      this.$confirm('确认删除？').then(() => {
        floordel(id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    details(id) {
      this.dialog2 = true
      this.getdetails(id)
    },
    getdetails(id) {
      floorget(id).then((response) => {
        this.ruleForm = response.data
        /* const arr = JSON.parse(this.ruleForm.location)
        this.lo = arr[0]
        this.la = arr[1]
        this.al = arr[2]*/
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    submitmsg() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let isclick = true
          // this.ruleForm.location = [this.lo, this.la, this.al]
          this.ruleForm.securityLevelName = this.$refs.securityLevel.selected.label
          if (isclick) {
            isclick = false
            if ((this.poptit === '新增楼宇')) {
              floorsave(this.ruleForm).then((response) => {
                isclick = true
                this.dialog1 = false
                this.$notify.success({
                  title: '成功',
                })
                this.getList()
              })
            } else {
              floorput(this.ruleForm).then((response) => {
                isclick = true
                this.dialog1 = false
                this.$notify.success({
                  title: '成功',
                })
                this.getList()
              })
            }
          }
        }
      })
    }
  }
}
</script>
