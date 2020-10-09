<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>车辆道闸设备注册</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="标识号：" class="filter-item">
            <el-input
              v-model="listQuery.params.code"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入标识号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="厂商：" class="filter-item">
            <el-select
              v-model="listQuery.params.brandId"
              placeholder="请选择"
              clearable
              class="filter-item mr10"
              @change="handleFilter"
            >
              <el-option
                v-for="item in factoryList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.equipmentName"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="出/入：" class="filter-item">
            <el-select
              v-model="listQuery.params.enterLeaveSign"
              placeholder="请选择"
              clearable
              class="filter-item mr10"
              @change="handleFilter"
            >
              <el-option
                v-for="item in inout"
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
            >注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--门禁分页内容-->
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
        <el-table-column label="标识号" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备厂商" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.brandName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备名称">
          <template slot-scope="scope">
            <span>{{ scope.row.equipmentName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备型号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.model }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备类别" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通信协议" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.protocolType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册日期" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.createTime).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="位置" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.locationDescription }}</span>
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
                <el-form-item label="标识号：" prop="code">
                  <el-input v-model="dataForm.code" class="form-item1" placeholder="请输入标识号" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备厂商：" prop="brandId">
                  <el-select v-model="dataForm.brandId" class="form-item1" placeholder="请选择设备厂商" @change="handleBrandChange">
                    <el-option v-for="item in factoryList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备名称：" prop="equipmentName">
                  <el-input v-model="dataForm.equipmentName" class="form-item1" placeholder="请选择设备名称" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="型号：" prop="model">
                  <el-input v-model="dataForm.model" class="form-item1" placeholder="请输入型号" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备类型：" prop="typeId">
                  <el-select v-model="dataForm.typeId" class="form-item1" placeholder="请选择设备类型" @change="handleTypeChange">
                    <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="通信协议：" prop="protocolTypeId">
                  <el-select v-model="dataForm.protocolTypeId" class="form-item1" placeholder="请选择通信协议" @change="handleProtocolTypeChange">
                    <el-option v-for="item in protocolList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="IP：" prop="ip">
                  <el-input v-model="dataForm.ip" class="form-item1" placeholder="请输入IP" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="端口号：" prop="port">
                  <el-input v-model="dataForm.port" class="form-item1" placeholder="请输入端口号" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="出入口标志：" prop="enterLeaveSign">
                  <el-radio-group v-model="dataForm.enterLeaveSign" class="form-item1">
                    <el-radio v-for="item in inout" :key="item.key" :label="item.key">{{ item.value }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="安装位置：" prop="lngLatAlt">
                  <el-row :gutter="2">
                    <el-col :xs="16" :sm="16" :md="16" :lg="8" :xl="8">
                      <el-form-item prop="locationDescription">
                        <el-input v-model="dataForm.locationDescription" placeholder="请输入摄像头安装位置" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="4">
                      <el-form-item prop="longitude">
                        <el-input v-model="dataForm.longitude" placeholder="经度" @keyup.native="dataForm.longitude=inputChange(dataForm.longitude)" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="4">
                      <el-form-item prop="dimension">
                        <el-input v-model="dataForm.dimension" placeholder="纬度" @keyup.native="dataForm.dimension=inputChange(dataForm.dimension)" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="4">
                      <el-form-item prop="altitude">
                        <el-input v-model="dataForm.altitude" placeholder="海拔高度" @keyup.native="dataForm.altitude=inputChange(dataForm.altitude)" />
                      </el-form-item>
                    </el-col>
                    <el-button type="primary" @click="handleMapView">坐标拾取</el-button>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="所属区域" prop="area">
                  <el-cascader
                    v-model="dataForm.area"
                    ref="area"
                    class="form-item1"
                    :options="areaList"
                    :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'areaName', value: 'id' }"
                    clearable
                  >
                    <template slot-scope="{ node, data }" >
                      <span class="123456" @click="cascaderRadioClick(data.id)">{{ data.areaName }}</span>
                    </template>
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="carBrakeRemark">
                  <el-input
                    v-model="dataForm.carBrakeRemark"
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
                <el-form-item label="标识号：">{{ dataForm.code }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备厂商：">{{ dataForm.brandName }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备名称：">{{ dataForm.equipmentName }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="型号：">{{ dataForm.model }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备类型：">{{ dataForm.typeName }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="通信协议：">{{ dataForm.protocolType }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="IP：">{{ dataForm.ip }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="端口号：">{{ dataForm.port }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="出入口标志：">
                  <template v-for="item in inout">
                    <template v-if="item.key === dataForm.enterLeaveSign">
                      {{ item.value }}
                    </template>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="安装位置：">
                  车辆道闸安装位置：{{ dataForm.location }}
                  <br>
                  经度：{{ dataForm.longitude }}
                  <br>
                  纬度：{{ dataForm.dimension }}
                  <br>
                  海拔高度：{{ dataForm.altitude }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="所属区域：">
                  {{ dataForm.areaName }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：">{{ dataForm.carBrakeRemark }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <CoordinatesPickerCmpt ref="coords" data-type="Point" style-type="barrier" :display-type="mapDataDisplayType" :coords="dataForm.lngLatAlt" @handleOK="handleRegionOK" />
  </div>
</template>

<script>
import CarAPI from '@/api/base/car'
import CoordinatesPickerCmpt from '@/components/OLMap/service/CoordinatesPickerCmpt'
import { registertree } from '@/api/base/region'
import { delchildren } from '@/utils/index'
import { dictBatch } from '@/api/base/dictDetail'
export default {
  name: 'Index',
  components: {
    CoordinatesPickerCmpt
  },
  data() {
    return {
      mapDataDisplayType: 'create',
      factoryList: [],
      protocolList: [],
      typeList: [],
      areaList: [],
      inout: [],
      tableData: [],
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          code: '',
          brandId: '',
          equipmentName: ''
        }
      },
      dialogForm: {
        visible: false,
        title: '',
        type: 'add'
      },
      dataForm: {
        code: '',
        brandId: '',
        brand: '',
        equipmentName: '',
        model: '',
        typeId: '',
        typeName: '',
        protocolTypeId: '',
        protocolType: '',
        ip: '',
        port: '',
        enterLeaveSign: '',
        locationDescription: '',
        lngLatAlt: '',
        longitude: '',
        dimension: '',
        altitude: '',
        carBrakeRemark: '',
        area: '',
        areaName: ''
      },
      rules: {
        code: [{ required: true, message: '请填写标识号', trigger: 'blur' }],
        equipmentMerchant: [{ required: true, message: '请选择厂商', trigger: 'blur' }],
        equipmentName: [{ required: true, message: '请填写设备名称', trigger: 'blur' }],
        model: [{ required: true, message: '请填写型号', trigger: 'blur' }],
        equipmentTypeArr: [
          { type: 'array', required: true, message: '请至少选择一个识别类型', trigger: 'change' }
        ],
        protocolType: [
          { required: true, message: '请选择通信类型', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请填写ip', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请填写端口号', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ]
      },
      checkdetail: false
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      dictBatch(['3009', '3010', '3011', '3012']).then(res => {
        this.factoryList = res.data['3009']
        this.protocolList = res.data['3011']
        this.typeList = res.data['3010']
        this.inout = res.data['3012']
        this.getList()
      })
      registertree().then(res => {
        this.areaList = delchildren(res.data)
      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      CarAPI.page(this.listQuery).then(res => {
        this.listLoading = false
        this.total = res.data.totalElements
        this.tableData = res.data.content
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
    handleCreate() {
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '新增门禁'
      this.dialogForm.type = 'add'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.getArea()
          this.dataForm.equipmentType = JSON.stringify(this.dataForm.equipmentTypeArr)
          CarAPI.create(this.dataForm).then(() => {
            this.dialogForm.visible = false
            this.getList()
            this.$notify.success({
              title: '成功',
              message: '门禁注册成功!'
            })
          })
        }
      })
    },
    handleUpdate(info) {
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '编辑门禁'
      this.dialogForm.type = 'edit'
      CarAPI.detail(info.id).then(res => {
        if (res.data.lngLatAlt) {
          const lngLatAlt = JSON.parse(res.data.lngLatAlt)
          res.data.longitude = lngLatAlt[0]
          res.data.dimension = lngLatAlt[1]
          res.data.altitude = lngLatAlt[2]
            ? lngLatAlt[2]
            : 0
        }
        this.dataForm = Object.assign({}, res.data)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.getArea()
          this.dataForm.equipmentType = JSON.stringify(this.dataForm.equipmentTypeArr)
          CarAPI.update(this.dataForm).then(() => {
            this.dialogForm.visible = false
            this.getList()
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
      CarAPI.detail(info.id).then(res => {
        if (res.data.lngLatAlt) {
          const lngLatAlt = JSON.parse(res.data.lngLatAlt)
          res.data.longitude = lngLatAlt[0]
          res.data.dimension = lngLatAlt[1]
          res.data.altitude = lngLatAlt[2]
            ? lngLatAlt[2]
            : 0
        }
        this.dataForm = Object.assign({}, res.data)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    handleDelete(info) {
      this.$confirm('确认删除' + info.name + '？').then(() => {
        CarAPI.del(info.id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    resetForm() {
      this.dataForm = {
        code: '',
        brandId: '',
        brand: '',
        equipmentName: '',
        model: '',
        typeId: '',
        typeName: '',
        protocolTypeId: '',
        protocolType: '',
        ip: '',
        port: '',
        enterLeaveSign: '',
        locationDescription: '',
        lngLatAlt: '',
        longitude: '',
        dimension: '',
        altitude: '',
        carBrakeRemark: '',
        area: '',
        areaName: ''
      }
    },
    handleMapView() {
      this.mapDataDisplayType = 'create'
      const lon = parseFloat(this.dataForm.longitude) || 0
      const lat = parseFloat(this.dataForm.dimension) || 0
      const alt = parseFloat(this.dataForm.altitude) || 0
      if (lon > 0 && lon < 180 && lat > 0 && lat < 90) {
        var geojson = [lon, lat, alt]
        this.dataForm.lngLatAlt = JSON.stringify(geojson)
        this.mapDataDisplayType = 'update'
      }
      this.$refs.coords.dialogVisible = true
    },
    handleBrandChange(val) {
      const result = this.factoryList.find(item => {
        return item.key === val
      })
      this.dataForm.brandName = result.value
    },
    handleTypeChange(val) {
      const result = this.factoryList.find(item => {
        return item.key === val
      })
      this.dataForm.typeName = result.value
    },
    handleProtocolTypeChange(val) {
      const result = this.protocolList.find(item => {
        return item.key === val
      })
      this.dataForm.protocolType = result.value
    },
    handleLocationChange(val) {
      const result = this.locationType.find(item => {
        return item.key === val
      })
      this.dataForm.locationDescription = result.value
    },
    handleRegionOK(res) {
      if (res.length === 2) res[2] = 0
      this.dataForm.lngLatAlt = JSON.stringify(res)
      this.dataForm.longitude = res[0]
      this.dataForm.dimension = res[1]
      this.dataForm.altitude = res[2]
    },
    getArea() {
      const info = this.$refs['area'].getCheckedNodes()
      this.dataForm.areaName = info[0].label
      this.dataForm.area = info[0].value
    },
    inputChange(val) { // 输入框值改变
      val = val.replace(/[^\d.]/g, '')
      val = val.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
      val = val.replace(/^\./g, '') // 验证第一个字符是数字
      val = val.replace(/\.{2,}/g, '.') // 只保留第一个, 清除多余的
      val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      return val
    },
    cascaderRadioClick(val) {
      this.dataForm.area = val
    }
  }
}
</script>

<style scoped>

</style>
