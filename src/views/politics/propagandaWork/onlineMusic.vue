<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>在线音乐</span>
      </div>
      <div class="filter-container">
        <img src="./img6.png" style="width:100%">
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
        {
          type: '团组织',
          name: '高山',
          sex: '男',
          danwei: '三连',
          junxian: '少尉',
          zhiwu: '旅部党委委员'
        },
        {
          type: '团组织',
          name: '平原',
          sex: '男',
          danwei: '勤务连',
          junxian: '少尉',
          zhiwu: '团委副书记'
        },
        {
          type: '团组织',
          name: '张三',
          sex: '男',
          danwei: '侦查营',
          junxian: '少尉',
          zhiwu: '团纪委书记'
        },
        {
          type: '团组织',
          name: '李四',
          sex: '男',
          danwei: '三连',
          junxian: '少尉',
          zhiwu: '团委委员'
        },
        {
          type: '团组织',
          name: '王五',
          sex: '男',
          danwei: '三连',
          junxian: '少尉',
          zhiwu: '团委委员'
        }
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

  }
}
</script>
<style scoped>
</style>
