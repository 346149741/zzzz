<template>
  <div style="padding-left: 10px;padding-right: 20px;">
    <el-form ref="thirdForm" :rules="thirdRules" :model="thirdForm" label-position="right" label-width="90px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="thirdForm.name" />
      </el-form-item>
      <el-form-item label="序号" prop="sort">
        <el-input-number v-model="thirdForm.sort" :min="0" :max="9999" :precision="0" />
      </el-form-item>
      <el-form-item label="三维模型" prop="mudourl">
        <el-input class="mode-upload" v-model="thirdForm.mudourl">
          <el-upload
            slot="append"
            v-loading="loading"
            :show-file-list="false"
            action
            accept=".glb, .gltf"
            :before-upload="beforeModoUpload"
          >
            <i class="el-icon-plus uploader-modo" />
          </el-upload>
        </el-input>
      </el-form-item>
      <el-form-item label="缩略图" prop="url">
        <el-upload
          v-loading="loading"
          class="image-uploader"
          :show-file-list="false"
          action
          accept=".jpg, .jpeg, .png"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="thirdForm.url" :src="thirdForm.url" class="uploader-img">
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
      thirdForm: {
        name: '',
        sort: '',
        url: '',
        mudourl: '',
        legendFlag: '1',
        legendGroup: '2',
        legendDisplay: { fill: '', image: '', stroke: { lineDash: [], color: '', width: 0 }, model: '' },
        legendType: ''
      },
      thirdRules: {
        name: [{ required: true, message: '请填写图例名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请填写图例排序', trigger: 'blur' }],
        url: [{ required: true, message: '请上传缩略图', trigger: 'change' }],
        mudourl: [{ required: true, message: '请上传模型', trigger: 'change' }]
      },
      loading: false
    }
  },
  watch: {
    'popData.visible'(val) {
      if (val) {
        this.$refs['thirdForm'].resetFields()
      }
    }
  },
  methods: {
    saveData() {
      this.$refs['thirdForm'].validate(valid => {
        if (valid) {
          const data = this.thirdForm
          data.legendDisplay.image = data.url
          data.legendDisplay.model = data.mudourl
          data.legendType = this.popData.legendType
          LendAPI.add(data).then(res => {
            this.$message.success('添加成功', 2000)
            this.$emit('getList', '2')
            this.popData.visible = false
          })
        }
      })
    },
    beforeAvatarUpload(file) {
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
      this.loading = true
      LendAPI.upload(formatFile).then(res => {
        const that = this
        res.data.forEach(function(item, index) {
          that.thirdForm.url = item.filePath
        })
        this.loading = false
      })
      return false
    },
    beforeModoUpload(file) {
      const fileName = file.name.toLowerCase()
      const isMODO =
        fileName.indexOf('.glb') >= 0 ||
        fileName.indexOf('.gltf') >= 0
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isMODO) {
        this.$message.error('上传图片只能是glb/gltf格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传模型大小不能超过2MB!')
        return
      }
      const formatFile = new FormData()
      formatFile.append('file', file)
      this.loading = true
      LendAPI.upload(formatFile).then(res => {
        const that = this
        res.data.forEach(function(item, index) {
          that.thirdForm.mudourl = item.filePath
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
  .uploader-modo {
    font-size: 28px;
    color: #8c939d;
    width: 30px;
    height: 30px;
    line-height: 30px;
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
  .mode-upload .el-input-group__append {
    padding: 0px 5px;
  }
</style>
