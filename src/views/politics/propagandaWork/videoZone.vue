<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>视频专区</span>
      </div>
      <div class="filter-container">
        <img src="./img8.png" @click="tiao()">
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      list: [
      ],
      dialog1: false,
      form: {

      }
    }
  },
  created() {
    this.total = this.list.length
  },
  methods: {
    tiao() {
      this.$router.push({ path: 'videodetils' })
    }
  }
}
</script>
<style scoped>
</style>
