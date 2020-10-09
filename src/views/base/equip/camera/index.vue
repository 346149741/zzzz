<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>摄像头注册</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="标识号:" class="filter-item">
            <el-input
              v-model="listQuery.params.code"
              placeholder="请输入标识号"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
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
            />
          </el-form-item>
          <el-form-item label="选择状态:" class="filter-item">
            <el-select
              v-model="listQuery.params.useStatus"
              placeholder="请选择状态"
              clearable
              class="filter-item mr10"
              @change="handleFilter"
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
            >{{ $t('table.search') }}</el-button>
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
        <el-table-column label="标识号" fixed="left" width="140px">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.brand }}</span>
          </template>
        </el-table-column>
        <el-table-column label="型号" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.model }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120px">
          <template slot-scope="scope">
            <span>{{ getStatusName(scope.row.useStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册日期" width="120px">
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.createTime).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="140px">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="位置" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.location }}
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
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(scope.row)" />
              <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(scope.row)" />
              <i class="el-icon-location table-i" title="预览" @click="handleMap(scope.row)" />
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
                <el-form-item label="品牌" prop="brandId">
                  <el-select
                    v-model="form.brandId"
                    placeholder="选择品牌"
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
                <el-form-item label="型号" prop="model">
                  <el-input
                    v-model="form.model"
                    class="form-item1"
                    placeholder="请输入型号"
                    :disabled="dialogStatus =='view'"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="类型" prop="typeId">
                  <el-select
                    v-model="form.typeId"
                    placeholder="选择类型"
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
                <el-form-item label="出厂日期" prop="factoryDate">
                  <el-date-picker
                    v-model="form.factoryDate"
                    class="form-item1"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择出厂日期"
                    :disabled="dialogStatus =='view'"
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
                    :disabled="dialogStatus =='view'"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="协议类型" prop="protocolTypeId">
                  <el-select
                    v-model="form.protocolTypeId"
                    class="form-item1"
                    placeholder="选择协议类型"
                    :disabled="dialogStatus =='view'"
                    @change="handleProtocolTypeChange"
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
              <el-col :md="24" :lg="12">
                <el-form-item label="网络类型" prop="networkTypeId">
                  <el-select
                    v-model="form.networkTypeId"
                    placeholder="选择网络类型"
                    class="form-item1"
                    :disabled="dialogStatus =='view'"
                    @change="handleNetTypeChange"
                  >
                    <el-option
                      v-for="item in netTypeList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="使用状态" prop="useState">
                  <el-radio-group v-model="form.useStatus" class="form-item1" :disabled="dialogStatus =='view'">
                    <el-radio
                      v-for="item in useStateList"
                      :key="item.key"
                      :label="item.key"
                    >{{ item.value }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="安装位置">
                  <el-row :gutter="2">
                    <el-col :xs="16" :sm="16" :md="16" :lg="8" :xl="8">
                      <el-form-item prop="location">
                        <el-input v-model="form.location" placeholder="请输入摄像头安装位置" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="4">
                      <el-form-item prop="longitude">
                        <el-input v-model="form.longitude" placeholder="经度" @keyup.native="form.longitude=inputChange(form.longitude)" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="4">
                      <el-form-item prop="dimension">
                        <el-input v-model="form.dimension" placeholder="纬度" @keyup.native="form.dimension=inputChange(form.dimension)" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="4">
                      <el-form-item prop="altitude">
                        <el-input v-model="form.altitude" placeholder="海拔高度" @keyup.native="form.altitude=inputChange(form.altitude)" />
                      </el-form-item>
                    </el-col>
                    <el-button type="primary" @click="handleMapView">坐标拾取</el-button>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="所属区域" prop="area">
                  <el-cascader
                    ref="area"
                    v-model="form.area"
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
                <el-form-item label="视频协议地址" prop="ip">
                  <el-input
                    v-model="form.ip"
                    class="form-item1"
                    placeholder="请输入视频协议地址"
                    :disabled="dialogStatus =='view'"
                  />
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
          <el-form :model="form" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="标识号：">{{ form.code }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="品牌：">
                  <template v-for="item in brandList">
                    <template v-if="item.key==form.brand">{{ item.value }}</template>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="型号：">{{ form.model }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="类型：">
                  <template v-for="item in typeList">
                    <template v-if="item.key==form.type">{{ item.value }}</template>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="出厂日期：">{{ form.factoryDate }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="购买日期：">{{ form.purchaseDate }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="协议类型：">
                  <template v-for="item in protocolTypeList">
                    <template v-if="item.key==form.protocolType">{{ item.value }}</template>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="网络类型：">
                  <template v-for="item in netTypeList">
                    <template v-if="item.key==form.netTypeCode">{{ item.value }}</template>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="使用状态：">
                  <template v-for="item in useStateList">
                    <template v-if="item.key==form.useStatus">{{ item.value }}</template>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="安装位置：">
                  摄像头安装位置：{{ form.location }}
                  <br>
                  经度：{{ form.longitude }}
                  <br>
                  纬度：{{ form.dimension }}
                  <br>
                  海拔高度：{{ form.altitude }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="所属区域：">
                  {{ form.areaName }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="视频协议地址：">{{ form.videoNetaddress }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <CoordinatesPickerCmpt ref="coords" data-type="Point" style-type="camera" :display-type="mapDataDisplayType" :coords="form.lngLatAlt" @handleOK="handleRegionOK" />
  </div>
</template>

<script>
import CameraAPI from '@/api/base/camera'
import { dictBatch } from '@/api/base/dictDetail'
import CoordinatesPickerCmpt from '@/components/OLMap/service/CoordinatesPickerCmpt'
import { registertree } from '@/api/base/region'
import { delchildren } from '@/utils/index'
export default {
  name: 'CameraManage',
  components: {
    CoordinatesPickerCmpt
  },
  filters: {
  },
  data() {
    return {
      mapDataDisplayType: 'create',
      // styleInfo: {
      //   legendName: 'camera'
      // },
      mapOpts: {
        // 地图初始化参数
        projectId: '', // 项目ID
        regionCode: '', // 行政区代码
        baseLayerType: '', // 底图类型
        isAllowPick: true // 允许拾取坐标
      },
      typeList: [],
      brandList: [],
      netTypeList: [],
      useStateList: [],
      protocolTypeList: [],
      areaList: [],
      tableKey: 0,
      list: [],
      total: null,
      listLoading: true,
      checkdetail: false,
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
        brand: '',
        brandId: '',
        model: '',
        type: '',
        typeId: '',
        networkType: '',
        networkTypeId: '',
        protocolType: '',
        protocolTypeId: '',
        factoryDate: '',
        purchaseDate: '',
        useStatus: '',
        location: '',
        lngLatAlt: '',
        longitude: '',
        dimension: '',
        altitude: '',
        ip: '',
        area: '',
        areaName: ''
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
        brand: [{ required: true, message: '请选择品牌', trigger: 'blur' }],
        model: [{ required: true, message: '请填写型号', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        networkType: [
          { required: true, message: '请选择网络类型', trigger: 'blur' }
        ],
        protocolType: [
          { required: true, message: '请选择协议类型', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请填写ip', trigger: 'blur' }
        ],
        useStatus: [
          { required: true, message: '请选择使用状态', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ]
      }
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
  },
  methods: {
    geDictList() {
      dictBatch(['2026', '2042', '2027', '2028', '2012']).then(res => {
        this.typeList = res.data['2026']
        this.brandList = res.data['2042']
        this.netTypeList = res.data['2027']
        this.useStateList = res.data['2028']
        this.protocolTypeList = res.data['2012']
        this.getList()
      })
      registertree().then(res => {
        this.areaList = delchildren(res.data)
      })
    },
    handleTypeChange(val) {
      const result = this.typeList.find(item => {
        return item.key === val
      })
      this.form.type = result.value
    },
    handleBrandChange(val) {
      const result = this.brandList.find(item => {
        return item.key === val
      })
      this.form.brand = result.value
    },
    handleNetTypeChange(val) {
      const result = this.netTypeList.find(item => {
        return item.key === val
      })
      this.form.networkType = result.value
    },
    handleProtocolTypeChange(val) {
      const result = this.protocolTypeList.find(item => {
        return item.key === val
      })
      this.form.protocolType = result.value
    },
    getArea() {
      const info = this.$refs['area'].getCheckedNodes()
      this.form.areaName = info[0].label
      this.form.area = info[0].value
    },
    getList() {
      this.listLoading = true
      CameraAPI.page(this.listQuery).then(response => {
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
        brand: '',
        brandId: '',
        model: '',
        type: '',
        typeId: '',
        networkType: '',
        networkTypeId: '',
        protocolType: '',
        protocolTypeId: '',
        factoryDate: '',
        purchaseDate: '',
        useStatus: '',
        location: '',
        lngLatAlt: '',
        longitude: '',
        dimension: '',
        altitude: '',
        ip: '',
        area: '',
        areaName: ''
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
          this.getArea()
          CameraAPI.create(this.form)
            .then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify.success({
                title: '成功',
                message: '摄像头注册成功!'
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
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      CameraAPI.detail(row.id).then(res => {
        if (res.data.lngLatAlt) {
          const lngLatAlt = JSON.parse(res.data.lngLatAlt)
          console.log(lngLatAlt)
          res.data.longitude = lngLatAlt[0]
          res.data.dimension = lngLatAlt[1]
          res.data.altitude = lngLatAlt[2]
            ? lngLatAlt[2]
            : 0
        }
        this.form = Object.assign({}, res.data)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.getArea()
          this.form.registerDate = this.$moment(new Date()).format(
            'YYYY-MM-DD hh:mm:ss'
          )
          CameraAPI.update(this.form).then(() => {
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
        CameraAPI.del(row.id).then(() => {
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
      CameraAPI.detail(row.id).then(res => {
        if (res.data.lngLatAlt) {
          const lngLatAlt = JSON.parse(res.data.lngLatAlt)
          res.data.longitude = lngLatAlt[0]
          res.data.dimension = lngLatAlt[1]
          res.data.altitude = lngLatAlt[2]
            ? lngLatAlt[2]
            : 0
        }
        this.form = Object.assign({}, res.data)
      })
    },
    getStatusName(val) {
      const item = this.useStateList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    },
    // 坐标拾取按钮功能
    handleMapView() {
      this.mapDataDisplayType = 'create'
      const lon = parseFloat(this.form.longitude) || 0
      const lat = parseFloat(this.form.dimension) || 0
      const alt = parseFloat(this.form.altitude) || 0
      if (lon > 0 && lon < 180 && lat > 0 && lat < 90) {
        var geojson = [lon, lat, alt]
        this.form.lngLatAlt = JSON.stringify(geojson)
        this.mapDataDisplayType = 'update'
      }
      this.$refs.coords.dialogVisible = true
    },
    handleRegionOK(res) {
      if (res.length === 2) res[2] = 0
      this.form.lngLatAlt = JSON.stringify(res)
      this.form.longitude = res[0]
      this.form.dimension = res[1]
      this.form.altitude = res[2]
    },
    resetMapOpts() {
      this.mapOpts = {
        // 地图初始化参数
        projectId: '', // 项目ID
        regionCode: '', // 行政区代码
        baseLayerType: '', // 底图类型
        isAllowPick: true // 允许拾取坐标
      }
    },
    handleMap(info) {
      this.form.lngLatAlt = info.lngLatAlt
      this.mapDataDisplayType = 'view'
      this.$refs.coords.dialogVisible = true
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
      this.form.area = val
    }
  }
}
</script>
<style lang="scss" scoped>
.list-query {
  width: 340px;
  margin-right: 22px;
}

// .el-col {
//   margin-right: 20px;
//   &:last-child {
//     margin-right: 0;
//   }
// }
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

