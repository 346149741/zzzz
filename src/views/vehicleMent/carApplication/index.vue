<template>
  <div class="app-container">
    <el-card class="app-body" style="width:60%">
      <!--操作按钮-->
      <div class="filter-container">
        <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
          <h4 class="title">用车人员信息</h4>
          <el-row>
            <el-col :span="12">
              <el-row>
                <el-col :span="8">
                  <el-row>
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      style="border:1px solid #e4e4e4;width:120px;"
                    >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                  </el-row>
                </el-col>
                <el-col :span="10">
                  <el-row>
                    <el-form-item label="姓名: " class="filter-item">{{ lookForm.username }}</el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="部门: " class="filter-item">{{ lookForm.unit }}</el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="兵领: " class="filter-item">{{ lookForm.bl }}</el-form-item>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-form-item label="性别: " class="filter-item">{{ lookForm.sex }}</el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="年龄: " class="filter-item">{{ lookForm.nl }}</el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="职位: " class="filter-item">{{ lookForm.zw }}</el-form-item>
              </el-row>
            </el-col>

          </el-row>
          <h4 class="title">用车信息</h4>
          <el-row>
            <el-col :span="8">
              <el-form-item label="用车申请: " class="filter-item">0个</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button class="un-primary-btn" type="primary" @click="dialogForm.visible = true">添 加</el-button>
            </el-col>
          </el-row>
          <h4 class="title">用车进度查看</h4>
          <el-row>
            暂无信息
          </el-row>
        </el-form>
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
        <div class="dialog-item-title">人员信息</div>
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <el-row>
                      <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        style="border:1px solid #e4e4e4;width:120px;"
                      >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" />
                      </el-upload>
                    </el-row>
                  </el-col>
                  <el-col :span="10">
                    <el-row>
                      <el-form-item label="姓名: " class="filter-item">{{ lookForm.username }}</el-form-item>
                    </el-row>
                    <el-row>
                      <el-form-item label="部门: " class="filter-item">{{ lookForm.unit }}</el-form-item>
                    </el-row>
                    <el-row>
                      <el-form-item label="兵领: " class="filter-item">{{ lookForm.bl }}</el-form-item>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-form-item label="性别: " class="filter-item">{{ lookForm.sex }}</el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="年龄: " class="filter-item">{{ lookForm.nl }}</el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="职位: " class="filter-item">{{ lookForm.zw }}</el-form-item>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">其它信息</div>
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="开始时间" prop="startTime">
                  <el-date-picker
                    v-model="dataForm.startTime"
                    style="width:100%"
                    type="datetime"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="结束时间" prop="endTime">
                  <el-date-picker
                    v-model="dataForm.endTime"
                    type="datetime"
                    style="width:100%"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆类型" prop="carType">
                  <el-select
                    v-model="dataForm.carType"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                  >
                    <el-option
                      v-for="(item,key) in kfList"
                      :key="key"
                      :label="item.value"
                      :value="item.label"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="目的地" prop="mdd">
                  <el-input
                    v-model="dataForm.mdd"
                    type="text"
                    prefix-icon="el-icon-search"
                    class="filter-item"
                    placeholder="请输入目的地"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="乘车人数" prop="num">
                  <el-input
                    v-model="dataForm.num"
                    type="text"
                    prefix-icon="el-icon-search"
                    class="filter-item"
                    placeholder="请输入乘车人数"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="办公电话">
                  <el-input
                    v-model="dataForm.dh"
                    type="text"
                    prefix-icon="el-icon-search"
                    class="filter-item"
                    placeholder="请输入乘车人数"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="手机号码" prop="ipont">
                  <el-input
                    v-model="dataForm.ipont"
                    type="text"
                    prefix-icon="el-icon-search"
                    class="filter-item"
                    placeholder="请输入手机号码"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="用车类型 : " class="filter-item" prop="yclx">
                  <el-select
                    v-model="dataForm.yclx"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      label="接待用车"
                      value="1"
                    />
                    <el-option
                      label="管理用车"
                      value="2"
                    />
                    <el-option
                      label="采购用车"
                      value="3"
                    />
                    <el-option
                      label="保养用车"
                      value="3"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="dialogForm.visible = false">取 消</el-button>
        <el-button type="primary" @click="updateData">提交</el-button>
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
        <div class="dialog-item-title">车辆信息</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="车牌号：">{{ dataForm.carNo }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆类型：">{{ dataForm.carType }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆用途：">{{ dataForm.carUse }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="品牌型号：">{{ dataForm.brandModel }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车身颜色：">{{ dataForm.carColor }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆识别号：">{{ dataForm.carKey }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发动机号：">{{ dataForm.engineNo }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">其它信息</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆专属：">{{ dataForm.carExclusive }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="领导人：">{{ dataForm.leader }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="单位部门：">{{ dataForm.unitName }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="规定停放区域：">{{ dataForm.stipulateStopArea }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="可通行区域：">{{ dataForm.trafficArea }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CarAPI from '@/api/door/car'
import { dictBatch } from '@/api/base/dictDetail'
import { registertree } from '@/api/base/region'
import { getAllOrg } from '@/api/base/organ'
import { delchildren } from '@/utils/index'
export default {
  name: 'Index',
  data() {
    return {
      typeList: [],
      useList: [],
      colorList: [],
      areaList: [],
      departList: [],
      departArr: [],
      belongList: [],
      tableData: [],
      bmList: [
        {
          value: '档案处',
          label: '0'
        }, {
          value: '后勤处',
          label: '1'
        }, {
          value: '作训处',
          label: '2'
        }, {
          value: '采购处',
          label: '3'
        }],
      total: null,
      imageUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2263980775,326422779&fm=26&gp=0.jpg',
      listLoading: true,
      lookForm: {
        sex: '男',
        username: '张晓鹏',
        bl: '3年',
        nl: '35岁',
        unit: '采购部',
        zw: '班长'
      },
      carList: [{
        value: 'HY12345',
        label: '0'
      }, {
        value: 'XY26453',
        label: '1'
      }, {
        value: 'NK32142',
        label: '2'
      }, {
        value: 'HO15632',
        label: '3'
      }],
      kfList: [
        {
          value: '小轿车',
          label: '0'
        }, {
          value: '商务车',
          label: '1'
        }, {
          value: 'SUV',
          label: '2'
        }, {
          value: '面包车',
          label: '3'
        }, {
          value: '大巴车',
          label: '4'
        }],
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
        carNo: '',
        carTypeId: '',
        carType: '',
        carUseId: '',
        carUse: '',
        brandModel: '',
        carColorId: '',
        carColor: '',
        carKey: '',
        engineNo: '',
        carExclusiveId: '',
        carExclusive: '',
        leader: '',
        unitId: '',
        unitName: '',
        stipulateStopArea: '',
        trafficArea: ''
      },
      rules: {
        startTime: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
        endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
        carType: [{ required: true, message: '请选择车辆类型', trigger: 'change' }],
        mdd: [{ required: true, message: '请输入目的地', trigger: 'blur' }],
        num: [{ required: true, message: '请输入乘车人数', trigger: 'blur' }],
        yclx: [{ required: true, message: '请输入用车类型', trigger: 'blur' }],
        leader: [{ required: true, message: '请输入领导人', trigger: 'blur' }],
        unitId: [{ required: true, message: '请选择单位', trigger: 'blur' }]
      },
      checkdetail: false
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      dictBatch(['3019', '3046', '3035', '3047']).then(res => {
        this.typeList = res.data['3019']
        this.useList = res.data['3046']
        this.colorList = res.data['3035']
        this.belongList = res.data['3047']
        this.getList()
      })
      getAllOrg().then(res => {
        this.departArr = res.data
        this.departList = this.toTree(res.data)
      })
      registertree().then(res => {
        this.areaList = delchildren(res.data)
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
      this.dialogForm.title = '新增固定车'
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
          CarAPI.create(this.dataForm).then(() => {
            this.dialogForm.visible = false
            this.getList()
            this.$notify.success({
              title: '成功',
              message: '固定车注册成功!'
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
      CarAPI.detail(info.id).then(res => {
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
          this.$notify.success({
            title: '成功',
            message: '编辑成功!'
          })
          this.dialogForm.visible = false
          // this.dataForm.stipulateStopArea = JSON.stringify(this.dataForm.stipulateStopArea)
          // this.dataForm.trafficArea = JSON.stringify(this.dataForm.trafficArea)
          // CarAPI.create(this.dataForm).then(() => {
          //   this.dialogForm.visible = false
          //   this.getList()
          //   this.$notify.success({
          //     title: '成功',
          //     message: '编辑成功!'
          //   })
          // })
        }
      })
    },
    handleView(info) {
      this.checkdetail = true
      CarAPI.detail(info.id).then(res => {
        res.data.stipulateStopArea = this.getAreaName(JSON.parse(res.data.stipulateStopArea))
        res.data.trafficArea = this.getAreaName(JSON.parse(res.data.trafficArea))
        this.dataForm = Object.assign({}, res.data)
      })
    },
    handleDelete(info) {
      this.$confirm('确认删除' + info.carNo + '？').then(() => {
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
        carNo: '',
        carTypeId: '',
        carType: '',
        carUseId: '',
        carUse: '',
        brandModel: '',
        carColorId: '',
        carColor: '',
        carKey: '',
        engineNo: '',
        carExclusiveId: '',
        carExclusive: '',
        leader: '',
        unitId: '',
        unitName: '',
        stipulateStopArea: '',
        trafficArea: ''
      }
    },
    handleTypeChange(val) {
      const result = this.typeList.find(item => {
        return item.key === val
      })
      this.dataForm.carType = result.value
    },
    handleUseChange(val) {
      const result = this.useList.find(item => {
        return item.key === val
      })
      this.dataForm.carUse = result.value
    },
    handleColorChange(val) {
      const result = this.colorList.find(item => {
        return item.key === val
      })
      this.dataForm.carColor = result.value
    },
    handleBelongChange(val) {
      const result = this.belongList.find(item => {
        return item.key === val
      })
      this.dataForm.carExclusive = result.value
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
      CarAPI.upload(formatFile).then(res => {
      })
      return false
    },
    toTree(data) {
      const result = []
      if (!Array.isArray(data)) {
        return result
      }
      data.forEach(item => {
        delete item.children
      })
      const map = {}
      data.forEach(item => {
        map[item.id] = item
      })
      data.forEach(item => {
        const parent = map[item.pid]
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          result.push(item)
        }
      })
      return result
    },
    cascaderRadioClick(info) {
      this.dataForm.unitId = info.value
      this.dataForm.unitName = info.label
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
    }
  }
}
</script>

<style scoped>
.avatar-uploader{
  margin:18px 30px 0 50px;
}
.avatar-uploader .el-upload--text {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 120px;
    display: block;
    margin: 0 0 0 10px;
  }
  .title{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #e4e4e4;
    margin: 0 0 50px 0;
  }
</style>
