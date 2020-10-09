<template>
  <div>
    <div v-drag class="videoLocation dargable">
      <div class="video-title-main">
        <div class="video-title">抓拍图像</div>
        <i class="el-icon-close videoLocation-title" @click="close" />
      </div>
      <div class="video-body">
        <el-row :gutter="20">
          <el-col v-for="(item,index) in currentList" :key="index" class="item" :span="8">
            <el-image class="img" :preview-src-list="[item.url]" fit="contain" :src="item.url" alt="item.title" />
          </el-col>
        </el-row>
        <div class="pagination-container">
          <el-pagination
            background
            :current-page="listQuery.pageNo"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="list.length"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiImageDialog',
  data() {
    return {
      list: [],
      pageSize: 9,
      listQuery: {
        pageNo: 1
      }
    }
  },
  computed: {
    currentList() {
      return this.list.concat().splice((this.listQuery.pageNo - 1) * this.pageSize, this.pageSize)
    }
  },
  created() { },
  mounted() { },
  methods: {
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
    },
    close() {
      document.body.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
  .videoLocation{
    position: absolute;
    top: 100px;
    right: 300px;
    z-index:1900;
    width: 1150px;
    height:auto;
    background-color: #fff;
    .video-title-main{
      color: #fff;
      background: #1C949A;
      display:flex ;
      justify-content: space-between;
      padding: 0 30px;
      height: 62px;
      line-height: 62px;
      .videoLocation-title{
        line-height: 62px;
        cursor: pointer;
      }
    }
    .video-body {
      padding: 50px 62px 38px;
      height: 800px;
      .item{
        margin-bottom: 10px;
        .img{
          width: 330px;
          height: 194px;
        }
      }
      .pagination-container{
        position: absolute;
        bottom: 0;
      }
    }
  }
</style>
