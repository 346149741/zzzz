<template>
  <div>
    <div class="app-container">
      <el-card class="box-card app-body">
        <div slot="header" class="clearfix">
          <div class="header-title" style="display: flex;justify-content: space-between"><span style="cursor:pointer;" @click="$router.go(-1)">返回</span><span>新闻广播</span><span /></div>
        </div>
        <div class="recent">
          <span>最近收听：{{ list[active]['title'] }}</span>
          <i :class="['iconfont',play?'el-icon-video-play':'el-icon-video-pause']" @click="play=!play" />
        </div>
        <el-row :gutter="20">
          <el-col v-for="(item,index) in list" :key="index" :span="6" class="item">
            <el-card class="item-card">
              <div style="text-align: center" @click="handeOpen(index)">
                <el-image
                  v-if="item.img"
                  class="image"
                  :src="item.img"
                  fit="contain"
                />
              </div>
              <h3 class="title" :class="{'focus-item':active===index}">{{ item.title }}</h3>
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
      play: true,
      active: '0',
      list: [
        { img: require('./imgs/图层-99.png'), title: '经典音乐广播' },
        { img: require('./imgs/图层-100.png'), title: '中国之声' },
        { img: require('./imgs/图层-101.png'), title: '中华之声' },
        { img: require('./imgs/图层-102.png'), title: '神州之声' },
        { img: require('./imgs/图层-106.png'), title: '经济之声' },
        { img: require('./imgs/图层-108.png'), title: '音乐之声' }
      ]
    }
  },
  methods: {
    handeOpen(index) {
      this.active = index
      this.play = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .recent {
    line-height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #eee;
    border-radius: 4px;
    margin-bottom: 10px;
    font-size: 18px;
    color: #169bd5;
    .iconfont{
      & :hover{
        color: #169bd5;
      }
      cursor: pointer;
      font-size: 34px;
      line-height: 80px;
    }
  }

  .item {
    margin-bottom: 20px;

    .title {
      text-align: center;
      color: #bbb;

      &:hover,
      &.focus-item {
        color: #169bd5;
      }
    }

    .image {
      height: 100px;
    }
  }

  .item-card {
    cursor: pointer;
  }
</style>
