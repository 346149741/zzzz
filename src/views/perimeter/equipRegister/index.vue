<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>设备注册</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="设备编号:" class="filter-item">
            <el-input
              v-model="listQuery.params.code"
              placeholder="请输入设备编号"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="设备名称:" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              class="filter-item mr10"
              placeholder="请输入型号"
              prefix-icon="el-icon-search"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="注册时间：" class="filter-item">
            <el-date-picker
              v-model="registerTime"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="设备类型:" class="filter-item">
            <el-select
              v-model="listQuery.params.type"
              class="filter-item mr10"
              clearable
              @change="handleFilter"
            >
              <el-option
                v-for="item in equipList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态:" class="filter-item">
            <el-select
              v-model="listQuery.params.useStatus"
              class="filter-item mr10"
              clearable
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
          <el-form-item label="设备状态:" class="filter-item">
            <el-select
              v-model="listQuery.params.deviceStatus"
              placeholder="请选择状态"
              clearable
              class="filter-item mr10"
              @change="handleFilter"
            >
              <el-option
                v-for="item in equipStateList"
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
            <el-button
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="batchStart"
            >批量启用</el-button>
            <el-button
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="batchEnd"
            >批量禁用</el-button>
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
        <el-table-column align="center" label="序号" fixed="left">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备编号" fixed="left" width="140px">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备品牌">
          <template slot-scope="scope">
            <span>{{ scope.row.brand }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备类型">
          <template slot-scope="scope">
            <span>{{ getEquipTypeName(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册日期">
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.createTime).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="启用状态">
          <template slot-scope="scope">
            <span>{{ getUseStatusName(scope.row.useStatus) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="设备状态">
          <template slot-scope="scope">
            <span>{{ scope.row.deviceStatus }}</span>
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
              <i v-if="scope.row.useStatus=='00'" class="el-icon-tickets primary table-i" title="查看" @click="handleView(scope.row)" />
              <i v-if="scope.row.useStatus=='01'" class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(scope.row)" />
              <el-switch
                v-model="scope.row.useStatus"
                active-value="00"
                inactive-value="01"
                class="switchStyle"
                style="margin-right: 10px;"
                @change="enable(scope.row)"
              />
              <i v-if="scope.row.useStatus=='01'" class="el-icon-delete danger table-i" title="删除" @click="handleDelete(scope.row)" />
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
              <el-col :md="24" :lg="24">
                <el-form-item label="设备编号" prop="code">
                  <el-input
                    v-model="form.code"
                    class="form-item1"
                    placeholder="请输入设备编号"
                    :disabled="dialogStatus =='view'"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="设备名称" prop="name">
                  <el-input
                    v-model="form.name"
                    class="form-item1"
                    placeholder="请输入设备名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="设备品牌" prop="brand">
                  <el-input
                    v-model="form.brand"
                    class="form-item1"
                    placeholder="请输入设备品牌"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="设备型号" prop="model">
                  <el-input
                    v-model="form.model"
                    class="form-item1"
                    placeholder="请输入设备型号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="设备类型" prop="type">
                  <el-radio-group v-model="form.type" class="form-item1">
                    <el-radio
                      v-for="item in equipList"
                      :key="item.key"
                      :label="item.key"
                    >{{ item.value }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="通信接口" prop="protocolInter">
                  <el-select
                    v-model="form.protocolInterface"
                    class="form-item1"
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
                <el-form-item label="服务器IP" prop="ip">
                  <el-input
                    v-model="form.ip"
                    class="form-item1"
                    placeholder="请输入服务器ip"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="对应端口" prop="port">
                  <el-input
                    v-model="form.port"
                    class="form-item1"
                    placeholder="请输入对应端口号"
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
    <!--地图预览-->
    <el-dialog title="查看" :visible.sync="mapViewVisible" center>
      <div class="map-footer">
        <el-button type="primary" @click="getPickCoord">确定</el-button>
        <el-button @click="closePickMap">取消</el-button>
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
                <el-form-item label="设备编号：">{{ form.code }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备名称：">
                  {{ form.name }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备品牌：">{{ form.brand }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备型号：">{{ form.model }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备类型：">{{ form.type }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="通信接口：">{{ form.protocolInterface }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="服务器ip：">{{ form.ip }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="对应端口：">{{ form.port }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="启用状态：">{{ getUseStatusName(form.useStatus) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备状态：">{{ getdeviceStatusName(form.deviceStatus) }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import RegisterAPI from '@/api/perimeter/register.js'
import { dictBatch } from '@/api/base/dictDetail'

export default {
  name: 'CameraManage',
  components: {
  },
  filters: {
  },
  data() {
    return {
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
      equipStateList: [],
      equipList: [],
      netTypeList: [],
      useStateList: [],
      tableKey: 0,
      list: [],
      total: null,
      listLoading: true,
      checkdetail: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          code: '', // 设备编号
          type: '', // 设备类型
          name: '', // 设备名称
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          deviceStatus: '', // 设备状态
          useStatus: '' // 设备启用状态
        }
      },
      form: {
        code: '',
        type: '',
        name: '',
        model: '',
        brand: '',
        protocolInterface: '',
        port: '',
        ip: '',
        deviceStatus: '', // 设备状态
        useStatus: '' // 设备状态
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
        code: [{ required: true, message: '请填写设备编号', trigger: 'blur' }],
        name: [{ required: true, message: '请填写设备名称', trigger: 'blur' }],
        type: [{ required: true, message: '请填写设备类型', trigger: 'blur' }],
        brand: [{ required: true, message: '请选择设备品牌', trigger: 'blur' }],
        ip: [
          { required: true, message: '请填写ip', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请填写端口', trigger: 'blur' }
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
    console.log(RegisterAPI)
    this.geDictList()
  },
  methods: {
    geDictList() {
      dictBatch(['3036', '3037', '3038', '3039']).then(res => {
        this.equipList = res.data['3036'] // 周界设备类型
        this.useStateList = res.data['3037']
        this.equipStateList = res.data['3038']// 周界设备状态
        this.netTypeList = res.data['3039']// 周界设备通信接口
        this.getList()
      })
    },
    // 多选勾选时触发
    handleSelectionChange(val) {
      this.selectList = val.map(function(item) {
        return item.id
      })
    },
    batchStart() {
      if (this.selectList.length === 0) {
        this.$message.error('请选择有效数据')
        return
      }
      this.$confirm('确认批量启用？').then(() => {
        RegisterAPI.batchStart(this.selectList).then(() => {
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
    batchEnd() {
      if (this.selectList.length === 0) {
        this.$message.error('请选择有效数据')
        return
      }
      this.$confirm('确认批量禁用？').then(() => {
        RegisterAPI.batchEnd(this.selectList).then(() => {
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
      const result = this.equipList.find(item => {
        return item.key === val
      })
      this.form.brand = result.value
    },
    getList() {
      this.listLoading = true
      if (this.registerTime != null) {
        this.listQuery.params.startTime = this.registerTime[0]
        this.listQuery.params.endTime = this.registerTime[1]
      }
      RegisterAPI.page(this.listQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    enable(row) {
      // 启用
      if (this.getUseStatusName(row.useStatus) === '已启用') {
        RegisterAPI.batchStart(row.id).then(() => {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      } else {
        RegisterAPI.batchEnd(row.id).then(() => {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      }
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
        type: '',
        name: '',
        model: '',
        brand: '',
        protocolInterface: '',
        port: '',
        ip: '',
        deviceStatus: '', // 设备状态
        useStatus: '' // 设备状态
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
      this.form.useStatus = '01'// 默认未启用
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          RegisterAPI.create(this.form)
            .then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify.success({
                title: '成功',
                message: '设备注册成功!'
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
      RegisterAPI.detail(row.id).then(res => {
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
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          RegisterAPI.update(this.form).then(() => {
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
        RegisterAPI.del(row.id).then(() => {
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
      RegisterAPI.detail(row.id).then(res => {
        this.form = Object.assign({}, res.data)
      })
    },
    // 获取使用状态
    getUseStatusName(val) {
      const item = this.useStateList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    },
    getdeviceStatusName(val) {
      const item = this.equipStateList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    },
    // 获取设备类型
    getEquipTypeName(val) {
      const item = this.equipList.find(item => item.key === val)
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
    getPickCoord() {
    },
    closePickMap() {
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
    handleLngLatAltChange(val) {
      const geojson = JSON.parse(this.form.lngLatAlt)
      geojson.geometry.coordinates[0] = this.form.longitude
      geojson.geometry.coordinates[0] = this.form.dimension
      geojson.geometry.coordinates[0] = this.form.altitude
      this.form.lngLatAlt = JSON.stringify(geojson)
    },
    handleMap(info) {
      console.log(info)
    }
  }
}
</script>
<style lang="scss" scoped>
.list-query {
  width: 340px;
  margin-right: 22px;
}
.t-col-operate i.table-i{
  margin-right: 0px;
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

