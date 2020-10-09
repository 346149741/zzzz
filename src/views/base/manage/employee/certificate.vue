<template>
  <div class="certificate-container">
    <div class="content-title">人员基本信息</div>
    <div style="padding-top: 24px;">
      <el-form ref="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="工号">{{ popData.data.employeeNo }}</el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="姓名">{{ popData.data.employeeName }}</el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="性别">{{ popData.data.genderName }}</el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="身份证号">{{ popData.data.idNumber }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="content-title" style="margin-top: 0;">人员证件信息</div>
    <div>
      <el-row :gutter="20">
        <el-col v-for="(item,index) in dataList" :key="item.id" :span="12" class="card-col">
          <div @dblclick="getData(item,index)">
            <el-card class="box-card" :class="idx===index?'line':''">
              <div slot="header" class="clearfix">
                <span>{{ item.certificateTypeName }}</span>
                <img
                  v-if="nowDate <= item.validPeriod"
                  src="@/assets/certificate/success.png"
                  class="statusImg"
                >
                <img v-else src="@/assets/certificate/error.png" class="statusImg">
              </div>
              <div class="cardContent">
                <el-row :gutter="20">
                  <el-col :span="12" style="margin-top: 8px;">
                    <span>证书编号：</span>
                    {{ item.certificateNumber }}
                  </el-col>
                  <el-col :span="12" style="margin-top: 8px;">
                    <span>发证日期：</span>
                    {{ $moment(item.lssuingDate).format('YYYY-MM-DD') }}
                  </el-col>
                  <el-col :span="24" style="margin-top: 8px;">
                    <span>有效期至：</span>
                    {{ $moment(item.validPeriod).format('YYYY-MM-DD') }}
                  </el-col>
                  <el-col :span="24" style="margin-top: 8px;">
                    <span>发证机构：</span>
                    {{ item.lssuingOrganiz }}
                  </el-col>
                </el-row>
              </div>
              <img src="@/assets/certificate/photo.png" class="cardImg">
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="content-title" style="margin-top:20px">证件详情</div>
    <div
      style="position: relative;margin-top: 24px;padding-bottom:24px;border-bottom: 1px solid #EEF1F8;"
    >
      <el-form ref="cerform" :rules="cerrules" :model="cerform" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="证件类型" prop="certificateTypeCode">
              <el-select
                v-model="cerform.certificateTypeCode"
                placeholder="请选择学历"
                @change="typeChange"
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
          <el-col :span="8">
            <el-form-item label="证书编号" prop="certificateNumber">
              <el-input v-model="cerform.certificateNumber" placeholder="请输入证书编号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发证日期" prop="lssuingDate">
              <el-date-picker
                v-model="cerform.lssuingDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择发证日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有效期至" prop="validPeriod">
              <el-date-picker
                v-model="cerform.validPeriod"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择有效期至"
              />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="发证机构" prop="lssuingOrganiz">
              <el-input v-model="cerform.lssuingOrganiz" placeholder="请输入发证机构" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="content-title2">
      证件附件
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        action
        accept=".jpg, .jpeg, .png, .gif"
        :before-upload="beforeAvatarUpload"
      >
        <el-button style="float: right;right: 0;" type="primary" :loading="popData.btnLoading">上传附件</el-button>
      </el-upload>
    </div>
    <div>
      <el-table v-loading="tableLoading" :data="fileData" style="width: 100%" max-height="250">
        <el-table-column fixed prop="serialNumber" label="序号" width="60" />
        <el-table-column prop="fileName" label="文件名称" />
        <el-table-column prop="fileType" label="附件类型" />
        <el-table-column prop="createUser" label="上传人" />
        <el-table-column prop="createTime" label="上传日期" width="150" />
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="previewRow(scope.$index, scope.row)"
            >预览</el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import EmpAPI from '@/api/base/employee'
import { dictCode } from '@/api/base/dictDetail'

