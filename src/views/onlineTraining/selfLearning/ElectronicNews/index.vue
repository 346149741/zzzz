<template>
  <div>
    <div class="app-container">
      <el-card class="box-card app-body">
        <div slot="header" class="clearfix">
          <div class="header-title" style="display: flex;justify-content: space-between"><span style="cursor:pointer;" @click="$router.go(-1)">返回</span><span>电子报刊</span><span /></div>
        </div>
        <el-row :gutter="20">
          <el-col v-for="(item,index) in list" :key="index" :span="6" class="item">
            <el-card class="item-card">
              <div style="text-align: center" @click="handeOpen">
                <el-image
                  v-if="item.img"
                  class="image"
                  :src="item.img"
                  fit="contain"
                />
              </div>
              <div class="title">{{ item.title }}</div>
              <div class="txt">{{ item.subtitle }}</div>
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
        width="60%"
      >
        <el-carousel indicator-position="outside" :autoplay="false" height="600px">
          <el-carousel-item v-for="(item,index) in imgs" :key="index">
            <div style="text-align: center">
              <el-image
                class="paper-item"
                :src="item.url"
              />
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelfLearning',
  data() {
    return {
      dialog: false,
      list: [
        { img: 'http://pic.dooland.com/newspaperCovers/2010/10/08/211.jpg', title: '镇江日报', subtitle: '2020年9月22日' },
        { img: 'http://pic.dooland.com/newspaperCovers/2010/10/08/2510.jpg', title: '闽南日报', subtitle: '2020年9月22日' },
        { img: 'http://pic.dooland.com/newspaperCovers/2010/10/08/217.jpg', title: '杭州日报', subtitle: '2020年9月22日' }
      ],
      imgs: [
        { url: 'http://hcrb.hcwang.cn/page/1/2020-09-22/01/40811600735306649.jpg' },
        { url: 'http://hcrb.hcwang.cn/page/1/2020-09-22/02/36931600735307758.jpg' },
        { url: 'http://hcrb.hcwang.cn/page/1/2020-09-22/03/88091600735308805.jpg' },
        { url: 'http://hcrb.hcwang.cn/page/1/2020-09-22/04/35641600735309742.jpg' },
        { url: 'http://hcrb.hcwang.cn/page/1/2020-09-22/05/80871600735311555.jpg' }
      ]
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

    .title {
      line-height: 40px;
      font-weight: 800;
    }

    .txt {
      color: #aaa;
    }

    .image {
      height: 200px;
    }
  }

  .item-card {
    cursor: pointer;
  }
</style>
