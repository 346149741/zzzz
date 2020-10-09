<template>
  <div>
    <el-dialog
      :title="operateName"
      :visible.sync="dialogVisible"
      :modal="false"
      width="50%"
      :before-close="handleClose"
    >
      <div class="dialogBox">
        <el-row
          :gutter="20"
          style="border-bottom:1px solid #e4e4e4;margin-bottom:30px;margin-top:-16px;"
        >
          <el-col :span="12">
            <h5>基本信息</h5>
          </el-col>
        </el-row>
        <el-form ref="dataForm" :model="formData" label-position="right" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="名称 : ">
                <el-input v-model="formData.pointName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否启用 : ">
                <el-radio-group v-model="formData.enable" size="medium">
                  <el-radio v-for="(item,index) in sfqyList" :key="index" :label="item.key">{{ item.value }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="重要级别 : " prop="level">
                <el-select v-model="formData.grade" placeholder="请选择下拉选择重要级别">
                  <el-option
                    v-for="(item, index) in gradeList"
                    :key="index"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="border-bottom:1px solid #e4e4e4;margin-bottom:30px;">
            <el-col :span="12">
              <h5>设备绑定信息</h5>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-row class="pic">
                <el-image
                  style="width:100px;height:100px;margin:15px;"
                  :src="formData.devicePictureUrl"
                  :preview-src-list="srcList"
                />
              </el-row>
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action
                accept=".jpg, .jpeg, .png, .gif"
                :before-upload="beforeAvatarUpload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-col>
            <el-col :span="10">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="设备名称 : ">
                    <el-input v-model="formData.deviceName" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="bh">
                <el-col :span="24">
                  <el-form-item label="编号 : ">
                    <el-input v-model="formData.deviceId" />
                  </el-form-item>
                </el-col>
                <el-col class="dq" :span="4">
                  <el-button type="primary" size="small">读 取</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="类型 : " prop="level">
                    <el-select
                      v-model="formData.deviceType"
                      placeholder="请选择下拉选择重要级别"
                      style="width:100%"
                    >
                      <el-option
                        v-for="(item, index) in levelOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="厂家 : ">
                    <el-input v-model="formData.deviceFactory" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="型号 : ">
                    <el-input v-model="formData.deviceModel" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="saveFeature">保 存</el-button>
        <el-button type="primary" size="small" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="operateName" :visible.sync="lookVisible" :modal="false" width="40%" :before-close="handlelookClose">
      <div class="dialogBox">
        <el-row :gutter="20" style="border-bottom:1px solid #e4e4e4;margin-bottom:30px;">
          <el-col :span="12">
            <h5>基本信息</h5>
          </el-col>
        </el-row>
        <el-form
          ref="dataForm"
          :model="formData"
          label-position="right"
          label-width="100px"
          style="margin-top:-16px"
        >
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="名称 : ">
                <span v-text="formData.pointName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="是否启用 : ">
                <!-- <el-radio-group v-model="formData.enable" size="medium">
                <el-radio
                  v-for="(item, index) in usingOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                >{{ item.label }}</el-radio>
                </el-radio-group>-->
                <span v-text="formData.enable" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="重要级别 : " prop="level">
                <span v-text="formData.grade" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="border-bottom:1px solid #e4e4e4;margin-bottom:30px;">
            <el-col :span="12">
              <h5 style="margin-top:50px">设备绑定信息</h5>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-row class="pic">
                <el-image
                  style="width:100px;height:100px;margin:15px;"
                  :src="formData.devicePictureUrl"
                  :preview-src-list="srcList"
                />
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="名称 : ">
                    <span v-text="formData.deviceName" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="bh">
                <el-col :span="24">
                  <el-form-item label="编号 : ">
                    <span v-text="formData.deviceId" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="类型 : " prop="level">
                    <!-- <el-select v-model="formData.deviceType" placeholder="请选择下拉选择重要级别" style="width:100%">
                    <el-option
                      v-for="(item, index) in levelOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    />
                    </el-select>-->
                    <span v-text="formData.deviceType" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="厂家 : ">
                    <span v-text="formData.deviceFactory" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="型号 : ">
                    <span v-text="formData.deviceModel" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="saveFeature"  type="primary" size="small">保 存</el-button>
      <el-button @click="dialogVisible = false"  type="primary" size="small">取 消</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>
<script>
import EmpAPI from '@/api/base/employee'
import { addPatrolObj, updatePatrolObj, lookPatrolObj, delPatrolObj, upload } from '@/api/base/patro-pointManage'
import { dictBatch } from '@/api/base/dictDetail'
export default {
  data() {
    return {
      dialogVisible: false,
      lookVisible: false,
      editStatus: true,
      sfqyList: [], // 是否启用字典
      gradeList: [], // 等级字典
      operateName: '添加巡更点信息',
      devicePictureUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // 巡更点图片地址
      formData: {
        enable: '是', // 是否启用
        pointName: '', // 巡更点名称
        grade: '关键', // 等级
        id: '', // 记录ID
        devicePictureUrl: '', // 图片url
        longitude: '', // 经度
        latitude: '', // 纬度
        deviceId: '', // 巡更卡设备id
        deviceName: '', // 巡更卡设备名称
        deviceType: '', // 巡更卡设备类型
        deviceFactory: '', // 巡更卡设备厂家
        deviceModel: '' // 巡更卡设备型号
      },
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      editId: '',
      usingOptions: [
        {
          label: '是',
          value: '是'
        },
        {
          label: '否',
          value: '否'
        }
      ],
      levelOptions: [
      ]
    }
  },
  watch: {},
  created() {
    dictBatch('3023').then(res => {
      this.sfqyList = res.data['3023']
    })
    dictBatch('3024').then(res => {
      this.levelOptions = res.data['3024']
    })
    dictBatch('3025').then(res => {
      console.log(res)
      this.gradeList = res.data['3025']
    })
  },
  mounted() {},
  methods: {
    visibleDialog(val, status, info) {
      this.operateName = '巡更点信息'
      this.dialogVisible = val
      this.editStatus = status
      this.editId = info.id
      this.resetForm(info)
    },
    lookbleDialog(val, bol, info) {
      info.enable = info.enable == '00' ? '是' : '否'
      this.resetForm(info)
      this.operateName = '查看巡更点详情'
      this.lookVisible = val
    },
    handleClose() {
      this.dialogVisible = false
      // 删除未新增完成的点位
      if (this.editId == 'addFeature') {
        this.$parent.removeFeature(this.editId)
      }
    },
    handlelookClose() {
      this.lookVisible = false
    },
    resetForm(info) {
      this.formData = {
        enable: info.enable ? info.enable : '00',
        pointName: info.pointName ? info.pointName : '',
        grade: info.grade ? info.grade : '关键',
        longitude: info.longitude ? parseFloat(info.longitude).toFixed(6) : '',
        latitude: info.latitude ? parseFloat(info.latitude).toFixed(6) : '',
        id: info.id ? info.id : '',
        deviceId: info.deviceId ? info.deviceId : '',
        deviceName: info.deviceName ? info.deviceName : '',
        deviceType: info.deviceType ? info.deviceType : '',
        deviceFactory: info.deviceFactory ? info.deviceFactory : '',
        deviceModel: info.deviceModel ? info.deviceModel : '',
        devicePictureUrl: info.devicePictureUrl ? info.devicePictureUrl : ''
      }
    },
    saveFeature() {
      // 保存数据
      var me = this
      addPatrolObj(this.formData).then((response) => {
        // 预留接口存入数据库,返回唯一值id
        if (me.formData.id === 'addFeature') {
          me.formData.id = response.data.id
        }
        // 更新地图要素属性值
        me.$parent.saveFeature(me.formData, me.editId)
        me.dialogVisible = false
        me.$message.success('保存成功!')
      })
    },
    removeFeature() {
      // 预留接口删除数据库数据

      // 删除地图上要素
      this.$parent.removeFeature(this.editId)
      this.dialogVisible = false
      this.$message.success('删除成功!')
    },

    // 上传图片
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是JPG/PNG/GIF格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过2MB!')
        return
      }
      const formatFile = new FormData()
      formatFile.append('file', file)
      this.devicePictureUrl = ''
      this.formData.devicePictureUrl = ''
      upload(formatFile)
        .then(res => {
          this.devicePictureUrl = res.data[0].filePath
          this.formData.devicePictureUrl = res.data[0].filePath
          this.$message.success('图片上传成功！')
        })
      return false
    }

  }
}
</script>
<style lang="scss" scoped>
.static-label {
  overflow: hidden;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
<style lang="scss">
.el-dialog {
  border-radius: 10px;
}
.el-dialog .el-dialog__header {
  background-color: #1c9399;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.el-dialog .el-dialog__title {
  color: #ffffff;
}
.el-dialog .el-dialog__body {
  padding: 30px;
}
.el-dialog .el-dialog__footer {
  padding: 10px;
  background-color: #f9f9f9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: 1px solid #b7c0c7;
}
.el-dialog__headerbtn .el-dialog__close {
  font-size: 22px;
  color: #ffffff;
}
.dialogBox {
  border: 0;
  padding: 0;
}
.el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 20px 10px;
}
.pic {
  width: 130px;
  height: 130px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  margin-top: 20px;
  cursor: pointer;
}
.el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 100px;
  text-align: center;
  margin-left: 25px;
}
.bh {
  position: relative;
}
.dq {
  position: absolute;
  right: -100px;
  top: 5px;
}
</style>
