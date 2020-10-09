<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>非机动车管理</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="车牌号：" class="filter-item">
            <el-input
              v-model="listQuery.params.code"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入车牌号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="姓名：" class="filter-item">
            <el-input
              v-model="listQuery.params.equipmentName"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入名称"
              @keyup.enter.native="handleFilter"
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
            >新增</el-button>
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
        <el-table-column label="姓名" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getSex(scope.row.sex) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="证件类型">
          <template slot-scope="scope">
            <span>{{ scope.row.certTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="证件号码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.certTypeNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="人员类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.staffType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="非机动车类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.nonMotorType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车辆颜色" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.carColor }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车牌号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.carNo }}</span>
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
            <div class="dialog-item-title">个人信息</div>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="身份证：" prop="a">
                  <el-upload
                    class="nonMotor-uploader"
                    :show-file-list="false"
                    action
                    accept=".jpg, .jpeg, .png"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="dataForm.photoUrlFront" :src="dataForm.photoUrlFront" class="nonMotor-img">
                    <div v-else style="position: relative;">
                      <i class="el-icon-plus nonMotor-img-icon" /><span style="position:absolute;top: 45px;left: 26px;">正面</span>
                    </div>
                  </el-upload>
                  <el-upload
                    class="nonMotor-uploader"
                    :show-file-list="false"
                    action
                    accept=".jpg, .jpeg, .png"
                    :before-upload="beforeAvatarUpload2"
                  >
                    <img v-if="dataForm.photoUrlVerso" :src="dataForm.photoUrlVerso" class="nonMotor-img">
                    <div v-else style="position: relative;">
                      <i class="el-icon-plus nonMotor-img-icon" /><span style="position:absolute;top: 45px;left: 26px;">反面</span>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="人员类型：" prop="staffTypeId">
                  <el-select v-model="dataForm.staffTypeId" class="form-item1" placeholder="请选择人员类型" @change="handleTypeChange">
                    <el-option v-for="item in peopleTypeList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="姓名：" prop="staffId">
                  <el-select v-model="dataForm.staffId" class="form-item1" placeholder="请选择人员" filterable @change="handlePeopleChange">
                    <el-option v-for="item in peopleList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="性别：" prop="sex">
                  <el-select v-model="dataForm.sex" class="form-item1" placeholder="请选择性别">
                    <el-option v-for="item in sexList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="证件类型：" prop="certType">
                  <el-select v-model="dataForm.certType" class="form-item1" placeholder="请选择证件类型">
                    <el-option v-for="item in certificatesList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="证件号码：" prop="certTypeNo">
                  <el-input v-model="dataForm.certTypeNo" class="form-item1" placeholder="请输入证件号码" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="联系电话：" prop="phone">
                  <el-input v-model="dataForm.phone" class="form-item1" placeholder="请输入联系电话" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="工作单位：" prop="unitName">
                  <el-input v-model="dataForm.unitName" class="form-item1" placeholder="请输入工作单位" />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="dialog-item-title">其它信息</div>
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="非机动车类型：" prop="nonMotorTypeId">
                  <el-select v-model="dataForm.nonMotorTypeId" class="form-item1" placeholder="请选择非机动车类型" @change="handleCarTypeChange">
                    <el-option v-for="item in carList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车身颜色：" prop="carColorId">
                  <el-select v-model="dataForm.carColorId" class="form-item1" placeholder="请选择车身颜色" @change="handleColorChange">
                    <el-option v-for="item in colorList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="内部通行证：" prop="internalPass">
                  <el-input v-model="dataForm.internalPass" class="form-item1" placeholder="请输入内部通行证" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车牌号：" prop="carNo">
                  <el-input v-model="dataForm.carNo" class="form-item1" placeholder="请输入车牌号" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="可通行区域：" prop="trafficArea">
                  <el-cascader
                    ref="area"
                    v-model="dataForm.trafficArea"
                    class="form-item1"
                    :options="areaList"
                    :props="{ multiple: true, expandTrigger: 'hover', label: 'areaName', value: 'id' }"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="规定停放区域：" prop="stipulateStopArea">
                  <el-cascader
                    ref="area"
                    v-model="dataForm.stipulateStopArea"
                    class="form-item1"
                    :options="areaList"
                    :props="{ multiple: true, expandTrigger: 'hover', label: 'areaName', value: 'id' }"
                    clearable
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
        <div class="dialog-item-title">个人信息</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="身份证：" class="unborder">
                  <img src="/upload/test/car/sfz.png" class="nonMotor-img">
                  <img src="/upload/test/car/sfz1.png" class="nonMotor-img">
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="人员类型：">{{ dataForm.staffType }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="姓名：">{{ dataForm.name }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="性别：">{{ dataForm.sex }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="证件类型：">{{ dataForm.certTypeName }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="证件号码：">{{ dataForm.certTypeNo }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="联系电话：">{{ dataForm.phone }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="工作单位：">{{ dataForm.unitName }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">其它信息</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="非机动车类型：">{{ dataForm.nonMotorType }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车身颜色：">{{ dataForm.carColor }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="内部通行证：">{{ dataForm.internalPass }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车牌号：">{{ dataForm.carNo }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="可通行区域：">{{ dataForm.trafficArea }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="规定停放区域：">{{ dataForm.stipulateStopArea }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NonMotorAPI from '@/api/door/nonMotor'
import { dictBatch } from '@/api/base/dictDetail'
import { registertree } from '@/api/base/region'
import { delchildren } from '@/utils/index'
import employeeApi from '@/api/base/employee'
import familyApi from '@/api/base/family'
export default {
  name: 'Index',
  data() {
    return {
      sexList: [],
      certificatesList: [],
      peopleList: [],
      peopleTypeList: [],
      carList: [],
      colorList: [],
      areaList: [],
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
        staffTypeId: '',
        staffType: '',
        staffId: '',
        name: '',
        sex: '',
        certType: '',
        certTypeName: '',
        certTypeNo: '',
        phone: '',
        nonMotorTypeId: '',
        nonMotorType: '',
        carColorId: '',
        carColor: '',
        internalPass: '',
        carNo: '',
        trafficArea: '',
        stipulateStopArea: '',
        photoUrlFront: '',
        photoUrlVerso: ''
      },
      rules: {
        staffTypeId: [{ required: true, message: '请选择人员类型', trigger: 'change' }],
        staffId: [{ required: true, message: '请选择人员', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        nonMotorTypeId: [{ required: true, message: '请选择非机动车类型', trigger: 'change' }],
        internalPass: [{ required: true, message: '请输入内部通行证', trigger: 'blur' }]
      },
      checkdetail: false
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      dictBatch(['1001', '3033', '3034', '3035', '1008', '3003', '3033']).then(res => {
        this.sexList = res.data['1001']
        this.certificatesList = res.data['3033']
        this.carList = res.data['3034']
        this.colorList = res.data['3035']
        this.getList()
      })
      registertree().then(res => {
        this.areaList = delchildren(res.data)
      })
      this.peopleTypeList = [{ key: '01', value: '内部人员' }, { key: '02', value: '家属' }, { key: '03', value: '职工' }]
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      NonMotorAPI.page(this.listQuery).then(res => {
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
      this.dialogForm.title = '新增非机动车'
      this.dialogForm.type = 'add'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dataForm.stipulateStopArea = JSON.stringify(this.dataForm.stipulateStopArea)
          this.dataForm.trafficArea = JSON.stringify(this.dataForm.trafficArea)
          NonMotorAPI.create(this.dataForm).then(() => {
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
      this.dialogForm.title = '编辑非机动车'
      this.dialogForm.type = 'edit'
      NonMotorAPI.detail(info.id).then(res => {
        res.data.stipulateStopArea = JSON.parse(res.data.stipulateStopArea)
        res.data.trafficArea = JSON.parse(res.data.trafficArea)
        this.dataForm = Object.assign({}, res.data)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dataForm.stipulateStopArea = JSON.stringify(this.dataForm.stipulateStopArea)
          this.dataForm.trafficArea = JSON.stringify(this.dataForm.trafficArea)
          NonMotorAPI.create(this.dataForm).then(() => {
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
      NonMotorAPI.detail(info.id).then(res => {
        res.data.stipulateStopArea = this.getAreaName(JSON.parse(res.data.stipulateStopArea))
        res.data.trafficArea = this.getAreaName(JSON.parse(res.data.trafficArea))
        this.dataForm = Object.assign({}, res.data)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    handleDelete(info) {
      this.$confirm('确认删除' + info.name + '？').then(() => {
        NonMotorAPI.del(info.id).then(() => {
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
        staffTypeId: '',
        staffType: '',
        staffId: '',
        name: '',
        sex: '',
        certType: '',
        certTypeName: '',
        certTypeNo: '',
        phone: '',
        nonMotorTypeId: '',
        nonMotorType: '',
        carColorId: '',
        carColor: '',
        internalPass: '',
        carNo: '',
        trafficArea: '',
        stipulateStopArea: '',
        photoUrlFront: '',
        photoUrlVerso: ''
      }
    },
    handleTypeChange(val) {
      if (val === '01') { // 内部人员
        employeeApi.getAllpeoples().then(res => {
          this.peopleList = res.data
        })
      } else if (val === '02') { // 家属
        familyApi.getAll().then(res => {
          this.peopleList = res.data
        })
      } else if (val === '03') { // 职工
        employeeApi.getAllworkers().then(res => {
          this.peopleList = res.data
        })
      }
      const info = this.peopleTypeList.find(item => {
        return item.key === val
      })
      this.dataForm.staffType = info.value
    },
    handlePeopleChange(val) {
      const info = this.peopleList.find(item => {
        return item.id === val
      })
      this.dataForm.sex = info.sex
      this.dataForm.certType = info.certType
      this.dataForm.certTypeName = info.certTypeName
      this.dataForm.certTypeNo = info.certTypeNo
      this.dataForm.name = info.name
    },
    handleCarTypeChange(val) {
      const result = this.carList.find(item => {
        return item.key === val
      })
      this.dataForm.nonMotorType = result.value
    },
    handleColorChange(val) {
      const result = this.colorList.find(item => {
        return item.key === val
      })
      this.dataForm.carColor = result.value
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传身份证照片只能是JPG/PNG格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传身份证照片大小不能超过2MB!')
        return
      }
      const formatFile = new FormData()
      formatFile.append('file', file)
      this.dataForm.photoUrlFront = ''
      NonMotorAPI.upload(formatFile)
        .then(res => {
          this.dataForm.photoUrlFront = res.data[0].filePath
          this.$forceUpdate()
          this.$message.success('身份证照片上传成功！')
        })
      return false
    },
    beforeAvatarUpload2(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传身份证照片只能是JPG/PNG格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传身份证照片大小不能超过2MB!')
        return
      }
      const formatFile = new FormData()
      formatFile.append('file', file)
      this.dataForm.photoUrlVerso = ''
      NonMotorAPI.upload(formatFile)
        .then(res => {
          this.dataForm.photoUrlVerso = res.data[0].filePath
          this.$forceUpdate()
          this.$message.success('身份证照片上传成功！')
        })
      return false
    },
    getAreaName(list) {
      if (list.length <= 0) {
        return ''
      }
      const res = []
      list.forEach(a => {
        const iarr = this.getArea(this.areaList, a)
        res.push(iarr)
      })
      return res.toString()
    },
    getArea(areaList, idList) {
      let res = ''
      areaList.forEach(item => {
        if (idList.indexOf(item.id) >= 0) {
          res = item.areaName
          if (item.children) {
            idList.shift()
            res += '/' + this.getArea(item.children, idList)
          }
        }
      })
      return res
    },
    getSex(val) {
      const result = this.sexList.find(item => {
        return item.key === val
      })
      return result ? result.value : ''
    }
  }
}
</script>

<style scoped>
  .nonMotor-uploader{
    display: inline;
  }
  .nonMotor-img-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .nonMotor-img {
    width: 78px;
    height: 78px;
    display: inline-block;
  }
</style>
<style>
  .nonMotor-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 78px;
    height: 78px;
  }
  .nonMotor-uploader .el-upload:hover {
    border-color: #409EFF;
  }
</style>
