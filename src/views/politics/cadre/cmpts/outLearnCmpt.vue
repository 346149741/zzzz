<template>
  <div>
    <div class="dialog-content">
      <div class="dialog-item">
        <el-form :model="formItem" label-position="right" label-width="120px">
          <el-row>
            <el-col :span="4">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
              >
                <img v-if="formItem.url" :src="formItem.url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <div style="text-align: center;line-height: 50px"> 领取通知单上传</div>
            </el-col>
            <el-col :span="20">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="开始日期：">
                    <el-date-picker
                      v-model="formItem.a"
                      class="form-item1"
                      type="date"
                      placeholder="选择日期"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="预计结束时间：">
                    <el-date-picker
                      v-model="formItem.b"
                      class="form-item1"
                      type="date"
                      placeholder="选择日期"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学校：">
                    <el-input v-model="formItem.c" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="专业：">
                    <el-input v-model="formItem.d" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="地点：">
                    <el-input v-model="formItem.e" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否离岗：">
                    <el-select v-model="formItem.f" class="form-item1">
                      <el-option label="是" value="1" />
                      <el-option label="否" value="2" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="相关材料上传：" prop="mark">
                    <i class="el-icon-upload2 icon-txt" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="备注：">
                    <el-input
                      v-model="formItem.carBrakeRemark"
                      class="form-item1"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OutLearnCmptVue',
  props: {
    form: {
      type: Object
    }
  },
  data() {
    return {
      formList: [{}],
      formItem: {}
    }
  },
  methods: {
    handleAdd() {
      this.formList.push({})
    },
    delItem() {
      this.formList.pop()
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-uploader {
    display: block;
    width: 150px;
    height: 150px;
    text-align: center;
    line-height: 150px;
    font-size: 40px;
    border: 1px solid #eee;
    border-radius: 10px;
    margin: 10px auto 0;
  }

  .dialog-content {
    position: relative;
    border: 1px dashed #eee;
    margin: 10px;
    border-radius: 4px;
    padding-bottom: 20px;

    .item-del {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
