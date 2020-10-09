<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <div class="header-title"><span style="cursor:pointer;" @click="goback">返回</span><span>每日答题</span><span /></div>
      </div>
      <div v-if="flag">
        <div class="title">单选题</div>
        <div class="title-main">
          1991年12月15日，我国自主设计、自主建造、自主运营、自主管理的___成功实现并网发电，实现了中国大陆核电“零”的突破，被誉为“国之光荣”。
        </div>
        <el-radio-group v-model="radio" class="blk">
          <el-radio :label="3">大亚湾核电站</el-radio>
          <el-radio :label="6">连云港核电站</el-radio>
          <el-radio :label="9">三门核电站</el-radio>
          <el-radio :label="12">秦山核电站</el-radio>
        </el-radio-group>
        <el-button type="primary" class="btnsd" @click="handelOK">提交</el-button>
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
        <div class="title">单选题</div>
        <div class="title-main">
          1991年12月15日，我国自主设计、自主建造、自主运营、自主管理的___成功实现并网发电，实现了中国大陆核电“零”的突破，被誉为“国之光荣”。
        </div>
        <el-radio-group value="3" class="blk">
          <el-radio :label="3" class="wrong">大亚湾核电站</el-radio>
          <el-radio :label="6">连云港核电站</el-radio>
          <el-radio :label="9">三门核电站</el-radio>
          <el-radio :label="12" class="right">秦山核电站</el-radio>
        </el-radio-group>
        <div class="asdf">
          <div slot="reference">答案解析</div>
          <hr>
          <div style="color: #000;">
            <div style="font-size: 24px;font-weight: 800;margin: 16px 0px">正确答案：D</div>
            2020年2月1日出版的第三期《求是》杂志发表习近平总书记的重要文章 《在敦煌研究院座谈时的讲话》，文章指出，敦煌文化是世界现存规模最大、延续时间最长、内容最丰富、保存最完整的艺术宝库，是世界文明长河中一颗璀璨的明珠，也是研究我国古代各民族政治、经济、军事、文化、艺术的珍贵史料。</div>
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
      flag: true
    }
  },
  created() {},
  methods: {
    goback() {
      this.$router.go(-1)
    },
    handelOK() {
      this.$message.success('回答错误！')
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
