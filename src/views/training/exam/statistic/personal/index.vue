<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>个人统计分析</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="单位：" class="filter-item">

            <el-select
              v-model="listQuery.params.a"
              placeholder="请选择"
              clearable
              class="filter-item mr10"
              filterable
              @change="handleFilter"
            >
              <el-option
                v-for="item in departList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="姓名：" class="filter-item">
            <el-input
              v-model="listQuery.params.b"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入标识号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="考试日期：" class="filter-item">
            <el-date-picker
              v-model="listQuery.params.c"
              type="daterange"
              class="filter-item mr10"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="考试主题：" class="filter-item">
            <el-input
              v-model="listQuery.params.d"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入标识号"
              @keyup.enter.native="handleFilter"
            />
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
        <el-table-column label="名称" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.a }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编号" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.b }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getDepart(scope.row.c) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.d }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试卷名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.e }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分数" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.j }}</span>
          </template>
        </el-table-column>
        <el-table-column label="难度" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.f }}</span>
          </template>
        </el-table-column>
        <el-table-column label="参考时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
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
      title="查看"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">基本列表</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="考试名称：">{{ dataForm.e }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="试卷名称：">{{ dataForm.k }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="考试时长：">{{ dataForm.l }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发布人：">{{ dataForm.h }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="考试时间：">{{ dataForm.time }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="试卷总分：">{{ dataForm.i }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">考试人员成绩列表</div>
        <div class="dialog-item">
          <el-table
            ref="multipleTable"
            :data="dataForm.g"
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
              prop="c"
              label="考试成绩"
              show-overflow-tooltip
            />
            <el-table-column
              prop="d"
              label="成绩评价"
              show-overflow-tooltip
            />
            <el-table-column
              prop="e"
              label="答卷时长"
              show-overflow-tooltip
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <i class="el-icon-tickets primary table-i" title="查看"/>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import MeAPI from '@/api/training/exam-person'
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
            b: '',
            c: '',
            d: ''
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
        checkdetail: false
      }
    },
    mounted() {
      this.geDictList()
    },
    methods: {
      geDictList() {
        const res = MeAPI.dict()
        this.departList = res.data['01']
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
            MeAPI.create(this.dataForm).then(() => {
              this.dialogForm.visible = false
              this.tableData.push(this.dataForm)
              this.$notify.success({
                title: '成功',
                message: '保存成功!'
              })
            })
          }
        })
      },
      handleUpdate(info) {
        this.resetForm()
        this.dialogForm.visible = true
        this.dialogForm.title = '编辑装备信息'
        this.dialogForm.type = 'edit'
        MeAPI.detail(info.id).then(res => {
          this.dataForm = Object.assign({}, info)
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        })
      },
      updateData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            MeAPI.create(this.dataForm).then(() => {
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
            })
          }
        })
      },
      handleView(info) {
        this.checkdetail = true
        MeAPI.detail(info.id).then(res => {
          this.dataForm = Object.assign({}, info)
        })
      },
      handleDelete(info) {
        this.$confirm('确认删除' + info.a + '？').then(() => {
          MeAPI.del(info.id).then(() => {
            this.tableData = this.tableData.filter(item => {
              return item.id !== info.id
            })
            console.log(this.tableData)
            this.$notify.success({
              title: '成功',
              message: '删除成功'
            })
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

</style>
