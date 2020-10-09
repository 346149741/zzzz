<template>
  <div class="app-container">
    <el-row :gutter="20">
      <zuzhitree />
      <el-col :span="19">
        <el-card class="box-card app-body">
          <div slot="header" class="clearfix">
            <span>问题反馈</span>
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

              <el-form-item label="提交时间：" class="filter-item">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
              <el-form-item label="问题类型：" class="filter-item">
                <el-select
                  v-model="listQuery.params.Status"
                  clearable
                  class="form-item"
                  placeholder="请选择问题类型"
                >
                  <el-option label="生活问题" value="0" />
                  <el-option label="训练问题" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item class="filter-item">
                <el-button
                  v-waves
                  class="filter-item btn-base"
                  type="primary"
                >{{ $t('table.search') }}</el-button>
                <el-button class="filter-item btn-base filter-add-btn" @click="handleCreate()">新增</el-button>
                <el-button class="filter-item btn-base filter-add-btn" type="info">重置</el-button>
              </el-form-item>
            </el-form>
            <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column property="name" label="姓名" />
              <el-table-column property="sex" label="性别" />
              <el-table-column property="danwei" label="单位" />
              <el-table-column property="type" label="问题类型" />
              <el-table-column property="time" label="反馈时间" />
              <el-table-column property="status" label="处理结果" />
              <el-table-column property="people" label="处理人" />
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <div class="t-col-operate">
                    <i class="el-icon-s-check info table-i" title="回复" @click="dialog2 = true" />
                    <i class="el-icon-tickets primary table-i" title="详情" @click="dialog3 = true" />
                    <i
                      class="el-icon-edit-outline warning table-i"
                      title="编辑"
                      @click="handleCreate(scope.row.id)"
                    />
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
          <el-form-item label="问题类型：">
            <el-select v-model="form.type" class="form-item1" placeholder="请选择问题类型">
              <el-option label="生活问题" value="0" />
              <el-option label="训练问题" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="问题描述：">
            <el-input
              v-model="form.miaoshu"
              class="form-item1"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4}"
              placeholder="请输入内容"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1=false">取 消</el-button>
        <el-button type="primary" @click="dialog1=false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="回复问题"
      :visible.sync="dialog2"
      width="500px"
      class="small_dialog"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <el-form label-width="120px">
          <el-form-item label="姓名:">高山</el-form-item>
          <el-form-item label="性别：">男</el-form-item>
          <el-form-item label="单位:">三连</el-form-item>
          <el-form-item label="问题类型：">生活问题</el-form-item>
          <el-form-item label="问题描述：">生活太单调，需要增加些业余活动。</el-form-item>
          <el-form-item label="处理意见:">
            <el-input
              v-model="form.yijian"
              class="form-item1"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4}"
              placeholder="请输入内容"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2=false">取 消</el-button>
        <el-button type="primary" @click="dialog2=false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="问题详情"
      :visible.sync="dialog3"
      width="500px"
      class="small_dialog"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <el-form label-width="120px">
          <el-form-item label="姓名:">高山</el-form-item>
          <el-form-item label="性别：">男</el-form-item>
          <el-form-item label="单位:">三连</el-form-item>
          <el-form-item label="问题类型：">生活问题</el-form-item>
          <el-form-item label="问题描述：">生活太单调，需要增加些业余活动。</el-form-item>
          <el-form-item label="处理意见:">您反应的问题我们已经知悉，将研究对策进行解决。</el-form-item>
          <el-form-item label="处理人:">刘海</el-form-item>
          <el-form-item label="处理时间：">2020-09-02</el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog3=false">取 消</el-button>
        <el-button type="primary" @click="dialog3=false">确 定</el-button>
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
          sex: '男',
          danwei: '三连',
          type: '生活问题',
          time: '2020-05-08',
          status: '处理中',
          people: ''
        },
        {
          name: '平原',
          sex: '男',
          danwei: '勤务连',
          type: '生活问题',
          time: '2020-05-08',
          status: '处理中',
          people: ''
        },
        {
          name: '张三',
          sex: '男',
          danwei: '侦查营',
          type: '训练问题',
          time: '2020-05-08',
          status: '处理中',
          people: ''
        },
        {
          name: '李四',
          sex: '男',
          danwei: '三连',
          type: '训练问题',
          time: '2020-05-08',
          status: '已解决',
          people: '张芳'
        },
        {
          name: '王五',
          sex: '男',
          danwei: '三连',
          type: '训练问题',
          time: '2020-05-08',
          status: '已解决',
          people: '刘海'
        }
      ],
      dialog1: false,
      dialog2: false,
      dialog3: false,
      form: {

      }
    }
  },
  created() {
    this.total = this.list.length
  },
  methods: {
    handleCreate(e, id) {
      this.dialog1 = true
      // if (e === 1) {
      //   this.poptit = '新增楼宇'
      // } else {
      //   this.poptit = '编辑楼宇'
      //   this.getdetails(id)
      // }
    },
    delitem(id) {
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
    details(id) {
      // this.dialog2 = true
      // this.getdetails(id)
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      // this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      // this.getList()
    }
  }
}
</script>
<style scoped>
</style>
