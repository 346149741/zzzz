<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>重大训练活动</span>
      </div>
      <div style="margin-bottom:20px">
        <el-button class="filter-item btn-base filter-add-btn">新增</el-button>
      </div>
      <div class="filter-container">
        <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column property="name" label="标题" />
          <el-table-column property="time" label="发布时间" />
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
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      list: [
        {
          name: '“高加索-2020”战略演习中方参演',
          time: '2020-09-16',
          id: '11'
        },
        {
          name: '南部战区陆军某边防旅坚持初始即严抓好新训骨干集训',
          time: '2020-09-16',
          id: '12'
        },
        {
          name: '北部战区空军某旅官兵谈如何克服惰性习惯',
          time: '2020-09-15',
          id: '13'
        },
        {
          name: '东部战区海军某护卫舰支队组织舰艇综合攻防等科目训练',
          time: '2020-09-15',
          id: '14'
        },
        {
          name: '北部战区海军某支队搭建网络平台丰富教育资源',
          time: '2020-09-15',
          id: '15'
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