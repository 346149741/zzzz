<template>
  <div>
    <div>
      <el-button size="medium" type="primary" @click="handleAdd">添加</el-button>
    </div>
    <div v-for="item in formList">
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
                  <img v-if="item.url" :src="item.url" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
                <div style="text-align: center;line-height: 50px"> 证彰照片</div>
              </el-col>
              <el-col :span="20">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="表彰日期：">
                      <el-date-picker
                        v-model="item.a"
                        class="form-item1"
                        type="date"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="表彰单位：">
                      <el-date-picker
                        v-model="item.b"
                        class="form-item1"
                        type="date"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="表彰名称：">
                      <el-input v-model="item.c" class="form-item1" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="表彰原因：">
                      <el-input v-model="item.d" class="form-item1" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="表彰地点：">
                      <el-input v-model="item.e" class="form-item1" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="证明人部门：">
                      <el-input v-model="item.f" class="form-item1" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="证明人：">
                      <el-input v-model="item.g" class="form-item1" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="相关材料上传：" prop="mark">
                      <i class="el-icon-upload2 icon-txt" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-button type="primary" round size="mini" class="item-del" @click="delItem">删除</el-button>
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

  .icon-txt{
    font-size: 20px;
    cursor: pointer;
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
