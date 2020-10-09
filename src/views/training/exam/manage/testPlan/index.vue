<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>考试安排</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="发布时间：" class="filter-item">
            <el-date-picker
              v-model="listQuery.params.a"
              type="daterange"
              class="filter-item mr10"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="考试时间：" class="filter-item">
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
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleCreate"
            >新增</el-button>
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
        <el-table-column label="考试名称" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.a }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试卷名称" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.b }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考试总分" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.c }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布人" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.d }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.e).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考试时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.f).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考试时长" show-overflow-tooltip>
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
              <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(scope.row)" />
              <i class="el-icon-delete danger table-i" title="删除" @click="handleDelete(scope.row)" />
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

    <!--添加/编辑弹出框-->
    <el-dialog
      class="abow_dialog"
      :title="dialogForm.title"
      :visible.sync="dialogForm.visible"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">基本信息</div>
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="考试名称：" prop="a">
                  <el-input v-model="dataForm.a" class="form-item1" placeholder="请输入考试名称" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="试卷名称：" prop="b">
                  <el-input v-model="dataForm.b" class="form-item1" placeholder="请输入试卷名称" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="考试时长：" prop="c">
                  <el-input-number v-model="dataForm.c" :precision="0" :step="1" :min="1" :max="10000" class="form-item1" placeholder="请输入考试时长" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="试卷总分：" prop="d">
                  <el-input-number v-model="dataForm.d" :precision="0" :step="1" :min="1" :max="10000" class="form-item1" placeholder="请输入考试时长" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="考试时间：" prop="e">
                  <el-date-picker
                    v-model="dataForm.e"
                    class="form-item1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发布人：" prop="f">
                  <el-input v-model="dataForm.f" class="form-item1" placeholder="请输入发布人" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发布时间：" prop="g">
                  <el-date-picker
                    v-model="dataForm.g"
                    class="form-item1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="成绩评价：" prop="h">
                  优：
                  <el-input
                    style="display: inline;width: 80px;"
                    v-model="dataForm.h"
                    class="form-item1 small-form-input"
                    placeholder="请输入"
                  />
                  良：
                  <el-input
                    style="display: inline;width: 80px;"
                    v-model="dataForm.i"
                    class="form-item1 small-form-input"
                    placeholder="请输入"
                  />
                  及格：
                  <el-input
                    style="display: inline;width: 80px;"
                    v-model="dataForm.j"
                    class="form-item1 small-form-input"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">考试人员列表</div>
        <div class="dialog-item">
          <div class="dialog-table-btn">
            <el-button type="primary" size="mini">添加考试人员</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="dataForm.k"
            tooltip-effect="dark"
            border
          >
            <el-table-column label="序号" fixed width="50px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="a"
              label="人员工号"
              width="120"
              show-overflow-tooltip
            />
            <el-table-column
              prop="b"
              label="人员姓名"
              show-overflow-tooltip
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <i class="el-icon-delete danger table-i" title="删除" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="dialogForm.visible = false">取 消</el-button>
        <el-button v-if="dialogForm.type === 'add'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-if="dialogForm.type === 'edit'" type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </span>
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
        <div class="dialog-item-title">基础信息</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="考试名称：">{{ dataForm.a }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="试卷名称：">{{ dataForm.b }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="考试时长(分)：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="试卷总分：">{{ dataForm.d }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="考试时间：">{{ dataForm.e }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发布人：">{{ dataForm.f }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发布时间：">{{ dataForm.g }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="成绩评价：">{{ '优：' + dataForm.h + '良：' + dataForm.i + '及格：' + dataForm.j }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">考试人员列表</div>
        <div class="dialog-item">
          <el-table
            ref="multipleTable"
            :data="dataForm.k"
            tooltip-effect="dark"
            border
          >
            <el-table-column label="序号" fixed width="50px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="a"
              label="人员工号"
            />
            <el-table-column
              prop="b"
              label="人员姓名"
              show-overflow-tooltip
            />
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import MeAPI from '@/api/training/exam-testPlan'
  export default {
    name: 'Index',
    data() {
      return {
        roomList: [],
        performanceList: [],
        departList: [],
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
          a: [{ required: true, message: '请输入考试名称', trigger: 'blur' }],
          b: [{ required: true, message: '请输入试卷名称', trigger: 'blur' }],
          c: [{ required: true, message: '请输入考试时长', trigger: 'blur' }],
          d: [{ required: true, message: '请输入试卷总分', trigger: 'blur' }],
          e: [{ required: true, message: '请输入考试时间', trigger: 'change' }]
        },
        checkdetail: false
      }
    },
    mounted() {
      this.geDictList()
    },
    methods: {
      geDictList() {
        const res = MeAPI.dict()
        this.roomList = res.data['01']
        this.performanceList = res.data['02']
        this.departList = res.data['03']
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
      handleCreate() {
        this.resetForm()
        this.dialogForm.visible = true
        this.dialogForm.title = '新增装备'
        this.dialogForm.type = 'add'
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.dialogForm.visible = false
            this.tableData.push(this.dataForm)
            this.$notify.success({
              title: '成功',
              message: '保存成功!'
            })
          }
        })
      },
      handleUpdate(info) {
        this.resetForm()
        this.dialogForm.visible = true
        this.dialogForm.title = '编辑装备信息'
        this.dialogForm.type = 'edit'
        this.dataForm = Object.assign({}, info)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.dialogForm.visible = false
            this.tableData.forEach((item, index) => {
              if (item.id === this.dataForm.id) {
                this.$set(this.tableData, index, this.dataForm)
              }
            })
            this.$notify.success({
              title: '成功',
              message: '编辑成功!'
            })
          }
        })
      },
      handleView(info) {
        this.checkdetail = true
        this.dataForm = Object.assign({}, info)
      },
      handleDelete(info) {
        this.$confirm('确认删除' + info.a + '？').then(() => {
          this.tableData = this.tableData.filter(item => {
            return item.id !== info.id
          })
          console.log(this.tableData)
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
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
      getFactory(val) {
        const result = this.roomList.find(item => {
          return item.key === val
        })
        return result ? result.value : ''
      },
      getPerform(val) {
        const result = this.performanceList.find(item => {
          return item.key === val
        })
        return result ? result.value : ''
      },
      getDepart(val) {
        const result = this.departList.find(item => {
          return item.key === val
        })
        return result ? result.value : ''
      },
      beforeExcelUpload(file) {
        const fileName = file.name.toLowerCase()
        const isMODO =
          fileName.indexOf('.xlsx') >= 0 ||
          fileName.indexOf('.xls') >= 0
        const isLt2M = file.size / 1024 / 1024 < 4

        if (!isMODO) {
          this.$message.error('上传图片只能是xlsx/xls格式!')
          return
        }
        if (!isLt2M) {
          this.$message.error('上传模型大小不能超过4MB!')
          return
        }
        const formatFile = new FormData()
        formatFile.append('file', file)
        MeAPI.upload(formatFile).then(res => {
        })
        return false
      }
    }
  }
</script>

<style scoped>
/deep/.small-form-input .el-input__inner{
  width: 80px;
}
</style>
