<template>
  <div>
    <!--操作按钮-->
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="培训主题：" class="filter-item">
          <el-input
            v-model="listQuery.params.carNo"
            type="text"
            prefix-icon="el-icon-search"
            class="filter-item mr10"
            placeholder="请输入培训主题"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item label="培训类型：" class="filter-item">
          <el-select
            v-model="listQuery.params.unitId"
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
        <el-form-item label="培训方式：" class="filter-item">
          <el-select
            v-model="listQuery.params.carUseId"
            placeholder="请选择"
            clearable
            class="filter-item mr10"
            @change="handleFilter"
          >
            <el-option
              v-for="item in modoList"
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
      <el-table-column label="培训主题" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.a }}</span>
        </template>
      </el-table-column>
      <el-table-column label="培训类型" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ getType(scope.row.b) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="培训时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.c }}</span>
        </template>
      </el-table-column>
      <el-table-column label="培训对象" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ getDepart(scope.row.e) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.f }}</span>
        </template>
      </el-table-column>
      <el-table-column label="培训地点" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.d }}</span>
        </template>
      </el-table-column>
      <el-table-column label="培训讲师" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.g }}</span>
        </template>
      </el-table-column>
      <el-table-column label="培训方式" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ getModo(scope.row.h) }}</span>
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

    <!--添加/编辑弹出框-->
    <el-dialog
      class="abow_dialog"
      :title="dialogForm.title"
      :visible.sync="dialogForm.visible"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-item-title">培训信息</div>
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="培训主题：" prop="a">
                  <el-input v-model="dataForm.a" class="form-item1" placeholder="请输入培训主题" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="培训类型：" prop="b">
                  <el-select v-model="dataForm.b" class="form-item1" placeholder="请选择培训类型">
                    <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="培训时间：" prop="c">
                  <el-date-picker
                    v-model="dataForm.c"
                    class="form-item1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="培训地点：" prop="d">
                  <el-input v-model="dataForm.d" class="form-item1" placeholder="请输入培训地点" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="培训对象：" prop="e">
                  <el-select v-model="dataForm.e" class="form-item1" placeholder="请选择性能">
                    <el-option v-for="item in departList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="负责人：" prop="f">
                  <el-input v-model="dataForm.f" class="form-item1" placeholder="请输入负责人" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="培训讲师：" prop="g">
                  <el-input v-model="dataForm.g" class="form-item1" placeholder="请输入培训讲师" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="培训方式：" prop="h">
                  <el-select v-model="dataForm.h" class="form-item1" placeholder="请选择培训类型">
                    <el-option v-for="item in modoList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="培训内容：" prop="i">
                  <el-input
                    v-model="dataForm.i"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    maxlength="30"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="dialog-item-title">培训人员列表</div>
      <div class="dialog-table">
        <div class="dialog-table-btn">
          <el-button type="primary" size="mini" @click="handleDialog1">新增</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="dataForm.j"
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
            label="工号"
            show-overflow-tooltip
          />
          <el-table-column
            prop="b"
            label="姓名"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column
            prop="f"
            label="出生日期"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column
            prop="p"
            label="职业"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template>
              <div class="t-col-operate">
                <i class="el-icon-delete danger table-i" title="删除" />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--选择装备弹窗-->
      <el-dialog
        width="50%"
        title="选择人员"
        :visible.sync="innerVisible1"
        class="abow_dialog"
        append-to-body
      >
        <div class="dialog-table">
          <el-table
            ref="multipleTable"
            :data="peopleData"
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
      <div class="dialog-item-title">培训信息</div>
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="培训主题：">{{ dataForm.a }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="培训类型：">{{ getType(dataForm.b) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="培训时间：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="培训地点：">{{ dataForm.d }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="培训对象：">{{ getDepart(dataForm.e) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="负责人：">{{ dataForm.f }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="培训讲师：">{{ dataForm.g }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="培训方式：">{{ getModo(dataForm.h) }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="培训内容：">{{ dataForm.i }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="dialog-item-title">培训人员列表</div>
      <div class="dialog-table">
        <el-table
          ref="multipleTable"
          :data="dataForm.j"
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
            label="工号"
            show-overflow-tooltip
          />
          <el-table-column
            prop="b"
            label="姓名"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column
            prop="f"
            label="出生日期"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column
            prop="p"
            label="职业"
            width="120"
            show-overflow-tooltip
          />
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MeAPI from '@/api/logistics/equ-technical'
export default {
  name: 'Index',
  data() {
    return {
      typeList: [],
      modoList: [],
      departList: [],
      peopleData: [],
      tableData: [],
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          carNo: '',
          unitId: '',
          carUseId: ''
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
      checkdetail: false,
      innerVisible1: false
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      const res = MeAPI.dict()
      this.typeList = res.data['03']
      this.modoList = res.data['04']
      this.departList = res.data['02']
      const r = MeAPI.page()
      this.peopleData = r.data.content
      this.getList()
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      const res = MeAPI.page1(this.listQuery)
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
    getModo(val) {
      const result = this.modoList.find(item => {
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
    },
    handleSelectionChange(row) {
      console.log(row)
    },
    handleDialog1() {
      this.innerVisible1 = true
    }
  }
}
</script>

<style scoped>

</style>
