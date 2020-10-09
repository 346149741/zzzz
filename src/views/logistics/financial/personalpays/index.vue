<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>个人工资</span>
      </div>
      <div class="box-container">
        <el-row>
          <div class="title-big">十月份工资确认单</div>
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
                    <el-form-item label="工资发放年月：" prop="name">
                      <span class="pay-title"> 2020-10</span>
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
                      411326198807060208
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
                      科长
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :lg="12">
                    <el-form-item label="军衔：" prop="company">
                      中尉
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>

            <div class="sub-title">
              <div class="dialog-item-title">工资构成</div>
              <div class="dialog-item-title">综合应得薪酬统计:9946.45</div>
            </div>
            <div class="dialog-item">
              <el-row class="boder1">
                <el-col :span="4" class="item boder1">基本工资:4500</el-col>
                <el-col :span="4" class="item boder1">职务工资:1500</el-col>
                <el-col :span="4" class="item boder1">军衔工资:400</el-col>
                <el-col :span="4" class="item boder1">军龄工资:600</el-col>
                <el-col :span="4" class="item boder1">军人职业津贴:600</el-col>
                <el-col :span="4" class="item boder1">福利津贴:600</el-col>
                <el-col :span="4" class="item boder1">防暑降温:0</el-col>
                <el-col :span="4" class="item boder1">工勤费:0</el-col>
                <el-col :span="4" class="item boder1">离休干部荣誉:0</el-col>
                <el-col :span="4" class="item boder1">独生子女奖励:50</el-col>
                <el-col :span="4" class="item boder1">子女保教补助费:0</el-col>
                <el-col :span="4" class="item boder1">夫妻分居生活补助费:400</el-col>
                <el-col :span="4" class="item boder1">政府特殊津贴:500</el-col>
                <el-col :span="4" class="item boder1">绩效奖励:200</el-col>
              </el-row>
            </div>
            <div class="sub-title">
              <div class="dialog-item-title">住房补贴</div>
              <div class="dialog-item-title">补贴合计:878.30</div>
            </div>
            <div class="dialog-item">
              <el-row class="boder1">
                <el-col :span="3" class="item boder1">住房补贴系数:4.94％</el-col>
                <el-col :span="3" class="item boder1">个人基本工资:4500</el-col>
                <el-col :span="3" class="item boder1">服役年限:5(年)</el-col>
                <el-col :span="3" class="item boder1">职级补贴面积:32(m²)</el-col>
                <el-col :span="3" class="item boder1">其他津贴:200(元)</el-col>
                <el-col :span="9" class="item boder1">总计:4500*4.94%+1*200+32*8+200</el-col>
              </el-row>
            </div>
            <div class="sub-title">
              <div class="dialog-item-title">扣款详情</div>
              <div class="dialog-item-title">扣款合计:281.85</div>
            </div>
            <div class="dialog-item">
              <el-row class="boder1">
                <el-col :span="3" class="item boder1">代扣党费：120</el-col>
                <el-col :span="3" class="item boder1">代缴个税:156.85(元)</el-col>
                <el-col :span="3" class="item boder1">监察罚款：0</el-col>
                <el-col :span="3" class="item boder1">处罚扣款：0</el-col>
                <el-col :span="3" class="item boder1">代扣理发：5</el-col>
              </el-row>
            </div>
          </div>
        </el-row>
      </div>
      <div class="footer-submit">
        <el-button type="primary" @click="handleSubmit">确认无异议</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PersonalPays',
  data() {
    return {
      ruleForm: {}
    }
  },
  methods: {
    handleSubmit() {
      this.$message.success('工资确认成功，即将到账!')
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

    .pay-title {
      font-size: 16px;
      font-weight: 600;
    }
    .sub-title{
      display: flex;
      justify-content: space-between;
      padding-right: 48px;
    }
  }
  .date-table{
    tr{
      display: flex;
    }
  }
  .footer-submit{
    margin-top: 20px;
    text-align: center;
  }
</style>
