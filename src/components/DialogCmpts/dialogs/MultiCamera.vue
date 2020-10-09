<template>
  <div>
    <div v-drag class="videoLocation dargable">
      <div class="video-title-main">
        <div class="video-title">实时监控</div>
        <i class="el-icon-close videoLocation-title" @click="Close" />
      </div>
      <div class="video-body">
        <div class="video-body-split">
          <span
            v-for="(item,index) in groupList"
            :key="index"
            :class="{active:item===pageSize}"
            @click="pageSize=item"
          >{{ item }}</span>
        </div>
        <div class="item-list">
          <el-row :gutter="20">
            <el-col v-for="(item,key) in currentList" :key="key" :span="(24/(Math.sqrt(pageSize)))">
              <div class="item">
                <EasyPlayer
                  :video-url="item.url"
                  live
                  :fluent="true"
                  autoplay="autoplay"
                  stretch
                />
                <div class="video-body-title">{{ item.title }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="pagination-container">
          <el-pagination
            background
            :current-page="listQuery.pageNo"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EasyPlayer from '@easydarwin/easyplayer'
import { destroyPop } from '../index'
import { generateUUID } from '@/utils'

export default {
  name: 'MultiCamera',
  components: { EasyPlayer },
  data() {
    return {
      total: 0,
      pageSize: 4,
      listQuery: {
        pageNo: 1
      },
      groupList: [1, 4, 9],
      dataList: []
    }
  },
  computed: {
    currentList() {
      return this.dataList.concat().splice((this.listQuery.pageNo - 1) * this.pageSize, this.pageSize)
    }
  },
  watch: {
    'pageSize'() {
      this.listQuery.pageNo = 1
    }
  },
  created() {
    this.list.forEach((item) => item.id = generateUUID())
    this.dataList = this.list
    this.total = this.dataList.length
  },
  mounted() {
  },
  methods: {
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
    },
    Close() {
      this.$destroy()
      destroyPop('cameraPopUp')
    }
  }
}
</script>

<style lang="scss" scoped>
  .videoLocation {
    position: absolute;
    top: 100px;
    right: 300px;
    z-index: 1900;
    width: 1150px;
    height: auto;
    background-color: #fff;

    .video-title-main {
      color: #fff;
      background: #1C949A;
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
      height: 62px;
      line-height: 62px;

      .videoLocation-title {
        line-height: 62px;
        cursor: pointer;
      }
    }

    .video-body {
      padding: 0px 60px;
      height: 86vh;

      .video-body-split {
        padding: 13px 0;
        span {
          cursor: pointer;
          text-align: center;
          display: inline-block;
          width: 58px;
          height: 30px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #1C949A;
          line-height: 30px;
          border: 1px solid #1C9399;
          border-right: none;

          &:last-child {
            border-right: 1px solid #1C9399;
          }

          &.active {
            background: #1C949A;
            color: #fff;
          }
        }
      }
      .video-body-title {
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #444444;
        line-height: 38px;
      }
      .pagination-container{
        position: absolute;
        bottom: 0;
      }

    }
  }
</style>
