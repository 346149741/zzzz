<template>
  <div class="control-camera">
    <div v-drag class="videoLocation dargable">
      <div class="video-title">
        <el-radio-group v-model="pageSize" class="page-size" @change="pageSizeChange">
          <el-radio-button :label="1" />
          <el-radio-button :label="4" />
          <el-radio-button :label="6" />
          <el-radio-button :label="9" />
        </el-radio-group>
      </div>
      <i class="el-icon-close videoLocation-title" @click="Close" />
      <el-row v-if="pageSize === 1" :gutter="20">
        <el-col v-for="(item, index) in cameraList" :key="pageSize + '' + currentPage + '' + index" :span="24" class="video-item">
          <div class="video-body">
            <!-- <video
              class="mylayer"
              :id="'mylayer' + pageSize + index"
              :src="item.videoNetaddress"
              controls
              autoplay
            />-->
            <EasyPlayer
              :id="'mylayer' + pageSize + index"
              class="mylayer"
              :video-url="item.videoNetaddress"
              live
              :fluent="true"
              autoplay="autoplay"
              stretch
            />
            <div class="video-message">
              {{ item.playFlag ? item.location : '暂无数据' }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="pageSize === 4" :gutter="20">
        <el-col v-for="(item, index) in cameraList" :key="pageSize + '' + currentPage + '' + index" :span="12" class="video-item">
          <div class="video-body">
            <!--<video
              class="mylayer"
              :id="'mylayer' + pageSize + index"
              :src="item.videoNetaddress"
              controls
              autoplay
            />-->
            <EasyPlayer
              :id="'mylayer' + pageSize + index"
              class="mylayer"
              :video-url="item.videoNetaddress"
              live
              :fluent="true"
              autoplay="autoplay"
              stretch
            />
            <div class="video-message">
              {{ item.playFlag ? item.location : '暂无数据' }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="pageSize === 6" :gutter="20">
        <el-col v-for="(item, index) in cameraList" :key="pageSize + '' + currentPage + '' + index" :span="8" class="video-item">
          <div class="video-body">
            <!--<video
              class="mylayer"
              :id="'mylayer' + pageSize + index"
              :src="item.videoNetaddress"
              controls
              autoplay
            />-->
            <EasyPlayer
              :id="'mylayer' + pageSize + index"
              class="mylayer"
              :video-url="item.videoNetaddress"
              live
              :fluent="true"
              autoplay="autoplay"
              stretch
            />
            <div class="video-message">
              {{ item.playFlag ? item.location : '暂无数据' }}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="pageSize === 9" :gutter="20">
        <el-col v-for="(item, index) in cameraList" :key="pageSize + '' + currentPage + '' + index" :span="8" class="video-item">
          <div class="video-body">
            <!--<video
              class="mylayer"
              :id="'mylayer' + pageSize + index"
              :src="item.videoNetaddress"
              controls
              autoplay
            />-->
            <EasyPlayer
              :id="'mylayer' + pageSize + index"
              class="mylayer"
              :video-url="item.videoNetaddress"
              live
              :fluent="true"
              autoplay="autoplay"
              stretch
            />
            <div class="video-message">
              {{ item.playFlag ? item.location : '暂无数据' }}
            </div>
          </div>
        </el-col>
      </el-row>
      <!--分页工具条-->
      <div class="pagination-container">
        <el-pagination
          small
          :background="true"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="currentTotal"
          :pager-count="7"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { camerapage } from '@/api/perimeter/controlTool'
import EasyPlayer from '@easydarwin/easyplayer'
import { destroyPop } from '@/views/common/popup/index.js'
export default {
  name: 'ControlCamera',
  components: { EasyPlayer },
  data() {
    return {
      pageSize: 6,
      currentPage: 1,
      currentTotal: 0,
      cameraList: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    Close() {
      this.$destroy()
      destroyPop('controlCameraPopUp')
    },
    pageSizeChange(num) {
      this.currentPage = 1
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    getData() {
      const mydata = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        params: {
          controlObjectId: this.controlCameraData.id,
          controlToolType: '摄像头'
        }
      }
      camerapage(mydata).then(res => {
        this.cameraList = this.setListSize(res.data.content, this.pageSize)
        this.currentTotal = res.data.totalElements
      })
    },
    setListSize(list, num) {
      const arr = []
      list.forEach(function(item, index) {
        item.playFlag = true
        arr.push(item)
      })
      if (list.length < num) {
        const lotNum = num - list.length
        for (let i = 0; i < lotNum; i++) {
          const it = { playFlag: false, videoNetaddress: '' }
          arr.push(it)
        }
      }
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
  .videoLocation{
    position: absolute;
    top: 100px;
    right: 300px;
    z-index:2;
    width:1200px;
    //height:700px;
    height: auto;
    padding: 40px 16px 16px 16px;
    background-color: rgba(255,255,255,0.7);
    border-radius: 10px;
    .video-title {
      position: absolute;
      top: 16px;
      left: 24px;
      color: #2b2f3a;
      font-weight: 600;
    }
    .videoLocation-title {
      position: absolute;
      top: 8px;
      right: 8px;
      color: rgb(22,66,116);
      cursor:pointer;
      font-size: 24px;
    }
    .video-item {
      margin-bottom: 16px;
    }
    .pagination-container {
      float: right;
    }
    .camera-none {
      width: 300px;
      height: 100px;
      color: #A9A9A9;
      font-size: 24px;
      text-align: center;
      display: table-cell;
      vertical-align: middle;
    }
    .video-body{
      height: 100%;
      width: 100%;
      background-color: rgb(6,54,118);
      border-radius: 5px;
      padding: 2px;
      .mylayer{
        display:block;
        width:100%;
        height:100%;
      }
      .video-message{
        width: 100%;
        height: 30px;
        text-align: center;
        font-size: 14px;
        line-height: 30px;
        color: white;
      }
    }
  }
</style>
<style lang="scss">
  .page-size {
    .el-radio-button__inner {
      background-color: transparent;
      padding: 0px;
      margin-left: 6px;
      height: 18px;
      width: 18px;
      line-height: 16px;
      border-radius: 50%;
      color: rgb(21,62,116);
      border-width: 0px;
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      background-color: rgb(21,62,116);
      border: 1px solid rgb(21,62,116);
      border-radius: 50%;
    }
  }
</style>
