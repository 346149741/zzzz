<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>训练情况报告</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="姓名：" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              class="filter-item"
              placeholder="请输入姓名"
            />
          </el-form-item>
          <el-form-item label="单位：" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              class="filter-item"
              placeholder="请输入单位"
            />
          </el-form-item>
          <el-form-item label="时间：" class="filter-item">
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
          <el-table-column property="company" label="单位" />
          <el-table-column property="name" label="姓名" />
          <el-table-column property="xiangmu" label="训练项目" />
          <el-table-column property="result" label="训练成绩" />
          <el-table-column property="dabiao" label="是否达标" />
          <el-table-column property="time" label="训练日期" />
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
          name: '张三',
          xiangmu: '100米冲刺',
          company: '三连五班',
          result: '12秒',
          dabiao: '是',
          time: '2020-09-16',
          id: '11'
        },
        {
          name: '张三',
          xiangmu: '跑步1000',
          company: '三连五班',
          result: '3分12秒',
          dabiao: '是',
          time: '2020-09-16',
          id: '11'
        },
        {
          name: '张三',
          xiangmu: '俯卧撑',
          company: '三连五班',
          result: '100个',
          dabiao: '是',
          time: '2020-09-16',
          id: '11'
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