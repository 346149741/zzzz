<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>饭堂广播</span>
      </div>
      <div class="filter-container">
        <el-tabs v-model="activeName">
          <el-tab-pane label="背景广播" name="背景广播">
            <div class="el-tab-content">
              <bjgb />
            </div>
          </el-tab-pane>
          <el-tab-pane label="广播文稿" name="广播文稿">
            <div class="el-tab-content">
              <ywgb />
            </div>
          </el-tab-pane>
        </el-tabs>
        <div>
          <aplayer v-if="isPlay" :music="audio.music" :mutex="true" :list="musicList" />
        </div>
      </div>
      <div class="time">{{ currentDate }}</div>
    </el-card>
  </div>
</template>
<script>
import aplayer from 'vue-aplayer'
import bjgb from '@/views/campManage/publicInfo/broadcast/bjgb.vue'
import ywgb from '@/views/campManage/publicInfo/broadcast/ywgb.vue'
import qygb from '@/views/campManage/publicInfo/broadcast/qygb.vue'
import dsgb from '@/views/campManage/publicInfo/broadcast/dsgb.vue'
import zydb from '@/views/campManage/publicInfo/broadcast/zydb.vue'
import jjgb from '@/views/campManage/publicInfo/broadcast/jjgb.vue'
export default {
  components: { aplayer, bjgb, ywgb, qygb, dsgb, zydb, jjgb },
  data() {
    return {
      currentDate: new Date(),
      activeName: '背景广播',
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      dialog1: false,
      isPlay: true, // 定义一个延迟加载变量，一开始music.src为空，系统加载为报错
      audio: {
        music: {
          // 对象，
          title: '或是一首歌',
          author: '田馥甄',
          src: 'http://music.163.com/song/media/outer/url?id=1472606824.mp3'
        }
      },
      form: {

      }
    }
  },
  mounted() {
    const _this = this
    this.timer = setInterval(function() {
      _this.currentDate = new Date().toLocaleString()
    })
    document.getElementsByClassName('aplayer-list')[0].style.display = 'none'
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  created() {
    this.total = this.list.length
  },
  methods: {

  }
}
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.time {
  position: absolute;
  top: 30px;
  right: 30px;
}

.el-tab-content {
  /* height: 65vh; */
}
</style>
