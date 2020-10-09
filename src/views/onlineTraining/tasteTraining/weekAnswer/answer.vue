<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <div class="header-title"><span style="cursor:pointer;" @click="goback">返回</span><span>每周答题</span><span /></div>
      </div>
      <div v-if="flag">
        <div class="title">单选题</div>

        <div v-if="step===0">
          <div class="title-main">
            对“一国两制”构想解释正确的是
          </div>
          <el-radio-group v-model="radio" class="blk">
            <el-radio :label="3">接纳了英国“主权与政治分开”的提议</el-radio>
            <el-radio :label="6">给予特别行政区包括外交和国防在内的自治权</el-radio>
            <el-radio :label="9">在外交问题上采取了更加灵活的策略</el-radio>
            <el-radio :label="12">大陆实行社会主义，港澳台地区实行资本主义</el-radio>
          </el-radio-group>
          <el-button type="primary" class="btnsd" @click="handleNext">下一题</el-button>
        </div>

        <div v-if="step===1">
          <div class="title-main">
            2022年冬奥会将在北京及张家口举行，据测算，冬奥会筹备期间，基础建设支出也将拉动京津冀地区的GDP，在体育、文化、旅游休闲等产业创造方面可提供60万个就业机会。这体现的哲学道理是：
          </div>
          <el-radio-group v-model="radio" class="blk">
            <el-radio :label="3">世界是一个普遍联系的有机整体</el-radio>
            <el-radio :label="6">任何事物都是个性和共性的统一</el-radio>
            <el-radio :label="9">事物发展是前进性和曲折性的统一</el-radio>
            <el-radio :label="12">人们能正确的认识和改造世界</el-radio>
          </el-radio-group>
          <el-button type="primary" class="btnsd" @click="handleSubmit">提交</el-button>
        </div>

        <div class="asdf">
          <el-popover
            placement="top-start"
            title="提示"
            width="400"
            trigger="hover"
            content="2020年2月1日出版的第三期《求是》杂志发表习近平总书记的重要文章 《在敦煌研究院座谈时的讲话》，文章指出，敦煌文化是世界现存规模最大、延续时间最长、内容最丰富、保存最完整的艺术宝库，是世界文明长河中一颗璀璨的明珠，也是研究我国古代各民族政治、经济、军事、文化、艺术的珍贵史料。"
          >
            <span slot="reference">查看提示</span>
          </el-popover>
        </div>
      </div>
      <div v-else>
        <div style="margin-bottom: 30px;">
          <div class="title">单选题</div>
          <div class="title-main">
            对“一国两制”构想解释正确的是
          </div>
          <el-radio-group value="3" class="blk">
            <el-radio :label="3">接纳了英国“主权与政治分开”的提议</el-radio>
            <el-radio :label="6">给予特别行政区包括外交和国防在内的自治权</el-radio>
            <el-radio :label="9">在外交问题上采取了更加灵活的策略</el-radio>
            <el-radio :label="12" class="right">大陆实行社会主义，港澳台地区实行资本主义</el-radio>
          </el-radio-group>
          <div class="asdf">
            <div slot="reference">答案解析</div>
            <hr>
            <div style="color: #000;">
              <div style="font-size: 24px;font-weight: 800;margin: 16px 0px">正确答案：D</div>
              解析：B项错误，注意：特别行政区实行高度自治，依照法律的规定享有立法权、行政管理权、独立的司法权和终审权，但不享有国家主权，没有外交和国防方面的权力，也不是一个独立的政治实体;D项正确，“一国两制”指“一个国家，两种制度”，该政策是邓小平为实现中国统一的目的而提出的方针，指的是在中华人民共和国境内，大陆实行社会主义制度，台湾、香港和澳门实行资本主义制度。故本题答案为D。
            </div>
          </div>
        </div>

        <div class="title">单选题</div>
        <div class="title-main">
          2022年冬奥会将在北京及张家口举行，据测算，冬奥会筹备期间，基础建设支出也将拉动京津冀地区的GDP，在体育、文化、旅游休闲等产业创造方面可提供60万个就业机会。这体现的哲学道理是：
        </div>
        <el-radio-group value="3" class="blk">
          <el-radio :label="3" class="right">世界是一个普遍联系的有机整体</el-radio>
          <el-radio :label="6">任何事物都是个性和共性的统一</el-radio>
          <el-radio :label="9" class="wrong">事物发展是前进性和曲折性的统一</el-radio>
          <el-radio :label="12">人们能正确的认识和改造世界</el-radio>
        </el-radio-group>
        <div class="asdf">
          <div slot="reference">答案解析</div>
          <hr>
          <div style="color: #000;">
            <div style="font-size: 24px;font-weight: 800;margin: 16px 0px">正确答案：A</div>
            2022年北京冬奥会的举办会拉动京津冀地区的GDP，同时会拉动各产业的发展，体现了联系的普遍性，说明世界是一个普遍联系的有机整体。故本题答案为A。
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      radio: '',
      flag: true,
      step: 0
    }
  },
  created() {},
  methods: {
    goback() {
      this.$router.go(-1)
    },
    handleNext() {
      this.step++
    },
    handleSubmit() {
      this.flag = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-title {
    display: flex;
    justify-content: space-between;
  }

  .title {
    border-left: 4px solid #3B89F1;
    padding-left: 10px;
    font-size: 24px;
    color: #3B89F1;
    line-height: 50px
  }

  .title-main {
    font-size: 22px;
    margin: 30px 10px;
  }

  .blk {
    display: block;
    margin-left: 20px;

    /deep/ .el-radio {
      display: block !important;
      line-height: 40px;
      &.wrong{
        background-color: rgba(249, 230, 229, 1);
        .el-radio__label{
          color: #EE0C0C;
        }
      }
      &.right{
        background-color: #e7f9ee;
        .el-radio__label{
          color: #18D567;
        }
      }

      .el-radio__label {
        font-size: 20px;
      }
    }
  }

  .btnsd {
    margin: 20px;
  }
  .asdf{
    margin-top: 20px;
    padding: 10px;
    color: #169BD5;
    background-color: #ccc;
    border-radius: 4px;
  }
</style>
