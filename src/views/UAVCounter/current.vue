<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>反无人机预警</span>
      </div>
      <img src="./temp.png" alt="" style="width: 100%;">
    </el-card></div>
</template>
<script>

export default {
  data() {
    return {
      title: '编辑',
      treeData: [],
      value1: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          b: ''
        }
      },
      list: [
        {
          a: '无人机反制探测雷达',
          b: '未判定',
          c: '2020-02-02 20:20:20',
          d: '[116.403694,39.915156]',
          e: '604.28',
          f: '已诱导'
        }
      ],
      form: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '²',
        g: ''
      },
      total: null, // 总数
      listLoading: false,
      dialog: false,
      dialog2: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleCreate() {
      this.title = '新增'
      this.dialog2 = true
      this.form = {}
    },
    getList() { },
    cascaderRadioClick(val, name) {
      this.listQuery.params.b = val
    },
    handleFilter() {
      this.listQuery.pageNo = 1
    },
    details(e, id, row) {
      if (e === 1) {
        this.dialog = true
      } else {
        this.title = '编辑'
        this.dialog2 = true
      }
      this.getdetails(id)
      this.form = { ...row }
    },
    getdetails(id) {
      // floorget(id).then((response) => {
      //   this.ruleForm = response.data
      // })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    }
  }
}
</script>
<style scoped>
  .photo {
    width: 100px;
    height: 100px;
  }
</style>
