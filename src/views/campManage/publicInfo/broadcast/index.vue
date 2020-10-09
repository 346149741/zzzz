<template>
  <div class="app-container">
    <el-row :gutter="15">
      <!--部门树-->
      <el-col :span="4">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>广播管理</span>
          </div>
          <el-tree
            :data="data"
            node-key="id"
            show-checkbox
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent"
            @node-click="handleNodeClick"
          />
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card class="box-card">
          <el-tabs
            v-model="activeName"
            type="card"
            @tab-click="handleClick"
          >
            <el-tab-pane
              label="背景广播"
              name="背景广播"
            >
              <div class="el-tab-content">
                <bjgb />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="业务广播"
              name="业务广播"
            >
              <div class="el-tab-content">
                <ywgb />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="区域广播"
              name="区域广播"
            >
              <div class="el-tab-content">
                <qygb ref="qygb" />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="定时广播"
              name="定时广播"
            >
              <div class="el-tab-content">
                <dsgb />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="自由点播"
              name="自由点播"
            >
              <div class="el-tab-content">
                <zydb />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="紧急广播"
              name="紧急广播"
            >
              <div class="el-tab-content">
                <jjgb />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="临时插播"
              name="临时插播"
            >
              <div class="el-tab-content">
                <ywgb />
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <div class="time">{{ currentDate }}</div>
        <div style="position:absolute;width:83%;height:80px;">
          <aplayer
            v-if="isPlay"
            :music="audio.music"
            :mutex="true"
            :list="musicList"
          />
        </div>

      </el-col>
    </el-row>
  </div>
</template>
<script>
import { registertree } from '@/api/base/region'
import aplayer from 'vue-aplayer'
import bjgb from './bjgb.vue'
import ywgb from './ywgb.vue'
import qygb from './qygb.vue'
import dsgb from './dsgb.vue'
import zydb from './zydb.vue'
import jjgb from './jjgb.vue'
export default {
  components: { aplayer, bjgb, ywgb, qygb, dsgb, zydb, jjgb },
  data() {
    this.treeListGroup = {}

    return {
      musicList: [
        {
          // 对象，
          title: '或是一首歌',
          author: '田馥甄',
          src: 'http://music.163.com/song/media/outer/url?id=1472606824.mp3'
        },
        {
          // 对象，
          title: '歌唱祖国',
          author: '东方红合唱团',
          src: 'http://music.163.com/song/media/outer/url?id=5234256.mp3'
        },
        {
          // 对象，
          title: '中国人民解放军进行曲',
          author: '东方红大型歌舞曲',
          src: 'http://music.163.com/song/media/outer/url?id=1304301596.mp3'
        },
        {
          // 对象，
          title: '红旗飘飘',
          author: '孙楠',
          src: 'http://music.163.com/song/media/outer/url?id=145754.mp3'
        }
      ],
      data: [],
      activeName: '背景广播',
      currentDate: new Date(),
      isPlay: true, // 定义一个延迟加载变量，一开始music.src为空，系统加载为报错
      audio: {
        music: {
          // 对象，
          title: '或是一首歌',
          author: '田馥甄',
          src: 'http://music.163.com/song/media/outer/url?id=1472606824.mp3'
        }
      }
    }
  },
  computed: {},
  watch: {},
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
    this.getTree()
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === '临时插播') {
        this.activeName = '业务广播'
        tab.index = 1
      }
    },
    getTree() {
      registertree().then((response) => {
        this.data = response.data
      })
    },
    handleNodeClick(data) {
      this.activeName = '区域广播'
      debugger
      this.$refs.qygb.addClickRegion(data.areaName)
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{data.areaName}</span>
        </span>
      )
    }
  }
}
</script>
<style>
.aplayer {
  overflow: visible !important;
}
.aplayer-controller .aplayer-time{
  color:black !important;
}
.aplayer-info{

}
.aplayer-controller{
  height:30px !important;
}
.aplayer-time button{
width:20px !important;
height:23px !important;
}
.aplayer-music{
  color:black;
}
.aplayer-list {
  width: 348px;
  position: absolute;
  bottom: 20px;
  right: 0px;
  background-color: rgb(255, 255, 255);
  height: 120px !important;
  overflow: auto !important;
}
</style>
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
  height: 65vh;
}
</style>
