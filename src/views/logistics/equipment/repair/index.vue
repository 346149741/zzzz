<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>装备维修</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="维修人：" class="filter-item">
            <el-input
              v-model="listQuery.params.carNo"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入使用人"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="发起单位：" class="filter-item">
            <el-select
              v-model="listQuery.params.unitId"
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
          <el-form-item label="申请状态：" class="filter-item">
            <el-select
              v-model="listQuery.params.carUseId"
              placeholder="请选择"
              clearable
              class="filter-item mr10"
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
        <el-table-column label="发起人" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.a }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getDepart(scope.row.b) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="装备" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.c }}</span>
          </template>
        </el-table-column>
        <el-table-column label="维修时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.g }}</span>
          </template>
        </el-table-column>
        <el-table-column label="故障描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.f }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审批状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getStatus(scope.row.i) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审批人" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.h }}</span>
          </template>
        </el-table-column>
        <el-table-column label="维修人" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.l }}</span>
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
              <i class="el-icon-s-check table-i" title="审批" @click="handleReceive(scope.row)" />
              <i class="el-icon-setting primary table-i" title="维修" @click="handleRepair(scope.row)" />
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
      width="60%"
    >
      <div class="dialog-item-title">装备维修信息</div>
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="发起人：" prop="a">
                  <el-select v-model="dataForm.a" class="form-item1" placeholder="请选择使用人">
                    <el-option v-for="item in peopleList" :key="item.a" :label="item.a" :value="item.a" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发起单位：" prop="b">
                  <el-select v-model="dataForm.b" class="form-item1" placeholder="请选择调配单位">
                    <el-option v-for="item in departList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="装备：" prop="c">
                  <el-input v-model="dataForm.c" class="form-item1" placeholder="请选中装备">
                    <i slot="suffix" class="el-input__icon el-input_txt" @click="selectEquitment">选择</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="条形码：" prop="d" class="unborder">
                  <img :src="dataForm.d" style="width: 100px;height: 30px;margin: 0 auto;">
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="故障开始时间：" prop="e">
                  <el-date-picker
                    v-model="dataForm.e"
                    type="date"
                    placeholder="选择日期"
                    class="form-item1"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="故障描述：" prop="f">
                  <el-input
                    v-model="dataForm.f"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    maxlength="30"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="申请维修时间：" prop="g">
                  <el-date-picker
                    v-model="dataForm.g"
                    class="form-item1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="审批人：" prop="h">
                  <el-select v-model="dataForm.h" class="form-item1" placeholder="请选择审批人">
                    <el-option v-for="item in peopleList" :key="item.a" :label="item.a" :value="item.a" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="审批状态：" prop="i">
                  <el-select v-model="dataForm.i" class="form-item1" disabled>
                    <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <!--选择装备弹窗-->
      <el-dialog
        width="60%"
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
        <el-button v-if="dialogForm.type === 'add'" type="primary" @click="createData">暂存</el-button>
        <el-button v-if="dialogForm.type === 'add'" type="primary" @click="createData">提交审批</el-button>
        <el-button v-if="dialogForm.type === 'edit'" type="primary" @click="updateData">暂存</el-button>
        <el-button v-if="dialogForm.type === 'edit'" type="primary" @click="updateData">提交审批</el-button>
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
      <div class="dialog-item-title">装备维修信息</div>
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="发起人：">{{ dataForm.a }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发起单位：">{{ getDepart(dataForm.b) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="装备：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="条形码："><img :src="dataForm.d" style="width: 100px;height: 30px;margin: 0 auto;"></el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="故障开始时间：">{{ dataForm.e }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="故障描述：">{{ dataForm.f }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="申请维修时间：">{{ dataForm.g }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="审批人：">{{ dataForm.h }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="审批状态：">{{ getStatus(dataForm.i) }}</el-form-item>
              </el-col>
              <el-col v-if="dataForm.i === '04'" :span="24">
                <el-form-item label="驳回原因：">{{ dataForm.j }}</el-form-item>
              </el-col>
              <el-col v-if="dataForm.i === '05'" :md="24" :lg="12">
                <el-form-item label="维修人：">{{ dataForm.l }}</el-form-item>
              </el-col>
              <el-col v-if="dataForm.i === '05'" :span="24">
                <el-form-item label="维修结果：">{{ dataForm.k }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span v-if="checkdetail.type === 'receive'" slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="checkdetail.visible = false">取 消</el-button>
        <el-button type="primary" @click="unReceiveData">驳回</el-button>
        <el-button type="primary" @click="ReceiveData">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
    <!--维修-->
    <el-dialog
      class="abow_dialog"
      title="装备维修"
      :visible.sync="innerVisible3"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-item-title">装备维修信息</div>
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="发起人：">{{ dataForm.a }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发起单位：">{{ getDepart(dataForm.b) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="装备：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="条形码：" class="unborder"><img :src="dataForm.d" style="width: 100px;height: 30px;margin: 0 auto;"></el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="故障开始时间：">{{ dataForm.e }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="故障描述：">{{ dataForm.f }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="申请维修时间：">{{ dataForm.g }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="审批人：">{{ dataForm.h }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="审批状态：">{{ getStatus(dataForm.i) }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="dialog-item-title">装备维修结果</div>
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12" class="unborder">
                <el-form-item label="维修人：" style="color: black;">
                  <el-input
                    v-model="dataForm.l"
                    class="form-item1"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24" class="unborder">
                <el-form-item label="维修结果：">
                  <el-input
                    v-model="dataForm.k"
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
      <span v-if="checkdetail.type === 'receive'" slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="innerVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="RepairData">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MeAPI from '@/api/logistics/equ-repair'
export default {
  name: 'Index',
  data() {
    return {
      statusList: [],
      peopleList: [],
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
        f: '01',
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
        a: [{ required: true, message: '请选择使用人', trigger: 'change' }],
        b: [{ required: true, message: '请选择调配单位', trigger: 'change' }],
        c: [{ required: true, message: '请选择调配期限', trigger: 'change' }],
        d: [{ required: true, message: '请输入使用原由', trigger: 'blur' }],
        e: [{ required: true, message: '请选择审批人', trigger: 'change' }]
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
      innerVisible2: false,
      innerVisible3: false
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      const res = MeAPI.dict()
      this.statusList = res.data['01']
      this.departList = res.data['03']
      this.getList()
      const r = MeAPI.equipment()
      this.equitmentData = r.data
      const p = MeAPI.people()
      this.peopleList = p.data
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
      this.dialogForm.title = '提交维修审批'
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
    handleRepair(info) {
      this.resetForm()
      this.innerVisible3 = true
      this.dataForm = Object.assign({}, info)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    RepairData() {
      this.innerVisible3 = false
      this.tableData.forEach((item, index) => {
        if (item.id === this.dataForm.id) {
          this.$set(this.tableData, index, this.dataForm)
        }
      })
      this.$notify.success({
        title: '成功',
        message: '成功!'
      })
    },
    handleReceive(info) {
      this.resetForm()
      this.checkdetail.visible = true
      this.checkdetail.title = '审批'
      this.checkdetail.type = 'receive'
      this.dataForm = Object.assign({}, info)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    ReceiveData() {
      this.checkdetail.visible = false
      this.tableData.forEach((item, index) => {
        if (item.id === this.dataForm.id) {
          this.$set(this.tableData, index, this.dataForm)
        }
      })
      this.$notify.success({
        title: '成功',
        message: '成功!'
      })
    },
    unReceiveData() {
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的驳回理由是: ' + value
        })
        this.checkdetail.visible = false
        this.tableData.forEach((item, index) => {
          if (item.id === this.dataForm.id) {
            this.$set(this.tableData, index, this.dataForm)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleView(info) {
      this.checkdetail.visible = true
      this.checkdetail.title = '查看装备使用状况'
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
        i: '01',
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
    selectEquitment() {
      this.innerVisible1 = true
    },
    handleDialog2(info) {
      this.equitmentInfo = info
      this.innerVisible2 = true
    },
    handleSelectionChange(selection, row) {
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(row, true)
      this.dataForm.d = row.f
    }
  }
}
</script>

<style scoped>

</style>
