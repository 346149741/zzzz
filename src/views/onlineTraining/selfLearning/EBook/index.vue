<template>
  <div>
    <div class="app-container">
      <el-card class="box-card app-body">
        <div slot="header" class="clearfix">
          <div class="header-title" style="display: flex;justify-content: space-between"><span style="cursor:pointer;" @click="$router.go(-1)">返回</span><span>图书</span><span /></div>
        </div>
        <el-row :gutter="20">
          <el-col v-for="(item,index) in list" :key="index" :span="4" class="item">
            <el-card class="item-card">
              <div style="text-align: center" @click="handeOpen">
                <el-image
                  v-if="item.img"
                  class="image"
                  :src="item.img"
                  fit="contain"
                />
              </div>
              <div class="title tac">{{ item.title }}</div>
              <div class="txt tac">{{ item.score===0?'免费':`${item.score}积分` }}</div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>

      <el-dialog
        class="abow_dialog detail-form"
        title="详情"
        :append-to-body="true"
        :visible.sync="dialog"
        :close-on-click-modal="false"
        width="770px"
      >
        <el-image
          :src="imgs[index].url"
          fit="contain"
        />
        <span slot="footer" class="dialog-footer">
          <el-button class="un-primary-btn" @click="index--">上一页</el-button>
          <el-button type="primary" @click="index++">下一页</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelfLearning',
  data() {
    return {
      index: 0,
      dialog: false,
      list: [
        { img: require('./imgs/bks/1 (2).png'), title: '毛泽东、斯大林与朝鲜战争', score: 0 },
        { img: require('./imgs/bks/1 (3).png'), title: '全国通史', score: 0 },
        { img: require('./imgs/bks/1 (4).png'), title: '大国战略', score: 6 },
        { img: require('./imgs/bks/1 (5).png'), title: '中国军事战略思维轮', score: 6 },
        { img: require('./imgs/bks/1 (6).png'), title: '毛泽东军事箴言（上、下）', score: 6 },
        { img: require('./imgs/bks/1 (7).png'), title: '朱德：从琳琅山到中南海', score: 6 },
        { img: require('./imgs/bks/1 (8).png'), title: '中国通史', score: 6 },
        { img: require('./imgs/bks/1 (9).png'), title: '毛泽东与蒋介石', score: 6 },
        { img: require('./imgs/bks/1 (10).png'), title: '我的父亲朱德—我的父辈丛书', score: 6 },
        { img: require('./imgs/bks/1 (11).png'), title: '明前期军事制度研究', score: 6 },
        { img: require('./imgs/bks/1 (12).png'), title: '全球导弹鉴赏指南(珍藏版)', score: 6 },
        { img: require('./imgs/bks/1 (13).png'), title: '军事革命与政治变革', score: 6 }
      ],
      imgs: [
        { url: require('./imgs/0.png') },
        { url: require('./imgs/2.png') },
        { url: require('./imgs/3.png') },
        { url: require('./imgs/4.png') },
        { url: require('./imgs/5.png') },
        { url: require('./imgs/6.png') }
      ]
    }
  },
  watch: {
    index(val, old) {
      if (val < 0 || val === this.imgs.length) {
        val = 0
      }
    }
  },
  methods: {
    handeOpen() {
      this.dialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    margin-bottom: 20px;

    .txt, .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .tac {
      text-align: center;
    }

    .title {
      line-height: 40px;
      font-weight: 800;
    }

    .txt {
      color: #f1b41f;
    }

    .image {
      height: 200px;
    }
  }

  .item-card {
    cursor: pointer;
  }
</style>
