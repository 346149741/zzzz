<template>
  <div>
    <div class="app-container">
      <el-card class="box-card app-body">
        <div slot="header" class="clearfix">
          <span>自主学习</span>
        </div>
        <el-row :gutter="20">
          <el-col v-for="item in list" :span="6" class="item" @click.native="goto(item.name)">
            <el-card class="item-card" :style="{'background-color': item.color}">
              <img :src="item.icon" :alt="item.label">
              <div>{{ item.label }}</div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelfLearning',
  data() {
    return {
      list: [
        { icon: require('./imgs/新闻 (4).png'), color: '#d94343', name: 'SelfLearningPoliticsNews', label: '政治要闻' },
        { icon: require('./imgs/报刊.png'), color: '#d9be43', name: 'SelfLearningElectronicNews', label: '电子报刊' },
        { icon: require('./imgs/图书.png'), color: '#88cc43', name: 'SelfLearningEBook', label: '图书' },
        { icon: require('./imgs/论文.png'), color: '#44c4ad', name: 'SelfLearningAcademicPapers', label: '学术论文' },
        { icon: require('./imgs/广播.png'), color: '#9256b0', name: 'SelfLearningBroadcastNews', label: '新闻广播' },
        { icon: require('./imgs/多媒体.png'), color: '#8343d9', name: 'SelfLearningMediaVoice', label: '多媒体资源' },
        { icon: require('./imgs/音乐 (1).png'), color: '#437ad9', name: 'SelfLearningMusicVoice', label: '音乐之声' }
      ]
    }
  },
  methods: {
    goto(name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  margin-bottom: 20px;
  .item-card{
    &:hover{
      cursor: pointer;
    }
    .iconfont{
      font-size: 30px;
    }
    padding: 20px;
    box-shadow: 12px 10px 2px #eee;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    color: #fff;
  }
}
</style>
