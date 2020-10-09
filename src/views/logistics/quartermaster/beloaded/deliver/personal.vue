<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>申领清单</span>
      </div>
      <div class="box-container">
        <el-row>
          <div class="title-big">2020年夏季被服待领清单</div>
          <div class="dialog-content">
            <div class="dialog-item-title">人员信息</div>
            <div class="dialog-item">
              <el-form ref="ruleForm" label-width="120px">
                <el-row :gutter="20">
                  <el-col :md="24" :lg="12">
                    <el-form-item label="姓名：" prop="name">
                      刘海柱
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :lg="12">
                    <el-form-item label="性别：" prop="sex">
                      男
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :lg="12">
                    <el-form-item label="编号：" prop="certificateNo">
                      20001-001
                    </el-form-item>
                  </el-col><el-col :md="24" :lg="12">
                    <el-form-item label="身份证件号码：" prop="certificateNo">
                      42658475254752459
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :lg="12">
                    <el-form-item label="所在部门：" prop="company">
                      总装后勤部
                    </el-form-item>
                  </el-col><el-col :md="24" :lg="12">
                    <el-form-item label="状态：" prop="company">
                      在职
                    </el-form-item>
                  </el-col><el-col :md="24" :lg="12">
                    <el-form-item label="发放单位：" prop="company">
                      后勤集团
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :lg="12">
                    <el-form-item label="职务：" prop="company">
                      干部
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :lg="12">
                    <el-form-item label="军衔：" prop="company">
                      少尉
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>

            <div v-if="step===0">
              <div class="sub-title">
                <div class="dialog-item-title">待领详情</div>
              </div>
              <div class="dialog-item">
                <table class="data-table">
                  <tr>
                    <td>夏凉帽:1顶 <span class="icon iconfont iconzhengchang" /></td>
                    <td>衬衣(男):3套<span class="icon iconfont iconzhengchang" /></td>
                    <td>作训鞋(男):2双<span class="icon iconfont iconzhengchang" /></td>
                    <td>作战鞋(男):2双<span class="icon iconfont iconzhengchang" /></td>
                  </tr>
                  <tr>
                    <td>肩章:3套<span class="icon iconfont iconzhengchang" /></td>
                    <td>手套:2双<span class="icon iconfont iconzhengchang" /></td>
                    <td>袜子:6双<span class="icon iconfont iconzhengchang" /></td>
                  </tr>
                  <tr>
                    <td>凉席:1尺<span class="icon iconfont iconzhengchang" /></td>
                    <td>蚊帐:1个<span class="icon iconfont iconzhengchang" /></td>
                  </tr>
                </table>
              </div>
            </div>
            <div v-else>
              <div class="sub-title">
                <div class="dialog-item-title">合体度统计</div>
              </div>
              <div class="dialog-item">
                <table class="data-table">
                  <tr>
                    <td>夏凉帽<el-rate v-model="ruleForm.a" class="rate" /></td>
                    <td>衬衣(男)<el-rate v-model="ruleForm.b" class="rate" /></td>
                    <td>作训鞋(男)<el-rate v-model="ruleForm.c" class="rate" /></td>
                    <td>作战鞋(男)<el-rate v-model="ruleForm.d" class="rate" /></td>
                  </tr>
                  <tr>
                    <td>肩章:3套<el-rate v-model="ruleForm.e" class="rate" /></td>
                    <td>手套:2双<el-rate v-model="ruleForm.f" class="rate" /></td>
                    <td>袜子:6双<el-rate v-model="ruleForm.g" class="rate" /></td>
                  </tr>
                  <tr>
                    <td>凉席:1尺<el-rate v-model="ruleForm.h" class="rate" /></td>
                    <td>蚊帐:1个<el-rate v-model="ruleForm.i" class="rate" /></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </el-row>
      </div>
      <div class="footer-submit">
        <el-button type="primary" @click="handleSubmit">{{ step===0?'下一步':'提交' }}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PersonalPays',
  data() {
    return {
      ruleForm: {},
      step: 0
    }
  },
  methods: {
    handleSubmit() {
      this.step = 1
    }
  }
}
</script>

<style lang="scss" scoped>
  .boder1{
    border: 1px solid gray;
  }
  .box-container {
    border: 1px solid gray;
    border-radius: 6px;
    padding: 10px;

    .title-big {
      text-align: center;
      font-size: 20px;
      font-weight: 800;
    }

    .sub-title{
      display: flex;
      justify-content: space-between;
      padding-right: 48px;
    }
  }
  .data-table{
    border: 1px solid #eee;
    width: 100%;
    padding: 10px;
    border-spacing: 0;
    border-collapse: collapse;
    td {
      border: 1px solid #eee;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;

      .icon {
        color: #36A9E1;
        font-weight: 800;
        float: right;
        margin-right: 10px;
      }
      .rate{
        isplay: inline-block;
        float: right;
        line-height: 50px;
      }
    }
  }
  .footer-submit{
    margin-top: 20px;
    text-align: center;
  }
</style>
