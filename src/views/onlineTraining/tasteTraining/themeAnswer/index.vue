<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <div class="header-title"><span style="cursor:pointer;" @click="goback">返回</span><span>专项答题</span><span /></div>
      </div>
      <el-row :gutter="20">
        <el-col v-for="(item,index) in list" :key="index" :span="6" class="item">
          <el-card class="item-card">
            <div class="title">{{ item.name }}</div>
            <div style="margin-top: 10px;">{{ item.time }}</div>
            <el-button type="primary" class="aaa" @click="handleGoDetail">开始答题</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      list: [
        { name: '“学习贯彻中央全面深化改革委员会第十五次会议精神”专项答题', time: '2020-06-12' },
        { name: '“习近平有关抗战胜利的重要讲话”专项答题', time: '2020-06-22' },
        { name: '“2020年国家网络安全宣传周”专项答题', time: '2020-06-14' },
        { name: '“全国抗击新冠肺炎疫情表彰大会”专项答题', time: '' },
        { name: '“庆祝教师节”专项答题', time: '2020-08-12' },
        { name: '“中华慈善日”专项答题', time: '2020-09-22' }
      ]
    }
  },
  mounted() {
  },
  methods: {
    handleGoDetail() {
      this.$router.push({ name: 'tasteTrainingthemeAnswerDetail' })
    },
    goback() {
      this.$router.go(-1)
    },
    randomScore() {
      const res = this.$_.random(0, 4)
      return res > 0 ? `+${res}积分` : ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-title {
    display: flex;
    justify-content: space-between;
  }
  .item{
    margin-bottom: 20px;
  }
  .item-card{
    position: relative;
    height: 200px;
    .aaa{
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }

  .title {
    font-size: 20px;
  }

</style>
