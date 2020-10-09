<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>训练活动</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="单位：" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              class="filter-item"
              placeholder="请输入单位"
            />
          </el-form-item>
          <el-form-item label="训练日期：" class="filter-item">
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
            <el-button class="filter-item btn-base filter-add-btn">新增</el-button>
          </el-form-item>
        </el-form>
        <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column property="company" label="训练单位" />
          <el-table-column property="name" label="训练项目" />
          <el-table-column property="time" label="训练日期" />
          <el-table-column property="num" label="参与人数" />
          <el-table-column property="qualified" label="合格率" />
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
  <!-- 
    参与人数
    合格率
  -->
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
          name: '俯卧撑两百个',
          time: '2020-09-16',
          company: '三团一营',
          frequency: '每周两次',
          num: '300',
          qualified: '100%',
          id: '11'
        },
        {
          name: '跑步两千米',
          time: '2020-09-16',
          company: '三团一营',
          frequency: '每日一次',
          num: '300',
          qualified: '100%',
          id: '12'
        },
        {
          name: '引体向上50个',
          time: '2020-09-16',
          company: '三团一营',
          frequency: '每周一次',
          num: '299',
          qualified: '100%',
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