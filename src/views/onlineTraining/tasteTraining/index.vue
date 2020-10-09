<template>
  <div>
    <div class="app-container">
      <el-card class="box-card app-body">
        <div slot="header" class="clearfix">
          <span>趣味训练</span>
        </div>
        <el-row :gutter="20">
          <el-col v-for="item in list" :span="6" class="item" @click.native="goto(item.name)">
            <el-card class="item-card" :style="{'color': item.color}">
              <img :src="item.icon" :alt="item.label">
              <div>{{ item.label }}</div>
              <div class="txt">{{ item.desc }}</div>
              <div class="txt score">已获{{ item.score }}分</div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TasteTraining',
  data() {
    return {
      list: [
        { icon: require('./imgs/答题.png'), color: '#2dd6aa', name: 'tasteTrainingDaily', label: '每日答题',
          score: 0, desc: '每组答题每答对1道积1分，答对5道积6分；' },
        { icon: require('./imgs/每周答题.png'), color: '#f75579', name: 'tasteTrainingWeek', label: '每周答题',
          score: 0, desc: '每组答题每答对1道积1分，同组答题不重复积分；' },
        { icon: require('./imgs/专项答题.png'), color: '#3b89f1', name: 'tasteTrainingthemeAnswer', label: '专项答题',
          score: 0, desc: '每组答题每答对1道积1分，同组答题不重复积分；' }
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
      border: 1px solid #2dd6aa;
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
      height: 310px;
    }
  }
  .txt{
    &.score{
      margin-top: 10px;
      color: #2dd6aa;
    }
    font-size: 14px;
    color: #ccc;
    text-align: left;
    font-weight: 400;
  }
</style>
