<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>试卷管理</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="试卷名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.a"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入标识号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="试卷类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.b"
              placeholder="请选择"
              clearable
              class="filter-item mr10"
              filterable
              @change="handleFilter"
            >
              <el-option
                v-for="item in typeList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
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
        <el-table-column label="试卷名称" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.a }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试卷类型" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getType(scope.row.b) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试卷总分" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.c }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合格标准" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.d }}</span>
          </template>
        </el-table-column>
        <el-table-column label="试卷用时" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.e }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.time).format('YYYY-MM-DD') }}</span>
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
                <el-form-item label="试卷类型：" prop="b">
                  <el-select v-model="dataForm.b" class="form-item1" placeholder="请选择试卷类型">
                    <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="试卷名称：" prop="a">
                  <el-input v-model="dataForm.a" class="form-item1" placeholder="请输入名称" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="考试时长：" prop="c">
                  <el-input-number v-model="dataForm.c" :precision="1" :step="1" :min="1" :max="10000" class="form-item1" placeholder="请输入考试时长">
                    <template slot="append">分</template>
                  </el-input-number>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="试卷总分：" prop="d">
                  <el-input v-model="dataForm.d" class="form-item1" disabled />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="合格标准分：" prop="e">
                  <el-input v-model="dataForm.e" class="form-item1" placeholder="请输入名称" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">题目信息</div>
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="24" v-for="(item, index) in dataForm.g" :key="index">
                <el-form-item :label="'标题'+(index+1)+'：'">
                  <el-input v-model="item.title" placeholder="请输入名称" style="width: 50%;" />
                  <a href="javaScript:;" style="display: inline;color: #2D8DEA;float: right;margin-right: 8px;" @click="deleteTitle(index)">删除</a>
                  <a href="javaScript:;" style="display: inline;color: #2D8DEA;float: right;margin-right: 8px;" @click="addSubject(index)">添加题目</a>
                  <div style="border: 1px solid #DCDFE6;padding: 12px 24px;margin-top: 16px;">
                    <div v-for="(a,b) in item.content" :key="b">
                      <div>{{b+1+'. '+a.c}}
                        <a href="javaScript:;" style="display: inline;color: #2D8DEA;float: right;margin-right: 8px;" @click="deleteSubject(index, b)">删除</a>
                      </div>
                      <div>选项：
                        <div v-for="(x,y) in a.d" :key="y" style="margin-left: 24px;">{{radioArr[y]+'. '+x.content}}</div>
                      </div>
                      <div>分数：
                        <span>{{a.e}}</span>
                      </div>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <!--选择题-->
      <el-dialog
        width="60%"
        title="选择题目"
        :visible.sync="innerVisible1"
        class="abow_dialog"
        append-to-body
      >
        <div class="dialog-table">
          <el-table
            ref="multipleTable"
            :data="questionData"
            tooltip-effect="dark"
            border
            @select="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column label="名称" fixed show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.a }}</span>
              </template>
            </el-table-column>
            <el-table-column label="入库时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.b }}</span>
              </template>
            </el-table-column>
            <el-table-column label="使用年限" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.c }}</span>
              </template>
            </el-table-column>
            <el-table-column label="使用范围" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.e }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.g }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="un-primary-btn" @click="innerVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible1 = false">确 定</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="dialogForm.visible = false">取 消</el-button>
        <el-button class="un-primary-btn" @click="addTitle">添加标题</el-button>
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
                <el-form-item label="试卷类型：">{{ dataForm.b }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="试卷名称：">{{ getType(dataForm.a) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="考试时长：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="试卷总分：">{{ dataForm.d }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="合格标准分：">{{ dataForm.e }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">题目信息</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="24" v-for="(item, index) in dataForm.g" :key="index">
                <el-form-item :label="'标题'+(index+1)+'：'" class="unborder">
                  <el-input v-model="item.title" placeholder="请输入名称" style="width: 50%;" />
                  <div style="border: 1px solid #DCDFE6;padding: 12px 24px;margin-top: 16px;">
                    <div v-for="(a,b) in item.content" :key="b">
                      <div>{{b+1+'. '+a.c}}
                      </div>
                      <div>选项：
                        <div v-for="(x,y) in a.d" :key="y" style="margin-left: 24px;">{{radioArr[y]+'. '+x.content}}</div>
                      </div>
                      <div>分数：
                        <span>{{a.e}}</span>
                      </div>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import MeAPI from '@/api/training/exam-testPaper'
  export default {
    name: 'Index',
    data() {
      return {
        typeList: [],
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
          g: [{'title': '', 'content': []}],
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
          a: [{ required: true, message: '请输入试卷名称', trigger: 'blur' }],
          b: [{ required: true, message: '请选择试卷类型', trigger: 'change' }],
          c: [{ required: true, message: '请输入考试时长', trigger: 'blur' }],
          e: [{ required: true, message: '请输入合格标准分', trigger: 'blur' }]
        },
        checkdetail: false,
        radioArr: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        questionData: [],
        innerVisible1: false,
        titleNum: 0
      }
    },
    mounted() {
      this.geDictList()
    },
    methods: {
      geDictList() {
        const res = MeAPI.dict()
        this.typeList = res.data['01']
        this.getList()
        const r = MeAPI.question()
        this.questionData = r.data
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
          g: [{'title': '', 'content': []}],
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
      getType(val) {
        const result = this.typeList.find(item => {
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
      addTitle() {
        this.dataForm.g.push({'title': '', 'content': []})
      },
      deleteTitle(index) {
        this.dataForm.g.splice(index,1)
      },
      addSubject(index) {
        this.innerVisible1 = true
        this.titleNum = index
        // this.dataForm.g[index].content.push({'title': '', 'content': []})
      },
      deleteSubject(index, b) {
        this.dataForm.g[index].content.splice(b,1)
      },
      handleSelectionChange(selection, row) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(row, true)
        this.dataForm.g[this.titleNum].content.push(row)
      }
    }
  }
</script>

<style scoped>

</style>
