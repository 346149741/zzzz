<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>装备保养</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.carNo"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入标识号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="性能：" class="filter-item">
            <el-select
              v-model="listQuery.params.carUseId"
              placeholder="请选择"
              clearable
              class="filter-item mr10"
              @change="handleFilter"
            >
              <el-option
                v-for="item in performanceList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="保养时间：" class="filter-item">
            <el-date-picker
              v-model="listQuery.params.date"
              class="form-item1"
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
              icon="mr10 iconfont iconsousuo"
              @click="handleFilter"
            >{{ $t('table.search') }}</el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleCreate"
            >登记</el-button>
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
        <el-table-column label="入库时间" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.b).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="使用年限" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.c }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性能" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getPerform(scope.row.d) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="使用范围" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.e }}</span>
          </template>
        </el-table-column>
        <el-table-column label="条形码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span><img :src="scope.row.f" style="width: 80px;height: 30px;margin: 0 auto;"></span>
          </template>
        </el-table-column>
        <el-table-column label="保养人员" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.h }}</span>
          </template>
        </el-table-column>
        <el-table-column label="保养时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.i }}</span>
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

    <!--保养登记弹出框-->
    <el-dialog
      class="abow_dialog"
      :title="dialogForm.title"
      :visible.sync="dialogForm.visible"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-item-title">装备信息</div>
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="名称：" prop="a">
                  <el-input v-if="dialogForm.type === 'add'" v-model="dataForm.a" class="form-item1" placeholder="请输入名称">
                    <i slot="suffix" class="el-input__icon el-input_txt" @click="selectEquitment">选择</i>
                  </el-input>
                  <el-input v-else v-model="dataForm.a" class="form-item1" placeholder="请输入名称" disabled />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="入库时间：" prop="b">
                  <el-date-picker
                    v-model="dataForm.b"
                    class="form-item1"
                    type="date"
                    placeholder="选择日期"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="使用年限：" prop="c">
                  <el-input-number v-model="dataForm.c" :precision="1" :step="1" :min="1" :max="100" class="form-item1" placeholder="请输入使用年限" disabled />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="性能：" prop="d">
                  <el-select v-model="dataForm.d" class="form-item1" placeholder="请选择性能" disabled>
                    <el-option v-for="item in performanceList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="使用范围：" prop="e">
                  <el-input v-model="dataForm.e" class="form-item1" placeholder="请输入使用范围" disabled />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="条形码：" prop="f" class="unborder">
                  <img :src="dataForm.f" style="width: 100px;height: 30px;margin: 0 auto;">
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="g">
                  <el-input
                    v-model="dataForm.g"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    maxlength="30"
                    show-word-limit
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="dialog-item-title">保养信息</div>
      <div class="dialog-item">
        <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :md="24" :lg="12">
              <el-form-item label="保养人员：" prop="h">
                <el-select v-model="dataForm.h" class="form-item1" placeholder="请选择保养人员">
                  <el-option v-for="item in peopleList" :key="item.a" :label="item.a" :value="item.a" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="保养时间：" prop="i">
                <el-date-picker
                  v-model="dataForm.i"
                  class="form-item1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="保养建议：" prop="j">
                <el-input
                  v-model="dataForm.j"
                  class="form-item1"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入保养建议"
                  maxlength="30"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col v-for="(item, index) in maintainArr" :key="index" :span="24">
              <el-form-item :label="'保养项'+(index + 1)+'：'" prop="visitType">
                <el-input v-model="item.a" class="form-item1" style="width: 80%;" placeholder="请输入保养项">
                  <template slot="append"><i class="el-icon-remove" style="cursor: pointer;" @click="removeItem(index)" /></template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="">
                <el-button type="primary" @click="addItem">添加保养项</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!--选择装备弹窗-->
      <el-dialog
        width="50%"
        title="选择装备"
        :visible.sync="innerVisible1"
        class="abow_dialog"
        append-to-body
      >
        <div class="dialog-table">
          <el-table
            ref="multipleTable"
            :data="equitmentData"
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
      title="查看保养记录"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-item-title">装备信息</div>
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="名称：">{{ dataForm.a }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="入库时间：">{{ dataForm.b }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="使用年限：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="性能：">{{ getPerform(dataForm.d) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="使用范围：">{{ dataForm.e }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="条形码：" class="unborder"><img :src="dataForm.f" style="width: 80px;height: 30px;margin: 0 auto;"></el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：">{{ dataForm.g }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="dialog-item-title">保养记录</div>
      <div class="dialog-content">
        <div v-for="(item, index) in dataForm.l" :key="index" class="dialog-item">
          <div style="font-weight: 600;line-height: 20px;margin-bottom: 8px;">{{ item.i }}</div>
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="保养人员：">{{ item.h }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="保养建议：">{{ item.j }}</el-form-item>
              </el-col>
              <el-col v-for="a in item.k" :key="a" :span="24">
                <el-form-item label="保养项：">{{ a.a }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MeAPI from '@/api/logistics/equ-maintain'
export default {
  name: 'Index',
  data() {
    return {
      roomList: [],
      performanceList: [],
      peopleList: [],
      tableData: [],
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          carNo: '',
          date: '',
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
      innerVisible1: false,
      equitmentData: [],
      maintainArr: [{ a: '' }]
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
      const e = MeAPI.people()
      this.peopleList = e.data
      this.getList()
      const r = MeAPI.equipment()
      this.equitmentData = r.data
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
    selectEquitment() {
      this.innerVisible1 = true
    },
    handleSelectionChange(selection, row) {
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(row, true)
      this.dataForm = {
        a: row.a,
        b: row.b,
        c: row.c,
        d: row.d,
        e: row.e,
        f: row.f,
        g: row.g,
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
    addItem() {
      this.maintainArr.push({ a: '' })
    },
    removeItem(index) {
      this.maintainArr.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
