<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>检查通报</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="标题：" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              class="filter-item"
              placeholder="请输入标题"
            />
          </el-form-item>
          <el-form-item label="发布时间：" class="filter-item">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button v-waves class="filter-item btn-base" type="primary">{{ $t('table.search') }}</el-button>
            <el-button class="filter-item btn-base filter-add-btn">发布通报</el-button>
          </el-form-item>
        </el-form>
        <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column property="name" label="标题" />
          <el-table-column property="con" label="内容简要" />
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
<!-- 
  通报发布
  发布时间
  通报单位，个人
  训练成绩
 -->
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
          name: '通报嘉奖',
          con: '一团一营在训练中表现优异特此嘉奖',
          time: '2020-09-16',
          company: '一团团部',
          type: '嘉奖',
          id: '11'
        },
        {
          name: '全团评比',
          con: '全团抽查训练',
          time: '2020-09-16',
          company: '一团团部',
          type: '常规',
          id: '12'
        }
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