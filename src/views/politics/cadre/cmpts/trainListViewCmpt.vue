<template>
  <div class="detail-form">
    <div v-for="item in list">
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="item" label-position="right" label-width="120px">
            <el-row>
              <el-col :span="4">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                >
                  <img :src="item.a" class="avatar">
                </el-upload>
                <div style="text-align: center;line-height: 50px"> 证书相关照片</div>
              </el-col>
              <el-col :span="20">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="开始时间：">
                      {{ item.b }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="结束时间：">
                      {{ item.c }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="培训机构：">
                      {{ item.d }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="获得证书：">
                      {{ item.e }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="证书证号：">
                      {{ item.f }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="证明人：">
                      {{ item.g }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="证明人电话：">
                      {{ item.h }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInfoCmpt',
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {
      formList: [{}]
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
