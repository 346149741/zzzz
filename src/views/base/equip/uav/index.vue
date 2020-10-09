<!--无人机注册-->
<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>无人机注册</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="标识号:" class="filter-item">
            <el-input
              v-model="listQuery.params.code"
              class="filter-item mr10"
              placeholder="请输入标识号"
              prefix-icon="el-icon-search"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="品牌:" class="filter-item">
            <el-select
              v-model="listQuery.params.brandId"
              placeholder="选择品牌"
              class="filter-item mr10"
              clearable
              @change="handleFilter"
            >
              <el-option
                v-for="item in brandList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="型号:" class="filter-item">
            <el-input
              v-model="listQuery.params.model"
              class="filter-item mr10"
              placeholder="请输入型号"
              prefix-icon="el-icon-search"
              @keyup.enter.native="handleFilter"
              @change="handleFilter"
            />
          </el-form-item>
          <el-form-item label="状态:" class="filter-item">
            <el-select
              v-model="listQuery.params.useStatus"
              placeholder="请选择状态"
              clearable
              class="filter-item mr10"
              prefix-icon="el-icon-search"
            >
              <el-option
                v-for="item in useStateList"
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
            >查询</el-button>
            <el-button
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleCreate"
            >注册</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--分页内容-->
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
        stripe
        :data="list"
        highlight-current-row
        class="t-bd"
        border
      >
        <el-table-column align="center" label="序号" width="50px" fixed="left">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标识号" fixed="left" width="120px" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备品牌">
          <template slot-scope="scope">
            <span>{{ scope.row.brand }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备型号">
          <template slot-scope="scope">
            <span>{{ scope.row.model }}</span>
          </template>
        </el-table-column>
        <el-table-column label="平台类型">
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="动力类型">
          <template slot-scope="scope">
            <span>{{ scope.row.powerType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="使用状态">
          <template slot-scope="scope">
            <span>{{ getStatusName(scope.row.useStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册日期">
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.createTime).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          class-name="small-padding fixed-width"
          width="180px"
          fixed="right"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-position table-i" title="直播间" @click="handleConfigure(scope.row)" />
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

    <!--新增/修改弹出层-->
    <el-dialog
      class="abow_dialog"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="标识号" prop="code">
                  <el-input
                    v-model="form.code"
                    class="form-item1"
                    placeholder="请输入标识号"
                    :disabled="dialogStatus =='view'"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备品牌" prop="brandId">
                  <el-select
                    v-model="form.brandId"
                    placeholder="选择设备品牌"
                    class="form-item1"
                    :disabled="dialogStatus =='view'"
                    @change="handleBrandChange"
                  >
                    <el-option
                      v-for="item in brandList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备型号" prop="model">
                  <el-input
                    v-model="form.model"
                    class="form-item1"
                    placeholder="请输入设备型号"
                    :disabled="dialogStatus =='view'"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="平台类型" prop="typeId">
                  <el-select
                    v-model="form.typeId"
                    placeholder="选择平台类型"
                    class="form-item1"
                    :disabled="dialogStatus =='view'"
                    @change="handleTypeChange"
                  >
                    <el-option
                      v-for="item in typeList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="动力类型" prop="powerTypeId">
                  <el-select
                    v-model="form.powerTypeId"
                    placeholder="选择动力类型"
                    class="form-item1"
                    :disabled="dialogStatus =='view'"
                    @change="handlePowerTypeChange"
                  >
                    <el-option
                      v-for="item in powerTypeList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="出厂日期" prop="factoryDate">
                  <el-date-picker
                    v-model="form.factoryDate"
                    class="form-item1"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择出厂日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="购买日期" prop="purchaseDate">
                  <el-date-picker
                    v-model="form.purchaseDate"
                    class="form-item1"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择购买日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="地址类型" prop="addressType">
                  <el-select
                    v-model="form.addressType"
                    placeholder="选择地址类型"
                    class="form-item1"
                  >
                    <el-option
                      v-for="item in protocolTypeList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="使用状态" prop="useStatus">
                  <el-radio-group v-model="form.useStatus" class="form-item1">
                    <el-radio v-for="item in useStateList" :key="item.key" :label="item.key">{{ item.value }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div v-if="dialogStatus!=='view'" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      class="abow_dialog detail-form"
      title="查看"
      :visible.sync="checkdetail"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="form" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="标识号：">{{ form.code }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备品牌：">
                  <template v-for="item in brandList">
                    <template v-if="item.key==form.brandId">{{ item.value }}</template>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备型号：">{{ form.model }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="平台类型：">
                  <template v-for="item in typeList">
                    <template v-if="item.key==form.typeId">{{ item.value }}</template>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="动力类型：">
                  <template v-for="item in powerTypeList">
                    <template v-if="item.key==form.powerTypeId">{{ item.value }}</template>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="出厂日期：">{{ form.factoryDate!=''?$moment(form.factoryDate).format('YYYY-MM-DD'):'' }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="购买日期：">{{ form.purchaseDate!=''?$moment(form.purchaseDate).format('YYYY-MM-DD'):'' }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="地址类型：">
                  <template v-for="item in protocolTypeList">
                    <template v-if="item.key==form.addressType">{{ item.value }}</template>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="使用状态：">
                  <template v-for="item in useStateList">
                    <template v-if="item.key==form.useStatus">{{ item.value }}</template>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!--操作直播间-->
    <el-dialog
      class="small_dialog"
      title="直播间"
      :visible.sync="configureFlag"
      :close-on-click-modal="false"
      width="700px"
    >
      <div v-if="configureForm.roomExist" class="dialog-content">
        <div class="dialog-item-title">基本信息</div>
        <div class="dialog-item">
          <el-form ref="configureForm" :model="configureForm" label-width="140px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="直播名称：">
                  <el-input class="form-item1" v-model="configureForm.name" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="推流有效期：">
                  <el-date-picker
                    class="form-item1"
                    v-model="configureForm.date"
                    type="daterange"
                    :picker-options="pickerOptions"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    @change="pickerChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="推流地址：">
                  <el-input class="form-item1" v-model="configureForm.url" readonly />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">播放地址</div>
        <div class="dialog-item">
          <el-form ref="configureForm" :model="configureForm" label-width="140px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="地址类型：">
                  <el-select
                    v-model="configureForm.addressType"
                    placeholder="选择地址类型"
                    class="form-item1"
                    disabled
                  >
                    <el-option
                      v-for="item in protocolTypeList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="直播地址：">
                  <el-input class="form-item1" v-model="configureForm.videoNetaddress" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">设置管理</div>
        <div class="dialog-item" style="margin-bottom: 0;">
          <el-form ref="configureForm" :model="configureForm" label-width="140px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="录像保存（天）：">
                  <el-input-number v-model="configureForm.recordReserve" :precision="0" :min="0" :max="10000" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="推流开关：">
                  <el-switch
                    v-model="configureForm.actived"
                    active-color="#13ce66"
                    active-text="开启"
                    inactive-color="#C0C0C0"
                    inactive-text="关闭"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div v-else class="dialog-content">
        <div class="dialog-item">
          直播间尚未创建，请先创建直播间
          <el-button type="primary" @click="openLiver">创建直播间</el-button>
        </div>
      </div>
      <div v-if="configureForm.roomExist" slot="footer" class="dialog-footer">
        <el-button @click="closeLiver">删除直播间</el-button>
        <el-button @click="configureFlag = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="submitConfigure">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UavAPI from '@/api/base/uav'
import { dictCode, dictBatch } from '@/api/base/dictDetail'

export default {
  name: 'UavManage',
  data() {
    return {
      typeList: [],
      brandList: [],
      powerTypeList: [],
      useStateList: [],
      protocolTypeList: [],
      tableKey: 0,
      list: [],
      total: null,
      listLoading: true,
      checkdetail: false,
      videoFlag: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          code: '',
          brandId: '',
          model: '',
          useStatus: ''
        }
      },
      form: {
        id: '',
        code: '',
        brandId: '',
        brand: '',
        model: '',
        typeId: '',
        typeName: '',
        powerType: '',
        powerTypeId: '',
        factoryDate: '',
        purchaseDate: '',
        addressType: '',
        useStatus: ''
      },
      dialogFormVisible: false,
      distribDialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        view: '查看',
        update: '编辑',
        create: '新增'
      },
      rules: {
        code: [{ required: true, message: '请填写标识号', trigger: 'blur' }],
        brandId: [{ required: true, message: '请选择品牌', trigger: 'change' }],
        model: [{ required: true, message: '请填写型号', trigger: 'blur' }],
        addressType: [
          { required: true, message: '请选择地址类型', trigger: 'change' }
        ],
        useStatus: [
          { required: true, message: '请选择使用状态', trigger: 'blur' }
        ]
      },
      treeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        children: 'children',
        checkStrictly: true
      },
      configureFlag: false,
      configureForm: {
        uavCode: '',
        roomExist: true,
        recordReserve: 0,
        actived: false,
        date: null,
        beginAt: null,
        endAt: null,
        videoNetaddress: '',
        url: '',
        addressType: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      dictBatch(['2024', '2023', '2025', '2028', '2012']).then(res => {
        this.typeList = res.data['2024']
        this.brandList = res.data['2023']
        this.powerTypeList = res.data['2025']
        this.useStateList = res.data['2028']
        this.protocolTypeList = res.data['2012']
        this.getList()
      })
    },
    handleTypeChange(val) {
      const result = this.typeList.find(item => {
        return item.key === val
      })
      this.form.typeName = result.value
    },
    handleBrandChange(val) {
      const result = this.brandList.find(item => {
        return item.key === val
      })
      this.form.brand = result.value
    },
    handlePowerTypeChange(val) {
      const result = this.powerTypeList.find(item => {
        return item.key === val
      })
      this.form.powerType = result.value
    },
    getList() {
      this.listLoading = true
      UavAPI.page(this.listQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
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
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    resetForm() {
      this.form = {
        id: '',
        code: '',
        brandId: '',
        brand: '',
        model: '',
        typeId: '',
        typeName: '',
        powerType: '',
        powerTypeId: '',
        factoryDate: '',
        purchaseDate: '',
        addressType: '',
        useStatus: ''
      }
    },
    async handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          UavAPI.create(this.form)
            .then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify.success({
                title: '成功',
                message: '无人机注册成功!'
              })
            })
            .catch(res => {
              this.$notify.error({
                title: '失败',
                message: res.message
              })
            })
        }
      })
    },
    handleUpdate(row) {
      // this.form = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      UavAPI.detail(row.id).then(res => {
        this.form = res.data
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          UavAPI.update(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除 “' + row.code + '” 的记录？').then(() => {
        UavAPI.del(row.id)
          .then(() => {
            this.getList()
            this.$notify.success({
              title: '成功',
              message: '删除成功'
            })
          })
          .catch(res => {
            this.$notify.error({
              title: '失败',
              message: res.message
            })
          })
      })
    },
    handleView(row) {
      this.checkdetail = true
      UavAPI.detail(row.id).then(res => {
        this.form = res.data
      })
    },
    getStatusName(val) {
      const arr = this.useStateList.filter(item => item.key === val)
      if (arr.length > 0) {
        return arr[0].value
      } else {
        return '--'
      }
    },
    handleConfigure(info) {
      this.form = Object.assign({}, info)
      this.configureFlag = true
      const data = { uavCode: info.code }
      UavAPI.liveInfo(data).then(res => {
        if (res.data.recordReserve === '') {
          res.data.recordReserve = 0
        }
        if (res.data.actived === '') {
          res.data.actived = false
        }
        this.configureForm = res.data
        this.configureForm.uavCode = info.code
        this.configureForm.addressType = info.addressType
        if (this.configureForm.beginAt) {
          this.configureForm.date = [new Date(this.configureForm.beginAt), new Date(this.configureForm.endAt)]
        }
      })
    },
    submitConfigure() {
      UavAPI.liveUpdate(this.configureForm).then(res => {
        this.list.forEach(item => {
          if (item.code === this.configureForm.uavCode) {
            item.videoNetaddress = res.data.videoNetaddress
          }
        })
        this.$message.success('更新成功', 2000)
        this.configureFlag = false
      })
    },
    openLiver() {
      UavAPI.liveStart(this.configureForm).then(res => {
        this.$message.success('直播间已创建', 2000)
        // 信息填入
        if (res.data.recordReserve === '') {
          res.data.recordReserve = 0
        }
        if (res.data.actived === '') {
          res.data.actived = false
        }
        this.configureForm = res.data
        this.configureForm.roomExist = true
        this.configureForm.uavCode = this.form.code
        this.configureForm.addressType = this.form.addressType
        if (this.configureForm.beginAt) {
          this.configureForm.date = [new Date(this.configureForm.beginAt), new Date(this.configureForm.endAt)]
        }
      })
    },
    closeLiver() {
      this.$confirm('确认删除直播间？').then(() => {
        UavAPI.liveClose(this.configureForm).then(res => {
          this.configureForm.roomExist = false
          this.$message.success('直播间已关闭', 2000)
        })
      })
    },
    pickerChange(val) {
      if (val) {
        this.configureForm.beginAt = this.$moment(val[0]).format('YYYY-MM-DD HH:mm:ss')
        this.configureForm.endAt = this.$moment(val[1]).format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.configureForm.beginAt = ''
        this.configureForm.endAt = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.list-query {
  width: 340px;
  margin-right: 22px;
}
.area {
  text-align: center;
  margin-bottom: 10px;
  height: 25px;
}

.area .area-icon {
  margin: 0 5px;
}

.retate {
  transform: rotate(180deg);
}

.el-button + .el-button {
  margin-left: 0px !important;
}

.el-tag-info {
  margin: 2px;
}
</style>
