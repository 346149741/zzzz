<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>效能实验</span>
      </div>
      <div style="margin-bottom:20px">
        <el-button class="filter-item btn-base filter-add-btn">新增</el-button>
      </div>
      <div class="filter-container">
        <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column property="name" label="实验项目" />
          <el-table-column property="company" label="参与单位" />
          <el-table-column property="num" label="参与人数" />
          <el-table-column property="result" label="成绩" />
          <el-table-column property="qualified" label="合格率" />
          <el-table-column property="time" label="实验时间" width="100" />
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="t-col-operate">
                <i
                  class="el-icon-tickets primary table-i"
                  title="详情"
                  @click="details(scope.row.id)"
                />
                <i
                  class="el-icon-edit-outline warning table-i"
                  title="编辑"
                  @click="handleCreate(scope.row.id)"
                />
                <i class="el-icon-delete danger table-i" title="删除" @click="delitem(scope.row.id)" />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--分页工具条-->
        <div class="pagination-container">
          <el-pagination
            background
            :current-page="listQuery.pageNo"
            :page-sizes="[10,20,30, 50]"
            :page-size="listQuery.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      list: [
        {
          name: '1000米跑步',
          company: '三团一营',
          num:'200',
          result: '3分10秒',
          qualified: '98%',
          time: '2020-09-17',
          id: '11'
        },
        {
          name: '俯卧撑',
          company: '三团二营',
          num:'210',
          result: '100个',
          qualified: '96%',
          time: '2020-09-17',
          id: '12'
        },
        {
          name: '引体向上',
          company: '三团三营',
          num:'198',
          result: '30个',
          qualified: '90%',
          time: '2020-09-17',
          id: '12'
        },
        {
          name: '深蹲',
          company: '三团一营',
          num:'205',
          result: '200个',
          qualified: '100%',
          time: '2020-09-17',
          id: '12'
        },
        {
          name: '三千米',
          company: '三团三营',
          num:'220',
          result: '10分',
          qualified: '100%',
          time: '2020-09-17',
          id: '12'
        },
      ]
    }
  },
  created () {
    this.total = this.list.length
  },
  methods: {
    handleCreate (e, id) {
      // this.dialog1 = true
      // if (e === 1) {
      //   this.poptit = '新增楼宇'
      // } else {
      //   this.poptit = '编辑楼宇'
      //   this.getdetails(id)
      // }
    },
    delitem (id) {
      this.$confirm('确认删除？').then(() => {
        // floordel(id).then(() => {
        //   this.getList()
        //   this.$notify.success({
        //     title: '成功',
        //     message: '删除成功'
        //   })
        // })
      })
    },
    details (id) {
      // this.dialog2 = true
      // this.getdetails(id)
    },
    handleSizeChange (val) {
      this.listQuery.pageSize = val
      // this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNo = val
      // this.getList()
    },
  }
}
</script>
<style scoped>
</style>