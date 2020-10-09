<template>
  <div class="detail-form">
    <div v-for="item in list">
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="item" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="开始时间：">
                  {{ item.a }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间：">
                  {{ item.b }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门：">
                  {{ item.c }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职务：">
                  {{ item.d }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="军衔：">
                  {{ item.e }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="离开原因：">
                  {{ item.f }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证明人部门：">
                  {{ item.g }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证明人：">
                  {{ item.h }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="主要工作：" prop="mark">
                  {{ item.i }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="相关材料：" prop="mark" class="none-border">
                  <i class="el-icon-download icon-txt" />
                </el-form-item>
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
    }
  },
  methods: {

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
    border: 1px solid #eee;
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
