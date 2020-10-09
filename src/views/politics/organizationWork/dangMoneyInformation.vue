<template>
  <div class="app-container">
    <el-row :gutter="20">
      <zuzhitree />
      <el-col :span="19">
        <el-card class="box-card app-body">
          <div slot="header" class="clearfix">
            <span>党费信息</span>
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
              <el-form-item label="职务：" class="filter-item">
                <el-input
                  v-model="listQuery.params.zhiwu"
                  type="text"
                  class="filter-item"
                  placeholder="请输入职务"
                />
              </el-form-item>
              <el-form-item label="应缴党费：" class="filter-item">
                <el-input
                  v-model="listQuery.params.ying"
                  type="text"
                  class="filter-item"
                  placeholder="请输入应缴党费"
                />
              </el-form-item>
              <el-form-item label="实缴党费：" class="filter-item">
                <el-input
                  v-model="listQuery.params.shi"
                  type="text"
                  class="filter-item"
                  placeholder="请输入应缴党费"
                />
              </el-form-item>
              <el-form-item label="缴费月份：" class="filter-item">
                <el-date-picker v-model="value1" type="month" placeholder="选择月" />
              </el-form-item>
              <el-form-item label="缴费情况：" class="filter-item">
                <el-select
                  v-model="listQuery.params.Status"
                  clearable
                  class="form-item"
                  placeholder="请选择缴费情况"
                >
                  <el-option label="已缴" value="0" />
                  <el-option label="未缴" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item class="filter-item">
                <el-button
                  v-waves
                  class="filter-item btn-base"
                  type="primary"
                >{{ $t('table.search') }}</el-button>
                <el-button class="filter-item btn-base filter-add-btn" @click="dialog1 = true">新增</el-button>
                <el-button class="filter-item btn-base filter-add-btn" type="info">重置</el-button>
              </el-form-item>
            </el-form>
            <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column property="name" label="姓名" />
              <el-table-column property="zhiwu" label="职务" />
              <el-table-column property="ying" label="应缴党费" />
              <el-table-column property="shi" label="实缴党费" />
              <el-table-column property="time" label="缴费月份" />
              <el-table-column property="status" label="缴费情况" />
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <div v-if="scope.row.status=='未缴'" class="t-col-operate">
                    <i class="el-icon-s-check info table-i" title="确认缴费" />
                    <i
                      class="el-icon-delete danger table-i"
                      title="删除"
                      @click="delitem(scope.row.id)"
                    />
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
      </el-col>
    </el-row>
    <el-dialog
      title="新增"
      :visible.sync="dialog1"
      width="500px"
      class="small_dialog"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <el-form label-width="120px">
          <el-form-item label="姓名：">
            <el-input v-model="form.name" class="form-item1" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="职务:">
            <el-input v-model="form.zhiwu" class="form-item1" placeholder="请输入职务" />
          </el-form-item>
          <el-form-item label="应缴党费：">
            <el-input v-model="form.ying" class="form-item1" placeholder="请输入应缴党费" />
          </el-form-item>
          <el-form-item label="实缴党费：">
            <el-input v-model="form.shi" class="form-item1" placeholder="请输入实缴党费" />
          </el-form-item>
          <!-- <el-form-item label="会议地点：">
            <el-input v-model="form.zhiwu" class="form-item1" placeholder="请输入会议地点" />
          </el-form-item>-->
          <el-form-item label="缴费月份：">
            <el-date-picker
              v-model="form.value1"
              style="width:100%"
              type="month"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="缴费情况:">
            <el-select v-model="form.type" class="form-item1" placeholder="请选择缴费情况">
              <el-option label="已缴" value="0" />
              <el-option label="未缴" value="1" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1=false">取 消</el-button>
        <el-button type="primary" @click="dialog1=false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import zuzhitree from './zuzhitree'
export default {
  components: {
    zuzhitree
  },
  data() {
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
          name: '高山',
          zhiwu: '连长',
          time: '2020-09',
          status: '已缴',
          ying: '100',
          shi: '100'
        },
        {
          name: '平原',
          zhiwu: '指导员',
          time: '2020-09',
          status: '未缴',
          ying: '100',
          shi: ''
        },
        {
          name: '张三',
          zhiwu: '参谋',
          time: '2020-09',
          status: '未缴',
          ying: '100',
          shi: ''
        },
        {
          name: '李四',
          zhiwu: '分队长',
          time: '2020-09',
          status: '已缴',
          ying: '100',
          shi: '100'
        },
        {
          name: '王五',
          zhiwu: '分队长',
          time: '2020-09',
          status: '未缴',
          ying: '100',
          shi: ''
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
