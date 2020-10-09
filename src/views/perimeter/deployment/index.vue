<template>
  <div class="app-container">
    <el-card class="app-body">
      <div
        slot="header"
        class="clearfix"
      >
        <span>防区部署</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item
            label="防区编号:"
            class="filter-item"
          >
            <el-input
              v-model="listQuery.params.code"
              placeholder="请输入防区编号"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item
            label="防区名称:"
            class="filter-item"
          >
            <el-input
              v-model="listQuery.params.name"
              class="filter-item mr10"
              placeholder="请输入型号"
              prefix-icon="el-icon-search"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>

          <el-form-item
            label="防护级别:"
            class="filter-item"
          >
            <el-select
              v-model="listQuery.params.defenceLevel"
              class="filter-item mr10"
              clearable
              @change="handleFilter"
            >
              <el-option
                v-for="item in defenceLevelList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="防区类型:"
            class="filter-item"
          >
            <el-select
              v-model="listQuery.params.defenceType"
              class="filter-item mr10"
              clearable
              @change="handleFilter"
            >
              <el-option
                v-for="item in defenceTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="关联设备:"
            class="filter-item"
          >
            <el-select
              v-model="listQuery.params.equipRelated"
              placeholder="请选择状态"
              clearable
              class="filter-item mr10"
              @change="handleFilter"
            >
              <el-option
                v-for="item in equipRelatedList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="布防状态:"
            class="filter-item"
          >
            <el-select
              v-model="listQuery.params.defenceStatus"
              placeholder="请选择状态"
              clearable
              class="filter-item mr10"
              @change="handleFilter"
            >
              <el-option
                v-for="item in defenceStatusList"
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
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleCreate"
            >新增防区</el-button>
            <el-button
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont el-icon-check"
              @click="bathDeployment"
            >一键布防</el-button>
            <el-button
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont el-icon-close"
              @click="bathWithdraw"
            >一键撤防</el-button>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          align="center"
          label="序号"
          fixed="left"
        >
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="防区编号"
          fixed="left"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="防区名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="防护级别">
          <template slot-scope="scope">
            <span>{{ getdefenceLevelName(scope.row.defenceLevel) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="防区类型">
          <template slot-scope="scope">
            <span>{{ getdefenceTypeName(scope.row.defenceType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联设备">
          <template slot-scope="scope">
            <span>{{ getequipName(scope.row.equipRelated) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="布防状态">
          <template slot-scope="scope">
            <span>{{ getdefenceStatusName(scope.row.defenceStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="布防时间">
          <template slot-scope="scope">
            <span>{{ scope.row.deploymentTime?$moment(scope.row.deploymentTime).format('YYYY-MM-DD'):"—— ——" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="撤防时间">
          <template slot-scope="scope">
            <span>{{ scope.row.withdrawTime?$moment(scope.row.withdrawTime).format('YYYY-MM-DD'):"—— ——" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          class-name="small-padding fixed-width"
          width="300px"
          fixed="right"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <el-button
                v-if="getdefenceStatusName(scope.row.defenceStatus)==='布防'"
                class="el-button--primary"
                title="查看"
                size="small"
                @click="handleView(scope.row)"
              >查看</el-button>
              <el-button
                v-if="getdefenceStatusName(scope.row.defenceStatus)==='撤防'"
                class="el-button--primary"
                title="编辑"
                size="small"
                @click="handleUpdate(scope.row)"
              >编辑</el-button>
              <el-button
                v-if="getdefenceStatusName(scope.row.defenceStatus)==='撤防'"
                class="el-button--primary"
                title="布防"
                size="small"
                @click="Deployment(scope.row)"
              >布防</el-button>
              <el-button
                v-if="getdefenceStatusName(scope.row.defenceStatus)==='布防'"
                class="el-button--primary"
                title="撤防"
                size="small"
                @click="Withdraw(scope.row)"
              >撤防</el-button>
              <el-button
                v-if="getdefenceStatusName(scope.row.defenceStatus)==='布防'"
                class="el-button--primary"
                title="旁路"
                size="small"
                @click="bypass(scope.row)"
              >旁路</el-button>
              <el-button
                v-if="getdefenceStatusName(scope.row.defenceStatus)==='旁路'"
                class="el-button--primary"
                title="取消旁路"
                size="small"
                @click="cancelBypass(scope.row)"
              >取消旁路</el-button>
              <el-button
                v-if="getdefenceStatusName(scope.row.defenceStatus)==='撤防'"
                class="el-button--primary"
                title="删除"
                size="small"
                @click="handleDelete(scope.row)"
              >删除</el-button>
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
              <el-col :span="24">
                <el-form-item
                  label="防区编号"
                  prop="code"
                >
                  <el-input
                    v-model="form.code"
                    class="form-item1"
                    placeholder="请输入防区编号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="防区名称"
                  prop="name"
                >
                  <el-input
                    v-model="form.name"
                    class="form-item1"
                    placeholder="请输入设备名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="防护级别"
                  prop="defenceLevel"
                >
                  <el-select
                    v-model="form.defenceLevel"
                    class="form-item1"
                  >
                    <el-option
                      v-for="item in defenceLevelList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="防区类型"
                  prop="defenceType"
                >
                  <el-select
                    v-model="form.defenceType"
                    class="form-item1"
                  >
                    <el-option
                      v-for="item in defenceTypeList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="关联设备"
                  prop="equipRelated"
                >
                  <el-select
                    v-model="form.equipRelated"
                    class="form-item1"
                  >
                    <el-option
                      v-for="item in equipRelatedList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item
                  label="位置坐标"
                  prop="equipName"
                >
                  <el-input
                    v-model="form.location"
                    class="form-item1"
                    placeholder="请输入经纬度"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button
                  type="primary"
                  class="filter-item btn-base filter-add-btn"
                  @click="handleOptCoord"
                >坐标拾取</el-button>
              </el-col>
              <el-col :span="20">
                <el-form-item label="关联摄像头">
                  <el-input
                    class="form-item1"
                    placeholder="请关联摄像头"
                  >
                    <i
                      slot="suffix"
                      class="el-input__icon el-input_txt"
                      @click="handleViewRelate"
                    >已关联{{ checkedNumber }}个摄像头</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button
                  type="primary"
                  class="filter-item btn-base filter-add-btn"
                  @click="handleRelate"
                >点击关联</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div
        v-if="dialogStatus!=='view'"
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}</el-button>
        <el-button
          v-else
          type="primary"
          @click="updateData"
        >{{ $t('table.confirm') }}</el-button>
      </div>
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
          <el-form
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col
                :md="24"
                :lg="12"
              >
                <el-form-item label="防区编号：">{{ form.code }}</el-form-item>
              </el-col>
              <el-col
                :md="24"
                :lg="12"
              >
                <el-form-item label="防护名称：">
                  {{ form.name }}
                </el-form-item>
              </el-col>
              <el-col
                :md="24"
                :lg="12"
              >
                <el-form-item label="防护级别：">{{ getdefenceLevelName(form.defenceLevel) }}</el-form-item>
              </el-col>
              <el-col
                :md="24"
                :lg="12"
              >
                <el-form-item label="防区类型：">{{ getdefenceTypeName(form.defenceType) }}</el-form-item>
              </el-col>
              <el-col
                :md="24"
                :lg="12"
              >
                <el-form-item label="关联设备：">{{ getequipName(form.equipRelated) }}</el-form-item>
              </el-col>
              <el-col
                :md="24"
                :lg="12"
              >
                <el-form-item
                  label="位置坐标："
                  class="locationCoors"
                >
                  {{ form.location }}
                  <el-button
                    type="primary"
                    class="filter-item btn-base filter-add-btn"
                    @click="handleMapView"
                  >地图查看</el-button>
                </el-form-item>
              </el-col>
              <el-col
                :md="24"
                :lg="12"
              >
                <el-form-item label="关联摄像头数：">{{ form.monitorIds.length }}</el-form-item>
              </el-col>
              <el-col
                :md="24"
                :lg="12"
              >
                <el-form-item label="布防状态：">{{ getdefenceStatusName(form.defenceStatus) }}</el-form-item>
              </el-col>
              <el-col
                :md="24"
                :lg="12"
              >
                <el-form-item label="布防时间：">{{ form.placeTime }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!--坐标拾取组件-->
    <CoordinatesPickerCmpt
      ref="coords"
      data-type="LineString"
      :display-type="mapDataDisplayType"
      :coords="form.location"
      @handleOK="handleRegionOK"
    />
    <RelateCameraMap
      ref="cameraRelate"
      :operation-type="relateOperationType"
      :perimeter-line="form.location"
      :select-id-arr="form.monitorIds"
      @handleOK="handleRelateOK"
    />
  </div>
</template>

<script>
import deploymentAPI from '@/api/perimeter/deployment.js'
import RegisterAPI from '@/api/perimeter/register.js'
import { dictBatch } from '@/api/base/dictDetail'
import CoordinatesPickerCmpt from '@/components/OLMap/service/CoordinatesPickerCmpt'
import RelateCameraMap from './relateCamera'
export default {
  name: 'CameraManage',
  components: {
    CoordinatesPickerCmpt,
    RelateCameraMap
  },
  filters: {},
  data() {
    return {
      relateOperationType: 'relate',
      mapDataDisplayType: 'create',
      selectList: [],
      registerTime: null,
      mapViewVisible: false, // 控制地图显示隐藏
      mapOpts: {
        // 地图初始化参数
        projectId: '', // 项目ID
        regionCode: '', // 行政区代码
        baseLayerType: '', // 底图类型
        isAllowPick: true // 允许拾取坐标
      },
      defenceLevelList: [], // 防护级别
      defenceTypeList: [], // 防区类型
      defenceStatusList: [], //
      equipRelatedList: [], // 关联设备
      tableKey: 0,
      list: [],
      total: null,
      listLoading: true,
      checkdetail: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          code: '', // 防区编号
          name: '', // 防区名称
          defenceLevel: '', // 防护级别
          defenceType: '', // 防区类型
          equipRelated: '', // 关联设备
          defenceStatus: '' // 布防状态
        }
      },
      form: {
        code: '', // 防区编号
        name: '', // 防区名称
        defenceLevel: '', // 防护级别
        defenceType: '', // 防区类型
        equipRelated: '', // 关联设备
        defenceStatus: '', // 布防状态
        deploymentTime: '', // 布防时间
        withdrawTime: '', // 撤防时间
        location: '', // 位置坐标
        monitorIds: [] // 关联的摄像头id数组
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
        code: [{ required: true, message: '请填写防区编号', trigger: 'blur' }],
        name: [{ required: true, message: '请填写防区名称', trigger: 'blur' }],
        defenceLevel: [
          { required: true, message: '请填写防护级别', trigger: 'blur' }
        ],
        defenceType: [
          { required: true, message: '请填写防区类型', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请填写位置坐标', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    checkedNumber: function() {
      return this.form.monitorIds.length
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        // 表单隐藏，清理拾取地图信息，再次打开表单，不选项目可以打开坐标拾取
        this.resetMapOpts()
      }
    }
  },
  created() {
    this.geDictList()
    this.getRelatedList()
  },
  methods: {
    geDictList() {
      dictBatch(['3040', '3041', '3042']).then((res) => {
        this.defenceLevelList = res.data['3040'] // 防护级别
        this.defenceTypeList = res.data['3041'] // 防区类型
        this.defenceStatusList = res.data['3042'] // 布防状态
      })
    },
    getRelatedList() {
      // 获取注册的设备
      RegisterAPI.all().then((res) => {
        if (res.data.length > 0) {
          res.data.forEach((item, index) => {
            this.equipRelatedList.push({ key: item.code, value: item.name })
          })
        }
        this.getList()
      })
    },
    handleOptCoord() {
      this.mapDataDisplayType = 'create'
      if (this.form.location.length > 0) {
        this.mapDataDisplayType = 'update'
      }
      this.$refs.coords.dialogVisible = true
    },
    handleRegionOK(res) {
      this.form.location = JSON.stringify(res)
    },
    handleMapView() {
      // this.mapDataDisplayType = 'view'
      // this.$refs.coords.dialogVisible = true
      this.relateOperationType = 'view'
      this.$refs.cameraRelate.dialogVisible = true
    },
    // 多选勾选时触发
    handleSelectionChange(val) {
      this.selectList = val.map(function(item) {
        return item.id
      })
    },
    bathDeployment() {
      if (this.selectList.length === 0) {
        this.$message.error('请选择有效数据')
        return
      }
      this.$confirm('确认一键布防？').then(() => {
        deploymentAPI.bathDeployment(this.selectList).then(() => {
          this.getList()
          this.selectList = []
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    bathWithdraw() {
      if (this.selectList.length === 0) {
        this.$message.error('请选择有效数据')
        return
      }
      this.$confirm('确认一键撤防？').then(() => {
        deploymentAPI.bathWithdraw(this.selectList).then(() => {
          this.getList()
          this.selectList = []
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    handleBrandChange(val) {
      const result = this.equipList.find((item) => {
        return item.key === val
      })
      this.form.brand = result.value
    },
    getList() {
      this.listLoading = true
      deploymentAPI.page(this.listQuery).then((response) => {
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
        code: '',
        name: '',
        location: '',
        defenceLevel: '',
        defenceType: '',
        defenceStatus: '',
        deploymentTime: '',
        withdrawTime: '',
        equipRelated: '',
        monitorIds: []
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
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // 初始防区状态为布防
          var form2 = this.form
          delete form2['defenceStatus']
          delete form2['deploymentTime']
          deploymentAPI
            .create(form2)
            .then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify.success({
                title: '成功',
                message: '防区新增成功!'
              })
            })
            .catch((res) => {
              this.$notify.error({
                title: '失败',
                message: res.message
              })
            })
        }
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      deploymentAPI.detail(row.id).then((res) => {
        if (res.data.lngLatAlt) {
          const geojson = JSON.parse(res.data.lngLatAlt)
          console.log(geojson)
          res.data.longitude = geojson.geometry.coordinates[0]
          res.data.dimension = geojson.geometry.coordinates[1]
          res.data.altitude = geojson.geometry.coordinates[2]
            ? geojson.geometry.coordinates[2]
            : 0
        }
        this.form = Object.assign({}, res.data)
        try {
          this.form.monitorIds = JSON.parse(res.data.monitorIds)
        } catch (e) {
          this.form.monitorIds = []
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.form.registerDate = this.$moment(new Date()).format(
            'YYYY-MM-DD hh:mm:ss'
          )
          deploymentAPI.update(this.form).then(() => {
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
        deploymentAPI.del(row.id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    handleView(row) {
      this.checkdetail = true
      deploymentAPI.detail(row.id).then((res) => {
        this.form = Object.assign({}, res.data)
        try {
          this.form.monitorIds = JSON.parse(res.data.monitorIds)
        } catch (e) {
          this.form.monitorIds = []
        }
      })
    },
    bypass(row) {
      deploymentAPI.bypass(row.id).then((res) => {
        this.getList()
        this.$notify.success({
          title: '成功',
          message: '已设置旁路'
        })
      })
    },
    // 取消旁路
    cancelBypass(row) {
      deploymentAPI.cancelBypass(row.id).then((res) => {
        this.getList()
        this.$notify.success({
          title: '成功',
          message: '已取消旁路'
        })
      })
    },
    // 撤防、
    Withdraw(row) {
      deploymentAPI.bathWithdraw(row.id).then((res) => {
        this.getList()
        this.$notify.success({
          title: '成功',
          message: '已撤防'
        })
      })
    },
    Deployment(row) {
      deploymentAPI.bathDeployment(row.id).then((res) => {
        this.getList()
        this.$notify.success({
          title: '成功',
          message: '已布防'
        })
      })
    },
    // 获取防护级别
    getdefenceLevelName(val) {
      const item = this.defenceLevelList.find((item) => item.key === val)
      if (item) {
        return item.value
      }
    },
    // 获取防区类型
    getdefenceTypeName(val) {
      const item = this.defenceTypeList.find((item) => item.key === val)
      if (item) {
        return item.value
      }
    },
    // 获取关联设备名称
    getequipName(val) {
      const item = this.equipRelatedList.find((item) => item.key === val)
      if (item) {
        return item.value
      }
    },
    // 获取布防状态
    getdefenceStatusName(val) {
      const item = this.defenceStatusList.find((item) => item.key === val)
      if (item) {
        return item.value
      }
    },
    getLocation(location, lngLatAlt) {
      let latalt = ''
      if (lngLatAlt) {
        const geojson = JSON.parse(lngLatAlt)
        latalt =
          geojson.geometry.coordinates[0] +
          ',' +
          geojson.geometry.coordinates[1]
      }
      return location + '(' + latalt + ')'
    },
    // 坐标拾取按钮功能
    async handelMapView() {
      console.log('尚未开发')
    },
    getPickCoord() {},
    closePickMap() {},
    resetMapOpts() {
      this.mapOpts = {
        // 地图初始化参数
        projectId: '', // 项目ID
        regionCode: '', // 行政区代码
        baseLayerType: '', // 底图类型
        isAllowPick: true // 允许拾取坐标
      }
    },
    handleLngLatAltChange(val) {
      const geojson = JSON.parse(this.form.lngLatAlt)
      geojson.geometry.coordinates[0] = this.form.longitude
      geojson.geometry.coordinates[0] = this.form.dimension
      geojson.geometry.coordinates[0] = this.form.altitude
      this.form.lngLatAlt = JSON.stringify(geojson)
    },
    handleMap(info) {
      console.log(info)
    },
    // 关联摄像头
    handleRelate() {
      // 位置坐标不是数组格式或为空，不允许关联
      try {
        if (!this.form.location || this.form.location.length === 0) {
          this.$message.info('防区位置坐标不正确！')
          return
        }
        let json = null
        json = JSON.parse(this.form.location)
        if (!json || !(json instanceof Array)) {
          this.$message.info('防区位置坐标不正确！')
          return
        }
      } catch (error) {
        this.$message.info('防区位置坐标不正确！')
        return
      }
      this.relateOperationType = 'relate'
      this.$refs.cameraRelate.dialogVisible = true
    },
    // 查看关联
    handleViewRelate() {
      this.relateOperationType = 'view'
      this.$refs.cameraRelate.dialogVisible = true
    },
    // 关联摄像头页面，确定功能
    handleRelateOK(res) {
      this.form.monitorIds = res
    }
  }
}
</script>
<style scoped>
.locationCoors .el-form-item__content {
  max-height: 100px;
  overflow: auto;
  min-height: 40px;
}
.t-col-operate i.table-i {
  margin-right: 1000px;
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

.map-footer {
  text-align: center;
}

.map-footer .el-button {
  margin: 20px 15px 0px;
}
</style>

