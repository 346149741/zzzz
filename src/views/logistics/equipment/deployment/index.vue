<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>装备调配</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="主题：" class="filter-item">
            <el-input
              v-model="listQuery.params.carNo"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入主题"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="调配状态：" class="filter-item">
            <el-select
              v-model="listQuery.params.unitId"
              placeholder="请选择"
              clearable
              class="filter-item mr10"
              filterable
              @change="handleFilter"
            >
              <el-option
                v-for="item in statusList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="调配类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.carUseId"
              placeholder="请选择"
              clearable
              class="filter-item mr10"
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
            >调配</el-button>
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
        <el-table-column label="主题" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.a }}</span>
          </template>
        </el-table-column>
        <el-table-column label="调配单位" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getDepart(scope.row.b) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getStatus(scope.row.c) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="调配时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.d).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="接收单位" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getDepart(scope.row.e) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="调配类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getType(scope.row.f) }}</span>
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
              <i class="el-icon-sell table-i" title="接收" @click="handleReceive(scope.row)" />
              <i class="el-icon-delete danger table-i" title="取消" @click="handleDelete(scope.row)" />
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
      <div class="dialog-item-title">调配信息</div>
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="调配主题：" prop="a">
                  <el-input v-model="dataForm.a" class="form-item1" placeholder="请输入名称" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="调配单位：" prop="b">
                  <el-select v-model="dataForm.b" class="form-item1" placeholder="请选择调配单位">
                    <el-option v-for="item in departList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="状态：" prop="c">
                  <el-select v-model="dataForm.c" class="form-item1" placeholder="请选择状态">
                    <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="调配时间：" prop="d">
                  <el-date-picker
                    v-model="dataForm.d"
                    class="form-item1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="接收单位：" prop="e">
                  <el-select v-model="dataForm.e" class="form-item1" placeholder="请选择调配单位">
                    <el-option v-for="item in departList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="调配类型：" prop="f">
                  <el-select v-model="dataForm.f" class="form-item1" placeholder="请选择调配类型">
                    <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="dialog-item-title">装备列表</div>
      <div class="dialog-table">
        <div class="dialog-table-btn">
          <el-button type="primary" size="mini" @click="handleDialog1">新增</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="dataForm.children"
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
            label="装备"
            show-overflow-tooltip
          />
          <el-table-column
            prop="b"
            label="数量"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <div class="t-col-operate">
                <i class="el-icon-edit-outline warning table-i" title="修改数量" @click="handleDialog2(scope.row)" />
                <i class="el-icon-delete danger table-i" title="删除" />
              </div>
            </template>
          </el-table-column>
        </el-table>
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
            <el-table-column label="数量" fixed show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.b }}</span>
              </template>
            </el-table-column>
            <el-table-column label="使用年限" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.e }}</span>
              </template>
            </el-table-column>
            <el-table-column label="使用范围" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.g }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.h }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="un-primary-btn" @click="innerVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible1 = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改装备数量弹窗-->
      <el-dialog
        width="30%"
        title="修改装备数量"
        :visible.sync="innerVisible2"
        class="abow_dialog"
        append-to-body
      >
        <div class="dialog-content">
          <div class="dialog-item">
            <el-form ref="dataForm" :model="equitmentInfo" :rules="rules" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="数量：" prop="b">
                    <el-input-number v-model="equitmentInfo.b" class="form-item1" placeholder="请输入数量" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="un-primary-btn" @click="innerVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible2 = false">确 定</el-button>
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
      :title="checkdetail.title"
      :visible.sync="checkdetail.visible"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-item-title">调配信息</div>
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="调配主题：">{{ dataForm.a }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="调配单位：">{{ getDepart(dataForm.b) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="状态：">{{ getStatus(dataForm.c) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="调配时间：">{{ dataForm.d }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="接收单位：">{{ getDepart(dataForm.e) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="调配类型：">{{ getType(dataForm.f) }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="dialog-item-title">装备列表</div>
      <div class="dialog-table">
        <el-table
          ref="multipleTable"
          :data="dataForm.children"
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
            label="装备"
            show-overflow-tooltip
          />
          <el-table-column
            prop="b"
            label="数量"
            width="120"
            show-overflow-tooltip
          />
        </el-table>
      </div>
      <span v-if="checkdetail.type === 'receive'" slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="checkdetail.visible = false">取 消</el-button>
        <el-button type="primary" @click="unReceiveData">驳回</el-button>
        <el-button type="primary" @click="ReceiveData">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MeAPI from '@/api/logistics/equ-deployment'
export default {
  name: 'Index',
  data() {
    return {
      statusList: [],
      typeList: [],
      departList: [],
      tableData: [],
      equitmentData: [],
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
        z: '',
        children: []
      },
      rules: {
        a: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        b: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        c: [{ required: true, message: '请选择库房', trigger: 'change' }],
        d: [{ required: true, message: '请选择入库时间', trigger: 'change' }],
        e: [{ required: true, message: '请输入使用年限', trigger: 'blur' }]
      },
      equitmentInfo: {
        a: '',
        b: ''
      },
      checkdetail: {
        visible: false,
        title: '',
        type: 'view'
      },
      innerVisible1: false,
      innerVisible2: false
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      const res = MeAPI.dict()
      this.statusList = res.data['01']
      this.typeList = res.data['02']
      this.departList = res.data['03']
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
    handleReceive(info) {
      this.resetForm()
      this.checkdetail.visible = true
      this.checkdetail.title = '接收装备'
      this.checkdetail.type = 'receive'
      this.dataForm = Object.assign({}, info)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    ReceiveData() {
      this.$confirm('确认接收？').then(() => {
        this.checkdetail.visible = false
        this.tableData.forEach((item, index) => {
          if (item.id === this.dataForm.id) {
            this.$set(this.tableData, index, this.dataForm)
          }
        })
        this.$notify.success({
          title: '成功',
          message: '装备接收!'
        })
      })
    },
    unReceiveData() {
      this.$confirm('确认驳回物装备？').then(() => {
        this.checkdetail.visible = false
        this.tableData.forEach((item, index) => {
          if (item.id === this.dataForm.id) {
            this.$set(this.tableData, index, this.dataForm)
          }
        })
        this.$notify.success({
          title: '成功',
          message: '装备驳回!'
        })
      })
    },
    handleView(info) {
      this.checkdetail.visible = true
      this.checkdetail.title = '查看装备'
      this.checkdetail.type = 'view'
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
        z: '',
        children: []
      }
    },
    getStatus(val) {
      const result = this.statusList.find(item => {
        return item.key === val
      })
      return result ? result.value : ''
    },
    getType(val) {
      const result = this.typeList.find(item => {
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
    handleDialog1() {
      this.innerVisible1 = true
    },
    handleDialog2(info) {
      this.equitmentInfo = info
      this.innerVisible2 = true
    }
  }
}
</script>

<style scoped>

</style>
