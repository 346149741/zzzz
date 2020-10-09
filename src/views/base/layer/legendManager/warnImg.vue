<template>
  <div style="padding-left: 10px;padding-right: 20px;">
    <el-form ref="warnForm" :rules="warnRules" :model="warnForm" label-position="right" label-width="60px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="warnForm.name" />
      </el-form-item>
      <el-form-item label="序号" prop="sort">
        <el-input-number v-model="warnForm.sort" :min="0" :max="9999" :precision="0" />
      </el-form-item>
      <el-form-item label="图例" prop="url">
        <span class="uploaders" v-for="(item, index) in imgList" :key="index">
          <el-upload
            v-loading="loading"
            class="image-uploader"
            :show-file-list="false"
            action
            accept=".jpg, .jpeg, .png"
            :before-upload="((val) => {beforeAvatarUpload(val, index)})"
          >
            <img v-if="item.image" :src="item.image" class="uploader-img">
            <i v-else class="el-icon-plus uploader-icon" />
          </el-upload>
          <div class="type-name">{{ typeList[index].value }}</div>
        </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import LendAPI from '@/api/base/lend'
import { dictCode } from '@/api/base/dictDetail'
export default {
  name: 'SecondImg',
  props: ['popData'],
  data() {
    return {
      warnForm: {
        name: '',
        sort: '',
        url: '',
        legendFlag: '1',
        legendGroup: '3',
        legendDisplay: {},
        legendType: ''
      },
      warnRules: {
        name: [{ required: true, message: '请填写图例名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请填写图例排序', trigger: 'blur' }],
        url: [{ required: true, message: '请上传图例', trigger: 'blur' }]
      },
      imgList: [],
      typeList: [],
      loading: false
    }
  },
  watch: {
    'popData.visible'(val) {
      if (val) {
        this.$refs['warnForm'].resetFields()
        this.geDictList()
      }
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      this.imgList = []
      dictCode('2018').then(res => {
        this.typeList = res.data
        this.typeList.forEach(item => {
          const a = { fill: '', image: '', stroke: { lineDash: [], color: '', width: 0 }, model: '' }
          this.imgList.push(a)
        })
        console.log(this.typeList)
      })
    },
    saveData() {
      // 判断预警图例组是否都已经上传图片
      let flag = true
      this.imgList.forEach((item, index) => {
        if (item.image === '') {
          flag = false
        }
      })
      if (flag) {
        this.warnForm.url = 'aaa'
      } else {
        this.warnForm.url = ''
      }
      this.$refs['warnForm'].validate(valid => {
        if (valid) {
          const data = this.warnForm
          data.legendDisplay = {}
          this.typeList.forEach((item, index) => {
            data.legendDisplay[item.key] = this.imgList[index]
          })
          data.legendType = this.popData.legendType
          LendAPI.add(data).then(res => {
            this.$message.success('添加成功', 2000)
            this.$emit('getList', '3')
            this.popData.visible = false
          })
        }
      })
    },
    beforeAvatarUpload(file, index) {
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
        let imgurl = ''
        res.data.forEach(function(item, index) {
          imgurl = item.filePath
        })
        this.imgList[index].image = imgurl
        this.loading = false
      })
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.uploader-img {
  width: 60px;
  height: 60px;
}
.uploaders {
  position: relative;
  display: inline-block;
  margin: 0 10px 0 10px;
  height: auto;
  width: auto;
  .type-name {
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
  }
}
.image-uploader {
  display: inline-block;
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
