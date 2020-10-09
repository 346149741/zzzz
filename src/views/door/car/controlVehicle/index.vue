<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>布控车辆登记</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="车牌号：" class="filter-item">
            <el-input
              v-model="listQuery.params.carNo"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入标识号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="布控类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.deployTypeId"
              placeholder="请选择"
              clearable
              class="filter-item mr10"
              @change="handleFilter"
            >
              <el-option
                v-for="item in controlTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间：" class="filter-item">
            <el-date-picker
              v-model="listQuery.params.date"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @blur="handleFilter"
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
            <el-upload
              style="display: inline-block;"
              :show-file-list="false"
              action
              accept=".xlsx, .xls"
              :before-upload="beforeExcelUpload"
            >
              <el-button
                v-waves
                class="filter-item btn-base"
                type="primary"
                icon="mr10 iconfont iconxinzengh"
              >信息导入</el-button>
            </el-upload>
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
        <el-table-column label="车牌号" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.carNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车辆类型" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.carType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="布控类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.deployType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌型号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.brandModel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="驾驶人" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.driver }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="证件类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.certTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="机动车驾驶证" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.driversLicense }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.createTime).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          fixed="right"
          class-name="small-padding fixed-width"
          width="80px"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(scope.row)" />
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
    <!--详情查看-->
    <el-dialog
      class="abow_dialog detail-form"
      title="查看"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">布控信息</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="布控类型：">{{ dataForm.deployType }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="布控地点：">{{ dataForm.areaId }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">车辆信息</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="抓拍图片：" class="unborder"><img class="temporary-img" :src="dataForm.img"></el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车牌号：">{{ dataForm.carNo }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆类型：">{{ dataForm.carType }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="品牌型号：">{{ dataForm.brandModel }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车身颜色：">{{ dataForm.e }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆识别号：">{{ dataForm.f }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发动机号：">{{ dataForm.g }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">驾驶人信息</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="人像：" class="unborder"><img class="temporary-img" :src="dataForm.photoUrl"></el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="身份证：" class="unborder">
                  <img class="temporary-img" :src="dataForm.photoUrlFront">
                  <img class="temporary-img" style="margin-left: 24px;" :src="dataForm.photoUrlVerso">
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="驾驶人：">{{ dataForm.driver }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="性别：">{{ dataForm.sex }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="手机号：">{{ dataForm.phone }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="机动车驾驶证：">{{ dataForm.driversLicense }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="证件类型：">{{ dataForm.certTypeName }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="证件号码：">{{ dataForm.certTypeNo }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import controlVehicleAPI from '@/api/door/controlVehicle'
import { dictBatch } from '@/api/base/dictDetail'
export default {
  name: 'Index',
  data() {
    return {
      controlTypeList: [],
      typeList: [],
      useList: [],
      colorList: [],
      areaList: [],
      departList: [],
      sexList: [],
      tableData: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          carNo: '',
          deployTypeId: '',
          date: null,
          startTime: '',
          endTime: ''
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
        n: ''
      },
      rules: {
        a: [{ required: true, message: '请输入车牌号', trigger: 'blur' }],
        b: [{ required: true, message: '请选择车辆类型', trigger: 'blur' }],
        d: [{ required: true, message: '请输入品牌型号', trigger: 'blur' }],
        f: [{ required: true, message: '请输入车辆识别号', trigger: 'blur' }],
        g: [{ required: true, message: '请输入发动机号', trigger: 'blur' }],
        h: [{ required: true, message: '请选择车辆专属', trigger: 'blur' }],
        i: [{ required: true, message: '请输入领导人', trigger: 'blur' }],
        j: [{ required: true, message: '请选择单位', trigger: 'blur' }]
      },
      checkdetail: false
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      dictBatch(['3019', '3035', '1001', '3059']).then(res => {
        this.typeList = res.data['3019']
        this.colorList = res.data['3035']
        this.sexList = res.data['1001']
        this.controlTypeList = res.data['3059']
        this.getList()
      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      if (this.listQuery.params.date) {
        this.listQuery.params.startTime = this.listQuery.params.date[0]
        this.listQuery.params.endTime = this.listQuery.params.date[1]
      } else {
        this.listQuery.params.startTime = ''
        this.listQuery.params.endTime = ''
      }
      this.getList()
    },
    getList() {
      controlVehicleAPI.page(this.listQuery).then(res => {
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
      this.dialogForm.title = '新增固定车'
      this.dialogForm.type = 'add'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dataForm.equipmentType = JSON.stringify(this.dataForm.equipmentTypeArr)
          controlVehicleAPI.create(this.dataForm).then(() => {
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
      this.dialogForm.title = '编辑固定车'
      this.dialogForm.type = 'edit'
      controlVehicleAPI.detail(info.id).then(res => {
        this.dataForm = Object.assign({}, info)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dataForm.equipmentType = JSON.stringify(this.dataForm.equipmentTypeArr)
          controlVehicleAPI.create(this.dataForm).then(() => {
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
      controlVehicleAPI.detail(info.id).then(res => {
        this.dataForm = Object.assign({}, info)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    handleDelete(info) {
      this.$confirm('确认删除' + info.name + '？').then(() => {
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
        carBrakeRemark: ''
      }
    },
    handelMapView() {
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
      console.log(formatFile)
      controlVehicleAPI.upload(formatFile).then(res => {
      })
      return false
    }
  }
}
</script>

<style scoped>
  .temporary-img{
    width: 78px;
    height: 78px;
    display: inline-block;
  }
</style>
