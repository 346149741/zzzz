<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>题库管理</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="题目类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.a"
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
          <el-form-item label="难度：" class="filter-item">
            <el-select
              v-model="listQuery.params.b"
              placeholder="请选择"
              clearable
              class="filter-item mr10"
              @change="handleFilter"
            >
              <el-option
                v-for="item in levelList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="知识点：" class="filter-item">
            <el-input
              v-model="listQuery.params.c"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入知识点"
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
        <el-table-column label="知识点" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.a }}</span>
          </template>
        </el-table-column>
        <el-table-column label="题目类型" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getType(scope.row.b) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="题目描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.c }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分数" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.e }}</span>
          </template>
        </el-table-column>
        <el-table-column label="难度" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getLevel(scope.row.f) }}</span>
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
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="知识点：" prop="a">
                  <el-input v-model="dataForm.a" class="form-item1" placeholder="请输入名称" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="题目类型：" prop="b">
                  <el-select v-model="dataForm.b" class="form-item1" placeholder="请选择题目类型" @change="handleType">
                    <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="题目：" prop="c">
                  <el-input
                    v-model="dataForm.c"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入题目"
                    maxlength="30"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="选项：" prop="d">
                  <el-form-item v-for="(item,index) in dataForm.d" :key="index" :label="radioArr[index]+':'" label-width="30px" style="margin-top: 18px;">
                    <el-input v-model="item.content" style="width: 80%;"/>
                    <el-button  v-if="dataForm.b !== '03'" type="primary" icon="el-icon-plus" size="mini" @click="addOption"/>
                    <el-button  v-if="dataForm.b !== '03'" type="danger" icon="el-icon-delete" size="mini" @click="delOption(index)"/>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="分数：" prop="e">
                  <el-input-number v-model="dataForm.e" :precision="1" :step="1" :min="1" :max="10000" class="form-item1" placeholder="请输入分数" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="难度：" prop="f">
                  <el-rate
                    v-model="dataForm.f"
                    :colors="colors"
                    style="line-height: 2;">
                  </el-rate>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="答案：" prop="g">
                  <el-checkbox-group v-if="dataForm.b === '01'" v-model="dataForm.g">
                    <el-checkbox v-for="(item,index) in dataForm.d" :key="index" :label="radioArr[index]">{{ radioArr[index] }}</el-checkbox>
                  </el-checkbox-group>
                  <el-radio-group v-if="dataForm.b === '02'" v-model="dataForm.g[0]">
                    <el-radio v-for="(item,index) in dataForm.d" :key="index" :label="radioArr[index]">{{ radioArr[index] }}</el-radio>
                  </el-radio-group>
                  <el-radio-group v-if="dataForm.b === '03'" v-model="dataForm.g[0]">
                    <el-radio v-for="(item,index) in dataForm.d" :key="index" :label="radioArr[index]">{{ radioArr[index] }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
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
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="名称：">{{ dataForm.a }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="题目类型：">{{ getType(dataForm.b) }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="题目：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="选项：" class="unborder">
                  <el-form-item v-for="(item,index) in dataForm.d" :key="index" :label="radioArr[index]+':'" label-width="30px" style="margin-top: 18px;" class="unborder">
                    <el-input v-model="item.content" style="width: 80%;"/>
                    <el-button  v-if="dataForm.b !== '03'" type="primary" icon="el-icon-plus" size="mini" @click="addOption"/>
                    <el-button  v-if="dataForm.b !== '03'" type="danger" icon="el-icon-delete" size="mini" @click="delOption(index)"/>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="分数：">{{ dataForm.e }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="难度：" class="unborder">
                  <el-rate
                    v-model="dataForm.f"
                    :colors="colors"
                    style="line-height: 2;">
                  </el-rate>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="答案：" class="unborder">
                  <el-checkbox-group v-if="dataForm.b === '01'" v-model="dataForm.g" disabled>
                    <el-checkbox v-for="(item,index) in dataForm.d" :key="index" :label="radioArr[index]">{{ radioArr[index] }}</el-checkbox>
                  </el-checkbox-group>
                  <el-radio-group v-if="dataForm.b === '02'" v-model="dataForm.g[0]" disabled>
                    <el-radio v-for="(item,index) in dataForm.d" :key="index" :label="radioArr[index]">{{ radioArr[index] }}</el-radio>
                  </el-radio-group>
                  <el-radio-group v-if="dataForm.b === '03'" v-model="dataForm.g[0]" disabled>
                    <el-radio v-for="(item,index) in dataForm.d" :key="index" :label="radioArr[index]">{{ radioArr[index] }}</el-radio>
                  </el-radio-group>
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
  import MeAPI from '@/api/training/exam-questionBank'
  export default {
    name: 'Index',
    data() {
      return {
        typeList: [],
        levelList: [],
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
          b: '02',
          c: '',
          d: [{'content':''},{'content':''},{'content':''},{'content':''}],
          e: '',
          f: 0,
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
          a: [{ required: true, message: '请输入知识点', trigger: 'blur' }],
          b: [{ required: true, message: '请选择题目类型', trigger: 'change' }],
          c: [{ required: true, message: '请输入题目', trigger: 'blur' }],
          e: [{ required: true, message: '请输入分数', trigger: 'blur' }],
          g: [{ required: true, message: '请输入答案', trigger: 'blur' }]
        },
        checkdetail: false,
        radioArr: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      }
    },
    mounted() {
      this.geDictList()
    },
    methods: {
      geDictList() {
        const res = MeAPI.dict()
        this.typeList = res.data['01']
        this.levelList = res.data['02']
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
          b: '02',
          c: '',
          d: [{'content':''},{'content':''},{'content':''},{'content':''}],
          e: '',
          f: 0,
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
      getType(val) {
        const result = this.typeList.find(item => {
          return item.key === val
        })
        return result ? result.value : ''
      },
      getLevel(val) {
        const result = this.levelList.find(item => {
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
      handleType(val) {
        if (val === '03') {
          this.$set(this.dataForm, 'd', [{'content': ''},{'content': ''}])
        } else {
          this.$set(this.dataForm, 'd', [{'content': ''},{'content': ''},{'content': ''},{'content': ''}])
        }
        this.$forceUpdate()
      },
      addOption() {
        this.dataForm.d.push({'content': ''})
      },
      delOption(index) {
        this.dataForm.d.splice(index,1)
      }
    }
  }
</script>

<style scoped>

</style>
