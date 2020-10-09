<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>竞赛设置</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="竞赛名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.carNo"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入竞赛名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="竞赛时间：" class="filter-item">
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
        <el-table-column label="竞赛名称" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.a }}</span>
          </template>
        </el-table-column>
        <el-table-column label="竞赛时长" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.c }}</span>
          </template>
        </el-table-column>
        <el-table-column label="竞赛时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.b }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总分数" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.e }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合格标准" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.h }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getStatus(scope.row.i) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getPublic(scope.row.j) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          fixed="right"
          class-name="small-padding fixed-width"
          width="220px"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(scope.row)" />
              <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(scope.row)" />
              <i class="el-icon-coordinate table-i" title="发布" @click="handlePublic(scope.row)" />
              <i class="el-icon-delete danger table-i" title="注销" @click="handleDelete(scope.row)" />
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
                <el-form-item label="竞赛名称：" prop="a">
                  <el-input v-model="dataForm.a" class="form-item1" placeholder="请输入名称" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="竞赛时间：" prop="b">
                  <el-date-picker
                    v-model="dataForm.b"
                    type="daterange"
                    class="form-item1"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="竞赛时长(分)：" prop="c">
                  <el-input-number v-model="dataForm.c" :precision="0" :step="1" :min="1" :max="10000" class="form-item1" placeholder="请输入数量" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="试卷选用：" prop="d">
                  <el-select v-model="dataForm.d" class="form-item1" placeholder="请选择存放库房" @change="handlePaperChange">
                    <el-option v-for="item in testList" :key="item.id" :label="item.b" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="合格标准：" prop="e">
                  <el-input v-model="dataForm.e" class="form-item1" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">参赛人员</div>
        <div class="dialog-item">
          <div class="dialog-table-btn">
            <el-button type="primary" size="mini">批量删除</el-button>
            <el-button type="primary" size="mini">新增</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="dataForm.f"
            tooltip-effect="dark"
            border
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column label="序号" width="120">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="b"
              label="人员工号"
              width="120"
            />
            <el-table-column
              prop="a"
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
                  <i class="el-icon-edit-outline warning table-i" title="编辑" />
                  <i class="el-icon-delete danger table-i" title="删除" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="dialog-item-title">试卷详情</div>
        <div class="dialog-item">
          <div v-for="(item, index) in dataForm.g">
            <div style="font-size: 14px;font-weight: 600;line-height: 26px;margin-top: 18px;">{{index+1+'. '+item.c}}</div>
            <div v-if="item.b !== '01'" style="font-size: 12px;line-height: 26px;">
              <el-radio-group v-model="item.e">
                <el-radio v-for="(x,y) in item.d" :key="y" :label="radioArr[y]" style="display: block;margin-top: 16px;">{{radioArr[y]+'. '+x.content}}</el-radio>
              </el-radio-group>
            </div>
            <div v-if="item.b === '01'" style="font-size: 12px;line-height: 26px;">
              <el-checkbox-group v-model="item.f">
                <el-checkbox v-for="(x,y) in item.d" :key="y" :label="radioArr[y]" style="display: block;margin-top: 16px;">{{radioArr[y]+'. '+x.content}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
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
        <div class="dialog-item-title">基本信息</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="竞赛名称：">{{ dataForm.a }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="竞赛时间：">{{ dataForm.j }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="竞赛时长(分)：">{{ dataForm.b }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="试卷选用：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="合格标准：">{{ dataForm.d }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">参赛人员</div>
        <div class="dialog-item">
          <el-table
            ref="multipleTable"
            :data="dataForm.f"
            tooltip-effect="dark"
            border
          >
            <el-table-column label="序号" width="120">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="b"
              label="人员工号"
              width="120"
            />
            <el-table-column
              prop="a"
              label="人员姓名"
              show-overflow-tooltip
            />
          </el-table>
        </div>
        <div class="dialog-item-title">试卷详情</div>
        <div class="dialog-item">
          <div v-for="(item, index) in dataForm.g">
            <div style="font-size: 14px;font-weight: 600;line-height: 26px;margin-top: 18px;">{{index+1+'. '+item.c}}</div>
            <div style="font-size: 12px;line-height: 26px;">
              <div v-for="(x,y) in item.d" :key="y" :label="radioArr[y]" style="display: block;margin-top: 16px;margin-left: 16px;">
                {{radioArr[y]+'. '+x.content}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import MeAPI from '@/api/training/exam-competition'
  export default {
    name: 'Index',
    data() {
      return {
        testList: [],
        statusList: [],
        publicList: [],
        tableData: [],
        total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          params: {
            a: '',
            b: '',
            c: ''
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
          f: [],
          g: [],
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
          a: [{ required: true, message: '请输入竞赛名称', trigger: 'blur' }],
          b: [{ required: true, message: '请选择竞赛时间', trigger: 'change' }],
          c: [{ required: true, message: '请输入竞赛时长', trigger: 'blur' }],
          d: [{ required: true, message: '请选择试卷', trigger: 'change' }],
        },
        radioArr: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        checkdetail: false,
        paperDetail: []
      }
    },
    mounted() {
      this.geDictList()
    },
    methods: {
      geDictList() {
        const res = MeAPI.testPlan()
        this.testList = res.data
        const e = MeAPI.dict()
        this.statusList = e.data['02']
        this.publicList = e.data['03']
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
        this.dialogForm.title = '新增'
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
        this.dialogForm.title = '编辑'
        this.dialogForm.type = 'edit'
        this.dataForm = Object.assign({}, info)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handlePublic(info) {
        this.$confirm('确认发布' + info.a + '？').then(() => {
          this.$message.success('发布成功',2000)
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
          f: [],
          g: [],
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
      getStatus(val) {
        const result = this.statusList.find(item => {
          return item.key === val
        })
        return result ? result.value : ''
      },
      getPublic(val) {
        const result = this.publicList.find(item => {
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
      },
      handlePaperChange(val) {
        const result = this.testList.find(item => {
          return item.id === val
        })
        this.dataForm.f = result.c
        this.dataForm.g = result.content
      }
    }
  }
</script>

<style scoped>

</style>
