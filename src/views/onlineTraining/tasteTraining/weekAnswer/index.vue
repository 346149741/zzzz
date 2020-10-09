<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <div class="header-title"><span style="cursor:pointer;" @click="goback">返回</span><span>每周答题</span><span /></div>
      </div>
      <el-row :gutter="20">
        <el-col v-for="(item,index) in 10" :key="index" :span="6" class="item">
          <el-card class="item-card">
            <div class="title">{{ 10-index }}月</div>
            <ul class="lst">
              <li v-for="(cell,j) in 4" :key="j" @click="handleGoDetail">
                {{ `2020年${10-index}月第${j+1}周答题` }}
                <span class="score">{{ randomScore() }}</span>
              </li>
            </ul>
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
    return {}
  },
  mounted() {
  },
  methods: {
    handleGoDetail() {
      this.$router.push({ name: 'tasteTrainingWeekDetail' })
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

  .title {
    border-left: 4px solid #3B89F1;
    padding-left: 10px;
    font-size: 18px;
    color: #3B89F1;
    line-height: 24px;
  }

  .lst {
    li {
      padding: 10px;
      cursor: pointer;
      .score{
        float: right;
        color: #E6921B;
      }
    }
  }

</style>
