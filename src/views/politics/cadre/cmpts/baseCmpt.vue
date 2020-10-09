<template>
  <div class="detail-form">
    <el-form :model="form" label-position="right" label-width="120px">
      <el-row>
        <el-col :span="4">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
          >
            <img v-if="form.url" :src="form.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-col>
        <el-col :span="20">
          <el-row :gutter="20">
            <el-col :md="24" :lg="12">
              <el-form-item label="人员编号：" prop="name">
                <span>{{ form.a }}</span>
                <i class="el-input__icon el-input_txt txt-choose">选择</i>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="姓名：" prop="name">
                {{ form.b }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="性别：" prop="sex">
                {{ form.c }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="出生年月：" prop="certificates">
                {{ form.d }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="民族：" prop="certificateNo">
                {{ form.e }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="籍贯：" prop="company">
                {{ form.f }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item class="form-item1" label="政治面貌：" prop="phone">
                {{ form.g }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="婚姻状况：" prop="birthday">
                {{ form.h }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="文化程度：" prop="educationDate">
                {{ form.i }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="健康状况：" prop="educationDate">
                {{ form.j }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="入伍时间：" prop="educationDate">
                {{ form.k }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="所属部门：" prop="educationDate">
                {{ form.l }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="职务：" prop="educationDate">
                {{ form.m }}
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="军衔：" prop="educationDate">
                {{ form.n }}
              </el-form-item>
            </el-col> <el-col :md="24" :lg="12">
              <el-form-item label="军官证号：" prop="educationDate">
                {{ form.o }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BaseInfoCmpt',
  props: {
    form: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-uploader
  ,.avatar{
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

  .txt-choose {
    width: 35px;
    float: right;
    line-height: 39px;
  }

</style>
