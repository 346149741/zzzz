<template>
  <div style="padding-left: 10px;padding-right: 20px;">
    <el-form ref="secondForm" :rules="secondRules" :model="secondForm" label-position="right" label-width="60px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="secondForm.name" />
      </el-form-item>
      <el-form-item label="序号" prop="sort">
        <el-input-number v-model="secondForm.sort" :min="0" :max="9999" :precision="0" />
      </el-form-item>
      <el-form-item label="图例" prop="url">
        <el-upload
          class="image-uploader"
          :show-file-list="false"
          action
          accept=".jpg, .jpeg, .png"
          :before-upload="beforeAvatarUpload"
          v-loading="loading"
        >
          <img v-if="secondForm.url" :src="secondForm.url" class="uploader-img">
          <i v-else class="el-icon-plus uploader-icon" />
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import LendAPI from '@/api/base/lend'
export default {
  name: 'SecondImg',
  props: ['popData'],
  data() {
    return {
      secondForm: {
        name: '',
        sort: '',
        url: '',
        legendFlag: '1',
        legendGroup: '1',
        legendDisplay: { fill: '', image: '', stroke: { lineDash: [], color: '', width: 0 }, model: '' },
        legendType: ''
      },
      secondRules: {
        name: [{ required: true, message: '请填写图例名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请填写图例排序', trigger: 'blur' }],
        url: [{ required: true, message: '请上传图例', trigger: 'change' }]
      },
      loading: false
    }
  },
  watch: {
    'popData.visible'(val) {
      if (val) {
        this.$refs['secondForm'].resetFields()
      }
    }
  },
  methods: {
    saveData() {
      this.$refs['secondForm'].validate(valid => {
        if (valid) {
          const data = this.secondForm
          data.legendDisplay.image = data.url
          data.legendType = this.popData.legendType
          LendAPI.add(data).then(res => {
            this.$message.success('添加成功', 2000)
            this.$emit('getList', '1')
            this.popData.visible = false
          })
        }
      })
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是JPG/PNG/JPEG格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传图例大小不能超过2MB!')
        return
      }
      const formatFile = new FormData()
      formatFile.append('file', file)
      console.log(file)
      this.loading = true
      LendAPI.upload(formatFile).then(res => {
        const that = this
        res.data.forEach(function(item, index) {
          that.secondForm.url = item.filePath
        })
        this.loading = false
      })
      return false
    }
  }
}
</script>

<style scoped>
.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.uploader-img {
  display: block;
  width: 60px;
  height: 60px;
}
</style>
<style>
.image-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
