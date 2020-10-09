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
                  <img v-if="item.a" :src="item.a" class="avatar">
                </el-upload>
                <div style="text-align: center;line-height: 50px"> 证件相关照片</div>
              </el-col>
              <el-col :span="20">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="家庭关系：">
                      {{ item.b }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="性别：">
                      {{ item.c }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="姓名：">
                      {{ item.d }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="籍贯：">
                      {{ item.e }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="民族：">
                      {{ item.f }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="文化程度：">
                      {{ item.g }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="政治面貌：">
                      {{ item.h }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="工作单位：">
                      {{ item.i }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="身份证号：">
                      {{ item.j }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="证明人：">
                      {{ item.k }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系电话：">
                      {{ item.l }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="有无犯罪记录：">
                      {{ item.m }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="证明人电话：">
                      {{ item.n }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="相关材料：" prop="mark" class="none-border">
                      <i class="el-icon-download icon-txt" />
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
  .none-border{
    /deep/ .el-form-item__content{
      border: none;
    }
  }
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