export default {
  props: ['popData'],
  data() {
    const maxdate = (rule, value, callback) => {
      const date1 = new Date(value)
      const date2 = new Date(this.cerform.validPeriod)
      if (date2 < date1) {
        callback(new Error('有效日期必须大于发证日期'))
      } else {
        callback()
      }
    }
    const mindate = (rule, value, callback) => {
      const date1 = new Date(value)
      const date2 = new Date(this.cerform.lssuingDate)
      if (date2 > date1) {
        callback(new Error('有效日期必须大于发证日期'))
      } else {
        callback()
      }
    }
    return {
      typeList: [],
      cerform: {
        certificateName: '',
        certificateNumber: '',
        certificateTypeCode: '',
        certificateTypeName: '',
        employId: '',
        lssuingDate: '',
        lssuingOrganiz: '',
        validPeriod: '',
        id: ''
      },
      cerrules: {
        certificateTypeCode: [
          {
            required: true,
            message: '请选择证件类型',
            trigger: 'blur'
          }
        ],
        certificateNumber: [
          {
            required: true,
            message: '请填写证件编号',
            trigger: 'blur'
          }
        ],
        lssuingDate: [
          {
            required: true,
            message: '请选择发证日期',
            trigger: 'blur'
          },
          {
            validator: maxdate,
            trigger: 'blur'
          }
        ],
        validPeriod: [
          {
            required: true,
            message: '请选择有效期至',
            trigger: 'blur'
          },
          {
            validator: mindate,
            trigger: 'blur'
          }
        ],
        lssuingOrganiz: [
          {
            required: true,
            message: '请请输入发证机构',
            trigger: 'blur'
          }
        ]
      },
      fileData: [],
      operateStatus: 0, // 0 添加，1 修改
      dataList: [],
      nowDate: this.$moment(new Date()).format('YYYY-MM-DD'),
      tableLoading: false,
      idx: ''
    }
  },
  watch: {
    'popData.visible'(value) {
      if (value) {
        this.getDataList()
      } else {
        this.resetData()
      }
    }
  },
  mounted() {
    this.geDictList()
    this.getDataList()
  },
  methods: {
    geDictList() {
      dictCode('2022').then(res => {
        this.typeList = res.data
      })
    },
    previewRow(index, item) {
      console.log(item)
    },
    deleteRow(index, row) {
      this.fileData = this.fileData.filter(item => item.id !== row.id)
    },
    changeAdd() {
      this.operateStatus = 0
      this.$refs['cerform'].resetFields()
    },
    submitData() {
      if (this.operateStatus === 0) {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    saveData() {
      this.$refs['cerform'].validate(valid => {
        if (valid) {
          this.popData.btnLoading = true
          this.cerform.employId = this.popData.data.id
          const mydata = {
            certificate: this.cerform,
            annexFiles: this.fileData
          }
          console.log(mydata)
          EmpAPI.saveCertificate(mydata).then(() => {
            this.$notify.success({
              title: '成功',
              message: '证书添加成功!'
            })
            this.getDataList()
            this.popData.btnLoading = false
            this.resetData()
          })
        }
      })
    },
    updateData() {
      this.$refs['cerform'].validate(valid => {
        if (valid) {
          this.popData.btnLoading = true
          this.cerform.employId = this.popData.data.id
          const mydata = {
            certificate: this.cerform,
            annexFiles: this.fileData
          }
          console.log(mydata)
          EmpAPI.updateCertificate(mydata).then(() => {
            this.$notify.success({
              title: '成功',
              message: '证书修改成功!'
            })
            this.getDataList()
            this.popData.btnLoading = false
            this.resetData()
          })
        }
      })
    },
    getDataList() {
      this.popData.btnLoading = true
      EmpAPI.getCertificateList(this.popData.data.id).then(response => {
        console.log(response)
        this.dataList = response.data
        this.popData.btnLoading = false
      })
    },
    getData(item, index) {
      console.log(index)
      this.idx = index
      this.operateStatus = 1
      this.popData.btnLoading = true
      this.tableLoading = true
      this.cerform.certificateNumber = item.certificateNumber
      this.cerform.certificateTypeCode = item.certificateTypeCode
      this.cerform.certificateTypeName = item.certificateTypeName
      this.cerform.lssuingDate = item.lssuingDate
      this.cerform.lssuingOrganiz = item.lssuingOrganiz
      this.cerform.validPeriod = item.validPeriod
      this.cerform.id = item.id
      EmpAPI.getCertificate(item.id).then(response => {
        this.fileData = response.data.annexFiles
        this.popData.btnLoading = false
        this.tableLoading = false
      })
    },
    deleteData() {
      if (this.cerform.id === '') {
        this.$message.warning('请选择证书', 2000)
        return
      }
      this.popData.btnLoading = true
      this.tableLoading = true
      EmpAPI.deleteCertificate(this.cerform.id).then(response => {
        this.$notify.success({
          title: '成功',
          message: '证书删除成功!'
        })
        this.popData.btnLoading = false
        this.tableLoading = false
        this.getDataList()
        this.resetData()
      })
    },
    typeChange(val) {
      const cell = this.typeList.find(item => {
        return item.key === val
      })
      this.cerform.certificateTypeName = cell.value
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是JPG/PNG/GIF格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过2MB!')
        return
      }
      var formatFile = new FormData()
      formatFile.append('file', file)
      console.log(file)
      this.popData.btnLoading = true
      this.tableLoading = true
      EmpAPI.upload(formatFile).then(res => {
        console.log(res)
        const that = this
        res.data.forEach(function(item, index) {
          const it = {
            serialNumber: that.fileData.length + index + 1,
            fileName: item.fileName,
            fileType: item.fileType,
            filePath: item.filePath
          }
          that.fileData.push(it)
        })
        this.popData.btnLoading = false
        this.tableLoading = false
      })
      return false
    },
    resetData() {
      this.fileData = []
      this.operateStatus = 0
      this.$refs['cerform'].resetFields()
    }
  }
}
</script>

<style scoped>
.line{
  border:1px solid #377ECE;
}
.certificate-container {
  background-color: #ffffff;
}

.content-title2 {
  position: relative;
  width: 100%;
  height: 32px;
  line-height: 32px;
  font-size: 18px;
  color: #606266;
  margin-top: 24px;
  text-indent: 1em;
}
.avatar-uploader {
  position: absolute;
  right: 0;
  top: -8px;
}
.card-col {
  margin-top: 24px;
  position: relative;
}
.box-card {
  background-color: #ecf6fd;
  width: 360px;
  cursor: pointer;
}
.clearfix {
  text-align: center;
  color: #18467b;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
}
.cardImg {
  position: absolute;
  top:111px;
  left: 266px;
  width: 59px;
  height: 56px;
  z-index: 1;
}
</style>

<style lang="scss">
.cardContent{
  padding-bottom: 20px;
}
.certificate-container {
  .el-card {
    .statusImg {
      height: 59px;
      width: 77px;
      position: absolute;
      left: 298px;
      top: 133px;
      z-index: 2;
    }
  }
}
</style>
