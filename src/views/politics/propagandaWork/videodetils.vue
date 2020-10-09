<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <el-page-header content="视频详情" @back="goBack" />
      <div class="filter-container" style="margin-top:20px">
        <iframe height="700" width="1400" src="https://player.youku.com/embed/XNDc0NjI1NzYxMg==" frameborder="0" />
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
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
</style>
